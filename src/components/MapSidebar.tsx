import { EPISODE_MAP } from "../data/episodes";
import { LOCATION_MAP } from "../data/locations";
import type { Location, MapViewMode, StoryEvent } from "../types/tamako";
import { FloretIcon, SceneIcon } from "./Icons";

export function MapSidebar({
  view,
  location,
  locationEvents,
  selectedEventId,
  hasFilters,
  onSelectEvent,
  onOpenModal,
  onSwitchToLocation,
  onResetFilters,
}: {
  view: MapViewMode;
  location: Location | undefined;
  locationEvents: StoryEvent[];
  selectedEventId: string | null;
  hasFilters: boolean;
  onSelectEvent: (eventId: string) => void;
  onOpenModal: (eventId: string) => void;
  onSwitchToLocation: (targetView: MapViewMode, targetLocationId: string) => void;
  onResetFilters: () => void;
}) {
  if (!location) {
    return (
      <aside className="tamako-sidebar" aria-label="地点剧情预览">
        <p className="tamako-sidebar-loc-desc">
          请在左侧地图上点击任意彩色圆章热点，查看该地标对应的动画剧情与实景设定。
        </p>
      </aside>
    );
  }

  const linkedKyoto = location.linkedKyotoId
    ? LOCATION_MAP[location.linkedKyotoId]
    : undefined;
  const linkedArcade = location.linkedArcadeId
    ? LOCATION_MAP[location.linkedArcadeId]
    : undefined;

  return (
    <aside className="tamako-sidebar" aria-label="选中地点详情与事件列表">
      <div className="tamako-sidebar-loc-head">
        <span className={`tamako-scene-tag tone-${location.tone}`} style={{ alignSelf: "flex-start" }}>
          <FloretIcon size={12} />
          <span>{location.areaLabel}</span>
        </span>
        <h3 className="tamako-sidebar-loc-title">{location.nameZh}</h3>
        <p className="tamako-sidebar-loc-ja">
          {location.nameJa} · {location.subtitle}
        </p>
      </div>

      <p className="tamako-sidebar-loc-desc">{location.descriptionZh}</p>

      <div className="tamako-staff-reply" style={{ marginTop: 0 }}>
        原型参考：{location.realWorldRef}
        {location.realWorldAddress ? `（${location.realWorldAddress}）` : ""}
      </div>

      <div className="tamako-event-actions" style={{ borderTop: 0, paddingTop: 0 }}>
        {view === "kyoto" && linkedArcade && (
          <button
            type="button"
            className="tamako-pill-btn is-primary"
            onClick={() => onSwitchToLocation("arcade", linkedArcade.id)}
          >
            进入商店街详图（{linkedArcade.nameZh}）
          </button>
        )}

        {view === "arcade" && linkedKyoto && (
          <button
            type="button"
            className="tamako-pill-btn is-custard"
            onClick={() => onSwitchToLocation("kyoto", linkedKyoto.id)}
          >
            在京都地图定位（{linkedKyoto.nameZh}）
          </button>
        )}

        {location.kyotoCoord && (
          <a
            className="tamako-pill-btn"
            href={`https://www.google.com/maps/search/?api=1&query=${location.kyotoCoord.lat},${location.kyotoCoord.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 地图坐标
          </a>
        )}
      </div>

      <hr className="tamako-stitch-hr" style={{ margin: "6px 0" }} />

      <div className="tamako-filter-header" style={{ marginBottom: 0 }}>
        <span className="tamako-filter-label">
          此处命中事件（{locationEvents.length}）
        </span>
      </div>

      {locationEvents.length > 0 ? (
        <div className="tamako-sidebar-events tamako-scrollbox">
          {locationEvents.map((ev) => {
            const ep = EPISODE_MAP[ev.episodeId];
            const active = selectedEventId === ev.id;
            return (
              <div
                key={ev.id}
                className={`tamako-sidebar-event-item${active ? " is-active" : ""}`}
              >
                <div className="tamako-event-card-top">
                  <span className={`tamako-scene-tag tone-${ev.tone}`}>
                    <SceneIcon kind={ev.icon} size={13} />
                    <span>{ep?.shortLabel ?? ev.sceneBadge}</span>
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--tamako-ink-muted)" }}>
                    {ev.seasonTime}
                  </span>
                </div>
                <div className="tamako-sidebar-event-name">{ev.titleZh}</div>
                <div className="tamako-event-actions" style={{ borderTop: 0, paddingTop: 4 }}>
                  <button
                    type="button"
                    className="tamako-pill-btn is-primary"
                    style={{ minHeight: 32, padding: "4px 12px", fontSize: "0.78rem" }}
                    onClick={() => {
                      onSelectEvent(ev.id);
                      onOpenModal(ev.id);
                    }}
                  >
                    阅读剧情详情
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="tamako-sidebar-empty">
          <p style={{ margin: "0 0 8px" }}>
            {location.id === "kyoto-demachiza"
              ? "「出町座」是 2023–2024 年十周年纪念重映的现实举办影院，走出门便是动画舞台「出町桝形商店街」。"
              : "当前筛选条件下，该地点暂无命中事件。"}
          </p>
          {hasFilters && (
            <button
              type="button"
              className="tamako-pill-btn is-custard"
              onClick={onResetFilters}
            >
              重置筛选查看全部事件
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
