import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AttributionControl,
  Map as MapLibreMap,
  Marker,
  setWorkerUrl,
} from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import { KYOTO_LOCATIONS, LOCATION_MAP } from "../data/locations";
import { STORY_ROUTES } from "../data/routes";
import {
  getMapLabelExpression,
  LOCALIZED_SYMBOL_LAYER_IDS,
  TAMAKO_KYOTO_MAP_STYLE,
} from "../data/tamakoMapStyle";
import { localizeLocation, useI18n } from "../i18n";
import { UI_MESSAGES } from "../i18n/ui";
import { getLocationEvents } from "../lib/filter";
import type { StoryEvent } from "../types/tamako";

setWorkerUrl(maplibreWorkerUrl);

const AREA_PRESETS = [
  {
    id: "all" as const,
    center: [135.7685, 34.998] as [number, number],
    zoom: 12.1,
  },
  {
    id: "demachi" as const,
    center: [135.7709, 35.0306] as [number, number],
    zoom: 15.6,
  },
  {
    id: "fujinomori" as const,
    center: [135.7712, 34.9579] as [number, number],
    zoom: 15.6,
  },
  {
    id: "station" as const,
    center: [135.7588, 34.9858] as [number, number],
    zoom: 15.4,
  },
];

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
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
  const { locale, ui, tLoc } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<
    Map<
      string,
      {
        marker: Marker;
        button: HTMLButtonElement;
        badge: HTMLSpanElement;
        label: HTMLSpanElement;
      }
    >
  >(new Map());

  const [showRoutes, setShowRoutes] = useState(true);
  const [activePreset, setActivePreset] = useState<
    (typeof AREA_PRESETS)[number]["id"]
  >("all");
  const [webglReady] = useState<boolean>(() => checkWebGLSupport());

  const onSelectRef = useRef(onSelectLocation);
  const onHoverRef = useRef(onHoverHint);
  const localeRef = useRef(locale);
  onSelectRef.current = onSelectLocation;
  onHoverRef.current = onHoverHint;
  localeRef.current = locale;

  const hitCountByLoc = useMemo(() => {
    const map: Record<string, number> = {};
    for (const loc of KYOTO_LOCATIONS) {
      map[loc.id] = getLocationEvents(events, loc.id, "kyoto").length;
    }
    return map;
  }, [events]);

  const hitCountRef = useRef(hitCountByLoc);
  hitCountRef.current = hitCountByLoc;

  // Initialize custom Tamako-styled MapLibre vector map
  useEffect(() => {
    if (!webglReady || !containerRef.current || mapRef.current) return;

    const map = new MapLibreMap({
      container: containerRef.current,
      style: TAMAKO_KYOTO_MAP_STYLE,
      center: [135.7685, 34.998],
      zoom: 12.1,
      minZoom: 10,
      maxZoom: 18,
      attributionControl: false,
    });

    map.addControl(
      new AttributionControl({
        compact: true,
        customAttribution: "Tamako Washi Map · © OpenFreeMap © OpenStreetMap",
      }),
      "bottom-right"
    );

    map.on("load", () => {
      // Apply initial locale label expression on vector symbol layers
      const expr = getMapLabelExpression(localeRef.current);
      for (const layerId of LOCALIZED_SYMBOL_LAYER_IDS) {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, "text-field", expr);
        }
      }

      const features = STORY_ROUTES.map((route) => ({
        type: "Feature" as const,
        properties: {
          id: route.id,
          color: route.color,
          nameZh: route.nameZh,
        },
        geometry: {
          type: "LineString" as const,
          coordinates: route.path.map(([lat, lng]) => [lng, lat]),
        },
      }));

      map.addSource("tamako-routes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features,
        },
      });

      map.addLayer({
        id: "tamako-routes-halo",
        type: "line",
        source: "tamako-routes",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#FFFDF6",
          "line-width": 6.5,
          "line-opacity": 0.9,
        },
      });

      map.addLayer({
        id: "tamako-routes-line",
        type: "line",
        source: "tamako-routes",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": ["get", "color"],
          "line-width": 3.5,
          "line-dasharray": [2.2, 1.8],
        },
      });
    });

    const store = markersRef.current;
    for (const loc of KYOTO_LOCATIONS) {
      const coord = loc.kyotoCoord!;
      const wrap = document.createElement("div");
      wrap.className = "tamako-kyoto-pin-wrap";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `tamako-kyoto-pin tamako-pin--${loc.tone}`;

      const thumb = document.createElement("img");
      thumb.className = "tamako-kyoto-pin-img";
      thumb.src = loc.imageUrl;
      thumb.alt = "";
      thumb.loading = "eager";
      thumb.decoding = "async";

      const badge = document.createElement("span");
      badge.className = "tamako-hotspot-badge";
      badge.textContent = String(hitCountRef.current[loc.id] ?? 0);

      const label = document.createElement("span");
      label.className = "tamako-kyoto-pin-label";
      label.textContent = localizeLocation(loc, localeRef.current).name;

      btn.appendChild(thumb);
      btn.appendChild(badge);
      btn.appendChild(label);
      wrap.appendChild(btn);

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectRef.current(loc.id);
      });

      const announce = () => {
        const curLocale = localeRef.current;
        const locText = localizeLocation(loc, curLocale);
        const count = hitCountRef.current[loc.id] ?? 0;
        onHoverRef.current(
          UI_MESSAGES[curLocale].hintHoverKyotoLoc(
            locText.name,
            locText.realWorldRef,
            count
          )
        );
      };
      btn.addEventListener("mouseenter", announce);
      btn.addEventListener("focus", announce);

      const marker = new Marker({
        element: wrap,
        anchor: "center",
      })
        .setLngLat([coord.lng, coord.lat])
        .addTo(map);

      store.set(loc.id, { marker, button: btn, badge, label });
    }

    mapRef.current = map;

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => map.resize())
        : null;
    if (ro && containerRef.current) {
      ro.observe(containerRef.current);
    }

    return () => {
      ro?.disconnect();
      store.clear();
      map.remove();
      mapRef.current = null;
    };
  }, [webglReady]);

  // Dynamically update vector map label language when locale switches!
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const applyLang = () => {
      const expr = getMapLabelExpression(locale);
      for (const layerId of LOCALIZED_SYMBOL_LAYER_IDS) {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, "text-field", expr);
        }
      }
    };
    if (map.isStyleLoaded()) {
      applyLang();
    } else {
      map.once("load", applyLang);
    }
  }, [locale]);

  // Toggle GeoJSON pilgrimage route layers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const vis = showRoutes ? "visible" : "none";
    const apply = () => {
      if (map.getLayer("tamako-routes-halo")) {
        map.setLayoutProperty("tamako-routes-halo", "visibility", vis);
      }
      if (map.getLayer("tamako-routes-line")) {
        map.setLayoutProperty("tamako-routes-line", "visibility", vis);
      }
    };
    if (map.isStyleLoaded()) {
      apply();
    } else {
      map.once("load", apply);
    }
  }, [showRoutes]);

  // Sync pin badges, localized labels, selected ring, and dimmed state
  useEffect(() => {
    for (const loc of KYOTO_LOCATIONS) {
      const entry = markersRef.current.get(loc.id);
      if (!entry) continue;
      const count = hitCountByLoc[loc.id] ?? 0;
      const isSelected = loc.id === selectedLocationId;
      const dimmed = count === 0 && !isSelected;
      const locText = localizeLocation(loc, locale);

      entry.badge.textContent = String(count);
      entry.label.textContent = locText.name;
      entry.button.setAttribute(
        "aria-label",
        ui.kyotoPinAria(locText.name, count)
      );
      entry.button.setAttribute("aria-pressed", String(isSelected));
      entry.button.classList.toggle("is-selected", isSelected);
      entry.button.classList.toggle("is-dimmed", dimmed);
      const wrapper = entry.marker.getElement();
      wrapper.style.zIndex = isSelected ? "36" : count > 0 ? "24" : "16";
    }
  }, [hitCountByLoc, selectedLocationId, locale, ui]);

  // Fly smoothly to newly selected Kyoto spot
  useEffect(() => {
    const map = mapRef.current;
    const loc = LOCATION_MAP[selectedLocationId];
    if (!map || !loc?.kyotoCoord) return;

    const targetZoom = Math.max(map.getZoom(), 14.8);
    const padRight =
      typeof window !== "undefined" && window.innerWidth >= 961 ? 360 : 0;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      map.jumpTo({
        center: [loc.kyotoCoord.lng, loc.kyotoCoord.lat],
        zoom: targetZoom,
        padding: { top: 20, bottom: 20, left: 20, right: padRight },
      });
    } else {
      map.flyTo({
        center: [loc.kyotoCoord.lng, loc.kyotoCoord.lat],
        zoom: targetZoom,
        padding: { top: 20, bottom: 20, left: 20, right: padRight },
        duration: 680,
        essential: true,
      });
    }
  }, [selectedLocationId]);

  const jumpToPreset = useCallback((preset: (typeof AREA_PRESETS)[number]) => {
    setActivePreset(preset.id);
    const map = mapRef.current;
    if (!map) return;
    const padRight =
      typeof window !== "undefined" && window.innerWidth >= 961 ? 360 : 0;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      map.jumpTo({
        center: preset.center,
        zoom: preset.zoom,
        padding: { top: 20, bottom: 20, left: 20, right: padRight },
      });
    } else {
      map.flyTo({
        center: preset.center,
        zoom: preset.zoom,
        padding: { top: 20, bottom: 20, left: 20, right: padRight },
        duration: 650,
        essential: true,
      });
    }
  }, []);

  const zoomStep = useCallback((delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.zoomTo(map.getZoom() + delta, { duration: 220 });
  }, []);

  return (
    <div className="tamako-canvas-fill">
      {/* Floating Kyoto Area Preset & Route HUD */}
      <div
        className="tamako-map-hud-topcenter"
        role="toolbar"
        aria-label={ui.kyotoToolbarAria}
      >
        {AREA_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`tamako-hud-chip${
              activePreset === preset.id ? " is-active" : ""
            }`}
            onClick={() => jumpToPreset(preset)}
          >
            {ui.kyotoPresets[preset.id]}
          </button>
        ))}
        <button
          type="button"
          className={`tamako-hud-chip is-mint${showRoutes ? " is-active" : ""}`}
          aria-pressed={showRoutes}
          onClick={() => setShowRoutes((v) => !v)}
        >
          {showRoutes ? ui.kyotoRoutesActive : ui.kyotoRoutesInactive}
        </button>
      </div>

      {/* Zoom Controls */}
      <div
        className="tamako-map-zoom-dock"
        role="group"
        aria-label={ui.kyotoZoomGroupAria}
      >
        <button
          type="button"
          className="tamako-zoom-fab"
          aria-label={ui.kyotoZoomInAria}
          onClick={() => zoomStep(1)}
        >
          ＋
        </button>
        <button
          type="button"
          className="tamako-zoom-fab"
          aria-label={ui.kyotoZoomOutAria}
          onClick={() => zoomStep(-1)}
        >
          －
        </button>
      </div>

      {webglReady ? (
        <div
          ref={containerRef}
          className="tamako-kyoto-maplibre"
          role="region"
          aria-label={ui.kyotoRegionAria}
        />
      ) : (
        <div
          className="tamako-kyoto-fallback"
          role="region"
          aria-label={ui.kyotoFallbackAria}
        >
          {KYOTO_LOCATIONS.map((loc) => {
            const c = loc.kyotoCoord!;
            const leftPct = ((c.lng - 135.752) / (135.779 - 135.752)) * 82 + 9;
            const topPct = ((35.041 - c.lat) / (35.041 - 34.952)) * 80 + 10;
            const hits = hitCountByLoc[loc.id] ?? 0;
            const isSelected = loc.id === selectedLocationId;
            const locText = tLoc(loc);
            return (
              <button
                key={loc.id}
                type="button"
                className={`tamako-kyoto-pin tamako-pin--${loc.tone}${
                  isSelected ? " is-selected" : ""
                }`}
                style={{
                  position: "absolute",
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => onSelectLocation(loc.id)}
              >
                <img className="tamako-kyoto-pin-img" src={loc.imageUrl} alt="" />
                <span className="tamako-hotspot-badge">{hits}</span>
                <span className="tamako-kyoto-pin-label">{locText.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
