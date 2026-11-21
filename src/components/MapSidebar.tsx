import { CHARACTER_MAP } from "../data/characters";
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
  expanded,
  onToggleExpanded,
  onSelectEvent,
  onOpenModal,
  onSwitchToLocation,
  onFilterByCharacter,
  onResetFilters,
}: {
  view: MapViewMode;
  location: Location | undefined;
  locationEvents: StoryEvent[];
  selectedEventId: string | null;
  hasFilters: boolean;
  expanded: boolean;
  onToggleExpanded: (next: boolean) => void;
  onSelectEvent: (eventId: string) => void;
  onOpenModal: (eventId: string) => void;
  onSwitchToLocation: (targetView: MapViewMode, targetLocationId: string) => void;
  onFilterByCharacter: (charId: string) => void;
  onResetFilters: () => void;
}) {
  if (!location) return null;

  // Collapsed pill state so user can inspect unobstructed map on desktop or mobile
  if (!expanded) {
    return (
      <div className="tamako-inspector-collapsed">
        <button
          type="button"
          className="tamako-inspector-reopen"
          onClick={() => onToggleExpanded(true)}
        >
          <img
            className="tamako-inspector-reopen-thumb"
            src={location.imageUrl}
            alt=""
          />
          <span className="tamako-inspector-reopen-text">
            <strong>{location.nameZh}</strong>
            <small>{locationEvents.length} 幕相关剧情 · 点击展开 ▲</small>
          </span>
        </button>
      </div>
    );
  }

  const linkedKyoto = location.linkedKyotoId
    ? LOCATION_MAP[location.linkedKyotoId]
    : undefined;
  const linkedArcade = location.linkedArcadeId
    ? LOCATION_MAP[location.linkedArcadeId]
    : undefined;

  const owners = (location.ownerCharacterIds ?? [])
    .map((id) => CHARACTER_MAP[id])
    .filter(Boolean);

  return (
    <aside
      className="tamako-inspector tamako-scrollbox"
      aria-label="当前选中地标与剧照事件列表"
    >
      <div className="tamako-inspector-top">
        <span className={`tamako-scene-tag tone-${location.tone}`}>
          <FloretIcon size={12} />
          <span>{location.areaLabel}</span>
        </span>

        <button
          type="button"
          className="tamako-inspector-close"
          aria-label="收起地标详情面板"
          onClick={() => onToggleExpanded(false)}
        >
          收起 ×
        </button>
      </div>

      {/* Real Anime Storefront / Landmark Still in Gold Mount */}
      <div className="tamako-photo-mount tamako-inspector-hero">
        <img
          src={location.imageUrl}
          alt={`${location.nameZh} 动画剧照`}
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="tamako-sidebar-loc-head">
        <h2 className="tamako-sidebar-loc-title">{location.nameZh}</h2>
        <p className="tamako-sidebar-loc-ja">
          {location.nameJa} · {location.subtitle}
        </p>
      </div>

      {/* Associated Shopkeeper / Character Avatars */}
      {owners.length > 0 && (
        <div className="tamako-inspector-owners" aria-label="关联人物快筛">
          {owners.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className="tamako-owner-chip"
              title={`只看「${ch.nameZh}」相关剧情`}
              onClick={() => onFilterByCharacter(ch.id)}
            >
              <img src={ch.avatarUrl} alt="" />
              <span>{ch.nameZh}</span>
            </button>
          ))}
        </div>
      )}

      <p className="tamako-sidebar-loc-desc">{location.descriptionZh}</p>

      <div className="tamako-inspector-links">
        {view === "kyoto" && linkedArcade && (
          <button
            type="button"
            className="tamako-pill-btn is-primary"
            style={{ minHeight: 34, padding: "4px 12px", fontSize: "0.8rem" }}
            onClick={() => onSwitchToLocation("arcade", linkedArcade.id)}
          >
            🍡 切入商店街详图（{linkedArcade.nameZh}）
          </button>
        )}

        {view === "arcade" && linkedKyoto && (
          <button
            type="button"
            className="tamako-pill-btn is-custard"
            style={{ minHeight: 34, padding: "4px 12px", fontSize: "0.8rem" }}
            onClick={() => onSwitchToLocation("kyoto", linkedKyoto.id)}
          >
            🗺️ 京都实景定位（{linkedKyoto.nameZh}）
          </button>
        )}

        {location.kyotoCoord && (
          <a
            className="tamako-pill-btn"
            style={{ minHeight: 34, padding: "4px 12px", fontSize: "0.8rem" }}
            href={`https://www.google.com/maps/search/?api=1&query=${location.kyotoCoord.lat},${location.kyotoCoord.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 地图
          </a>
        )}
      </div>

      <hr className="tamako-stitch-hr" style={{ margin: "4px 0" }} />

      <div className="tamako-filter-header" style={{ marginBottom: 0 }}>
        <span className="tamako-filter-label">
          此处剧情剧照（{locationEvents.length}）
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--tamako-ink-muted)" }}>
          点击查看详情
        </span>
      </div>

      {locationEvents.length > 0 ? (
        <div className="tamako-inspector-events">
          {locationEvents.map((ev) => {
            const ep = EPISODE_MAP[ev.episodeId];
            const active = selectedEventId === ev.id;
            return (
              <button
                key={ev.id}
                type="button"
                className={`tamako-inspector-event-btn${active ? " is-active" : ""}`}
                onClick={() => {
                  onSelectEvent(ev.id);
                  onOpenModal(ev.id);
                }}
              >
                <span className="tamako-photo-mount tamako-inspector-ev-thumb">
                  <img
                    src={ev.stillUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="tamako-inspector-ev-body">
                  <span className={`tamako-scene-tag tone-${ev.tone}`}>
                    <SceneIcon kind={ev.icon} size={11} />
                    <span>{ep?.shortLabel ?? ev.sceneBadge}</span>
                  </span>
                  <strong className="tamako-inspector-ev-title">
                    {ev.titleZh}
                  </strong>
                  <span className="tamako-inspector-ev-avatars">
                    {ev.characterIds.slice(0, 4).map((cid) => {
                      const ch = CHARACTER_MAP[cid];
                      return ch ? (
                        <img key={cid} src={ch.avatarUrl} alt={ch.nameZh} title={ch.nameZh} />
                      ) : null;
                    })}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="tamako-sidebar-empty">
          <p style={{ margin: "0 0 8px" }}>
            {location.id === "kyoto-demachiza"
              ? "「出町座」是十周年纪念特别重映的举办影院，走出影厅便是「出町桝形商店街」拱廊。"
              : "当前筛选条件下，该地点暂无命中剧情。"}
          </p>
          {hasFilters && (
            <button
              type="button"
              className="tamako-pill-btn is-custard"
              onClick={onResetFilters}
            >
              重置筛选查看全部
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
