import type { MapViewMode } from "../types/tamako";
import { DeraBirdIcon, FloretIcon } from "./Icons";

export function HeroAwning({
  totalCount,
  matchedCount,
  activeView,
  mascotHint,
  onStartTour,
  onSwitchView,
}: {
  totalCount: number;
  matchedCount: number;
  activeView: MapViewMode;
  mascotHint: string;
  onStartTour: () => void;
  onSwitchView: (view: MapViewMode) => void;
}) {
  return (
    <section id="top" className="tamako-awning-band" aria-label="站点导览">
      <div className="tamako-hero-grid">
        <div className="tamako-hero-card">
          <div>
            <span className="tamako-hero-eyebrow">
              <FloretIcon size={14} />
              <span>玉子市场 × 玉子爱情故事 · 交互式圣地与剧情图鉴</span>
            </span>

            <div className="tamako-hero-title-row" style={{ marginTop: 14 }}>
              <div>
                <h1 className="tamako-display-lg">
                  人人都爱着某个人。
                  <br />
                  兔山商店街与京都剧情地图
                </h1>
                <p className="tamako-lead" style={{ marginTop: 10 }}>
                  从花店里的南国小鸟，到鸭川跳乌龟石的夕阳告白与京都站纸杯电话——
                  按集数、角色筛选全作 {totalCount} 个故事坐标。
                </p>
              </div>
              <div className="tamako-hero-vertical-poem" aria-hidden="true">
                あの娘はかわいい
                <br />
                もち屋の娘。
              </div>
            </div>
          </div>

          <div className="tamako-hero-stats">
            <span className="tamako-stat-pill is-sakura">
              当前命中 {matchedCount} / {totalCount} 幕剧情
            </span>
            <span className="tamako-stat-pill is-mint">
              TV 全 12 话 + 剧场版 + 短片
            </span>
            <span className="tamako-stat-pill is-apricot">
              13 处商店街平面点位
            </span>
            <span className="tamako-stat-pill is-sky">
              15 处京都实景巡礼坐标
            </span>
          </div>
        </div>

        <aside className="tamako-mascot-panel" aria-label="看板鸟德拉提示">
          <div className="tamako-mascot-head">
            <div className="tamako-mascot-avatar">
              <DeraBirdIcon size={40} />
            </div>
            <div>
              <p className="tamako-mascot-name">德拉·莫奇马兹（招牌向导）</p>
              <p className="tamako-mascot-sub">
                当前视角：{activeView === "arcade" ? "兔山商店街平面图" : "京都实景巡礼图"}
              </p>
            </div>
          </div>

          <div className="tamako-mascot-bubble" aria-live="polite">
            {mascotHint}
          </div>

          <div className="tamako-mascot-actions">
            <button
              type="button"
              className="tamako-pill-btn is-primary"
              onClick={onStartTour}
              disabled={matchedCount === 0}
            >
              按剧情顺序巡游
            </button>
            <button
              type="button"
              className="tamako-pill-btn is-custard"
              onClick={() =>
                onSwitchView(activeView === "arcade" ? "kyoto" : "arcade")
              }
            >
              {activeView === "arcade" ? "切换京都实景地图" : "切回兔山商店街"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
