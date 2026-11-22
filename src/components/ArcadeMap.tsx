import { useCallback, useEffect, useRef, useState } from "react";
import { ARCADE_LOCATIONS } from "../data/locations";
import { useI18n } from "../i18n";
import { getLocationEvents } from "../lib/filter";
import type { StoryEvent } from "../types/tamako";

const CANVAS_W = 940;
const CANVAS_H = 1060;

interface ShopBlock {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tag: string;
  name: string;
  roofA: string;
  roofB: string;
  wallBg: string;
  borderColor: string;
  connectorFromX: number;
  connectorToX: number;
  connectorY: number;
  avatars: { src: string; cx: number; cy: number; ring: string }[];
}

const LEFT_SHOPS: ShopBlock[] = [
  {
    id: "sashimi",
    x: 112,
    y: 298,
    w: 150,
    h: 68,
    tag: "お魚屋さん",
    name: "さしみ",
    roofA: "#41A8DD",
    roofB: "#EAF7FF",
    wallBg: "#FFFFFF",
    borderColor: "#41A8DD",
    connectorFromX: 262,
    connectorToX: 356,
    connectorY: 332,
    avatars: [
      { src: "/images/avatars/sashimi_mari.webp", cx: 42, cy: 332, ring: "#F69E6E" },
      { src: "/images/avatars/sashimi_takashi.webp", cx: 88, cy: 332, ring: "#41A8DD" },
    ],
  },
  {
    id: "shimizuya",
    x: 112,
    y: 406,
    w: 150,
    h: 68,
    tag: "お豆腐屋さん",
    name: "清水屋",
    roofA: "#93D548",
    roofB: "#F3FAEA",
    wallBg: "#FFFFFF",
    borderColor: "#88B17D",
    connectorFromX: 262,
    connectorToX: 356,
    connectorY: 440,
    avatars: [
      { src: "/images/avatars/shimizuya_tomio.webp", cx: 74, cy: 440, ring: "#93D548" },
    ],
  },
  {
    id: "florist-princess",
    x: 102,
    y: 514,
    w: 160,
    h: 72,
    tag: "お花屋さん",
    name: "フローリスト\nプリンセス",
    roofA: "#FF7B82",
    roofB: "#FFF4F7",
    wallBg: "#FFFDF9",
    borderColor: "#FF979D",
    connectorFromX: 262,
    connectorToX: 356,
    connectorY: 550,
    avatars: [
      { src: "/images/avatars/kaoru.webp", cx: 66, cy: 550, ring: "#FF979D" },
    ],
  },
  {
    id: "star-and-clown",
    x: 108,
    y: 624,
    w: 154,
    h: 68,
    tag: "レコード屋・喫茶",
    name: "星とピエロ",
    roofA: "#2E62A2",
    roofB: "#EDF3FA",
    wallBg: "#FFFFFF",
    borderColor: "#2E62A2",
    connectorFromX: 262,
    connectorToX: 356,
    connectorY: 658,
    avatars: [
      { src: "/images/avatars/yaobi.webp", cx: 70, cy: 658, ring: "#2E62A2" },
    ],
  },
  {
    id: "tokiwado",
    x: 112,
    y: 788,
    w: 150,
    h: 68,
    tag: "おもちゃ屋さん",
    name: "トキワ堂",
    roofA: "#31CBB7",
    roofB: "#E9FBF8",
    wallBg: "#FFFFFF",
    borderColor: "#31CBB7",
    connectorFromX: 262,
    connectorToX: 356,
    connectorY: 822,
    avatars: [
      { src: "/images/avatars/tokiwa_nobuhiko.webp", cx: 74, cy: 822, ring: "#31CBB7" },
    ],
  },
  {
    id: "miyako-udon",
    x: 108,
    y: 898,
    w: 154,
    h: 68,
    tag: "おうどん屋さん",
    name: "みやこうどん",
    roofA: "#DE9132",
    roofB: "#FAF4E0",
    wallBg: "#FFFFFF",
    borderColor: "#DE9132",
    connectorFromX: 262,
    connectorToX: 356,
    connectorY: 932,
    avatars: [
      { src: "/images/avatars/miyako_tadanao.webp", cx: 70, cy: 932, ring: "#DE9132" },
    ],
  },
];

export function ArcadeMap({
  events,
  selectedLocationId,
  onSelectLocation,
  onHoverHint,
}: {
  events: StoryEvent[];
  selectedLocationId: string;
  onSelectLocation: (locId: string) => void;
  onHoverHint: (hint: string) => void;
}) {
  const { ui, tLoc } = useI18n();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState({ scale: 0.68, x: 120, y: 16 });
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({ active: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  const fitMap = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Reserve gentle breathing room on desktop when inspector is on the right & Dera dock at bottom-left
    const rightReserve = rect.width >= 960 ? 372 : 12;
    const bottomReserve = rect.width >= 960 ? 116 : 124;
    const topReserve = 52;
    const availW = Math.max(240, rect.width - rightReserve - 24);
    const availH = Math.max(240, rect.height - topReserve - bottomReserve);

    const scale = Math.min(availW / CANVAS_W, availH / CANVAS_H, 0.92);
    const clamped = Math.max(0.26, scale);
    const x = Math.round((rect.width - rightReserve - CANVAS_W * clamped) / 2) + 8;
    const y = Math.round(topReserve + (availH - CANVAS_H * clamped) / 2);
    setTransform({ scale: clamped, x, y });
  }, []);

  useEffect(() => {
    fitMap();
    const el = viewportRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => fitMap());
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitMap]);

  const zoomAt = useCallback((factor: number, clientX?: number, clientY?: number) => {
    const el = viewportRef.current;
    setTransform((prev) => {
      const nextScale = Math.min(1.65, Math.max(0.28, prev.scale * factor));
      if (!el) return { ...prev, scale: nextScale };
      const rect = el.getBoundingClientRect();
      const cx = clientX !== undefined ? clientX - rect.left : rect.width / 2;
      const cy = clientY !== undefined ? clientY - rect.top : rect.height / 2;
      const ratio = nextScale / prev.scale;
      return {
        scale: nextScale,
        x: Math.round(cx - (cx - prev.x) * ratio),
        y: Math.round(cy - (cy - prev.y) * ratio),
      };
    });
  }, []);

  // Native non-passive wheel listener for silky zoom around cursor
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.91;
      zoomAt(factor, e.clientX, e.clientY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  return (
    <div className="tamako-canvas-fill">
      {/* Floating Legend & Reset Pill */}
      <div className="tamako-map-hud-topcenter" aria-label={ui.arcadeToolbarAria}>
        <span className="tamako-hud-static-tag">{ui.arcadeGuideTag}</span>
        <button type="button" className="tamako-hud-chip" onClick={fitMap}>
          {ui.arcadeFitBtn}
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="tamako-map-zoom-dock" role="group" aria-label={ui.arcadeZoomGroupAria}>
        <button
          type="button"
          className="tamako-zoom-fab"
          aria-label={ui.arcadeZoomInAria}
          onClick={() => zoomAt(1.22)}
        >
          ＋
        </button>
        <button
          type="button"
          className="tamako-zoom-fab"
          aria-label={ui.arcadeZoomOutAria}
          onClick={() => zoomAt(0.82)}
        >
          －
        </button>
      </div>

      <div
        ref={viewportRef}
        className="tamako-arcade-viewport"
        role="region"
        aria-label={ui.arcadeRegionAria}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          dragRef.current = {
            active: true,
            startX: e.clientX,
            startY: e.clientY,
            originX: transform.x,
            originY: transform.y,
          };
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragRef.current.active) return;
          const dx = e.clientX - dragRef.current.startX;
          const dy = e.clientY - dragRef.current.startY;
          setTransform((prev) => ({
            ...prev,
            x: dragRef.current.originX + dx,
            y: dragRef.current.originY + dy,
          }));
        }}
        onPointerUp={() => {
          dragRef.current.active = false;
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
        }}
      >
        <div
          className="tamako-arcade-canvas"
          style={{
            width: `${CANVAS_W}px`,
            height: `${CANVAS_H}px`,
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          <svg
            className="tamako-arcade-svg"
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            style={{ width: `${CANVAS_W}px`, height: `${CANVAS_H}px` }}
            aria-hidden="true"
          >
            <defs>
              {/* Warm arcade floor tile pattern */}
              <pattern
                id="arcadeFloorTiles"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <rect width="28" height="28" fill="#FFFDF6" />
                <path
                  d="M 28 0 L 0 0 0 28"
                  fill="none"
                  stroke="#F2E4CE"
                  strokeWidth="1.2"
                />
                <rect x="2" y="2" width="11" height="11" rx="2" fill="#FAF4E0" opacity="0.55" />
                <rect x="15" y="15" width="11" height="11" rx="2" fill="#FFF4F7" opacity="0.45" />
              </pattern>

              {/* Three-color Tamako awning pattern */}
              <pattern
                id="tamakoAwningTop"
                width="96"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="32" height="24" fill="#DBFDF6" />
                <rect x="32" y="0" width="32" height="24" fill="#F9EDED" />
                <rect x="64" y="0" width="32" height="24" fill="#F3FBD7" />
              </pattern>

              {/* Circular clip paths for official character avatar medallions */}
              <clipPath id="clipR22">
                <circle cx="0" cy="0" r="22" />
              </clipPath>
              <clipPath id="clipR24">
                <circle cx="0" cy="0" r="24" />
              </clipPath>
            </defs>

            {/* Hand-stitched Washi Map Board */}
            <rect
              x="14"
              y="14"
              width={CANVAS_W - 28}
              height={CANVAS_H - 28}
              rx="34"
              fill="#FFFFFF"
              fillOpacity="0.94"
              stroke="#EDD18F"
              strokeWidth="3"
            />
            <rect
              x="24"
              y="24"
              width={CANVAS_W - 48}
              height={CANVAS_H - 48}
              rx="26"
              fill="none"
              stroke="#FFCDC6"
              strokeWidth="1.6"
              strokeDasharray="7 5"
            />

            {/* Top 3-color Awning Scallop Valance */}
            <g transform="translate(26, 26)">
              <rect
                x="0"
                y="0"
                width={CANVAS_W - 52}
                height="16"
                rx="8"
                fill="url(#tamakoAwningTop)"
              />
            </g>

            {/* T-Shaped + Crossroad Arcade Tiled Walkway */}
            <path
              d="M44 196 H896 V256 H504 V686 H892 V772 H504 V1006 H356 V772 H44 V686 H356 V256 H44 Z"
              fill="url(#arcadeFloorTiles)"
            />
            {/* Usayu bathhouse north lane */}
            <rect
              x="602"
              y="70"
              width="76"
              height="130"
              rx="10"
              fill="url(#arcadeFloorTiles)"
            />

            {/* Festive Hanging Bunting Flags along the Arcade Ceiling */}
            <g opacity="0.88">
              <path
                d="M362 310 Q430 326 498 310"
                fill="none"
                stroke="#D8BDA3"
                strokeWidth="1.6"
              />
              <polygon points="382,314 392,316 387,328" fill="#FF979D" />
              <polygon points="412,318 422,319 417,331" fill="#31CBB7" />
              <polygon points="442,319 452,318 447,331" fill="#F69E6E" />
              <polygon points="470,316 480,314 475,328" fill="#93D548" />

              <path
                d="M362 520 Q430 536 498 520"
                fill="none"
                stroke="#D8BDA3"
                strokeWidth="1.6"
              />
              <polygon points="382,524 392,526 387,538" fill="#41A8DD" />
              <polygon points="412,528 422,529 417,541" fill="#FF7B82" />
              <polygon points="442,529 452,528 447,541" fill="#EDD18F" />
              <polygon points="470,526 480,524 475,538" fill="#31CBB7" />
            </g>

            {/* Title Cartouche: うさぎ山 商店街 まっぷ (Top Left) */}
            <g transform="translate(46, 50)">
              <rect
                x="0"
                y="0"
                width="318"
                height="122"
                rx="26"
                fill="#FFF4F7"
                stroke="#FF979D"
                strokeWidth="2.4"
                strokeDasharray="7 4"
              />
              {/* Cute Twin Rabbit Mascot Badge */}
              <circle cx="48" cy="48" r="26" fill="#FFFFFF" stroke="#FF7B82" strokeWidth="2" />
              <path
                d="M40 34c-3-11 4-14 8-3M50 34c3-11 11-8 8 3"
                fill="#FFF4F7"
                stroke="#FF7B82"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="48" cy="50" r="13" fill="#FFF4F7" stroke="#FF7B82" strokeWidth="2" />
              <circle cx="44" cy="49" r="2" fill="#993338" />
              <circle cx="52" cy="49" r="2" fill="#993338" />
              <circle cx="41" cy="53" r="2.5" fill="#FFB1B5" />
              <circle cx="55" cy="53" r="2.5" fill="#FFB1B5" />

              <text
                x="86"
                y="48"
                fill="#BF3B5E"
                fontSize="27"
                fontWeight="900"
                fontFamily="var(--tamako-font-display)"
              >
                うさぎ山
              </text>
              <text
                x="86"
                y="82"
                fill="#993338"
                fontSize="25"
                fontWeight="900"
                fontFamily="var(--tamako-font-display)"
              >
                商店街
              </text>

              {/* Speech bubble まっぷ */}
              <ellipse
                cx="254"
                cy="48"
                rx="50"
                ry="26"
                fill="#FFFFFF"
                stroke="#FF7B82"
                strokeWidth="2.4"
              />
              <text
                x="254"
                y="55"
                textAnchor="middle"
                fill="#BF3B5E"
                fontSize="19"
                fontWeight="900"
                fontFamily="var(--tamako-font-display)"
              >
                まっぷ
              </text>

              <text x="86" y="106" fill="#8A5A36" fontSize="11.5" fontWeight="700">
                {ui.arcadeBoardSub}
              </text>
            </g>

            {/* Warm Stitched Coral Road Borders (matching official bg.png) */}
            <g stroke="#E69A88" strokeWidth="3.2" strokeDasharray="10 7" fill="none">
              <line x1="46" y1="196" x2="600" y2="196" />
              <line x1="680" y1="196" x2="894" y2="196" />
              <line x1="46" y1="256" x2="356" y2="256" />
              <line x1="504" y1="256" x2="894" y2="256" />

              <line x1="356" y1="256" x2="356" y2="686" />
              <line x1="504" y1="256" x2="504" y2="686" />
              <line x1="356" y1="772" x2="356" y2="1004" />
              <line x1="504" y1="772" x2="504" y2="1004" />

              <line x1="46" y1="686" x2="356" y2="686" />
              <line x1="46" y1="772" x2="356" y2="772" />
              <line x1="504" y1="686" x2="892" y2="686" />
              <line x1="504" y1="772" x2="892" y2="772" />
            </g>

            {/* Official Distance Wavy Break Lines */}
            <g stroke="#E69A88" strokeWidth="2.5" fill="none">
              <path d="M554 182q8 14 0 28t0 28q8 14 0 28" />
              <path d="M566 182q8 14 0 28t0 28q8 14 0 28" />
              <path d="M342 878q22-8 44 0t44 0t44 0t44 0" />
              <path d="M342 890q22-8 44 0t44 0t44 0t44 0" />
            </g>

            {/* North Bathhouse: うさ湯 + Yumoto Choji & Sayuri Avatars */}
            <g>
              <line
                x1="602"
                y1="72"
                x2="602"
                y2="196"
                stroke="#93D548"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              <line
                x1="678"
                y1="72"
                x2="678"
                y2="196"
                stroke="#93D548"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              <rect
                x="568"
                y="46"
                width="144"
                height="120"
                rx="20"
                fill="#E9FBF8"
                stroke="#31CBB7"
                strokeWidth="2.4"
              />
              {/* Karahafu wooden bathhouse roof & noren */}
              <path
                d="M578 72 Q640 48 702 72"
                fill="#FAF4E0"
                stroke="#8E4C28"
                strokeWidth="2.5"
              />
              <rect x="610" y="72" width="18" height="16" rx="2" fill="#41A8DD" />
              <rect x="631" y="72" width="18" height="16" rx="2" fill="#41A8DD" />
              <rect x="652" y="72" width="18" height="16" rx="2" fill="#FF7B82" />
              <text
                x="640"
                y="154"
                textAnchor="middle"
                fill="#13463F"
                fontSize="16"
                fontWeight="900"
              >
                うさ湯（銭湯）
              </text>

              {/* Choji & Sayuri circular portraits (like official bg.png!) */}
              <g transform="translate(544, 86)">
                <circle r="25" fill="#FFFFFF" stroke="#93D548" strokeWidth="2.5" />
                <image
                  href="/images/avatars/usayu_choji.webp"
                  x="-22"
                  y="-22"
                  width="44"
                  height="44"
                  clipPath="url(#clipR22)"
                />
              </g>
              <g transform="translate(736, 86)">
                <circle r="25" fill="#FFFFFF" stroke="#FF979D" strokeWidth="2.5" />
                <image
                  href="/images/avatars/usayu_sayuri.webp"
                  x="-22"
                  y="-22"
                  width="44"
                  height="44"
                  clipPath="url(#clipR22)"
                />
              </g>
              <text x="736" y="126" textAnchor="middle" fill="#C84B12" fontSize="11.5" fontWeight="800">
                お風呂屋さん
              </text>
            </g>

            {/* Usagiyama Arcade Twin-Rabbit Moon Entrance Arch */}
            <g transform="translate(362, 178)">
              <rect
                x="0"
                y="0"
                width="136"
                height="54"
                rx="14"
                fill="#2E62A2"
                stroke="#FFFFFF"
                strokeWidth="3"
              />
              <circle cx="27" cy="27" r="15" fill="#FAF4E0" />
              <circle cx="23" cy="28" r="4.5" fill="#FFFFFF" />
              <circle cx="31" cy="29" r="3.8" fill="#FFFFFF" />
              <text
                x="84"
                y="23"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="900"
              >
                うさぎ山商店街
              </text>
              <text
                x="84"
                y="41"
                textAnchor="middle"
                fill="#FAF4E0"
                fontSize="11"
                fontWeight="700"
              >
                入口アーチ
              </text>
            </g>

            {/* Left Column Shops with Striped Awnings & Real Shopkeeper Avatars */}
            {LEFT_SHOPS.map((shop) => (
              <g key={shop.id}>
                {/* Dashed connector to street */}
                <line
                  x1={shop.connectorFromX}
                  y1={shop.connectorY}
                  x2={shop.connectorToX}
                  y2={shop.connectorY}
                  stroke="#93D548"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />

                {/* Shop building card */}
                <rect
                  x={shop.x}
                  y={shop.y}
                  width={shop.w}
                  height={shop.h}
                  rx="14"
                  fill={shop.wallBg}
                  stroke={shop.borderColor}
                  strokeWidth="2.4"
                />
                {/* Cute striped shop awning eave */}
                <rect
                  x={shop.x + 6}
                  y={shop.y + 4}
                  width={shop.w - 12}
                  height="11"
                  rx="5"
                  fill={shop.roofA}
                />
                <rect
                  x={shop.x + 22}
                  y={shop.y + 4}
                  width="18"
                  height="11"
                  fill={shop.roofB}
                />
                <rect
                  x={shop.x + 58}
                  y={shop.y + 4}
                  width="18"
                  height="11"
                  fill={shop.roofB}
                />
                <rect
                  x={shop.x + 94}
                  y={shop.y + 4}
                  width="18"
                  height="11"
                  fill={shop.roofB}
                />

                {/* Category handwritten callout */}
                <text
                  x={shop.x + shop.w / 2}
                  y={shop.y - 7}
                  textAnchor="middle"
                  fill="#C84B12"
                  fontSize="12"
                  fontWeight="800"
                >
                  {shop.tag}
                </text>

                {/* Shop Name */}
                {shop.name.includes("\n") ? (
                  shop.name.split("\n").map((line, idx) => (
                    <text
                      key={line}
                      x={shop.x + shop.w / 2}
                      y={shop.y + 36 + idx * 19}
                      textAnchor="middle"
                      fill="#234712"
                      fontSize="14.5"
                      fontWeight="900"
                    >
                      {line}
                    </text>
                  ))
                ) : (
                  <text
                    x={shop.x + shop.w / 2}
                    y={shop.y + 46}
                    textAnchor="middle"
                    fill="#234712"
                    fontSize="16.5"
                    fontWeight="900"
                  >
                    {shop.name}
                  </text>
                )}

                {/* Shopkeeper Circular Portrait Medallions */}
                {shop.avatars.map((av) => (
                  <g key={av.src} transform={`translate(${av.cx}, ${av.cy})`}>
                    <circle
                      r="25"
                      fill="#FFFFFF"
                      stroke={av.ring}
                      strokeWidth="2.6"
                    />
                    <image
                      href={av.src}
                      x="-22"
                      y="-22"
                      width="44"
                      height="44"
                      clipPath="url(#clipR22)"
                    />
                  </g>
                ))}
              </g>
            ))}

            {/* Central Crossroads Hanging Mackerel: サバさん */}
            <g transform="translate(376, 668)">
              <path
                d="M12 44c20-24 48-30 74-12l16-10-4 22 15 13-22-2c-18 14-50 18-79-11z"
                fill="#E3F5FF"
                stroke="#41A8DD"
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              <path d="M36 28q16 6 32 0M38 36q16 6 30 0" stroke="#7CC8F2" strokeWidth="1.8" fill="none" />
              <circle cx="30" cy="36" r="3.2" fill="#184070" />
              <text
                x="56"
                y="-4"
                textAnchor="middle"
                fill="#184070"
                fontSize="12.5"
                fontWeight="900"
              >
                サバさん（中心十字路）
              </text>
            </g>

            {/* Center Info Note Box */}
            <g transform="translate(534, 316)">
              <rect
                x="0"
                y="0"
                width="216"
                height="108"
                rx="18"
                fill="#FAF4E0"
                fillOpacity="0.78"
                stroke="#D8BDA3"
                strokeWidth="1.8"
                strokeDasharray="6 4"
              />
              <text x="16" y="30" fill="#993338" fontSize="13" fontWeight="900">
                {ui.arcadeLegendTitle}
              </text>
              <text x="16" y="54" fill="#8E4C28" fontSize="11.5" fontWeight="700">
                {ui.arcadeLegendLine1}
              </text>
              <text x="16" y="76" fill="#8E4C28" fontSize="11.5" fontWeight="700">
                {ui.arcadeLegendLine2}
              </text>
              <text x="16" y="96" fill="#BF3B5E" fontSize="11.2" fontWeight="800">
                {ui.arcadeLegendLine3}
              </text>
            </g>

            {/* Right Column: Just Meat (ジャストミート) + Fumiko Avatar */}
            <g>
              <line
                x1="504"
                y1="834"
                x2="582"
                y2="834"
                stroke="#93D548"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              <rect
                x="582"
                y="800"
                width="118"
                height="70"
                rx="14"
                fill="#FFF3EA"
                stroke="#F69E6E"
                strokeWidth="2.4"
              />
              <rect x="588" y="804" width="106" height="10" rx="5" fill="#93D548" />
              <text
                x="641"
                y="792"
                textAnchor="middle"
                fill="#C84B12"
                fontSize="12"
                fontWeight="800"
              >
                お肉屋さん
              </text>
              <text
                x="641"
                y="835"
                textAnchor="middle"
                fill="#5C2226"
                fontSize="14"
                fontWeight="900"
              >
                ジャスト
              </text>
              <text
                x="641"
                y="855"
                textAnchor="middle"
                fill="#5C2226"
                fontSize="14"
                fontWeight="900"
              >
                ミート
              </text>
              <g transform="translate(696, 892)">
                <circle r="24" fill="#FFFFFF" stroke="#F69E6E" strokeWidth="2.6" />
                <image
                  href="/images/avatars/justmeat_fumiko.webp"
                  x="-22"
                  y="-22"
                  width="44"
                  height="44"
                  clipPath="url(#clipR22)"
                />
              </g>
            </g>

            {/* East Side Street: Tamaya (たまや) vs RICE CAKE Oh!ZEE + String Phone */}
            <g>
              {/* Tamaya Mochi Shop + Mamedai & Tamako Avatars */}
              <rect
                x="696"
                y="508"
                width="148"
                height="122"
                rx="20"
                fill="#FFF4F7"
                stroke="#FF7B82"
                strokeWidth="2.5"
              />
              {/* 3-panel Indigo Noren */}
              <rect x="716" y="516" width="32" height="22" rx="3" fill="#2E62A2" />
              <rect x="754" y="516" width="32" height="22" rx="3" fill="#2E62A2" />
              <rect x="792" y="516" width="32" height="22" rx="3" fill="#2E62A2" />
              <text x="732" y="531" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900">
                た
              </text>
              <text x="770" y="531" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900">
                ま
              </text>
              <text x="808" y="531" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900">
                や
              </text>
              <text
                x="770"
                y="622"
                textAnchor="middle"
                fill="#993338"
                fontSize="15"
                fontWeight="900"
              >
                たまや（北白川家）
              </text>
              {/* Mamedai & Tamako portraits above Tamaya */}
              <g transform="translate(742, 474)">
                <circle r="26" fill="#FFFFFF" stroke="#DE9132" strokeWidth="2.6" />
                <image
                  href="/images/avatars/mamedai.webp"
                  x="-24"
                  y="-24"
                  width="48"
                  height="48"
                  clipPath="url(#clipR24)"
                />
              </g>
              <g transform="translate(800, 474)">
                <circle r="26" fill="#FFFFFF" stroke="#FF7B82" strokeWidth="2.6" />
                <image
                  href="/images/avatars/tamako.webp"
                  x="-24"
                  y="-24"
                  width="48"
                  height="48"
                  clipPath="url(#clipR24)"
                />
              </g>

              {/* Paper-Cup String Phone Red Line across the lane */}
              <path
                d="M766 632 C756 676, 776 768, 766 812"
                fill="none"
                stroke="#E4362D"
                strokeWidth="2.8"
                strokeDasharray="6 4"
              />
              {/* Cute Paper Cups at both ends */}
              <polygon points="758,636 774,636 771,650 761,650" fill="#FFFFFF" stroke="#BF3B5E" strokeWidth="2" />
              <polygon points="761,796 771,796 774,810 758,810" fill="#FFFFFF" stroke="#2E62A2" strokeWidth="2" />

              {/* Rival Starburst Badge */}
              <polygon
                points="698,698 724,706 742,688 766,704 790,688 808,706 836,698 820,726 836,754 808,746 790,764 766,748 742,764 724,746 698,754 714,726"
                fill="#FAF4E0"
                stroke="#E4362D"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <text
                x="850"
                y="724"
                fill="#C84B12"
                fontSize="12"
                fontWeight="900"
              >
                ライバル
              </text>
              <text
                x="850"
                y="742"
                fill="#BF3B5E"
                fontSize="12"
                fontWeight="900"
              >
                二階糸電話
              </text>

              {/* Oojiya / RICE CAKE Oh!ZEE + Gohei & Mochizou Avatars */}
              <rect
                x="696"
                y="812"
                width="148"
                height="122"
                rx="20"
                fill="#EDF3FA"
                stroke="#2E62A2"
                strokeWidth="2.5"
              />
              <rect x="712" y="820" width="116" height="18" rx="6" fill="#2E62A2" />
              <text
                x="770"
                y="833"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10.5"
                fontWeight="900"
              >
                RICE CAKE Oh!ZEE
              </text>
              <text
                x="770"
                y="926"
                textAnchor="middle"
                fill="#184070"
                fontSize="14"
                fontWeight="900"
              >
                大路屋（Oh!ZEE）
              </text>
              <g transform="translate(742, 968)">
                <circle r="26" fill="#FFFFFF" stroke="#2E62A2" strokeWidth="2.6" />
                <image
                  href="/images/avatars/gohei.webp"
                  x="-24"
                  y="-24"
                  width="48"
                  height="48"
                  clipPath="url(#clipR24)"
                />
              </g>
              <g transform="translate(800, 968)">
                <circle r="26" fill="#FFFFFF" stroke="#41A8DD" strokeWidth="2.6" />
                <image
                  href="/images/avatars/mochizou.webp"
                  x="-24"
                  y="-24"
                  width="48"
                  height="48"
                  clipPath="url(#clipR24)"
                />
              </g>
            </g>

            {/* Compass Rose (Top Right) */}
            <g transform="translate(822, 74)">
              <circle
                cx="34"
                cy="34"
                r="28"
                fill="#FAF4E0"
                stroke="#EDD18F"
                strokeWidth="2.2"
              />
              <polygon points="34,12 41,34 34,29 27,34" fill="#BF3B5E" />
              <polygon points="34,56 40,34 34,39 28,34" fill="#D8BDA3" />
              <text
                x="34"
                y="78"
                textAnchor="middle"
                fill="#8A5A36"
                fontSize="11"
                fontWeight="900"
              >
                {ui.arcadeCompassNorth}
              </text>
            </g>
          </svg>

          {/* 13 Photo-Stamp Hotspots with Real Anime Scene Thumbnails */}
          {ARCADE_LOCATIONS.map((loc) => {
            const coord = loc.arcadeCoord!;
            const hits = getLocationEvents(events, loc.id, "arcade");
            const isSelected = selectedLocationId === loc.id;
            const dimmed = hits.length === 0 && !isSelected;
            const locText = tLoc(loc);

            return (
              <button
                key={loc.id}
                type="button"
                className={`tamako-arcade-pin tamako-pin--${loc.tone}${
                  isSelected ? " is-selected" : ""
                }${dimmed ? " is-dimmed" : ""}`}
                style={{
                  left: `${(coord.x / CANVAS_W) * 100}%`,
                  top: `${(coord.y / CANVAS_H) * 100}%`,
                }}
                aria-label={ui.arcadePinAria(locText.name, hits.length)}
                aria-pressed={isSelected}
                onClick={() => onSelectLocation(loc.id)}
                onMouseEnter={() =>
                  onHoverHint(
                    ui.hintHoverArcadeLoc(locText.name, locText.subtitle, hits.length)
                  )
                }
                onFocus={() =>
                  onHoverHint(
                    ui.hintHoverArcadeLoc(locText.name, locText.subtitle, hits.length)
                  )
                }
              >
                <img
                  className="tamako-arcade-pin-img"
                  src={loc.imageUrl}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
                <span className="tamako-hotspot-badge">{hits.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
