import { useCallback, useEffect, useRef, useState } from "react";
import { ARCADE_LOCATIONS } from "../data/locations";
import { getLocationEvents } from "../lib/filter";
import type { Location, StoryEvent } from "../types/tamako";
import { SceneIcon } from "./Icons";

const CANVAS_W = 820;
const CANVAS_H = 1040;

const SHOP_SIGNS: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tag: string;
  name: string;
  tagSide: "top" | "bottom";
  connectorFromX: number;
  connectorToX: number;
  connectorY: number;
}[] = [
  {
    id: "sashimi",
    x: 68,
    y: 304,
    w: 152,
    h: 56,
    tag: "お魚屋さん",
    name: "さしみ",
    tagSide: "top",
    connectorFromX: 222,
    connectorToX: 342,
    connectorY: 332,
  },
  {
    id: "shimizuya",
    x: 68,
    y: 410,
    w: 152,
    h: 56,
    tag: "お豆腐屋さん",
    name: "清水屋",
    tagSide: "top",
    connectorFromX: 222,
    connectorToX: 342,
    connectorY: 438,
  },
  {
    id: "florist-princess",
    x: 52,
    y: 514,
    w: 168,
    h: 62,
    tag: "お花屋さん",
    name: "フローリスト\nプリンセス",
    tagSide: "top",
    connectorFromX: 222,
    connectorToX: 342,
    connectorY: 544,
  },
  {
    id: "star-and-clown",
    x: 60,
    y: 622,
    w: 160,
    h: 56,
    tag: "レコード屋・喫茶",
    name: "星とピエロ",
    tagSide: "bottom",
    connectorFromX: 222,
    connectorToX: 342,
    connectorY: 650,
  },
  {
    id: "tokiwado",
    x: 68,
    y: 784,
    w: 152,
    h: 56,
    tag: "おもちゃ屋さん",
    name: "トキワ堂",
    tagSide: "top",
    connectorFromX: 222,
    connectorToX: 342,
    connectorY: 812,
  },
  {
    id: "miyako-udon",
    x: 60,
    y: 894,
    w: 160,
    h: 56,
    tag: "おうどん屋さん",
    name: "みやこうどん",
    tagSide: "top",
    connectorFromX: 222,
    connectorToX: 342,
    connectorY: 922,
  },
];

function getDefaultIconForLocation(loc: Location) {
  switch (loc.id) {
    case "florist-princess":
      return "flower" as const;
    case "star-and-clown":
      return "music" as const;
    case "tamaya-window":
      return "cup" as const;
    case "usayu":
    case "tamaya-shop":
    case "oojiya":
    case "shimizuya":
    case "just-meat":
    case "miyako-udon":
      return "mochi" as const;
    case "tokiwado":
      return "baton" as const;
    case "sashimi":
      return "bird" as const;
    default:
      return "flower" as const;
  }
}

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
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState({ scale: 0.56, x: 100, y: 12 });
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
    const scale = Math.min(
      (rect.width - 16) / CANVAS_W,
      (rect.height - 16) / CANVAS_H,
      0.86
    );
    const clamped = Math.max(0.24, scale);
    const x = Math.round((rect.width - CANVAS_W * clamped) / 2);
    const y = Math.max(8, Math.round((rect.height - CANVAS_H * clamped) / 2));
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

  const zoomBy = (factor: number) => {
    const el = viewportRef.current;
    setTransform((prev) => {
      const nextScale = Math.min(1.4, Math.max(0.24, prev.scale * factor));
      if (!el) return { ...prev, scale: nextScale };
      const rect = el.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const ratio = nextScale / prev.scale;
      return {
        scale: nextScale,
        x: Math.round(cx - (cx - prev.x) * ratio),
        y: Math.round(cy - (cy - prev.y) * ratio),
      };
    });
  };

  return (
    <div className="tamako-map-stage">
      <div className="tamako-map-toolbar">
        <div className="tamako-map-legend" aria-label="图例">
          <span className="tamako-legend-item">
            <span
              className="tamako-legend-swatch"
              style={{ backgroundColor: "var(--tamako-link)" }}
            />
            <span>玉屋 / 花店</span>
          </span>
          <span className="tamako-legend-item">
            <span
              className="tamako-legend-swatch"
              style={{ backgroundColor: "var(--tamako-sky)" }}
            />
            <span>拱门 / 路口</span>
          </span>
          <span className="tamako-legend-item">
            <span
              className="tamako-legend-swatch"
              style={{ backgroundColor: "var(--tamako-mint)" }}
            />
            <span>钱汤 / トキワ堂</span>
          </span>
          <span className="tamako-legend-item">
            <span
              className="tamako-legend-swatch"
              style={{ backgroundColor: "var(--tamako-demachi-navy)" }}
            />
            <span>星とピエロ / 大路屋</span>
          </span>
        </div>

        <div className="tamako-zoom-controls">
          <button
            type="button"
            className="tamako-zoom-btn"
            aria-label="放大商店街地图"
            onClick={() => zoomBy(1.2)}
          >
            ＋
          </button>
          <button
            type="button"
            className="tamako-zoom-btn"
            aria-label="缩小商店街地图"
            onClick={() => zoomBy(0.84)}
          >
            －
          </button>
          <button
            type="button"
            className="tamako-zoom-btn"
            onClick={fitMap}
          >
            适应画面
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="tamako-arcade-viewport"
        role="region"
        aria-label="兔山商店街交互式平面地图"
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
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          {/* 基于官网 bg.png 忠实重绘的手账风兔山商店街矢量底图 */}
          <svg
            className="tamako-arcade-svg"
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="arcadeRoadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF7F4" />
                <stop offset="100%" stopColor="#FAF4E0" />
              </linearGradient>
            </defs>

            {/* 柔和和纸街块衬底 */}
            <rect
              x="16"
              y="16"
              width={CANVAS_W - 32}
              height={CANVAS_H - 32}
              rx="28"
              fill="#FFFFFF"
              fillOpacity="0.82"
              stroke="#FFCDC6"
              strokeWidth="2"
            />

            {/* 街巷浅暖路面填充 */}
            <path
              d="M40 198 H785 V256 H472 V676 H778 V764 H472 V986 H344 V764 H40 V676 H344 V256 H40 Z"
              fill="url(#arcadeRoadGrad)"
            />
            <rect
              x="568"
              y="72"
              width="74"
              height="130"
              rx="8"
              fill="#FAF4E0"
            />

            {/* 左上标题手账徽标：うさぎ山 商店街 まっぷ */}
            <g transform="translate(46, 36)">
              <rect
                x="0"
                y="0"
                width="290"
                height="118"
                rx="22"
                fill="#FFF4F7"
                stroke="#FF979D"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              {/* 兔耳朵装饰 */}
              <path
                d="M28 16c-4-14 6-18 11-4M42 16c4-14 14-10 10 4"
                fill="none"
                stroke="#FF7B82"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="26"
                y="50"
                fill="#BF3B5E"
                fontSize="26"
                fontWeight="900"
                fontFamily="var(--tamako-font-display)"
              >
                うさぎ山
              </text>
              <text
                x="26"
                y="84"
                fill="#993338"
                fontSize="24"
                fontWeight="900"
                fontFamily="var(--tamako-font-display)"
              >
                商店街
              </text>
              {/* 右侧对话泡泡「まっぷ」 */}
              <ellipse
                cx="208"
                cy="48"
                rx="54"
                ry="28"
                fill="#FFFFFF"
                stroke="#FF7B82"
                strokeWidth="2.5"
              />
              <text
                x="208"
                y="55"
                textAnchor="middle"
                fill="#BF3B5E"
                fontSize="20"
                fontWeight="900"
                fontFamily="var(--tamako-font-display)"
              >
                まっぷ
              </text>
              <text
                x="114"
                y="102"
                fill="#8A5A36"
                fontSize="12.5"
                fontWeight="700"
              >
                点击彩色圆章，探索商店街名场面
              </text>
            </g>

            {/* 北横街虚线边界与うさ湯分支 */}
            <g stroke="#E69A88" strokeWidth="3.2" strokeDasharray="10 7" fill="none">
              {/* 上方横路上下边界 */}
              <line x1="42" y1="198" x2="564" y2="198" />
              <line x1="646" y1="198" x2="782" y2="198" />
              <line x1="42" y1="256" x2="342" y2="256" />
              <line x1="474" y1="256" x2="782" y2="256" />

              {/* 主街南北虚线边界（上方段 & 下方段） */}
              <line x1="342" y1="256" x2="342" y2="676" />
              <line x1="474" y1="256" x2="474" y2="676" />
              <line x1="342" y1="764" x2="342" y2="982" />
              <line x1="474" y1="764" x2="474" y2="982" />

              {/* 十字路口水平通道（左街 & 右东支路） */}
              <line x1="42" y1="676" x2="342" y2="676" />
              <line x1="42" y1="764" x2="342" y2="764" />
              <line x1="474" y1="676" x2="778" y2="676" />
              <line x1="474" y1="764" x2="778" y2="764" />
            </g>

            {/* 距离波浪省略线（呼应原版 bg.png 省略记号） */}
            <g stroke="#E69A88" strokeWidth="2.5" fill="none">
              <path d="M518 184q8 14 0 28t0 28q8 14 0 28" />
              <path d="M530 184q8 14 0 28t0 28q8 14 0 28" />
              <path d="M326 870q22-8 44 0t44 0t44 0t40 0" />
              <path d="M326 882q22-8 44 0t44 0t44 0t40 0" />
            </g>

            {/* うさ湯 钱汤招牌与分支 */}
            <g transform="translate(544, 42)">
              <rect
                x="0"
                y="0"
                width="124"
                height="122"
                rx="18"
                fill="#E9FBF8"
                stroke="#31CBB7"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <text
                x="62"
                y="24"
                textAnchor="middle"
                fill="#13463F"
                fontSize="12"
                fontWeight="700"
              >
                お風呂屋さん
              </text>
              <text
                x="62"
                y="110"
                textAnchor="middle"
                fill="#13463F"
                fontSize="16"
                fontWeight="900"
              >
                うさ湯
              </text>
            </g>

            {/* 商店街双兔圆月入口拱门装饰（主街入口处） */}
            <g transform="translate(346, 184)">
              <rect
                x="0"
                y="0"
                width="128"
                height="50"
                rx="12"
                fill="#2E62A2"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              <circle cx="24" cy="25" r="13" fill="#FAF4E0" />
              {/* 双兔小剪影 */}
              <circle cx="21" cy="26" r="4" fill="#FFFFFF" />
              <circle cx="28" cy="27" r="3.5" fill="#FFFFFF" />
              <text
                x="78"
                y="22"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11.5"
                fontWeight="900"
              >
                うさぎ山商店街
              </text>
              <text
                x="78"
                y="39"
                textAnchor="middle"
                fill="#FAF4E0"
                fontSize="10.5"
                fontWeight="700"
              >
                入口アーチ
              </text>
            </g>

            {/* 主街左侧店铺牌坊（绿色虚线框，呼应官网 bg.png） */}
            {SHOP_SIGNS.map((shop) => (
              <g key={shop.id}>
                <line
                  x1={shop.connectorFromX}
                  y1={shop.connectorY}
                  x2={shop.connectorToX}
                  y2={shop.connectorY}
                  stroke="#93D548"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <rect
                  x={shop.x}
                  y={shop.y}
                  width={shop.w}
                  height={shop.h}
                  rx="12"
                  fill="#FFFFFF"
                  stroke="#93D548"
                  strokeWidth="2.4"
                  strokeDasharray="6 4"
                />
                <text
                  x={shop.x + shop.w / 2}
                  y={shop.tagSide === "top" ? shop.y - 8 : shop.y + shop.h + 16}
                  textAnchor="middle"
                  fill="#C84B12"
                  fontSize="12"
                  fontWeight="700"
                >
                  {shop.tag}
                </text>
                {shop.name.includes("\n") ? (
                  shop.name.split("\n").map((line, idx) => (
                    <text
                      key={line}
                      x={shop.x + shop.w / 2}
                      y={shop.y + 26 + idx * 19}
                      textAnchor="middle"
                      fill="#234712"
                      fontSize="15"
                      fontWeight="900"
                    >
                      {line}
                    </text>
                  ))
                ) : (
                  <text
                    x={shop.x + shop.w / 2}
                    y={shop.y + 34}
                    textAnchor="middle"
                    fill="#234712"
                    fontSize="16"
                    fontWeight="900"
                  >
                    {shop.name}
                  </text>
                )}
              </g>
            ))}

            {/* 中心十字路口淡蓝サバさん大鲭鱼剪影 */}
            <g transform="translate(362, 668)">
              <path
                d="M12 40c18-22 44-28 68-12l14-9-4 20 14 12-20-2c-16 12-46 16-72-9z"
                fill="#E3F5FF"
                stroke="#41A8DD"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="33" r="3" fill="#41A8DD" />
              <text
                x="50"
                y="-4"
                textAnchor="middle"
                fill="#184070"
                fontSize="12"
                fontWeight="900"
              >
                サバさん（中心路口）
              </text>
            </g>

            {/* 右侧肉店 ジャストミート */}
            <g>
              <line
                x1="474"
                y1="822"
                x2="550"
                y2="822"
                stroke="#93D548"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              <rect
                x="550"
                y="792"
                width="104"
                height="62"
                rx="12"
                fill="#FFF3EA"
                stroke="#F69E6E"
                strokeWidth="2.2"
                strokeDasharray="6 4"
              />
              <text
                x="602"
                y="784"
                textAnchor="middle"
                fill="#C84B12"
                fontSize="12"
                fontWeight="700"
              >
                お肉屋さん
              </text>
              <text
                x="602"
                y="819"
                textAnchor="middle"
                fill="#5C2226"
                fontSize="13.5"
                fontWeight="900"
              >
                ジャスト
              </text>
              <text
                x="602"
                y="838"
                textAnchor="middle"
                fill="#5C2226"
                fontSize="13.5"
                fontWeight="900"
              >
                ミート
              </text>
            </g>

            {/* 右侧东支路：たまや vs RICE CAKE Oh!ZEE & 纸杯电话连线 */}
            <g>
              {/* 玉屋招牌框 */}
              <rect
                x="644"
                y="530"
                width="126"
                height="104"
                rx="18"
                fill="#FFF4F7"
                stroke="#FF7B82"
                strokeWidth="2.2"
              />
              <text
                x="707"
                y="622"
                textAnchor="middle"
                fill="#993338"
                fontSize="15.5"
                fontWeight="900"
              >
                たまや（玉屋）
              </text>

              {/* 二楼窗台纸杯电话连线 */}
              <line
                x1="707"
                y1="634"
                x2="707"
                y2="808"
                stroke="#BF3B5E"
                strokeWidth="2.5"
                strokeDasharray="5 4"
              />

              {/* 爆裂形状：ライバルもち屋 */}
              <polygon
                points="647,688 671,696 687,680 707,694 729,680 743,696 773,688 759,716 773,744 743,736 729,752 707,738 687,752 671,736 647,744 661,716"
                fill="#FAF4E0"
                stroke="#E4362D"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <text
                x="707"
                y="764"
                textAnchor="middle"
                fill="#C84B12"
                fontSize="11.5"
                fontWeight="900"
              >
                ライバルもち屋 · 糸電話
              </text>

              {/* 大路屋招牌框 */}
              <rect
                x="644"
                y="808"
                width="126"
                height="106"
                rx="18"
                fill="#EDF3FA"
                stroke="#2E62A2"
                strokeWidth="2.2"
              />
              <text
                x="707"
                y="886"
                textAnchor="middle"
                fill="#184070"
                fontSize="13.5"
                fontWeight="900"
              >
                RICE CAKE
              </text>
              <text
                x="707"
                y="904"
                textAnchor="middle"
                fill="#184070"
                fontSize="12"
                fontWeight="900"
              >
                Oh!ZEE（大路屋）
              </text>
            </g>

            {/* 指南针角标 */}
            <g transform="translate(722, 74)">
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="#FAF4E0"
                stroke="#D8BDA3"
                strokeWidth="2"
              />
              <polygon points="30,10 36,30 30,26 24,30" fill="#BF3B5E" />
              <polygon points="30,50 35,30 30,34 25,30" fill="#D8BDA3" />
              <text
                x="30"
                y="68"
                textAnchor="middle"
                fill="#8A5A36"
                fontSize="11"
                fontWeight="900"
              >
                北（入口側）
              </text>
            </g>
          </svg>

          {/* 13 个键盘可达圆章热点（>= 44x44px） */}
          {ARCADE_LOCATIONS.map((loc) => {
            const coord = loc.arcadeCoord!;
            const hits = getLocationEvents(events, loc.id, "arcade");
            const isSelected = selectedLocationId === loc.id;
            const dimmed = hits.length === 0 && !isSelected;

            return (
              <button
                key={loc.id}
                type="button"
                className={`tamako-arcade-hotspot tamako-pin--${loc.tone}${
                  isSelected ? " is-selected" : ""
                }${dimmed ? " is-dimmed" : ""}`}
                style={{
                  left: `${(coord.x / CANVAS_W) * 100}%`,
                  top: `${(coord.y / CANVAS_H) * 100}%`,
                }}
                aria-label={`${loc.nameZh}（${hits.length} 条命中事件）`}
                aria-pressed={isSelected}
                onClick={() => onSelectLocation(loc.id)}
                onMouseEnter={() =>
                  onHoverHint(
                    `${loc.nameZh}（${loc.subtitle}）· 当前有 ${hits.length} 条剧情事件もち`
                  )
                }
                onFocus={() =>
                  onHoverHint(
                    `${loc.nameZh}（${loc.subtitle}）· 当前有 ${hits.length} 条剧情事件もち`
                  )
                }
              >
                <SceneIcon kind={getDefaultIconForLocation(loc)} size={21} />
                <span className="tamako-hotspot-badge">{hits.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
