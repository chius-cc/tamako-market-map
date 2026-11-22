import { CHARACTER_MAP } from "../data/characters";
import { EPISODE_MAP } from "../data/episodes";
import { LOCATION_MAP } from "../data/locations";
import { useI18n } from "../i18n";
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
  const { ui, tLoc, tChar, tEp, tEvent } = useI18n();

  if (!location) return null;

  const locText = tLoc(location);

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
            <strong>{locText.name}</strong>
            <small>{ui.inspectorReopenSub(locationEvents.length)}</small>
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
      aria-label={ui.inspectorAria}
    >
      <div className="tamako-inspector-top">
        <span className={`tamako-scene-tag tone-${location.tone}`}>
          <FloretIcon size={12} />
          <span>{locText.areaLabel}</span>
        </span>

        <button
          type="button"
          className="tamako-inspector-close"
          aria-label={ui.inspectorCloseAria}
          onClick={() => onToggleExpanded(false)}
        >
          {ui.inspectorCloseBtn}
        </button>
      </div>

      <div className="tamako-photo-mount tamako-inspector-hero">
        <img
          src={location.imageUrl}
          alt={ui.inspectorStillAlt(locText.name)}
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="tamako-sidebar-loc-head">
        <h2 className="tamako-sidebar-loc-title">{locText.name}</h2>
        <p className="tamako-sidebar-loc-ja">
          {locText.secondaryName ? `${locText.secondaryName} · ` : ""}
          {locText.subtitle}
        </p>
      </div>

      {owners.length > 0 && (
        <div
          className="tamako-inspector-owners"
          aria-label={ui.inspectorOwnersAria}
        >
          {owners.map((ch) => {
            const chText = tChar(ch);
            return (
              <button
                key={ch.id}
                type="button"
                className="tamako-owner-chip"
                title={ui.inspectorOwnerTitle(chText.name)}
                onClick={() => onFilterByCharacter(ch.id)}
              >
                <img src={ch.avatarUrl} alt="" />
                <span>{chText.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="tamako-sidebar-loc-desc">{locText.description}</p>

      <div className="tamako-inspector-links">
        {view === "kyoto" && linkedArcade && (
          <button
            type="button"
            className="tamako-pill-btn is-primary"
            style={{ minHeight: 34, padding: "4px 12px", fontSize: "0.8rem" }}
            onClick={() => onSwitchToLocation("arcade", linkedArcade.id)}
          >
            {ui.inspectorJumpArcade(tLoc(linkedArcade).name)}
          </button>
        )}

        {view === "arcade" && linkedKyoto && (
          <button
            type="button"
            className="tamako-pill-btn is-custard"
            style={{ minHeight: 34, padding: "4px 12px", fontSize: "0.8rem" }}
            onClick={() => onSwitchToLocation("kyoto", linkedKyoto.id)}
          >
            {ui.inspectorJumpKyoto(tLoc(linkedKyoto).name)}
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
            {ui.googleMapsBtn}
          </a>
        )}
      </div>

      <hr className="tamako-stitch-hr" style={{ margin: "4px 0" }} />

      <div className="tamako-filter-header" style={{ marginBottom: 0 }}>
        <span className="tamako-filter-label">
          {ui.inspectorEventsTitle(locationEvents.length)}
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--tamako-ink-muted)" }}>
          {ui.inspectorClickHint}
        </span>
      </div>

      {locationEvents.length > 0 ? (
        <div className="tamako-inspector-events">
          {locationEvents.map((ev) => {
            const ep = EPISODE_MAP[ev.episodeId];
            const evText = tEvent(ev);
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
                    <span>{ep ? tEp(ep).shortLabel : evText.sceneBadge}</span>
                  </span>
                  <strong className="tamako-inspector-ev-title">
                    {evText.title}
                  </strong>
                  <span className="tamako-inspector-ev-avatars">
                    {ev.characterIds.slice(0, 4).map((cid) => {
                      const ch = CHARACTER_MAP[cid];
                      if (!ch) return null;
                      const chName = tChar(ch).name;
                      return (
                        <img
                          key={cid}
                          src={ch.avatarUrl}
                          alt={chName}
                          title={chName}
                        />
                      );
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
              ? ui.inspectorDemachizaNote
              : ui.inspectorEmpty}
          </p>
          {hasFilters && (
            <button
              type="button"
              className="tamako-pill-btn is-custard"
              onClick={onResetFilters}
            >
              {ui.inspectorResetBtn}
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
