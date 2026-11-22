import { useEffect, useRef } from "react";
import { CHARACTERS } from "../data/characters";
import { EPISODES } from "../data/episodes";
import { useI18n } from "../i18n";
import { hasActiveFilters } from "../lib/filter";
import type {
  CharacterCircle,
  CharMatchMode,
  FilterState,
  WorkKind,
} from "../types/tamako";
import type { FilterTabFocus } from "./Header";
import { FloretIcon } from "./Icons";

const CIRCLE_KEYS: CharacterCircle[] = [
  "kitashirakawa",
  "school",
  "ooji",
  "southern",
  "arcade",
];

const WORK_IDS: ("all" | WorkKind)[] = ["all", "tv", "movie", "short"];

export function FilterDrawer({
  open,
  tabFocus,
  filter,
  matchedCount,
  totalCount,
  episodeCounts,
  characterCounts,
  onChangeTabFocus,
  onChangeWork,
  onToggleEpisode,
  onToggleCharacter,
  onChangeCharMatch,
  onChangeQuery,
  onReset,
  onClose,
  onHoverHint,
}: {
  open: boolean;
  tabFocus: FilterTabFocus;
  filter: FilterState;
  matchedCount: number;
  totalCount: number;
  episodeCounts: Record<string, number>;
  characterCounts: Record<string, number>;
  onChangeTabFocus: (tab: FilterTabFocus) => void;
  onChangeWork: (work: "all" | WorkKind) => void;
  onToggleEpisode: (epId: string) => void;
  onToggleCharacter: (charId: string) => void;
  onChangeCharMatch: (mode: CharMatchMode) => void;
  onChangeQuery: (query: string) => void;
  onReset: () => void;
  onClose: () => void;
  onHoverHint: (hint: string) => void;
}) {
  const { ui, tEp, tChar } = useI18n();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    if (tabFocus === "search") {
      searchRef.current?.focus();
    } else {
      closeRef.current?.focus();
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, tabFocus, onClose]);

  if (!open) return null;

  const active = hasActiveFilters(filter);
  const visibleEpisodes =
    filter.work === "all"
      ? EPISODES
      : EPISODES.filter((ep) => ep.kind === filter.work);

  const showEpisodes =
    tabFocus === "all" || tabFocus === "episodes" || tabFocus === "search";
  const showCharacters =
    tabFocus === "all" || tabFocus === "characters" || tabFocus === "search";

  return (
    <div
      className="tamako-drawer-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="tamako-drawer-panel tamako-scrollbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tamako-filter-drawer-title"
      >
        <div className="tamako-drawer-head">
          <div>
            <h2 id="tamako-filter-drawer-title" className="tamako-section-title">
              <FloretIcon size={18} />
              <span>{ui.filterTitle}</span>
            </h2>
            <p className="tamako-drawer-sub">
              {ui.filterSub(matchedCount, totalCount)}
            </p>
          </div>

          <div className="tamako-chip-row">
            {active && (
              <button
                type="button"
                className="tamako-pill-btn is-custard"
                onClick={onReset}
              >
                {ui.filterResetAll}
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              className="tamako-pill-btn is-primary"
              onClick={onClose}
            >
              {ui.filterViewMap(matchedCount)}
            </button>
          </div>
        </div>

        {/* Search Input + Tab Switcher */}
        <div className="tamako-drawer-controls">
          <div
            className="tamako-search-input-wrap"
            style={{ maxWidth: "none", flex: "1 1 260px" }}
          >
            <label htmlFor="tamako-drawer-search" className="sr-only">
              {ui.filterSearchAria}
            </label>
            <input
              ref={searchRef}
              id="tamako-drawer-search"
              type="search"
              className="tamako-search-input"
              placeholder={ui.filterSearchPlaceholder}
              value={filter.query}
              onChange={(e) => onChangeQuery(e.target.value)}
            />
            {filter.query && (
              <button
                type="button"
                className="tamako-search-clear"
                aria-label={ui.clearSearchAria}
                onClick={() => onChangeQuery("")}
              >
                ×
              </button>
            )}
          </div>

          <div
            className="tamako-chip-row"
            role="tablist"
            aria-label={ui.filterTabAria}
          >
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={tabFocus === "all" || tabFocus === "search"}
              onClick={() => onChangeTabFocus("all")}
            >
              {ui.filterTabAll}
            </button>
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={tabFocus === "episodes"}
              onClick={() => onChangeTabFocus("episodes")}
            >
              {ui.filterTabEpisodes}
            </button>
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={tabFocus === "characters"}
              onClick={() => onChangeTabFocus("characters")}
            >
              {ui.filterTabCharacters(CHARACTERS.length)}
            </button>
          </div>
        </div>

        {showEpisodes && (
          <section
            className="tamako-filter-block"
            aria-label={ui.filterEpSectionAria}
          >
            <div className="tamako-filter-header">
              <span className="tamako-filter-label">
                <FloretIcon size={15} />
                <span>{ui.filterEpHeading}</span>
              </span>
              {filter.episodeIds.length > 0 && (
                <button
                  type="button"
                  className="tamako-pill-btn"
                  style={{ minHeight: 30, padding: "2px 10px", fontSize: "0.78rem" }}
                  onClick={() =>
                    filter.episodeIds.forEach((id) => onToggleEpisode(id))
                  }
                >
                  {ui.filterClearEps(filter.episodeIds.length)}
                </button>
              )}
            </div>

            <div className="tamako-work-tabs" style={{ marginBottom: 12 }}>
              {WORK_IDS.map((wid) => (
                <button
                  key={wid}
                  type="button"
                  className="tamako-work-tab"
                  aria-pressed={filter.work === wid}
                  onClick={() => onChangeWork(wid)}
                >
                  {ui.workLabels[wid]}
                </button>
              ))}
            </div>

            <div className="tamako-ep-photo-grid">
              {visibleEpisodes.map((ep) => {
                const selected = filter.episodeIds.includes(ep.id);
                const count = episodeCounts[ep.id] ?? 0;
                const epText = tEp(ep);
                return (
                  <button
                    key={ep.id}
                    type="button"
                    className={`tamako-ep-photo-card${
                      count === 0 ? " is-empty" : ""
                    }`}
                    aria-pressed={selected}
                    onClick={() => onToggleEpisode(ep.id)}
                    onMouseEnter={() =>
                      onHoverHint(
                        `${epText.shortLabel} "${epText.title}" · ${epText.seasonLabel}`
                      )
                    }
                  >
                    <span className="tamako-photo-mount tamako-ep-card-img">
                      <img
                        src={ep.stillUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="tamako-ep-card-meta">
                      <span className="tamako-ep-card-top">
                        <strong>{epText.shortLabel}</strong>
                        <span className="tamako-ep-count">{count}</span>
                      </span>
                      <span className="tamako-ep-card-title">{epText.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {showEpisodes && showCharacters && <hr className="tamako-stitch-hr" />}

        {showCharacters && (
          <section
            className="tamako-filter-block"
            aria-label={ui.filterCharSectionAria}
          >
            <div className="tamako-filter-header">
              <span className="tamako-filter-label">
                <FloretIcon size={15} />
                <span>{ui.filterCharHeading}</span>
              </span>

              <div
                className="tamako-chip-row"
                role="group"
                aria-label={ui.filterMatchAria}
              >
                <button
                  type="button"
                  className="tamako-ep-chip"
                  aria-pressed={filter.charMatch === "or"}
                  onClick={() => onChangeCharMatch("or")}
                >
                  {ui.filterMatchOr}
                </button>
                <button
                  type="button"
                  className="tamako-ep-chip"
                  aria-pressed={filter.charMatch === "and"}
                  onClick={() => onChangeCharMatch("and")}
                >
                  {ui.filterMatchAnd}
                </button>
              </div>
            </div>

            <div className="tamako-circle-groups">
              {CIRCLE_KEYS.map((circleKey) => {
                const members = CHARACTERS.filter((c) => c.circle === circleKey);
                return (
                  <div key={circleKey} className="tamako-circle-box">
                    <p className="tamako-circle-title">
                      {ui.circleLabels[circleKey]}
                    </p>
                    <div className="tamako-char-avatar-grid">
                      {members.map((ch) => {
                        const selected = filter.characterIds.includes(ch.id);
                        const count = characterCounts[ch.id] ?? 0;
                        const chText = tChar(ch);
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            className={`tamako-char-avatar-btn${
                              count === 0 ? " is-empty" : ""
                            }`}
                            aria-pressed={selected}
                            onClick={() => onToggleCharacter(ch.id)}
                            onMouseEnter={() =>
                              onHoverHint(`${chText.name}: ${chText.deraComment}`)
                            }
                          >
                            <img
                              className="tamako-char-avatar-img"
                              src={ch.avatarUrl}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              style={{ borderColor: ch.badgeBorder }}
                            />
                            <span className="tamako-char-avatar-info">
                              <strong>{chText.name}</strong>
                              <small>{chText.affiliation}</small>
                            </span>
                            <span className="tamako-ep-count">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
