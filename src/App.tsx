import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { ArcadeMap } from "./components/ArcadeMap";
import { ArchiveModal } from "./components/ArchiveModal";
import { DeraTourDock } from "./components/DeraTourDock";
import { EventDirectoryDrawer } from "./components/EventDirectoryDrawer";
import { EventModal } from "./components/EventModal";
import { FilterDrawer } from "./components/FilterDrawer";
import { Header, type FilterTabFocus } from "./components/Header";
import { MapSidebar } from "./components/MapSidebar";
import { CHARACTER_MAP, CHARACTERS } from "./data/characters";
import { EPISODE_MAP } from "./data/episodes";
import { STORY_EVENT_MAP, STORY_EVENTS } from "./data/events";
import { LOCATION_MAP } from "./data/locations";
import {
  detectInitialLocale,
  I18nContext,
  LOCALE_STORAGE_KEY,
  localizeCharacter,
  localizeEpisode,
  localizeEvent,
  localizeLocation,
} from "./i18n";
import { UI_MESSAGES } from "./i18n/ui";
import {
  countByCharacter,
  countByEpisode,
  DEFAULT_FILTER_STATE,
  filterEvents,
  getLocationEvents,
  getPreferredViewForEvent,
  hasActiveFilters,
} from "./lib/filter";
import { parseUrlState, serializeUrlState } from "./lib/urlState";
import type {
  CharMatchMode,
  FilterState,
  Locale,
  MapViewMode,
  WorkKind,
} from "./types/tamako";

const KyotoMap = lazy(() =>
  import("./components/KyotoMap").then((mod) => ({ default: mod.KyotoMap }))
);

export default function App() {
  const initialUrl = useMemo(
    () =>
      typeof window !== "undefined"
        ? parseUrlState(window.location.search)
        : {
            lang: "zh" as Locale,
            view: "arcade" as MapViewMode,
            filter: DEFAULT_FILTER_STATE,
            eventId: null,
          },
    []
  );

  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window !== "undefined"
      ? detectInitialLocale(window.location.search)
      : initialUrl.lang ?? "zh"
  );

  const [view, setView] = useState<MapViewMode>(initialUrl.view);
  const [filter, setFilter] = useState<FilterState>(initialUrl.filter);
  const [modalEventId, setModalEventId] = useState<string | null>(
    initialUrl.eventId
  );
  const [selectedEventId, setSelectedEventId] = useState<string | null>(
    initialUrl.eventId
  );
  const [selectedArcadeLocId, setSelectedArcadeLocId] = useState<string>(() => {
    if (
      initialUrl.eventId &&
      STORY_EVENT_MAP[initialUrl.eventId]?.arcadeLocationId
    ) {
      return STORY_EVENT_MAP[initialUrl.eventId].arcadeLocationId!;
    }
    return "tamaya-shop";
  });
  const [selectedKyotoLocId, setSelectedKyotoLocId] = useState<string>(() => {
    if (
      initialUrl.eventId &&
      STORY_EVENT_MAP[initialUrl.eventId]?.kyotoLocationId
    ) {
      return STORY_EVENT_MAP[initialUrl.eventId].kyotoLocationId!;
    }
    return "kyoto-masugata";
  });

  const [inspectorExpanded, setInspectorExpanded] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 900 : false
  );

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTabFocus, setFilterTabFocus] = useState<FilterTabFocus>("all");
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const ui = UI_MESSAGES[locale];
  const [mascotHint, setMascotHint] = useState<string>(
    () => UI_MESSAGES[locale].defaultHint
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setMascotHint(UI_MESSAGES[next].defaultHint);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }, []);

  // Sync <html lang> and document.title with active locale
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
    document.title = ui.docTitle;
  }, [locale, ui.docTitle]);

  // Sync URL query params cleanly
  useEffect(() => {
    const query = serializeUrlState({
      lang: locale,
      view,
      filter,
      eventId: modalEventId,
    });
    const nextUrl = `${window.location.pathname}${query}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [locale, view, filter, modalEventId]);

  const i18nValue = useMemo(
    () => ({
      locale,
      setLocale,
      ui,
      tEp: (ep: Parameters<typeof localizeEpisode>[0]) =>
        localizeEpisode(ep, locale),
      tChar: (ch: Parameters<typeof localizeCharacter>[0]) =>
        localizeCharacter(ch, locale),
      tLoc: (loc: Parameters<typeof localizeLocation>[0]) =>
        localizeLocation(loc, locale),
      tEvent: (ev: Parameters<typeof localizeEvent>[0]) =>
        localizeEvent(ev, locale),
    }),
    [locale, setLocale, ui]
  );

  const filteredEvents = useMemo(
    () => filterEvents(STORY_EVENTS, filter),
    [filter]
  );

  const episodeCounts = useMemo(
    () => countByEpisode(STORY_EVENTS, filter),
    [filter]
  );

  const characterCounts = useMemo(
    () => countByCharacter(STORY_EVENTS, filter),
    [filter]
  );

  const arcadeMatchedCount = useMemo(
    () => filteredEvents.filter((e) => Boolean(e.arcadeLocationId)).length,
    [filteredEvents]
  );

  const kyotoMatchedCount = useMemo(
    () => filteredEvents.filter((e) => Boolean(e.kyotoLocationId)).length,
    [filteredEvents]
  );

  const activeLocationId =
    view === "arcade" ? selectedArcadeLocId : selectedKyotoLocId;
  const activeLocation = LOCATION_MAP[activeLocationId];
  const activeLocationEvents = useMemo(
    () => getLocationEvents(filteredEvents, activeLocationId, view),
    [filteredEvents, activeLocationId, view]
  );

  const handleSelectLocation = useCallback(
    (locId: string) => {
      if (view === "arcade") {
        setSelectedArcadeLocId(locId);
      } else {
        setSelectedKyotoLocId(locId);
      }
      setInspectorExpanded(true);
      const loc = LOCATION_MAP[locId];
      if (loc) {
        const locText = localizeLocation(loc, locale);
        const hits = getLocationEvents(filteredEvents, locId, view);
        setMascotHint(
          ui.hintSelectLoc(locText.name, hits.length, locText.subtitle)
        );
        if (hits.length > 0) {
          setSelectedEventId(hits[0].id);
        }
      }
    },
    [view, filteredEvents, locale, ui]
  );

  const locateEventOnMap = useCallback(
    (targetView: MapViewMode, locId: string, eventId: string) => {
      setView(targetView);
      if (targetView === "arcade") {
        setSelectedArcadeLocId(locId);
      } else {
        setSelectedKyotoLocId(locId);
      }
      setSelectedEventId(eventId);
      setInspectorExpanded(true);
      const ev = STORY_EVENT_MAP[eventId];
      if (ev) {
        const evText = localizeEvent(ev, locale);
        setMascotHint(ui.hintLocateEvent(evText.title, evText.sceneBadge));
      }
    },
    [locale, ui]
  );

  const stepTour = useCallback(
    (direction: -1 | 1) => {
      if (filteredEvents.length === 0) return;
      const currentIdx = selectedEventId
        ? filteredEvents.findIndex((e) => e.id === selectedEventId)
        : -1;
      const nextIdx =
        currentIdx === -1
          ? 0
          : (currentIdx + direction + filteredEvents.length) %
            filteredEvents.length;
      const targetEvent = filteredEvents[nextIdx];
      const pref = getPreferredViewForEvent(targetEvent, view);
      if (pref.locationId) {
        locateEventOnMap(pref.view, pref.locationId, targetEvent.id);
      }
      const evText = localizeEvent(targetEvent, locale);
      setMascotHint(
        ui.hintTourStep(nextIdx + 1, filteredEvents.length, evText.title)
      );
      if (modalEventId) {
        setModalEventId(targetEvent.id);
      }
    },
    [filteredEvents, selectedEventId, view, locateEventOnMap, modalEventId, locale, ui]
  );

  const openCurrentTourModal = useCallback(() => {
    if (filteredEvents.length === 0) return;
    const current =
      (selectedEventId &&
        filteredEvents.find((e) => e.id === selectedEventId)) ||
      filteredEvents[0];
    const pref = getPreferredViewForEvent(current, view);
    if (pref.locationId) {
      locateEventOnMap(pref.view, pref.locationId, current.id);
    }
    setModalEventId(current.id);
  }, [filteredEvents, selectedEventId, view, locateEventOnMap]);

  const handleChangeWork = useCallback(
    (work: "all" | WorkKind) => {
      setFilter((prev) => ({
        ...prev,
        work,
        episodeIds: [],
      }));
      setMascotHint(ui.hintWorkChanged(ui.workLabels[work]));
      if (work === "movie") {
        setView("kyoto");
        setSelectedKyotoLocId("kyoto-delta");
      }
    },
    [ui]
  );

  const handleToggleEpisode = useCallback(
    (epId: string) => {
      setFilter((prev) => {
        const exists = prev.episodeIds.includes(epId);
        const nextIds = exists
          ? prev.episodeIds.filter((id) => id !== epId)
          : [...prev.episodeIds, epId];
        return { ...prev, episodeIds: nextIds };
      });
      const ep = EPISODE_MAP[epId];
      if (ep) {
        const epText = localizeEpisode(ep, locale);
        setMascotHint(ui.hintEpisodeToggled(epText.shortLabel, epText.title));
      }
    },
    [locale, ui]
  );

  const handleToggleCharacter = useCallback(
    (charId: string) => {
      setFilter((prev) => {
        const exists = prev.characterIds.includes(charId);
        const nextIds = exists
          ? prev.characterIds.filter((id) => id !== charId)
          : [...prev.characterIds, charId];
        return { ...prev, characterIds: nextIds };
      });
      const ch = CHARACTER_MAP[charId];
      if (ch) {
        const chText = localizeCharacter(ch, locale);
        setMascotHint(`${chText.name}: ${chText.deraComment}`);
      }
    },
    [locale]
  );

  const handleFilterSingleEpisode = useCallback(
    (episodeId: string) => {
      const ep = EPISODE_MAP[episodeId];
      setFilter({
        ...DEFAULT_FILTER_STATE,
        work: ep?.kind ?? "all",
        episodeIds: [episodeId],
      });
      const matching = STORY_EVENTS.filter((e) => e.episodeId === episodeId);
      if (matching.length > 0) {
        const pref = getPreferredViewForEvent(matching[0], "arcade");
        if (pref.locationId) {
          setView(pref.view);
          if (pref.view === "arcade") {
            setSelectedArcadeLocId(pref.locationId);
          } else {
            setSelectedKyotoLocId(pref.locationId);
          }
          setSelectedEventId(matching[0].id);
          setInspectorExpanded(true);
        }
      }
      if (ep) {
        const epText = localizeEpisode(ep, locale);
        setMascotHint(ui.hintSingleEpisode(epText.shortLabel, epText.title));
      }
    },
    [locale, ui]
  );

  const handleFilterSingleCharacter = useCallback(
    (charId: string) => {
      const ch = CHARACTER_MAP[charId];
      const nextFilter: FilterState = {
        ...DEFAULT_FILTER_STATE,
        characterIds: [charId],
      };
      setFilter(nextFilter);
      const matching = filterEvents(STORY_EVENTS, nextFilter);
      if (matching.length > 0) {
        const pref = getPreferredViewForEvent(matching[0], view);
        if (pref.locationId) {
          setView(pref.view);
          if (pref.view === "arcade") {
            setSelectedArcadeLocId(pref.locationId);
          } else {
            setSelectedKyotoLocId(pref.locationId);
          }
          setSelectedEventId(matching[0].id);
        }
      }
      if (ch) {
        const chText = localizeCharacter(ch, locale);
        setMascotHint(ui.hintSingleCharacter(chText.name));
      }
    },
    [view, locale, ui]
  );

  const handleResetFilters = useCallback(() => {
    setFilter(DEFAULT_FILTER_STATE);
    setMascotHint(ui.defaultHint);
  }, [ui]);

  const modalEvent = modalEventId ? STORY_EVENT_MAP[modalEventId] ?? null : null;
  const modalIndexInFiltered = modalEvent
    ? filteredEvents.findIndex((e) => e.id === modalEvent.id)
    : -1;

  const activeIndexInFiltered = selectedEventId
    ? filteredEvents.findIndex((e) => e.id === selectedEventId)
    : -1;

  const activeFiltersFlag = hasActiveFilters(filter);

  return (
    <I18nContext.Provider value={i18nValue}>
      <div className="tamako-app-shell">
        <Header
          view={view}
          filter={filter}
          arcadeCount={arcadeMatchedCount}
          kyotoCount={kyotoMatchedCount}
          matchedCount={filteredEvents.length}
          totalCharacters={CHARACTERS.length}
          onSwitchView={setView}
          onOpenFilter={(focus) => {
            setFilterTabFocus(focus);
            setFilterOpen(true);
          }}
          onOpenDirectory={() => setDirectoryOpen(true)}
          onOpenArchive={() => setArchiveOpen(true)}
          onHoverHint={setMascotHint}
        />

        <main
          id="map-stage"
          className="tamako-map-shell"
          aria-label={ui.mainMapAria}
        >
          {/* Active Filter Chips & Cross-Map Hint Banner */}
          {activeFiltersFlag && (
            <div
              className="tamako-active-filter-strip"
              aria-label={ui.activeFiltersAria}
            >
              {filter.work !== "all" && (
                <span className="tamako-active-chip">
                  <span>{ui.workShortLabels[filter.work]}</span>
                  <button
                    type="button"
                    aria-label={ui.removeWorkAria}
                    onClick={() => handleChangeWork("all")}
                  >
                    ×
                  </button>
                </span>
              )}

              {filter.episodeIds.map((epId) => {
                const ep = EPISODE_MAP[epId];
                if (!ep) return null;
                const label = localizeEpisode(ep, locale).shortLabel;
                return (
                  <span key={epId} className="tamako-active-chip">
                    <span>{label}</span>
                    <button
                      type="button"
                      aria-label={ui.removeItemAria(label)}
                      onClick={() => handleToggleEpisode(epId)}
                    >
                      ×
                    </button>
                  </span>
                );
              })}

              {filter.characterIds.map((cid) => {
                const ch = CHARACTER_MAP[cid];
                if (!ch) return null;
                const chName = localizeCharacter(ch, locale).name;
                return (
                  <span key={cid} className="tamako-active-chip is-avatar">
                    <img src={ch.avatarUrl} alt="" />
                    <span>{chName}</span>
                    <button
                      type="button"
                      aria-label={ui.removeItemAria(chName)}
                      onClick={() => handleToggleCharacter(cid)}
                    >
                      ×
                    </button>
                  </span>
                );
              })}

              {filter.query.trim() && (
                <span className="tamako-active-chip">
                  <span>“{filter.query.trim()}”</span>
                  <button
                    type="button"
                    aria-label={ui.clearSearchAria}
                    onClick={() => setFilter((p) => ({ ...p, query: "" }))}
                  >
                    ×
                  </button>
                </span>
              )}

              {view === "arcade" &&
                arcadeMatchedCount === 0 &&
                kyotoMatchedCount > 0 && (
                  <button
                    type="button"
                    className="tamako-pill-btn is-primary"
                    style={{
                      minHeight: 30,
                      padding: "3px 11px",
                      fontSize: "0.78rem",
                    }}
                    onClick={() => setView("kyoto")}
                  >
                    {ui.crossMapToKyoto(kyotoMatchedCount)}
                  </button>
                )}

              {view === "kyoto" &&
                kyotoMatchedCount === 0 &&
                arcadeMatchedCount > 0 && (
                  <button
                    type="button"
                    className="tamako-pill-btn is-primary"
                    style={{
                      minHeight: 30,
                      padding: "3px 11px",
                      fontSize: "0.78rem",
                    }}
                    onClick={() => setView("arcade")}
                  >
                    {ui.crossMapToArcade(arcadeMatchedCount)}
                  </button>
                )}

              <button
                type="button"
                className="tamako-active-clear"
                onClick={handleResetFilters}
              >
                {ui.clearAllFilters}
              </button>
            </div>
          )}

          {/* Core Full-Viewport Interactive Map */}
          {view === "arcade" ? (
            <ArcadeMap
              events={filteredEvents}
              selectedLocationId={selectedArcadeLocId}
              onSelectLocation={handleSelectLocation}
              onHoverHint={setMascotHint}
            />
          ) : (
            <Suspense
              fallback={
                <div className="tamako-map-loading">{ui.mapLoadingKyoto}</div>
              }
            >
              <KyotoMap
                events={filteredEvents}
                selectedLocationId={selectedKyotoLocId}
                onSelectLocation={handleSelectLocation}
                onHoverHint={setMascotHint}
              />
            </Suspense>
          )}

          {/* Bottom-Left Dera Mascot & Story Tour Bar */}
          <DeraTourDock
            mascotHint={mascotHint}
            activeIndex={activeIndexInFiltered}
            totalFiltered={filteredEvents.length}
            onPrev={() => stepTour(-1)}
            onNext={() => stepTour(1)}
            onOpenCurrentModal={openCurrentTourModal}
          />

          {/* Right Floating Location Inspector / Mobile Sheet */}
          <MapSidebar
            view={view}
            location={activeLocation}
            locationEvents={activeLocationEvents}
            selectedEventId={selectedEventId}
            hasFilters={activeFiltersFlag}
            expanded={inspectorExpanded}
            onToggleExpanded={setInspectorExpanded}
            onSelectEvent={setSelectedEventId}
            onOpenModal={setModalEventId}
            onSwitchToLocation={(targetView, targetLocId) => {
              setView(targetView);
              if (targetView === "arcade") {
                setSelectedArcadeLocId(targetLocId);
              } else {
                setSelectedKyotoLocId(targetLocId);
              }
              setInspectorExpanded(true);
            }}
            onFilterByCharacter={handleFilterSingleCharacter}
            onResetFilters={handleResetFilters}
          />
        </main>

        {/* Navigation Drawers & Modals */}
        <FilterDrawer
          open={filterOpen}
          tabFocus={filterTabFocus}
          filter={filter}
          matchedCount={filteredEvents.length}
          totalCount={STORY_EVENTS.length}
          episodeCounts={episodeCounts}
          characterCounts={characterCounts}
          onChangeTabFocus={setFilterTabFocus}
          onChangeWork={handleChangeWork}
          onToggleEpisode={handleToggleEpisode}
          onToggleCharacter={handleToggleCharacter}
          onChangeCharMatch={(charMatch: CharMatchMode) =>
            setFilter((prev) => ({ ...prev, charMatch }))
          }
          onChangeQuery={(query: string) =>
            setFilter((prev) => ({ ...prev, query }))
          }
          onReset={handleResetFilters}
          onClose={() => setFilterOpen(false)}
          onHoverHint={setMascotHint}
        />

        <EventDirectoryDrawer
          open={directoryOpen}
          events={filteredEvents}
          totalCount={STORY_EVENTS.length}
          activeView={view}
          onLocateEvent={locateEventOnMap}
          onOpenModal={(id) => {
            setSelectedEventId(id);
            setModalEventId(id);
          }}
          onResetFilters={handleResetFilters}
          onClose={() => setDirectoryOpen(false)}
        />

        <ArchiveModal
          open={archiveOpen}
          onSelectEpisodeOnly={handleFilterSingleEpisode}
          onClose={() => setArchiveOpen(false)}
        />

        <EventModal
          event={modalEvent}
          canPrev={filteredEvents.length > 1 && modalIndexInFiltered > 0}
          canNext={
            filteredEvents.length > 1 &&
            modalIndexInFiltered >= 0 &&
            modalIndexInFiltered < filteredEvents.length - 1
          }
          onPrev={() => stepTour(-1)}
          onNext={() => stepTour(1)}
          onClose={() => setModalEventId(null)}
          onLocateOnMap={locateEventOnMap}
          onFilterByCharacter={handleFilterSingleCharacter}
          onFilterByEpisode={handleFilterSingleEpisode}
        />
      </div>
    </I18nContext.Provider>
  );
}
