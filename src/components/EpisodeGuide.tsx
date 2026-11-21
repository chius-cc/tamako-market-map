import { useState } from "react";
import { EPISODES } from "../data/episodes";
import { FloretIcon } from "./Icons";

export function EpisodeGuide({
  onSelectEpisodeOnly,
}: {
  onSelectEpisodeOnly: (episodeId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="episode-guide"
      className="tamako-island"
      aria-label="全剧集与剧场版编年资料"
    >
      <div className="tamako-island-inner">
        <h2 className="tamako-section-title" style={{ marginBottom: 14 }}>
          <FloretIcon size={20} />
          <span>全作话数档案与制作名单</span>
        </h2>

        <p className="tamako-prose" style={{ margin: "0 0 18px" }}>
          点击下方晴空蓝手风琴，即可查看《玉子市场》TV 全 12 话、剧场版《玉子爱情故事》与短片《南国之岛的德拉酱》的官方标题、主创名单，并一键筛选单话事件。
        </p>

        <button
          type="button"
          className="tamako-accordion"
          aria-expanded={expanded}
          aria-controls="tamako-episode-table"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span>
            {expanded
              ? "收起 TV 全 12 话 ＋ 剧场版档案表"
              : "展开 TV 全 12 话 ＋ 剧场版《玉子爱情故事》全话档案表"}
          </span>
          <span className="tamako-accordion-icon" aria-hidden="true" />
        </button>

        {expanded && (
          <div id="tamako-episode-table" className="tamako-accordion-panel">
            <dl className="tamako-chart">
              {EPISODES.map((ep) => (
                <div key={ep.id} className="tamako-chart-row">
                  <dt>
                    <div>
                      <div>{ep.shortLabel}</div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, opacity: 0.9 }}>
                        {ep.seasonLabel}
                      </div>
                    </div>
                  </dt>
                  <dd>
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                        }}
                      >
                        <strong style={{ fontSize: "1rem", color: "var(--tamako-ink)" }}>
                          {ep.titleZh}
                        </strong>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--tamako-ink-muted)",
                          }}
                        >
                          {ep.titleJa}
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
                        {ep.summaryZh}
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
                          脚本：{ep.staff.script} · 分镜：{ep.staff.storyboard} ·
                          演出：{ep.staff.director} · 作监：{ep.staff.animationDirector}
                        </span>
                        <div className="tamako-chip-row">
                          <button
                            type="button"
                            className="tamako-pill-btn is-primary"
                            style={{ minHeight: 30, padding: "2px 12px", fontSize: "0.78rem" }}
                            onClick={() => {
                              onSelectEpisodeOnly(ep.id);
                              document
                                .getElementById("map-stage")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            在地图只看本话
                          </button>
                          <a
                            className="tamako-pill-btn"
                            style={{ minHeight: 30, padding: "2px 12px", fontSize: "0.78rem" }}
                            href={ep.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            官网介绍
                          </a>
                        </div>
                      </div>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
