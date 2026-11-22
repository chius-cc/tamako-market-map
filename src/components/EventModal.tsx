import { useEffect, useRef } from "react";
import { CHARACTER_MAP } from "../data/characters";
import { EPISODE_MAP } from "../data/episodes";
import { LOCATION_MAP } from "../data/locations";
import { useI18n } from "../i18n";
import type { MapViewMode, StoryEvent } from "../types/tamako";
import { FloretIcon, SceneIcon } from "./Icons";

export function EventModal({
  event,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onClose,
  onLocateOnMap,
  onFilterByCharacter,
  onFilterByEpisode,
}: {
  event: StoryEvent | null;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  onLocateOnMap: (view: MapViewMode, locId: string, eventId: string) => void;
  onFilterByCharacter: (charId: string) => void;
  onFilterByEpisode: (episodeId: string) => void;
}) {
  const { ui, tEp, tChar, tLoc, tEvent } = useI18n();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!event) return;
    const prevFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      prevFocused?.focus?.();
    };
  }, [event, onClose]);

  if (!event) return null;

  const evText = tEvent(event);
  const ep = EPISODE_MAP[event.episodeId];
  const epText = ep ? tEp(ep) : undefined;
  const arcadeLoc = event.arcadeLocationId
    ? LOCATION_MAP[event.arcadeLocationId]
    : undefined;
  const kyotoLoc = event.kyotoLocationId
    ? LOCATION_MAP[event.kyotoLocationId]
    : undefined;

  return (
    <div
      className="tamako-modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="tamako-modal-card tamako-scrollbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tamako-modal-title"
      >
        <div className="tamako-modal-head">
          <div>
            <div className="tamako-chip-row" style={{ marginBottom: 8 }}>
              <span className={`tamako-scene-tag tone-${event.tone}`}>
                <SceneIcon kind={event.icon} size={14} />
                <span>{evText.sceneBadge}</span>
              </span>
              <span
                className="tamako-stat-pill is-sakura"
                style={{ padding: "3px 10px" }}
              >
                {evText.seasonTime}
              </span>
            </div>
            <h2
              id="tamako-modal-title"
              className="tamako-section-title"
              style={{ fontSize: "clamp(1.18rem, 1rem + 0.9vw, 1.5rem)" }}
            >
              <FloretIcon size={18} />
              <span>{evText.title}</span>
            </h2>
            {evText.secondaryTitle && (
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "0.84rem",
                  color: "var(--tamako-ink-muted)",
                  fontWeight: 700,
                }}
              >
                {evText.secondaryTitle}
              </p>
            )}
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="tamako-modal-close"
            aria-label={ui.modalCloseAria}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="tamako-photo-mount tamako-modal-still">
          <img
            src={event.stillUrl}
            alt={ui.modalStillAlt(evText.title)}
            loading="eager"
            decoding="async"
          />
        </div>

        {(evText.quotePrimary || evText.quoteSecondary) && (
          <div className="tamako-quote-box">
            {evText.quotePrimary && (
              <p className="tamako-quote-ja">{evText.quotePrimary}</p>
            )}
            {evText.quoteSecondary && (
              <p className="tamako-quote-zh">{evText.quoteSecondary}</p>
            )}
          </div>
        )}

        <p
          className="tamako-prose"
          style={{ margin: "12px 0 16px", maxWidth: "none" }}
        >
          {evText.summary}
        </p>

        <dl className="tamako-chart">
          <div className="tamako-chart-row">
            <dt>{ui.modalWorkLabel}</dt>
            <dd>
              <span>
                {epText ? `${epText.shortLabel} · ${epText.title}` : event.episodeId}
              </span>
              {ep && (
                <button
                  type="button"
                  className="tamako-pill-btn"
                  style={{ minHeight: 30, padding: "2px 10px", fontSize: "0.78rem" }}
                  onClick={() => {
                    onFilterByEpisode(ep.id);
                    onClose();
                  }}
                >
                  {ui.modalOnlyThisEp}
                </button>
              )}
            </dd>
          </div>

          <div className="tamako-chart-row">
            <dt>{ui.modalStageLabel}</dt>
            <dd>
              {arcadeLoc && (
                <span>
                  {ui.modalArcadePrefix}
                  <strong>{tLoc(arcadeLoc).name}</strong>
                </span>
              )}
              {arcadeLoc && kyotoLoc && <span> · </span>}
              {kyotoLoc && (
                <span>
                  {ui.modalKyotoPrefix}
                  <strong>{tLoc(kyotoLoc).name}</strong>
                </span>
              )}
            </dd>
          </div>

          {epText && (
            <div className="tamako-chart-row">
              <dt>{ui.modalStaffLabel}</dt>
              <dd>{ui.modalStaffFormat(epText.staff)}</dd>
            </div>
          )}

          <div className="tamako-chart-row">
            <dt>{ui.modalCharsLabel}</dt>
            <dd>
              {event.characterIds.map((cid) => {
                const ch = CHARACTER_MAP[cid];
                if (!ch) return null;
                return (
                  <button
                    key={cid}
                    type="button"
                    className="tamako-char-chip tamako-char-chip--avatar"
                    style={{
                      backgroundColor: ch.badgeBg,
                      color: ch.badgeInk,
                      borderColor: ch.badgeBorder,
                    }}
                    onClick={() => {
                      onFilterByCharacter(cid);
                      onClose();
                    }}
                  >
                    <img src={ch.avatarUrl} alt="" />
                    <span>{tChar(ch).name}</span>
                  </button>
                );
              })}
            </dd>
          </div>
        </dl>

        <div className="tamako-staff-reply">
          <div>
            {ui.modalStaffNotePrefix}
            {evText.staffNote}
          </div>
          {evText.pilgrimageTip && (
            <div style={{ marginTop: 6 }}>
              {ui.modalPilgrimageTipPrefix}
              {evText.pilgrimageTip}
            </div>
          )}
        </div>

        <hr className="tamako-stitch-hr" style={{ margin: "16px 0" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div className="tamako-chip-row">
            {arcadeLoc && (
              <button
                type="button"
                className="tamako-pill-btn is-primary"
                onClick={() => {
                  onLocateOnMap("arcade", arcadeLoc.id, event.id);
                  onClose();
                }}
              >
                {ui.modalLocateArcade}
              </button>
            )}
            {kyotoLoc && (
              <button
                type="button"
                className="tamako-pill-btn is-custard"
                onClick={() => {
                  onLocateOnMap("kyoto", kyotoLoc.id, event.id);
                  onClose();
                }}
              >
                {ui.modalLocateKyoto}
              </button>
            )}
            {kyotoLoc?.kyotoCoord && (
              <a
                className="tamako-pill-btn"
                href={`https://www.google.com/maps/search/?api=1&query=${kyotoLoc.kyotoCoord.lat},${kyotoLoc.kyotoCoord.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui.googleMapsBtn}
              </a>
            )}
          </div>

          <div className="tamako-chip-row">
            <button
              type="button"
              className="tamako-pill-btn"
              disabled={!canPrev}
              onClick={onPrev}
            >
              {ui.prevScene}
            </button>
            <button
              type="button"
              className="tamako-pill-btn"
              disabled={!canNext}
              onClick={onNext}
            >
              {ui.nextScene}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
