import { CHARACTER_MAP } from "../data/characters";
import { EPISODE_MAP } from "../data/episodes";
import { STORY_EVENT_MAP } from "../data/events";
import type { FilterState, Locale, MapViewMode, WorkKind } from "../types/tamako";
import { DEFAULT_FILTER_STATE } from "./filter";

export interface UrlSyncState {
  lang: Locale | null;
  view: MapViewMode;
  filter: FilterState;
  eventId: string | null;
}

export function isValidLocale(raw: string | null | undefined): raw is Locale {
  return raw === "zh" || raw === "en" || raw === "ja";
}

export function parseUrlState(search: string): UrlSyncState {
  const params = new URLSearchParams(search);
  const rawLang = params.get("lang");
  const lang: Locale | null = isValidLocale(rawLang) ? rawLang : null;

  const rawView = params.get("view");
  const view: MapViewMode = rawView === "kyoto" ? "kyoto" : "arcade";

  const rawWork = params.get("work");
  const work: "all" | WorkKind =
    rawWork === "tv" || rawWork === "movie" || rawWork === "short"
      ? rawWork
      : "all";

  const rawEp = params.get("ep") ?? "";
  const episodeIds = rawEp
    .split(",")
    .map((s) => s.trim())
    .filter((id) => Boolean(EPISODE_MAP[id]));

  const rawChar = params.get("char") ?? "";
  const characterIds = rawChar
    .split(",")
    .map((s) => s.trim())
    .filter((id) => Boolean(CHARACTER_MAP[id]));

  const charMatch = params.get("match") === "and" ? "and" : "or";
  const query = params.get("q") ?? "";

  const rawEvent = params.get("event");
  const eventId = rawEvent && STORY_EVENT_MAP[rawEvent] ? rawEvent : null;

  return {
    lang,
    view,
    filter: {
      work,
      episodeIds,
      characterIds,
      charMatch,
      query,
    },
    eventId,
  };
}

export function serializeUrlState(
  state: Omit<UrlSyncState, "lang"> & { lang?: Locale }
): string {
  const params = new URLSearchParams();
  if (state.lang && state.lang !== "zh") {
    params.set("lang", state.lang);
  }
  if (state.view !== "arcade") {
    params.set("view", state.view);
  }
  if (state.filter.work !== DEFAULT_FILTER_STATE.work) {
    params.set("work", state.filter.work);
  }
  if (state.filter.episodeIds.length > 0) {
    params.set("ep", state.filter.episodeIds.join(","));
  }
  if (state.filter.characterIds.length > 0) {
    params.set("char", state.filter.characterIds.join(","));
  }
  if (state.filter.charMatch !== DEFAULT_FILTER_STATE.charMatch) {
    params.set("match", state.filter.charMatch);
  }
  if (state.filter.query.trim()) {
    params.set("q", state.filter.query.trim());
  }
  if (state.eventId) {
    params.set("event", state.eventId);
  }
  const str = params.toString();
  return str ? `?${str}` : "";
}
