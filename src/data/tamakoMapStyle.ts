import type { ExpressionSpecification, StyleSpecification } from "maplibre-gl";

const JP_NAME_EXPR: ExpressionSpecification = [
  "coalesce",
  ["get", "name:ja"],
  ["get", "name:nonlatin"],
  ["get", "name"],
];

/**
 * Custom Tamako Market (`tamako-web`) vector map style for Kyoto.
 * Uses OpenFreeMap Planet vector tiles (OpenMapTiles schema) with warm washi paper,
 * custard buildings, mugwort parks, ramune-sky rivers/canals, and red-bean/roast-brown ink.
 */
export const TAMAKO_KYOTO_MAP_STYLE: StyleSpecification = {
  version: 8,
  name: "Tamako Kyoto Washi Guidebook",
  sources: {
    openmaptiles: {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
    },
  },
  glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#FBF8F1",
      },
    },
    {
      id: "landuse-residential",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["in", ["get", "class"], ["literal", ["residential", "suburb", "neighbourhood"]]],
      paint: {
        "fill-color": "#FFFDF6",
        "fill-opacity": 0.85,
      },
    },
    {
      id: "landuse-campus",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["in", ["get", "class"], ["literal", ["school", "university", "college", "hospital", "commercial", "retail"]]],
      paint: {
        "fill-color": "#FFF4F6",
        "fill-opacity": 0.65,
      },
    },
    {
      id: "landcover-wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "wood"],
      paint: {
        "fill-color": "#E2F1CB",
        "fill-opacity": 0.72,
      },
    },
    {
      id: "landcover-grass",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["in", ["get", "class"], ["literal", ["grass", "wetland", "farmland"]]],
      paint: {
        "fill-color": "#EDF7DB",
        "fill-opacity": 0.8,
      },
    },
    {
      id: "park-fill",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "park",
      paint: {
        "fill-color": "#E7F5D4",
        "fill-opacity": 0.85,
      },
    },
    {
      id: "park-outline",
      type: "line",
      source: "openmaptiles",
      "source-layer": "park",
      minzoom: 12,
      paint: {
        "line-color": "#C2DF9D",
        "line-width": 1.1,
        "line-dasharray": [3, 2],
      },
    },
    {
      id: "waterway-canal-stream",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: ["in", ["get", "class"], ["literal", ["canal", "stream", "ditch", "drain"]]],
      paint: {
        "line-color": "#9EDBFB",
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 1.2, 14, 3.2, 17, 6.5],
      },
    },
    {
      id: "waterway-river",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: ["==", ["get", "class"], "river"],
      paint: {
        "line-color": "#B8E6FF",
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 2, 14, 6, 17, 14],
      },
    },
    {
      id: "water-fill",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      paint: {
        "fill-color": "#C2EBFF",
      },
    },
    {
      id: "water-shoreline",
      type: "line",
      source: "openmaptiles",
      "source-layer": "water",
      paint: {
        "line-color": "#89CCF0",
        "line-width": 1.1,
      },
    },
    {
      id: "building-fill",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      minzoom: 13.5,
      paint: {
        "fill-color": "#FAF2DE",
        "fill-outline-color": "#E8D4BC",
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], 13.5, 0.35, 15, 0.88],
      },
    },
    {
      id: "road-path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 13,
      filter: ["in", ["get", "class"], ["literal", ["path", "pedestrian", "track"]]],
      paint: {
        "line-color": "#DFBEA3",
        "line-width": ["interpolate", ["linear"], ["zoom"], 13, 1, 16, 2.2],
        "line-dasharray": [2, 1.8],
      },
    },
    {
      id: "road-minor-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 12.2,
      filter: ["in", ["get", "class"], ["literal", ["minor", "service", "tertiary"]]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#EAD6C2",
        "line-width": ["interpolate", ["linear"], ["zoom"], 12.2, 1.4, 14, 3.8, 17, 10],
      },
    },
    {
      id: "road-minor-inner",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 12.5,
      filter: ["in", ["get", "class"], ["literal", ["minor", "service", "tertiary"]]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#FFFFFF",
        "line-width": ["interpolate", ["linear"], ["zoom"], 12.5, 0.8, 14, 2.4, 17, 7.6],
      },
    },
    {
      id: "road-secondary-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["primary", "secondary"]]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#F0B490",
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.8, 13, 4.5, 16, 11.5],
      },
    },
    {
      id: "road-secondary-inner",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["primary", "secondary"]]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#FFFDF6",
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 13, 2.8, 16, 8.5],
      },
    },
    {
      id: "road-major-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["trunk", "motorway"]]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#EE9C78",
        "line-width": ["interpolate", ["linear"], ["zoom"], 9, 2, 13, 5.2, 16, 13],
      },
    },
    {
      id: "road-major-inner",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["trunk", "motorway"]]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#FFF2E4",
        "line-width": ["interpolate", ["linear"], ["zoom"], 9, 1.1, 13, 3.4, 16, 9.6],
      },
    },
    {
      id: "railway-base",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["rail", "transit"]]],
      paint: {
        "line-color": [
          "match",
          ["get", "class"],
          "transit",
          "#4E7EB5",
          "#E57C87",
        ],
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.4, 14, 2.8, 17, 4.2],
        "line-opacity": 0.85,
      },
    },
    {
      id: "railway-ties",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 11,
      filter: ["in", ["get", "class"], ["literal", ["rail", "transit"]]],
      paint: {
        "line-color": "#FFFDF8",
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 1, 14, 1.8, 17, 2.6],
        "line-dasharray": [2, 2.5],
      },
    },
    {
      id: "waterway-label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "waterway",
      minzoom: 12,
      layout: {
        "symbol-placement": "line",
        "text-field": JP_NAME_EXPR,
        "text-font": ["Noto Sans Italic"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 12, 11, 16, 13],
      },
      paint: {
        "text-color": "#1E5B94",
        "text-halo-color": "#F3FBFF",
        "text-halo-width": 1.6,
      },
    },
    {
      id: "road-label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 13,
      layout: {
        "symbol-placement": "line",
        "text-field": JP_NAME_EXPR,
        "text-font": ["Noto Sans Regular"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 13, 10.5, 16, 12.5],
      },
      paint: {
        "text-color": "#8A5A36",
        "text-halo-color": "#FFFDF8",
        "text-halo-width": 1.6,
      },
    },
    {
      id: "poi-station-label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "poi",
      minzoom: 12,
      filter: ["in", ["get", "class"], ["literal", ["railway", "rail"]]],
      layout: {
        "text-field": JP_NAME_EXPR,
        "text-font": ["Noto Sans Bold"],
        "text-size": 11.5,
        "text-anchor": "top",
        "text-offset": [0, 0.4],
      },
      paint: {
        "text-color": "#184070",
        "text-halo-color": "#FFFDF6",
        "text-halo-width": 1.8,
      },
    },
    {
      id: "place-suburb-label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 11.5,
      filter: [
        "in",
        ["get", "class"],
        ["literal", ["neighbourhood", "quarter", "suburb", "village", "town"]],
      ],
      layout: {
        "text-field": JP_NAME_EXPR,
        "text-font": ["Noto Sans Regular"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 11.5, 11, 15, 13],
      },
      paint: {
        "text-color": "#8E4C28",
        "text-halo-color": "#FDFFF2",
        "text-halo-width": 1.8,
      },
    },
    {
      id: "place-city-label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      filter: ["in", ["get", "class"], ["literal", ["city", "ward"]]],
      layout: {
        "text-field": JP_NAME_EXPR,
        "text-font": ["Noto Sans Bold"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 9, 13, 13, 16],
      },
      paint: {
        "text-color": "#993338",
        "text-halo-color": "#FDFFF2",
        "text-halo-width": 2,
      },
    },
  ],
};
