import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { ArcadeMap } from "./components/ArcadeMap";
import { EpisodeGuide } from "./components/EpisodeGuide";
import { EventDirectory } from "./components/EventDirectory";
import { EventModal } from "./components/EventModal";
import { FilterPanel } from "./components/FilterPanel";
import { Header } from "./components/Header";
import { HeroAwning } from "./components/HeroAwning";
import { FloretIcon } from "./components/Icons";
import { MapSidebar } from "./components/MapSidebar";
import { PilgrimageFooter } from "./components/PilgrimageFooter";

const KyotoMap = lazy(() =>
  import("./components/KyotoMap").then((mod) => ({ default: mod.KyotoMap }))
);
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

const DEFAULT_HINT =
  "欢迎来到兔山商店街！可以按集数、人物筛选剧情，也可以点击地图圆章查看每一幕的舞台与名台词もち。";

export default function App() {
  const initialUrl = useMemo(
    () =>
      typeof window !== "undefined"
        ? parseUrlState(window.location.search)
        : { view: "arcade" as MapViewMode, filter: DEFAULT_FILTER_STATE, eventId: null },
    []
  );

  const [view, setView] = useState<MapViewMode>(initialUrl.view);
  const [filter, setFilter] = useState<FilterState>(initialUrl.filter);
  const [modalEventId, setModalEventId] = useState<string | null>(initialUrl.eventId);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(
    initialUrl.eventId
  );
  const [selectedArcadeLocId, setSelectedArcadeLocId] = useState<string>(() => {
    if (initialUrl.eventId && STORY_EVENT_MAP[initialUrl.eventId]?.arcadeLocationId) {
      return STORY_EVENT_MAP[initialUrl.eventId].arcadeLocationId!;
    }
    return "tamaya-shop";
  });
  const [selectedKyotoLocId, setSelectedKyotoLocId] = useState<string>(() => {
    if (initialUrl.eventId && STORY_EVENT_MAP[initialUrl.eventId]?.kyotoLocationId) {
      return STORY_EVENT_MAP[initialUrl.eventId].kyotoLocationId!;
    }
    return "kyoto-masugata";
  });
  const [mascotHint, setMascotHint] = useState<string>(DEFAULT_HINT);

  // Sync URL query params cleanly without creating browser history spam
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
      const loc = LOCATION_MAP[locId];
      if (loc) {
        const hits = getLocationEvents(filteredEvents, locId, view);
        setMascotHint(
          `已选中「${loc.nameZh}」：此处当前有 ${hits.length} 条剧情事件。${loc.subtitle}もち！`
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

  const startTour = useCallback(() => {
    if (filteredEvents.length === 0) return;
    const first = filteredEvents[0];
    const pref = getPreferredViewForEvent(first, view);
    if (pref.locationId) {
      locateEventOnMap(pref.view, pref.locationId, first.id);
    }
    setModalEventId(first.id);
    document.getElementById("map-stage")?.scrollIntoView({ behavior: "smooth" });
  }, [filteredEvents, view, locateEventOnMap]);

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
      }
    }
    if (ep) {
      setMascotHint(`已聚焦至 ${ep.shortLabel}《${ep.titleZh}》全部事件もち！`);
    }
  }, []);

  const handleFilterSingleCharacter = useCallback((charId: string) => {
    const ch = CHARACTER_MAP[charId];
    setFilter({
      ...DEFAULT_FILTER_STATE,
      characterIds: [charId],
    });
    if (ch) {
      setMascotHint(`已筛选「${ch.nameZh}」登场全部名场面もち！`);
    }
  }, []);

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
    <div className="tamako-app">
      <Header onHoverHint={setMascotHint} />

      <main>
        <HeroAwning
          totalCount={STORY_EVENTS.length}
          matchedCount={filteredEvents.length}
          activeView={view}
          mascotHint={mascotHint}
          onStartTour={startTour}
          onSwitchView={setView}
        />

        <FilterPanel
          filter={filter}
          matchedCount={filteredEvents.length}
          totalCount={STORY_EVENTS.length}
          episodeCounts={episodeCounts}
          characterCounts={characterCounts}
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
          onHoverHint={setMascotHint}
        />

        <section
          id="map-stage"
          className="tamako-island tamako-island--wide"
          aria-label="双视角交互式剧情地图"
        >
          <div className="tamako-island-inner">
            <div className="tamako-map-header">
              <div>
                <h2 className="tamako-section-title">
                  <FloretIcon size={20} />
                  <span>
                    {view === "arcade"
                      ? "兔山商店街手绘平面图"
                      : "京都圣地实景巡礼图"}
                  </span>
                </h2>
                <p
                  className="tamako-prose"
                  style={{ margin: "4px 0 0", fontSize: "0.88rem" }}
                >
                  {view === "arcade"
                    ? "还原官方商店街地图左右店铺与东支路布局，支持拖拽缩放与键盘点选热点。"
                    : "覆盖出町桝形、鸭川三角洲、藤森通学路、兔山高校原型与 JR 京都站真实坐标。"}
                </p>
              </div>

              <div className="tamako-tour-bar">
                <div className="tamako-view-switch" role="group" aria-label="地图视角切换">
                  <button
                    type="button"
                    className="tamako-view-btn"
                    aria-pressed={view === "arcade"}
                    onClick={() => setView("arcade")}
                  >
                    <span>兔山商店街</span>
                    <span className="tamako-ep-count">{arcadeMatchedCount}</span>
                  </button>
                  <button
                    type="button"
                    className="tamako-view-btn"
                    aria-pressed={view === "kyoto"}
                    onClick={() => setView("kyoto")}
                  >
                    <span>京都实景图</span>
                    <span className="tamako-ep-count">{kyotoMatchedCount}</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="tamako-pill-btn"
                  disabled={filteredEvents.length === 0}
                  onClick={() => stepTour(-1)}
                >
                  ← 上一幕
                </button>
                <button
                  type="button"
                  className="tamako-pill-btn is-primary"
                  disabled={filteredEvents.length === 0}
                  onClick={() => stepTour(1)}
                >
                  下一幕
                  {activeIndexInFiltered >= 0
                    ? ` (${activeIndexInFiltered + 1}/${filteredEvents.length})`
                    : ""}{" "}
                  →
                </button>
              </div>
            </div>

            {view === "arcade" &&
              arcadeMatchedCount === 0 &&
              kyotoMatchedCount > 0 && (
                <div
                  className="tamako-staff-reply"
                  style={{
                    marginTop: 0,
                    marginBottom: 14,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <span>
                    当前筛选的 {kyotoMatchedCount} 条剧情事件发生在商店街之外（如鸭川、藤森或京都站）。
                  </span>
                  <button
                    type="button"
                    className="tamako-pill-btn is-primary"
                    onClick={() => setView("kyoto")}
                  >
                    切换到京都实景图查看 →
                  </button>
                </div>
              )}

            {view === "kyoto" &&
              kyotoMatchedCount === 0 &&
              arcadeMatchedCount > 0 && (
                <div
                  className="tamako-staff-reply"
                  style={{
                    marginTop: 0,
                    marginBottom: 14,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <span>当前筛选事件均发生在兔山商店街内部。</span>
                  <button
                    type="button"
                    className="tamako-pill-btn is-primary"
                    onClick={() => setView("arcade")}
                  >
                    切回兔山商店街查看 →
                  </button>
                </div>
              )}

            <div className="tamako-map-workbench">
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
                    <div
                      className="tamako-map-stage"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--tamako-ink)",
                        fontWeight: 700,
                      }}
                    >
                      正在展开京都实景巡礼地图もち…
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

              <MapSidebar
                view={view}
                location={activeLocation}
                locationEvents={activeLocationEvents}
                selectedEventId={selectedEventId}
                hasFilters={activeFiltersFlag}
                onSelectEvent={(id) => setSelectedEventId(id)}
                onOpenModal={(id) => setModalEventId(id)}
                onSwitchToLocation={(targetView, targetLocId) => {
                  setView(targetView);
                  if (targetView === "arcade") {
                    setSelectedArcadeLocId(targetLocId);
                  } else {
                    setSelectedKyotoLocId(targetLocId);
                  }
                }}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </section>

        <EventDirectory
          events={filteredEvents}
          activeView={view}
          onLocateEvent={locateEventOnMap}
          onOpenModal={(id) => {
            setSelectedEventId(id);
            setModalEventId(id);
          }}
          onResetFilters={handleResetFilters}
        />

        <EpisodeGuide onSelectEpisodeOnly={handleFilterSingleEpisode} />
      </main>

      <PilgrimageFooter />

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
