import { useEffect, useRef, useState } from "react";
import { CHARACTER_MAP } from "../data/characters";
import { EPISODE_MAP, EPISODES } from "../data/episodes";
import { LOCATION_MAP } from "../data/locations";
import { useI18n } from "../i18n";
import { getPreferredViewForEvent } from "../lib/filter";
import type { LocationArea, MapViewMode, StoryEvent } from "../types/tamako";
import { FloretIcon, SceneIcon } from "./Icons";

type GroupMode = "episode" | "area";

const AREA_IDS: LocationArea[] = [
  "arcade",
  "demachi",
  "kamogawa",
  "fujinomori",
  "central",
];

export function EventDirectoryDrawer({
  open,
  events,
  totalCount,
  activeView,
  onLocateEvent,
  onOpenModal,
  onResetFilters,
  onClose,
}: {
  open: boolean;
  events: StoryEvent[];
  totalCount: number;
  activeView: MapViewMode;
  onLocateEvent: (view: MapViewMode, locationId: string, eventId: string) => void;
  onOpenModal: (eventId: string) => void;
  onResetFilters: () => void;
  onClose: () => void;
}) {
  const { ui, tEp, tChar, tLoc, tEvent } = useI18n();
  const [groupMode, setGroupMode] = useState<GroupMode>("episode");
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const groups: {
    key: string;
    title: string;
    subtitle?: string;
    items: StoryEvent[];
  }[] = [];

  if (groupMode === "episode") {
    for (const ep of EPISODES) {
      const items = events.filter((e) => e.episodeId === ep.id);
      if (items.length > 0) {
        const epText = tEp(ep);
        groups.push({
          key: ep.id,
          title: `${epText.shortLabel} · ${epText.title}`,
          subtitle: epText.secondaryTitle
            ? `${epText.secondaryTitle} (${epText.seasonLabel})`
            : epText.seasonLabel,
          items,
        });
      }
    }
  } else {
    for (const areaId of AREA_IDS) {
      const items = events.filter((e) => {
        const primaryLoc = e.arcadeLocationId
          ? LOCATION_MAP[e.arcadeLocationId]
          : e.kyotoLocationId
            ? LOCATION_MAP[e.kyotoLocationId]
            : undefined;
        if (!primaryLoc) return false;
        if (areaId === "arcade") {
          return primaryLoc.area === "arcade";
        }
        const kyotoLoc = e.kyotoLocationId
          ? LOCATION_MAP[e.kyotoLocationId]
          : undefined;
        return kyotoLoc?.area === areaId && !e.arcadeLocationId;
      });
      if (items.length > 0) {
        groups.push({
          key: areaId,
          title: ui.areaGroupLabels[areaId],
          items,
        });
      }
    }
  }

  return (
    <div
      className="tamako-drawer-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="tamako-drawer-panel tamako-drawer-panel--wide tamako-scrollbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tamako-directory-title"
      >
        <div className="tamako-drawer-head">
          <div>
            <h2 id="tamako-directory-title" className="tamako-section-title">
              <FloretIcon size={18} />
              <span>{ui.dirTitle(events.length)}</span>
            </h2>
            <p className="tamako-drawer-sub">{ui.dirSub}</p>
          </div>

          <div className="tamako-chip-row">
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={groupMode === "episode"}
              onClick={() => setGroupMode("episode")}
            >
              {ui.dirGroupEpisode}
            </button>
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={groupMode === "area"}
              onClick={() => setGroupMode("area")}
            >
              {ui.dirGroupArea}
            </button>
            <button
              ref={closeRef}
              type="button"
              className="tamako-modal-close"
              aria-label={ui.dirCloseAria}
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        {events.length === 0 ? (
          <div
            className="tamako-sidebar-empty"
            style={{ textAlign: "center", padding: 28 }}
          >
            <p style={{ margin: "0 0 12px", fontWeight: 700 }}>
              {ui.dirEmptyText}
            </p>
            <button
              type="button"
              className="tamako-pill-btn is-primary"
              onClick={onResetFilters}
            >
              {ui.dirShowAllBtn(totalCount)}
            </button>
          </div>
        ) : (
          groups.map((grp) => (
            <div key={grp.key}>
              <div className="tamako-group-heading">
                <h3>
                  <FloretIcon size={15} />
                  <span>{grp.title}</span>
                </h3>
                {grp.subtitle && (
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--tamako-ink-muted)",
                    }}
                  >
                    {grp.subtitle}
                  </span>
                )}
              </div>

              <div className="tamako-event-grid">
                {grp.items.map((ev) => {
                  const ep = EPISODE_MAP[ev.episodeId];
                  const evText = tEvent(ev);
                  const primaryLoc =
                    (ev.arcadeLocationId && LOCATION_MAP[ev.arcadeLocationId]) ||
                    (ev.kyotoLocationId && LOCATION_MAP[ev.kyotoLocationId]);
                  const locName = primaryLoc ? tLoc(primaryLoc).name : "";
                  const pref = getPreferredViewForEvent(ev, activeView);

                  return (
                    <article key={ev.id} className="tamako-event-card">
                      <div>
                        <div className="tamako-photo-mount tamako-event-card-still">
                          <img
                            src={ev.stillUrl}
                            alt={ui.modalStillAlt(evText.title)}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div className="tamako-event-card-top" style={{ marginTop: 10 }}>
                          <span className={`tamako-scene-tag tone-${ev.tone}`}>
                            <SceneIcon kind={ev.icon} size={12} />
                            <span>{ep ? tEp(ep).shortLabel : evText.sceneBadge}</span>
                          </span>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--tamako-ink-muted)",
                              fontWeight: 700,
                            }}
                          >
                            {evText.seasonTime}
                          </span>
                        </div>

                        <h4 className="tamako-event-title" style={{ marginTop: 8 }}>
                          {evText.title}
                        </h4>
                        <p
                          style={{
                            margin: "3px 0 7px",
                            fontSize: "0.78rem",
                            color: "var(--tamako-ink-muted)",
                            fontWeight: 700,
                          }}
                        >
                          {ui.dirStagePrefix}
                          {locName}
                        </p>
                        <p className="tamako-event-summary">{evText.summary}</p>
                      </div>

                      <div>
                        <div className="tamako-event-meta" style={{ marginBottom: 10 }}>
                          {ev.characterIds.slice(0, 5).map((cid) => {
                            const ch = CHARACTER_MAP[cid];
                            if (!ch) return null;
                            return (
                              <span
                                key={cid}
                                className="tamako-char-mini-with-avatar"
                                style={{
                                  backgroundColor: ch.badgeBg,
                                  color: ch.badgeInk,
                                  border: `1px solid ${ch.badgeBorder}`,
                                }}
                              >
                                <img src={ch.avatarUrl} alt="" />
                                <span>{tChar(ch).name}</span>
                              </span>
                            );
                          })}
                        </div>

                        <div className="tamako-event-actions">
                          {pref.locationId && (
                            <button
                              type="button"
                              className="tamako-pill-btn is-custard"
                              style={{
                                minHeight: 34,
                                padding: "4px 12px",
                                fontSize: "0.8rem",
                              }}
                              onClick={() => {
                                onLocateEvent(pref.view, pref.locationId!, ev.id);
                                onClose();
                              }}
                            >
                              {ui.dirLocateBtn}
                            </button>
                          )}
                          <button
                            type="button"
                            className="tamako-pill-btn is-primary"
                            style={{
                              minHeight: 34,
                              padding: "4px 12px",
                              fontSize: "0.8rem",
                            }}
                            onClick={() => onOpenModal(ev.id)}
                          >
                            {ui.dirDetailBtn}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
