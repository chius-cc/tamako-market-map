export type WorkKind = "tv" | "movie" | "short";

export type WagashiTone =
  | "sakura"
  | "apricot"
  | "mint"
  | "sky"
  | "leaf"
  | "navy";

export interface Episode {
  id: string;
  kind: WorkKind;
  sortOrder: number;
  shortLabel: string;
  titleZh: string;
  titleJa: string;
  seasonLabel: string;
  releaseInfo: string;
  staff: {
    script: string;
    storyboard: string;
    director: string;
    animationDirector: string;
  };
  officialOutlineJa: string;
  summaryZh: string;
  tone: WagashiTone;
  officialUrl: string;
}

export type CharacterCircle =
  | "kitashirakawa"
  | "school"
  | "ooji"
  | "southern"
  | "arcade";

export interface Character {
  id: string;
  nameZh: string;
  nameJa: string;
  cv: string;
  circle: CharacterCircle;
  circleLabel: string;
  affiliation: string;
  tone: WagashiTone;
  badgeBg: string;
  badgeInk: string;
  badgeBorder: string;
  bioZh: string;
  deraComment: string;
}

export type LocationArea =
  | "arcade"
  | "demachi"
  | "kamogawa"
  | "fujinomori"
  | "central";

export type LocationKind =
  | "home"
  | "shop"
  | "landmark"
  | "bath"
  | "school"
  | "station"
  | "shrine";

export interface Location {
  id: string;
  nameZh: string;
  nameJa: string;
  subtitle: string;
  area: LocationArea;
  areaLabel: string;
  kind: LocationKind;
  tone: WagashiTone;
  arcadeCoord?: { x: number; y: number };
  arcadeLabelAlign?: "left" | "right" | "top" | "bottom";
  kyotoCoord?: { lat: number; lng: number };
  /** For arcade spots, points to the corresponding real-world Kyoto spot (e.g. Demachi Masugata). */
  linkedKyotoId?: string;
  /** For Kyoto spots that represent the arcade, points to the primary arcade spot. */
  linkedArcadeId?: string;
  realWorldRef: string;
  realWorldAddress?: string;
  descriptionZh: string;
  settingNoteZh: string;
  officialUrl?: string;
}

export type SceneIconKind =
  | "mochi"
  | "bird"
  | "flower"
  | "cup"
  | "camera"
  | "music"
  | "train"
  | "baton";

export interface StoryEvent {
  id: string;
  episodeId: string;
  order: number;
  titleZh: string;
  titleJa: string;
  sceneBadge: string;
  seasonTime: string;
  /** Primary arcade location ID if the scene occurs inside/around Usagiyama Arcade */
  arcadeLocationId?: string;
  /** Primary Kyoto real-world pilgrimage location ID */
  kyotoLocationId?: string;
  characterIds: string[];
  tags: string[];
  summaryZh: string;
  quoteJa?: string;
  quoteZh?: string;
  staffNoteZh: string;
  pilgrimageTipZh?: string;
  tone: WagashiTone;
  icon: SceneIconKind;
}

export interface StoryRoute {
  id: string;
  nameZh: string;
  nameJa: string;
  workKind: WorkKind;
  color: string;
  dashArray: string;
  summaryZh: string;
  locationIds: string[];
  path: [number, number][];
}

export type MapViewMode = "arcade" | "kyoto";
export type CharMatchMode = "or" | "and";

export interface FilterState {
  work: "all" | WorkKind;
  episodeIds: string[];
  characterIds: string[];
  charMatch: CharMatchMode;
  query: string;
}
