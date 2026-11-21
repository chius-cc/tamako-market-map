import { useEffect, useRef } from "react";
import { CHARACTER_MAP } from "../data/characters";
import { EPISODE_MAP } from "../data/episodes";
import { LOCATION_MAP } from "../data/locations";
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

  const ep = EPISODE_MAP[event.episodeId];
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
                <span>{event.sceneBadge}</span>
              </span>
              <span className="tamako-stat-pill is-sakura" style={{ padding: "3px 10px" }}>
                {event.seasonTime}
              </span>
            </div>
            <h2
              id="tamako-modal-title"
              className="tamako-section-title"
              style={{ fontSize: "clamp(1.18rem, 1rem + 0.9vw, 1.5rem)" }}
            >
              <FloretIcon size={18} />
              <span>{event.titleZh}</span>
            </h2>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "0.84rem",
                color: "var(--tamako-ink-muted)",
                fontWeight: 700,
              }}
            >
              {event.titleJa}
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="tamako-modal-close"
            aria-label="关闭剧情详情弹卡"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Large Authentic Anime Scene Still in Gold Mount */}
        <div className="tamako-photo-mount tamako-modal-still">
          <img
            src={event.stillUrl}
            alt={`${event.titleZh} 动画剧照`}
            loading="eager"
            decoding="async"
          />
        </div>

        {(event.quoteJa || event.quoteZh) && (
          <div className="tamako-quote-box">
            {event.quoteJa && <p className="tamako-quote-ja">{event.quoteJa}</p>}
            {event.quoteZh && <p className="tamako-quote-zh">{event.quoteZh}</p>}
          </div>
        )}

        <p className="tamako-prose" style={{ margin: "12px 0 16px", maxWidth: "none" }}>
          {event.summaryZh}
        </p>

        <dl className="tamako-chart">
          <div className="tamako-chart-row">
            <dt>所属作品 / 集数</dt>
            <dd>
              <span>
                {ep ? `${ep.shortLabel}《${ep.titleZh}》` : event.episodeId}
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
                  只看本话
                </button>
              )}
            </dd>
          </div>

          <div className="tamako-chart-row">
            <dt>发生舞台与圣地</dt>
            <dd>
              {arcadeLoc && (
                <span>
                  商店街：<strong>{arcadeLoc.nameZh}</strong>
                </span>
              )}
              {arcadeLoc && kyotoLoc && <span> · </span>}
              {kyotoLoc && (
                <span>
                  京都：<strong>{kyotoLoc.nameZh}</strong>
                </span>
              )}
            </dd>
          </div>

          {ep && (
            <div className="tamako-chart-row">
              <dt>核心主创</dt>
              <dd>
                脚本：{ep.staff.script} ／ 分镜：{ep.staff.storyboard} ／ 演出：
                {ep.staff.director} ／ 作画监督：{ep.staff.animationDirector}
              </dd>
            </div>
          )}

          <div className="tamako-chart-row">
            <dt>登场人物（点击快筛）</dt>
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
                    <span>{ch.nameZh}</span>
                  </button>
                );
              })}
            </dd>
          </div>
        </dl>

        <div className="tamako-staff-reply">
          <div>手账批注：{event.staffNoteZh}</div>
          {event.pilgrimageTipZh && (
            <div style={{ marginTop: 6 }}>圣地巡礼小贴士：{event.pilgrimageTipZh}</div>
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
                🍡 在商店街定位
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
                🗺️ 在京都地图定位
              </button>
            )}
            {kyotoLoc?.kyotoCoord && (
              <a
                className="tamako-pill-btn"
                href={`https://www.google.com/maps/search/?api=1&query=${kyotoLoc.kyotoCoord.lat},${kyotoLoc.kyotoCoord.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 地图
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
              ← 上一幕
            </button>
            <button
              type="button"
              className="tamako-pill-btn"
              disabled={!canNext}
              onClick={onNext}
            >
              下一幕 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
