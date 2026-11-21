import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { KYOTO_LOCATIONS } from "../data/locations";
import { STORY_ROUTES } from "../data/routes";
import { getLocationEvents } from "../lib/filter";
import type { Location, SceneIconKind, StoryEvent } from "../types/tamako";
import { getSceneIconSvgHtml } from "./Icons";

const REGIONS: {
  id: string;
  label: string;
  center: [number, number];
  zoom: number;
}[] = [
  { id: "all", label: "全览京都舞台", center: [34.996, 135.768], zoom: 12 },
  {
    id: "demachi",
    label: "出町桝形 & 鸭川",
    center: [35.0315, 135.7712],
    zoom: 16,
  },
  {
    id: "fujinomori",
    label: "藤森站 & 兔山高校",
    center: [34.9578, 135.7712],
    zoom: 16,
  },
  {
    id: "station",
    label: "JR 京都站",
    center: [34.9858, 135.7588],
    zoom: 15,
  },
];

function getKyotoIconKind(loc: Location): SceneIconKind {
  switch (loc.kind) {
    case "station":
      return "train";
    case "school":
      return "baton";
    case "shrine":
      return "flower";
    case "bath":
    case "home":
    case "shop":
      return "mochi";
    default:
      return loc.id === "kyoto-delta" ? "camera" : "flower";
  }
}

export function KyotoMap({
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [activeRegion, setActiveRegion] = useState("all");

  const onSelectRef = useRef(onSelectLocation);
  const onHoverRef = useRef(onHoverHint);
  onSelectRef.current = onSelectLocation;
  onHoverRef.current = onHoverHint;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [34.996, 135.768],
      zoom: 12,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: true,
    });

    L.tileLayer(
      "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
      {
        attribution:
          '地図タイル：<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">国土地理院（淡色地図）</a>',
        minZoom: 5,
        maxNativeZoom: 17,
        maxZoom: 18,
      }
    ).addTo(map);

    routeLayerRef.current = L.layerGroup().addTo(map);
    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const timer = window.setTimeout(() => {
      map.invalidateSize();
    }, 120);

    return () => {
      window.clearTimeout(timer);
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      routeLayerRef.current = null;
    };
  }, []);

  // 渲染巡礼动线
  useEffect(() => {
    const layer = routeLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    if (!showRoutes) return;

    for (const route of STORY_ROUTES) {
      const line = L.polyline(route.path, {
        color: route.color,
        weight: 4,
        opacity: 0.82,
        dashArray: route.dashArray,
      });
      line.bindTooltip(`${route.nameZh}：${route.summaryZh}`, {
        sticky: true,
        className: "tamako-leaflet-tooltip",
      });
      line.addTo(layer);
    }
  }, [showRoutes]);

  // 渲染 15 个京都巡礼坐标圆章
  useEffect(() => {
    const layer = markerLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    for (const loc of KYOTO_LOCATIONS) {
      const coord = loc.kyotoCoord!;
      const hits = getLocationEvents(events, loc.id, "kyoto");
      const isSelected = selectedLocationId === loc.id;
      const dimmed = hits.length === 0 && !isSelected;

      const html = `
        <button
          type="button"
          class="tamako-kyoto-marker-btn tamako-pin--${loc.tone}${isSelected ? " is-selected" : ""}${dimmed ? " is-dimmed" : ""}"
          aria-label="${loc.nameZh}（${hits.length} 条命中事件）"
          aria-pressed="${isSelected}"
        >
          ${getSceneIconSvgHtml(getKyotoIconKind(loc))}
          <span class="tamako-hotspot-badge">${hits.length}</span>
        </button>
      `;

      const icon = L.divIcon({
        className: "tamako-leaflet-div-icon",
        html,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      const marker = L.marker([coord.lat, coord.lng], {
        icon,
        zIndexOffset: isSelected ? 500 : hits.length > 0 ? 100 : 0,
      });

      marker.bindTooltip(`${loc.nameZh}（${hits.length} 幕）`, {
        direction: "top",
        offset: [0, -18],
        className: "tamako-leaflet-tooltip",
      });

      marker.on("click", () => {
        onSelectRef.current(loc.id);
      });
      marker.on("mouseover", () => {
        onHoverRef.current(
          `${loc.nameZh}（${loc.realWorldRef}）· 当前 ${hits.length} 条剧情事件もち`
        );
      });

      marker.addTo(layer);
    }
  }, [events, selectedLocationId]);

  // 选中地点改变时平滑定位
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const loc = KYOTO_LOCATIONS.find((l) => l.id === selectedLocationId);
    if (!loc?.kyotoCoord) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const currentZoom = map.getZoom();
    const targetZoom = currentZoom < 14 ? 15 : currentZoom;
    map.setView([loc.kyotoCoord.lat, loc.kyotoCoord.lng], targetZoom, {
      animate: !reduce,
    });
  }, [selectedLocationId]);

  const jumpToRegion = (region: (typeof REGIONS)[number]) => {
    setActiveRegion(region.id);
    const map = mapRef.current;
    if (!map) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    map.setView(region.center, region.zoom, { animate: !reduce });
  };

  return (
    <div className="tamako-map-stage">
      <div className="tamako-kyoto-controls">
        <div className="tamako-chip-row" role="group" aria-label="京都圣地片区快捷跳转">
          {REGIONS.map((reg) => (
            <button
              key={reg.id}
              type="button"
              className="tamako-ep-chip"
              aria-pressed={activeRegion === reg.id}
              onClick={() => jumpToRegion(reg)}
            >
              {reg.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="tamako-ep-chip"
          aria-pressed={showRoutes}
          onClick={() => setShowRoutes((prev) => !prev)}
        >
          {showRoutes ? "隐藏剧情动线" : "显示剧情动线"}
        </button>
      </div>

      <div className="tamako-kyoto-wrap">
        <div
          ref={containerRef}
          className="tamako-kyoto-leaflet"
          role="region"
          aria-label="京都真实取景圣地地图"
        />
      </div>
    </div>
  );
}
