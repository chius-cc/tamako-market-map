import { useState } from "react";
import { CHARACTER_MAP } from "../data/characters";
import { EPISODE_MAP, EPISODES } from "../data/episodes";
import { LOCATION_MAP } from "../data/locations";
import { getPreferredViewForEvent } from "../lib/filter";
import type { MapViewMode, StoryEvent } from "../types/tamako";
import { FloretIcon, SceneIcon } from "./Icons";

type GroupMode = "episode" | "area";

const AREA_ORDER = [
  { id: "arcade", label: "兔山商店街内部" },
  { id: "demachi", label: "出町桝形与出町双叶片区" },
  { id: "kamogawa", label: "鸭川三角洲与下鸭神社片区" },
  { id: "fujinomori", label: "京阪藤森与兔山高校片区" },
  { id: "central", label: "JR 京都站与市中心片区" },
];

export function EventDirectory({
  events,
  activeView,
  onLocateEvent,
  onOpenModal,
  onResetFilters,
}: {
  events: StoryEvent[];
  activeView: MapViewMode;
  onLocateEvent: (view: MapViewMode, locationId: string, eventId: string) => void;
  onOpenModal: (eventId: string) => void;
  onResetFilters: () => void;
}) {
  const [groupMode, setGroupMode] = useState<GroupMode>("episode");

  const groups: { key: string; title: string; subtitle?: string; items: StoryEvent[] }[] = [];

  if (groupMode === "episode") {
    for (const ep of EPISODES) {
      const items = events.filter((e) => e.episodeId === ep.id);
      if (items.length > 0) {
        groups.push({
          key: ep.id,
          title: `${ep.shortLabel} · ${ep.titleZh}`,
          subtitle: `${ep.titleJa}（${ep.seasonLabel}）`,
          items,
        });
      }
    }
  } else {
    for (const area of AREA_ORDER) {
      const items = events.filter((e) => {
        const primaryLoc = e.arcadeLocationId
          ? LOCATION_MAP[e.arcadeLocationId]
          : e.kyotoLocationId
            ? LOCATION_MAP[e.kyotoLocationId]
            : undefined;
        if (!primaryLoc) return false;
        if (area.id === "arcade") {
          return primaryLoc.area === "arcade";
        }
        const kyotoLoc = e.kyotoLocationId ? LOCATION_MAP[e.kyotoLocationId] : undefined;
        return kyotoLoc?.area === area.id && !e.arcadeLocationId;
      });
      if (items.length > 0) {
        groups.push({
          key: area.id,
          title: area.label,
          items,
        });
      }
    }
  }

  return (
    <section
      id="event-directory"
      className="tamako-island"
      aria-label="剧情事件分组手账目录"
    >
      <div className="tamako-island-inner">
        <div className="tamako-directory-toolbar">
          <div>
            <h2 className="tamako-section-title">
              <FloretIcon size={20} />
              <span>剧情事件手账索引</span>
            </h2>
            <p className="tamako-prose" style={{ margin: "6px 0 0", fontSize: "0.9rem" }}>
              无论是手机端浏览还是按章节顺读，都可以直接在这里检索并一键跳回对应地图坐标。
            </p>
          </div>

          <div className="tamako-chip-row" role="group" aria-label="列表分组方式">
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={groupMode === "episode"}
              onClick={() => setGroupMode("episode")}
            >
              按集数时间序
            </button>
            <button
              type="button"
              className="tamako-ep-chip"
              aria-pressed={groupMode === "area"}
              onClick={() => setGroupMode("area")}
            >
              按圣地片区
            </button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="tamako-sidebar-empty" style={{ textAlign: "center", padding: 28 }}>
            <p style={{ margin: "0 0 12px", fontWeight: 700 }}>
              没有找到符合当前筛选条件的剧情事件。试试放宽角色或清空关键词吧！
            </p>
            <button
              type="button"
              className="tamako-pill-btn is-primary"
              onClick={onResetFilters}
            >
              显示全部剧情事件
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
                  <span style={{ fontSize: "0.8rem", color: "var(--tamako-ink-muted)" }}>
                    {grp.subtitle}
                  </span>
                )}
              </div>

              <div className="tamako-event-grid">
                {grp.items.map((ev) => {
                  const ep = EPISODE_MAP[ev.episodeId];
                  const locName =
                    (ev.arcadeLocationId && LOCATION_MAP[ev.arcadeLocationId]?.nameZh) ||
                    (ev.kyotoLocationId && LOCATION_MAP[ev.kyotoLocationId]?.nameZh) ||
                    "";
                  const pref = getPreferredViewForEvent(ev, activeView);

                  return (
                    <article key={ev.id} className="tamako-event-card">
                      <div>
                        <div className="tamako-event-card-top">
                          <span className={`tamako-scene-tag tone-${ev.tone}`}>
                            <SceneIcon kind={ev.icon} size={13} />
                            <span>{ep?.shortLabel ?? ev.sceneBadge}</span>
                          </span>
                          <span
                            className="tamako-photo-mount"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--tamako-ink)",
                            }}
                            aria-hidden="true"
                          >
                            <SceneIcon kind={ev.icon} size={18} />
                          </span>
                        </div>

                        <h4 className="tamako-event-title" style={{ marginTop: 10 }}>
                          {ev.titleZh}
                        </h4>
                        <p
                          style={{
                            margin: "4px 0 8px",
                            fontSize: "0.78rem",
                            color: "var(--tamako-ink-muted)",
                            fontWeight: 700,
                          }}
                        >
                          地点：{locName} · {ev.seasonTime}
                        </p>
                        <p className="tamako-event-summary">{ev.summaryZh}</p>
                      </div>

                      <div>
                        <div className="tamako-event-meta" style={{ marginBottom: 10 }}>
                          {ev.characterIds.slice(0, 4).map((cid) => {
                            const ch = CHARACTER_MAP[cid];
                            if (!ch) return null;
                            return (
                              <span
                                key={cid}
                                className="tamako-char-mini"
                                style={{
                                  backgroundColor: ch.badgeBg,
                                  color: ch.badgeInk,
                                  border: `1px solid ${ch.badgeBorder}`,
                                }}
                              >
                                {ch.nameZh}
                              </span>
                            );
                          })}
                        </div>

                        <div className="tamako-event-actions">
                          {pref.locationId && (
                            <button
                              type="button"
                              className="tamako-pill-btn is-custard"
                              style={{ minHeight: 34, padding: "4px 12px", fontSize: "0.8rem" }}
                              onClick={() => {
                                onLocateEvent(pref.view, pref.locationId!, ev.id);
                                document
                                  .getElementById("map-stage")
                                  ?.scrollIntoView({ behavior: "smooth" });
                              }}
                            >
                              在地图定位
                            </button>
                          )}
                          <button
                            type="button"
                            className="tamako-pill-btn is-primary"
                            style={{ minHeight: 34, padding: "4px 12px", fontSize: "0.8rem" }}
                            onClick={() => onOpenModal(ev.id)}
                          >
                            剧情详情
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
    </section>
  );
}
