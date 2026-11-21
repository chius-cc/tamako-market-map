import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { ArcadeMap } from "./components/ArcadeMap";
import { ArchiveModal } from "./components/ArchiveModal";
import { DeraTourDock } from "./components/DeraTourDock";
import { EventDirectoryDrawer } from "./components/EventDirectoryDrawer";
import { EventModal } from "./components/EventModal";
import { FilterDrawer } from "./components/FilterDrawer";
import { Header, type FilterTabFocus } from "./components/Header";
import { MapSidebar } from "./components/MapSidebar";
import { CHARACTER_MAP } from "./data/characters";
import { EPISODE_MAP } from "./data/episodes";
import { STORY_EVENT_MAP, STORY_EVENTS } from "./data/events";
import { LOCATION_MAP } from "./data/locations";
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
  MapViewMode,
  WorkKind,
} from "./types/tamako";

const KyotoMap = lazy(() =>
  import("./components/KyotoMap").then((mod) => ({ default: mod.KyotoMap }))
);

const DEFAULT_HINT =
  "欢迎来到兔山商店街！点击地图上的金框剧照圆章查看名场面，也可从上方导航按集数或人物头像筛选もち。";

export default function App() {
  const initialUrl = useMemo(
    () =>
      typeof window !== "undefined"
        ? parseUrlState(window.location.search)
        : {
            view: "arcade" as MapViewMode,
            filter: DEFAULT_FILTER_STATE,
            eventId: null,
          },
    []
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

  // Inspector open by default on wide desktop (>= 900px), compact pill on mobile so map fills viewport
  const [inspectorExpanded, setInspectorExpanded] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 900 : true
  );

  // Navigation Drawers / Modals
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTabFocus, setFilterTabFocus] = useState<FilterTabFocus>("all");
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const [mascotHint, setMascotHint] = useState<string>(DEFAULT_HINT);

  // Sync URL query params cleanly
  useEffect(() => {
    const query = serializeUrlState({
      view,
      filter,
      eventId: modalEventId,
    });
    const nextUrl = `${window.location.pathname}${query}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [view, filter, modalEventId]);

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
        const hits = getLocationEvents(filteredEvents, locId, view);
        setMascotHint(
          `已选中「${loc.nameZh}」：当前有 ${hits.length} 幕剧情。${loc.subtitle}もち！`
        );
        if (hits.length > 0) {
          setSelectedEventId(hits[0].id);
        }
      }
    },
    [view, filteredEvents]
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
        setMascotHint(`已定位「${ev.titleZh}」（${ev.sceneBadge}）もち！`);
      }
    },
    []
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
      setMascotHint(
        `剧情巡游（第 ${nextIdx + 1}/${filteredEvents.length} 幕）：${targetEvent.titleZh}もち！`
      );
      if (modalEventId) {
        setModalEventId(targetEvent.id);
      }
    },
    [filteredEvents, selectedEventId, view, locateEventOnMap, modalEventId]
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

  const handleChangeWork = useCallback((work: "all" | WorkKind) => {
    setFilter((prev) => ({
      ...prev,
      work,
      episodeIds: [],
    }));
    const labels: Record<"all" | WorkKind, string> = {
      all: "全部作品",
      tv: "TV 动画全 12 话",
      movie: "剧场版《玉子爱情故事》",
      short: "南国短片",
    };
    setMascotHint(`已切换至「${labels[work]}」范围筛选もち！`);
    if (work === "movie") {
      setView("kyoto");
      setSelectedKyotoLocId("kyoto-delta");
    }
  }, []);

  const handleToggleEpisode = useCallback((epId: string) => {
    setFilter((prev) => {
      const exists = prev.episodeIds.includes(epId);
      const nextIds = exists
        ? prev.episodeIds.filter((id) => id !== epId)
        : [...prev.episodeIds, epId];
      return { ...prev, episodeIds: nextIds };
    });
    const ep = EPISODE_MAP[epId];
    if (ep) {
      setMascotHint(`已切换集数筛选：${ep.shortLabel}《${ep.titleZh}》もち。`);
    }
  }, []);

  const handleToggleCharacter = useCallback((charId: string) => {
    setFilter((prev) => {
      const exists = prev.characterIds.includes(charId);
      const nextIds = exists
        ? prev.characterIds.filter((id) => id !== charId)
        : [...prev.characterIds, charId];
      return { ...prev, characterIds: nextIds };
    });
    const ch = CHARACTER_MAP[charId];
    if (ch) {
      setMascotHint(`${ch.nameZh}：${ch.deraComment}`);
    }
  }, []);

  const handleFilterSingleEpisode = useCallback((episodeId: string) => {
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
      setMascotHint(`已聚焦至 ${ep.shortLabel}《${ep.titleZh}》全部事件もち！`);
    }
  }, []);

  const handleFilterSingleCharacter = useCallback((charId: string) => {
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
      setMascotHint(`已筛选「${ch.nameZh}」登场全部名场面もち！`);
    }
  }, [view]);

  const handleResetFilters = useCallback(() => {
    setFilter(DEFAULT_FILTER_STATE);
    setMascotHint(DEFAULT_HINT);
  }, []);

  const modalEvent = modalEventId ? STORY_EVENT_MAP[modalEventId] ?? null : null;
  const modalIndexInFiltered = modalEvent
    ? filteredEvents.findIndex((e) => e.id === modalEvent.id)
    : -1;

  const activeIndexInFiltered = selectedEventId
    ? filteredEvents.findIndex((e) => e.id === selectedEventId)
    : -1;

  const activeFiltersFlag = hasActiveFilters(filter);

  return (
    <div className="tamako-app-shell">
      <Header
        view={view}
        filter={filter}
        arcadeCount={arcadeMatchedCount}
        kyotoCount={kyotoMatchedCount}
        matchedCount={filteredEvents.length}
        onSwitchView={setView}
        onOpenFilter={(focus) => {
          setFilterTabFocus(focus);
          setFilterOpen(true);
        }}
        onOpenDirectory={() => setDirectoryOpen(true)}
        onOpenArchive={() => setArchiveOpen(true)}
        onHoverHint={setMascotHint}
      />

      <main id="map-stage" className="tamako-map-shell" aria-label="交互式剧情地图主舞台">
        {/* Active Filter Chips & Cross-Map Hint Banner */}
        {activeFiltersFlag && (
          <div className="tamako-active-filter-strip" aria-label="当前生效筛选条件">
            {filter.work !== "all" && (
              <span className="tamako-active-chip">
                <span>
                  {filter.work === "tv"
                    ? "TV 全12话"
                    : filter.work === "movie"
                      ? "剧场版"
                      : "南国短片"}
                </span>
                <button
                  type="button"
                  aria-label="移除作品筛选"
                  onClick={() => handleChangeWork("all")}
                >
                  ×
                </button>
              </span>
            )}

            {filter.episodeIds.map((epId) => {
              const ep = EPISODE_MAP[epId];
              return ep ? (
                <span key={epId} className="tamako-active-chip">
                  <span>{ep.shortLabel}</span>
                  <button
                    type="button"
                    aria-label={`移除 ${ep.shortLabel}`}
                    onClick={() => handleToggleEpisode(epId)}
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}

            {filter.characterIds.map((cid) => {
              const ch = CHARACTER_MAP[cid];
              return ch ? (
                <span key={cid} className="tamako-active-chip is-avatar">
                  <img src={ch.avatarUrl} alt="" />
                  <span>{ch.nameZh}</span>
                  <button
                    type="button"
                    aria-label={`移除 ${ch.nameZh}`}
                    onClick={() => handleToggleCharacter(cid)}
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}

            {filter.query.trim() && (
              <span className="tamako-active-chip">
                <span>“{filter.query.trim()}”</span>
                <button
                  type="button"
                  aria-label="清除搜索关键词"
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
                  style={{ minHeight: 30, padding: "3px 11px", fontSize: "0.78rem" }}
                  onClick={() => setView("kyoto")}
                >
                  命中 {kyotoMatchedCount} 幕位于京都地图 → 点击切换
                </button>
              )}

            {view === "kyoto" &&
              kyotoMatchedCount === 0 &&
              arcadeMatchedCount > 0 && (
                <button
                  type="button"
                  className="tamako-pill-btn is-primary"
                  style={{ minHeight: 30, padding: "3px 11px", fontSize: "0.78rem" }}
                  onClick={() => setView("arcade")}
                >
                  命中 {arcadeMatchedCount} 幕位于商店街 → 点击切换
                </button>
              )}

            <button
              type="button"
              className="tamako-active-clear"
              onClick={handleResetFilters}
            >
              清空筛选
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
              <div className="tamako-map-loading">
                正在铺开和纸主题京都圣地地图もち…
              </div>
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
  );
}
