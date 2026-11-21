import { useEffect, useRef } from "react";
import { CHARACTERS } from "../data/characters";
import { EPISODES } from "../data/episodes";
import { hasActiveFilters } from "../lib/filter";
import type {
  CharacterCircle,
  CharMatchMode,
  FilterState,
  WorkKind,
} from "../types/tamako";
import type { FilterTabFocus } from "./Header";
import { FloretIcon } from "./Icons";

const CIRCLES: { key: CharacterCircle; label: string }[] = [
  { key: "kitashirakawa", label: "「たまや」北白川家" },
  { key: "school", label: "兔山高校同级生" },
  { key: "ooji", label: "「RICE CAKE Oh!ZEE」大路家" },
  { key: "southern", label: "南国皇室来客" },
  { key: "arcade", label: "兔山商店街街坊店主" },
];

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

  const workOptions: { id: "all" | WorkKind; label: string }[] = [
    { id: "all", label: "全部作品" },
    { id: "tv", label: "TV 全 12 话" },
    { id: "movie", label: "剧场版《玉子爱情故事》" },
    { id: "short", label: "短片《德拉酱》" },
  ];

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
              <span>剧情筛选与关键词检索</span>
            </h2>
            <p className="tamako-drawer-sub">
              当前命中 <strong>{matchedCount}</strong> / {totalCount} 幕动画剧情 · 地图实时同步高亮
            </p>
          </div>

          <div className="tamako-chip-row">
            {active && (
              <button
                type="button"
                className="tamako-pill-btn is-custard"
                onClick={onReset}
              >
                重置全部
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              className="tamako-pill-btn is-primary"
              onClick={onClose}
            >
              查看地图 ({matchedCount}) ✓
            </button>
          </div>
        </div>

        {/* Search Input + Tab Switcher */}
        <div className="tamako-drawer-controls">
          <div className="tamako-search-input-wrap" style={{ maxWidth: "none", flex: "1 1 260px" }}>
            <label htmlFor="tamako-drawer-search" className="sr-only">
              搜索事件标题、名台词、店铺或人物
            </label>
            <input
              ref={searchRef}
              id="tamako-drawer-search"
              type="search"
              className="tamako-search-input"
              placeholder="搜名台词、纸杯电话、鸭川、恋之歌、店铺名..."
              value={filter.query}
              onChange={(e) => onChangeQuery(e.target.value)}
            />
            {filter.query && (
              <button
                type="button"
                className="tamako-search-clear"
                aria-label="清空搜索词"
                onClick={() => onChangeQuery("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="tamako-chip-row" role="tablist" aria-label="筛选分类视图">
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={tabFocus === "all" || tabFocus === "search"}
              onClick={() => onChangeTabFocus("all")}
            >
              全部选项
            </button>
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={tabFocus === "episodes"}
              onClick={() => onChangeTabFocus("episodes")}
            >
              🎬 集数与剧场版
            </button>
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={tabFocus === "characters"}
              onClick={() => onChangeTabFocus("characters")}
            >
              🐰 人物头像 (22)
            </button>
          </div>
        </div>

        {showEpisodes && (
          <section className="tamako-filter-block" aria-label="按作品与集数筛选">
            <div className="tamako-filter-header">
              <span className="tamako-filter-label">
                <FloretIcon size={15} />
                <span>作品范围与集数剧照选择（支持多选）</span>
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
                  清除已选集数 ({filter.episodeIds.length})
                </button>
              )}
            </div>

            <div className="tamako-work-tabs" style={{ marginBottom: 12 }}>
              {workOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="tamako-work-tab"
                  aria-pressed={filter.work === opt.id}
                  onClick={() => onChangeWork(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="tamako-ep-photo-grid">
              {visibleEpisodes.map((ep) => {
                const selected = filter.episodeIds.includes(ep.id);
                const count = episodeCounts[ep.id] ?? 0;
                return (
                  <button
                    key={ep.id}
                    type="button"
                    className={`tamako-ep-photo-card${count === 0 ? " is-empty" : ""}`}
                    aria-pressed={selected}
                    onClick={() => onToggleEpisode(ep.id)}
                    onMouseEnter={() =>
                      onHoverHint(`${ep.shortLabel}《${ep.titleZh}》· ${ep.seasonLabel}`)
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
                        <strong>{ep.shortLabel}</strong>
                        <span className="tamako-ep-count">{count}</span>
                      </span>
                      <span className="tamako-ep-card-title">{ep.titleZh}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {showEpisodes && showCharacters && <hr className="tamako-stitch-hr" />}

        {showCharacters && (
          <section className="tamako-filter-block" aria-label="按人物头像筛选">
            <div className="tamako-filter-header">
              <span className="tamako-filter-label">
                <FloretIcon size={15} />
                <span>按登场人物筛选（真实角色肖像 · 可多选）</span>
              </span>

              <div className="tamako-chip-row" role="group" aria-label="多角色匹配逻辑">
                <button
                  type="button"
                  className="tamako-ep-chip"
                  aria-pressed={filter.charMatch === "or"}
                  onClick={() => onChangeCharMatch("or")}
                >
                  任一登场 (OR)
                </button>
                <button
                  type="button"
                  className="tamako-ep-chip"
                  aria-pressed={filter.charMatch === "and"}
                  onClick={() => onChangeCharMatch("and")}
                >
                  同时同场 (AND)
                </button>
              </div>
            </div>

            <div className="tamako-circle-groups">
              {CIRCLES.map((circle) => {
                const members = CHARACTERS.filter((c) => c.circle === circle.key);
                return (
                  <div key={circle.key} className="tamako-circle-box">
                    <p className="tamako-circle-title">{circle.label}</p>
                    <div className="tamako-char-avatar-grid">
                      {members.map((ch) => {
                        const selected = filter.characterIds.includes(ch.id);
                        const count = characterCounts[ch.id] ?? 0;
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
                              onHoverHint(`${ch.nameZh}：${ch.deraComment}`)
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
                              <strong>{ch.nameZh}</strong>
                              <small>{ch.affiliation}</small>
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
