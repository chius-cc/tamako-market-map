import { useEffect, useRef, useState } from "react";
import { EPISODES } from "../data/episodes";
import { useI18n } from "../i18n";
import { FloretIcon } from "./Icons";

export function ArchiveModal({
  open,
  onSelectEpisodeOnly,
  onClose,
}: {
  open: boolean;
  onSelectEpisodeOnly: (episodeId: string) => void;
  onClose: () => void;
}) {
  const { ui, tEp } = useI18n();
  const [tab, setTab] = useState<"episodes" | "pilgrimage">("episodes");
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

  return (
    <div
      className="tamako-modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="tamako-modal-card tamako-modal-card--wide tamako-scrollbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tamako-archive-title"
      >
        <div className="tamako-modal-head">
          <div>
            <h2 id="tamako-archive-title" className="tamako-section-title">
              <FloretIcon size={18} />
              <span>{ui.archiveTitle}</span>
            </h2>
            <div className="tamako-chip-row" style={{ marginTop: 10 }}>
              <button
                type="button"
                className="tamako-ep-chip"
                aria-pressed={tab === "episodes"}
                onClick={() => setTab("episodes")}
              >
                {ui.archiveTabEpisodes}
              </button>
              <button
                type="button"
                className="tamako-ep-chip"
                aria-pressed={tab === "pilgrimage"}
                onClick={() => setTab("pilgrimage")}
              >
                {ui.archiveTabPilgrimage}
              </button>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            className="tamako-modal-close"
            aria-label={ui.archiveCloseAria}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {tab === "episodes" ? (
          <dl className="tamako-chart" style={{ marginTop: 16 }}>
            {EPISODES.map((ep) => {
              const epText = tEp(ep);
              return (
                <div key={ep.id} className="tamako-chart-row">
                  <dt>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <div>{epText.shortLabel}</div>
                      <div
                        style={{
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          opacity: 0.92,
                        }}
                      >
                        {epText.seasonLabel}
                      </div>
                    </div>
                  </dt>
                  <dd>
                    <div className="tamako-archive-ep-row">
                      <div className="tamako-photo-mount tamako-archive-ep-still">
                        <img
                          src={ep.stillUrl}
                          alt={epText.title}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div style={{ flex: "1 1 260px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                            gap: 8,
                          }}
                        >
                          <strong
                            style={{
                              fontSize: "1rem",
                              color: "var(--tamako-ink)",
                            }}
                          >
                            {epText.title}
                          </strong>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--tamako-ink-muted)",
                            }}
                          >
                            {epText.secondaryTitle
                              ? `${epText.secondaryTitle} · `
                              : ""}
                            {epText.releaseInfo}
                          </span>
                        </div>
                        <p
                          style={{
                            margin: "6px 0 8px",
                            fontSize: "0.85rem",
                            color: "var(--tamako-ink-roast)",
                            fontWeight: 500,
                          }}
                        >
                          {epText.summary}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.78rem",
                              color: "var(--tamako-ink-muted)",
                            }}
                          >
                            {ui.modalStaffFormat(epText.staff)}
                          </span>
                          <div className="tamako-chip-row">
                            <button
                              type="button"
                              className="tamako-pill-btn is-primary"
                              style={{
                                minHeight: 30,
                                padding: "2px 12px",
                                fontSize: "0.78rem",
                              }}
                              onClick={() => {
                                onSelectEpisodeOnly(ep.id);
                                onClose();
                              }}
                            >
                              {ui.archiveOnlyThisEp}
                            </button>
                            <a
                              className="tamako-pill-btn"
                              style={{
                                minHeight: 30,
                                padding: "2px 12px",
                                fontSize: "0.78rem",
                              }}
                              href={ep.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {ui.archiveOfficialLink}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        ) : (
          <div style={{ marginTop: 18 }}>
            <div className="tamako-staff-reply" style={{ marginTop: 0 }}>
              {ui.pilgrimageEtiquette}
            </div>

            <dl className="tamako-chart" style={{ marginTop: 18 }}>
              <div className="tamako-chart-row">
                <dt>{ui.pilgrimageRoute1Title}</dt>
                <dd>{ui.pilgrimageRoute1Body}</dd>
              </div>
              <div className="tamako-chart-row">
                <dt>{ui.pilgrimageRoute2Title}</dt>
                <dd>{ui.pilgrimageRoute2Body}</dd>
              </div>
              <div className="tamako-chart-row">
                <dt>{ui.pilgrimageRoute3Title}</dt>
                <dd>{ui.pilgrimageRoute3Body}</dd>
              </div>
              <div className="tamako-chart-row">
                <dt>{ui.pilgrimageLinksTitle}</dt>
                <dd>
                  <a
                    href="https://tamakomarket.com/map/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ui.pilgrimageLinkTvMap}
                  </a>
                  <span>·</span>
                  <a
                    href="https://tamakolovestory.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ui.pilgrimageLinkMovie}
                  </a>
                  <span>·</span>
                  <a
                    href="https://masugata.demachi.jp/tamakomarket/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ui.pilgrimageLinkMasugata}
                  </a>
                  <span>·</span>
                  <a
                    href="https://github.com/chius-me/awesome-tamako-market"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    awesome-tamako-market
                  </a>
                </dd>
              </div>
            </dl>

            <p
              style={{
                margin: "12px 0 0",
                fontSize: "0.82rem",
                color: "var(--tamako-ink-muted)",
              }}
            >
              {ui.pilgrimageCreditsPrefix}
              <strong>{ui.pilgrimageCreditsCopyright}</strong>
              {ui.pilgrimageCreditsSuffix}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
