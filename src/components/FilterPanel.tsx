import { CHARACTERS } from "../data/characters";
import { EPISODES } from "../data/episodes";
import type {
  CharacterCircle,
  CharMatchMode,
  FilterState,
  WorkKind,
} from "../types/tamako";
import { hasActiveFilters } from "../lib/filter";
import { FloretIcon } from "./Icons";

const CIRCLES: { key: CharacterCircle; label: string }[] = [
  { key: "kitashirakawa", label: "「たまや」北白川家" },
  { key: "school", label: "兔山高校同级生" },
  { key: "ooji", label: "「Oh!ZEE」大路家" },
  { key: "southern", label: "南国来客" },
  { key: "arcade", label: "兔山商店街街坊" },
];

export function FilterPanel({
  filter,
  matchedCount,
  totalCount,
  episodeCounts,
  characterCounts,
  onChangeWork,
  onToggleEpisode,
  onToggleCharacter,
  onChangeCharMatch,
  onChangeQuery,
  onReset,
  onHoverHint,
}: {
  filter: FilterState;
  matchedCount: number;
  totalCount: number;
  episodeCounts: Record<string, number>;
  characterCounts: Record<string, number>;
  onChangeWork: (work: "all" | WorkKind) => void;
  onToggleEpisode: (epId: string) => void;
  onToggleCharacter: (charId: string) => void;
  onChangeCharMatch: (mode: CharMatchMode) => void;
  onChangeQuery: (query: string) => void;
  onReset: () => void;
  onHoverHint: (hint: string) => void;
}) {
  const active = hasActiveFilters(filter);
  const visibleEpisodes =
    filter.work === "all"
      ? EPISODES
      : EPISODES.filter((ep) => ep.kind === filter.work);

  const workOptions: { id: "all" | WorkKind; label: string }[] = [
    { id: "all", label: "全部作品" },
    { id: "tv", label: "TV 动画（全 12 话）" },
    { id: "movie", label: "剧场版《玉子爱情故事》" },
    { id: "short", label: "短片《南国之岛的德拉酱》" },
  ];

  return (
    <section
      id="filter-panel"
      className="tamako-island tamako-island--wide tamako-filter-island"
      aria-label="剧情与角色筛选器"
    >
      <div className="tamako-island-inner">
        <div className="tamako-filter-top">
          <div className="tamako-work-tabs" role="group" aria-label="按作品筛选">
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

          <div className="tamako-search-row">
            <div className="tamako-search-input-wrap">
              <label htmlFor="tamako-search-field" className="sr-only">
                搜索事件标题、台词、地点或角色
              </label>
              <input
                id="tamako-search-field"
                type="search"
                className="tamako-search-input"
                placeholder="搜台词、店铺、鸭川、纸杯电话..."
                value={filter.query}
                onChange={(e) => onChangeQuery(e.target.value)}
              />
              {filter.query && (
                <button
                  type="button"
                  className="tamako-search-clear"
                  aria-label="清空搜索关键词"
                  onClick={() => onChangeQuery("")}
                >
                  ×
                </button>
              )}
            </div>

            {active && (
              <button
                type="button"
                className="tamako-pill-btn is-custard"
                onClick={onReset}
              >
                重置全部筛选（当前 {matchedCount}/{totalCount}）
              </button>
            )}
          </div>
        </div>

        <hr className="tamako-stitch-hr" />

        {/* 集数筛选 */}
        <div className="tamako-filter-block">
          <div className="tamako-filter-header">
            <span className="tamako-filter-label">
              <FloretIcon size={15} />
              <span>按集数 / 剧场版筛选（支持多选）</span>
            </span>
            {filter.episodeIds.length > 0 && (
              <button
                type="button"
                className="tamako-pill-btn"
                onClick={() =>
                  filter.episodeIds.forEach((id) => onToggleEpisode(id))
                }
              >
                清除集数（已选 {filter.episodeIds.length}）
              </button>
            )}
          </div>

          <div className="tamako-chip-row" role="group" aria-label="集数胶囊筛选">
            {visibleEpisodes.map((ep) => {
              const selected = filter.episodeIds.includes(ep.id);
              const count = episodeCounts[ep.id] ?? 0;
              return (
                <button
                  key={ep.id}
                  type="button"
                  className={`tamako-ep-chip${count === 0 ? " is-empty" : ""}`}
                  aria-pressed={selected}
                  onClick={() => onToggleEpisode(ep.id)}
                  onMouseEnter={() =>
                    onHoverHint(`${ep.shortLabel}《${ep.titleZh}》· ${ep.seasonLabel}`)
                  }
                  onFocus={() =>
                    onHoverHint(`${ep.shortLabel}《${ep.titleZh}》· ${ep.seasonLabel}`)
                  }
                >
                  <span>{ep.shortLabel}</span>
                  <span className="tamako-ep-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="tamako-stitch-hr" />

        {/* 角色生活圈分组筛选 */}
        <div className="tamako-filter-block">
          <div className="tamako-filter-header">
            <span className="tamako-filter-label">
              <FloretIcon size={15} />
              <span>按人物关系圈筛选（点击可多选）</span>
            </span>

            <div className="tamako-chip-row" role="group" aria-label="多角色匹配模式">
              <button
                type="button"
                className="tamako-ep-chip"
                aria-pressed={filter.charMatch === "or"}
                onClick={() => onChangeCharMatch("or")}
              >
                含任一角色（OR）
              </button>
              <button
                type="button"
                className="tamako-ep-chip"
                aria-pressed={filter.charMatch === "and"}
                onClick={() => onChangeCharMatch("and")}
              >
                同时同场（AND）
              </button>
            </div>
          </div>

          <div className="tamako-circle-groups">
            {CIRCLES.map((circle) => {
              const members = CHARACTERS.filter((c) => c.circle === circle.key);
              return (
                <div key={circle.key} className="tamako-circle-box">
                  <p className="tamako-circle-title">{circle.label}</p>
                  <div className="tamako-chip-row">
                    {members.map((ch) => {
                      const selected = filter.characterIds.includes(ch.id);
                      const count = characterCounts[ch.id] ?? 0;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          className={`tamako-char-chip${count === 0 ? " is-empty" : ""}`}
                          aria-pressed={selected}
                          onClick={() => onToggleCharacter(ch.id)}
                          onMouseEnter={() =>
                            onHoverHint(`${ch.nameZh}：${ch.deraComment}`)
                          }
                          onFocus={() =>
                            onHoverHint(`${ch.nameZh}：${ch.deraComment}`)
                          }
                        >
                          <span
                            className="tamako-char-dot"
                            style={{ backgroundColor: ch.badgeBorder }}
                          />
                          <span>{ch.nameZh}</span>
                          <span className="tamako-ep-count">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
