import { CHARACTER_MAP } from "../data/characters";
import { EPISODE_MAP, EPISODES } from "../data/episodes";
import { LOCATION_MAP } from "../data/locations";
import { CHARACTERS_EN } from "../i18n/charactersI18n";
import { EPISODES_EN } from "../i18n/episodesI18n";
import { EVENTS_EN, EVENTS_JA } from "../i18n/eventsI18n";
import { LOCATIONS_EN } from "../i18n/locationsI18n";
import type {
  FilterState,
  MapViewMode,
  StoryEvent,
  WorkKind,
} from "../types/tamako";

export const DEFAULT_FILTER_STATE: FilterState = {
  work: "all",
  episodeIds: [],
  characterIds: [],
  charMatch: "or",
  query: "",
};

export function hasActiveFilters(filter: FilterState): boolean {
  return (
    filter.work !== "all" ||
    filter.episodeIds.length > 0 ||
    filter.characterIds.length > 0 ||
    filter.query.trim().length > 0
  );
}

export function eventMatchesCharacters(
  event: StoryEvent,
  characterIds: string[],
  mode: "or" | "and"
): boolean {
  if (characterIds.length === 0) return true;
  if (mode === "and") {
    return characterIds.every((id) => event.characterIds.includes(id));
  }
  return characterIds.some((id) => event.characterIds.includes(id));
}

export function eventMatchesWorkAndEpisodes(
  event: StoryEvent,
  work: "all" | WorkKind,
  episodeIds: string[]
): boolean {
  const ep = EPISODE_MAP[event.episodeId];
  if (!ep) return false;
  if (work !== "all" && ep.kind !== work) return false;
  if (episodeIds.length > 0 && !episodeIds.includes(event.episodeId)) {
    return false;
  }
  return true;
}

export function eventMatchesQuery(event: StoryEvent, rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;

  const ep = EPISODE_MAP[event.episodeId];
  const arcadeLoc = event.arcadeLocationId
    ? LOCATION_MAP[event.arcadeLocationId]
    : undefined;
  const kyotoLoc = event.kyotoLocationId
    ? LOCATION_MAP[event.kyotoLocationId]
    : undefined;

  const charNames = event.characterIds
    .map((id) => {
      const c = CHARACTER_MAP[id];
      const cEn = CHARACTERS_EN[id]?.name ?? "";
      return c ? `${c.nameZh} ${c.nameJa} ${cEn}` : cEn;
    })
    .join(" ");

  const evEn = EVENTS_EN[event.id];
  const evJa = EVENTS_JA[event.id];
  const epEn = EPISODES_EN[event.episodeId];
  const arcadeEn = event.arcadeLocationId
    ? LOCATIONS_EN[event.arcadeLocationId]?.name ?? ""
    : "";
  const kyotoEn = event.kyotoLocationId
    ? LOCATIONS_EN[event.kyotoLocationId]?.name ?? ""
    : "";

  const haystack = [
    event.titleZh,
    event.titleJa,
    evEn?.title ?? "",
    evJa?.title ?? "",
    event.sceneBadge,
    evEn?.sceneBadge ?? "",
    event.summaryZh,
    evEn?.summary ?? "",
    evJa?.summary ?? "",
    event.quoteZh ?? "",
    event.quoteJa ?? "",
    evEn?.quoteTranslated ?? "",
    event.staffNoteZh,
    event.tags.join(" "),
    evEn?.tags.join(" ") ?? "",
    evJa?.tags.join(" ") ?? "",
    ep?.shortLabel ?? "",
    ep?.titleZh ?? "",
    ep?.titleJa ?? "",
    epEn?.shortLabel ?? "",
    epEn?.title ?? "",
    arcadeLoc?.nameZh ?? "",
    arcadeLoc?.nameJa ?? "",
    arcadeEn,
    kyotoLoc?.nameZh ?? "",
    kyotoLoc?.nameJa ?? "",
    kyotoEn,
    charNames,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function filterEvents(
  events: StoryEvent[],
  filter: FilterState
): StoryEvent[] {
  return events
    .filter(
      (event) =>
        eventMatchesWorkAndEpisodes(event, filter.work, filter.episodeIds) &&
        eventMatchesCharacters(event, filter.characterIds, filter.charMatch) &&
        eventMatchesQuery(event, filter.query)
    )
    .sort((a, b) => a.order - b.order);
}

/**
 * Counts events per episode taking character + query + work filters into account
 * (excluding episodeIds itself so users can see how many matches each episode has).
 */
export function countByEpisode(
  events: StoryEvent[],
  filter: FilterState
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const ep of EPISODES) {
    counts[ep.id] = 0;
  }
  for (const event of events) {
    if (
      eventMatchesCharacters(event, filter.characterIds, filter.charMatch) &&
      eventMatchesQuery(event, filter.query)
    ) {
      counts[event.episodeId] = (counts[event.episodeId] ?? 0) + 1;
    }
  }
  return counts;
}

/**
 * Counts events per character taking work + episode + query filters into account.
 */
export function countByCharacter(
  events: StoryEvent[],
  filter: FilterState
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const event of events) {
    if (
      eventMatchesWorkAndEpisodes(event, filter.work, filter.episodeIds) &&
      eventMatchesQuery(event, filter.query)
    ) {
      for (const cid of event.characterIds) {
        counts[cid] = (counts[cid] ?? 0) + 1;
      }
    }
  }
  return counts;
}

export function getLocationEvents(
  events: StoryEvent[],
  locationId: string,
  view: MapViewMode
): StoryEvent[] {
  return events.filter((event) =>
    view === "arcade"
      ? event.arcadeLocationId === locationId
      : event.kyotoLocationId === locationId
  );
}

export function getPreferredViewForEvent(
  event: StoryEvent,
  currentView: MapViewMode
): { view: MapViewMode; locationId: string | undefined } {
  if (currentView === "arcade" && event.arcadeLocationId) {
    return { view: "arcade", locationId: event.arcadeLocationId };
  }
  if (currentView === "kyoto" && event.kyotoLocationId) {
    return { view: "kyoto", locationId: event.kyotoLocationId };
  }
  if (event.arcadeLocationId) {
    return { view: "arcade", locationId: event.arcadeLocationId };
  }
  return { view: "kyoto", locationId: event.kyotoLocationId };
}
