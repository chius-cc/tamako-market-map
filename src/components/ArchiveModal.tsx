import { useEffect, useRef, useState } from "react";
import { EPISODES } from "../data/episodes";
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
              <span>全话制作档案与京都圣地巡礼指南</span>
            </h2>
            <div className="tamako-chip-row" style={{ marginTop: 10 }}>
              <button
                type="button"
                className="tamako-ep-chip"
                aria-pressed={tab === "episodes"}
                onClick={() => setTab("episodes")}
              >
                📺 全 14 篇剧集档案表
              </button>
              <button
                type="button"
                className="tamako-ep-chip"
                aria-pressed={tab === "pilgrimage"}
                onClick={() => setTab("pilgrimage")}
              >
                ⛩️ 圣地巡礼礼仪 & 资料致谢
              </button>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            className="tamako-modal-close"
            aria-label="关闭档案弹窗"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {tab === "episodes" ? (
          <dl className="tamako-chart" style={{ marginTop: 16 }}>
            {EPISODES.map((ep) => (
              <div key={ep.id} className="tamako-chart-row">
                <dt>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div>{ep.shortLabel}</div>
                    <div style={{ fontSize: "0.74rem", fontWeight: 700, opacity: 0.92 }}>
                      {ep.seasonLabel}
                    </div>
                  </div>
                </dt>
                <dd>
                  <div className="tamako-archive-ep-row">
                    <div className="tamako-photo-mount tamako-archive-ep-still">
                      <img src={ep.stillUrl} alt={ep.titleZh} loading="lazy" decoding="async" />
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
                        <strong style={{ fontSize: "1rem", color: "var(--tamako-ink)" }}>
                          {ep.titleZh}
                        </strong>
                        <span style={{ fontSize: "0.8rem", color: "var(--tamako-ink-muted)" }}>
                          {ep.titleJa} · {ep.releaseInfo}
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
                        <span style={{ fontSize: "0.78rem", color: "var(--tamako-ink-muted)" }}>
                          脚本：{ep.staff.script} · 分镜：{ep.staff.storyboard} · 演出：{ep.staff.director} · 作监：{ep.staff.animationDirector}
                        </span>
                        <div className="tamako-chip-row">
                          <button
                            type="button"
                            className="tamako-pill-btn is-primary"
                            style={{ minHeight: 30, padding: "2px 12px", fontSize: "0.78rem" }}
                            onClick={() => {
                              onSelectEpisodeOnly(ep.id);
                              onClose();
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
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div style={{ marginTop: 18 }}>
            <div className="tamako-staff-reply" style={{ marginTop: 0 }}>
              街坊礼仪提示：出町桝形商店街是京都居民日常采买生活的拱廊街区，藤森站旁的京都圣母学院也是现役学校设施。实地圣地巡礼时，请勿踏入校园内部或堵塞店铺门口通道，拍摄时注意礼让并避免拍到路人与学生，一起温柔守护这份日常もち！
            </div>

            <dl className="tamako-chart" style={{ marginTop: 18 }}>
              <div className="tamako-chart-row">
                <dt>出町桝形 & 鸭川线</dt>
                <dd>
                  京阪「出町柳站」出站步行 2 分钟即达河合桥、鸭川三角洲跳石与出町桥，过桥便是名代豆饼老铺「出町双叶」与「出町桝形商店街」。
                </dd>
              </div>
              <div className="tamako-chart-row">
                <dt>藤森通学水岸线</dt>
                <dd>
                  由出町柳站乘京阪本线准急/普通约 20 分钟至「藤森站」，东口出站即是琵琶湖疏水沿岸、キトロ桥与师团桥通学步道。
                </dd>
              </div>
              <div className="tamako-chart-row">
                <dt>JR 京都站追车线</dt>
                <dd>
                  剧场版终幕舞台位于 JR 京都站中央口、南北自由通路与东海道新干线站台（入站台参观需购入场券，请勿妨碍旅客乘降）。
                </dd>
              </div>
              <div className="tamako-chart-row">
                <dt>官方与资料链接</dt>
                <dd>
                  <a href="https://tamakomarket.com/map/" target="_blank" rel="noopener noreferrer">
                    TV 官网兔山商店街地图
                  </a>
                  <span>·</span>
                  <a href="https://tamakolovestory.com/" target="_blank" rel="noopener noreferrer">
                    剧场版《玉子爱情故事》官网
                  </a>
                  <span>·</span>
                  <a href="https://masugata.demachi.jp/tamakomarket/" target="_blank" rel="noopener noreferrer">
                    出町桝形商店街圣地专页
                  </a>
                  <span>·</span>
                  <a href="https://github.com/chius-me/awesome-tamako-market" target="_blank" rel="noopener noreferrer">
                    awesome-tamako-market
                  </a>
                </dd>
              </div>
            </dl>

            <p style={{ margin: "12px 0 0", fontSize: "0.82rem", color: "var(--tamako-ink-muted)" }}>
              本站为爱好者制作的非官方交互式剧情与巡礼地图，动画剧照、人物立绘与设定版权归{" "}
              <strong>©京都アニメーション／うさぎ山商店街</strong>{" "}
              所有；京都主题矢量地图基于 MapLibre GL、OpenFreeMap 与 OpenStreetMap 数据定制绘制，托管于 Cloudflare Workers。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
