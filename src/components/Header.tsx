import { useEffect, useState } from "react";
import { CHARACTER_MAP } from "../data/characters";
import type { FilterState, MapViewMode } from "../types/tamako";
import { FloretIcon } from "./Icons";

export type FilterTabFocus = "all" | "episodes" | "characters" | "search";

export function Header({
  view,
  filter,
  arcadeCount,
  kyotoCount,
  matchedCount,
  onSwitchView,
  onOpenFilter,
  onOpenDirectory,
  onOpenArchive,
  onHoverHint,
}: {
  view: MapViewMode;
  filter: FilterState;
  arcadeCount: number;
  kyotoCount: number;
  matchedCount: number;
  onSwitchView: (next: MapViewMode) => void;
  onOpenFilter: (focus: FilterTabFocus) => void;
  onOpenDirectory: () => void;
  onOpenArchive: () => void;
  onHoverHint: (hint: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const epFilterCount =
    filter.episodeIds.length + (filter.work !== "all" ? 1 : 0);
  const selectedChars = filter.characterIds
    .map((id) => CHARACTER_MAP[id])
    .filter(Boolean);

  return (
    <header className={`tamako-topbar${menuOpen ? " is-open" : ""}`}>
      <div className="tamako-topbar-awning" aria-hidden="true" />
      <div className="tamako-topbar-inner">
        {/* Brand */}
        <div
          className="tamako-brand-lockup"
          onMouseEnter={() =>
            onHoverHint("欢迎来到兔山商店街！点击地图上的剧照圆章即可探索剧情もち。")
          }
        >
          <img
            className="tamako-brand-avatar"
            src="/images/avatars/tamako.webp"
            alt=""
            width={36}
            height={36}
          />
          <div className="tamako-brand-text">
            <h1 className="tamako-brand-title">兔山剧情地图</h1>
            <span className="tamako-brand-sub">玉子市场 · 玉子爱情故事</span>
          </div>
        </div>

        {/* Center Core Switcher: Dual Interactive Maps */}
        <div
          className="tamako-view-switch tamako-topbar-switch"
          role="group"
          aria-label="核心地图视角切换"
        >
          <button
            type="button"
            className="tamako-view-btn"
            aria-pressed={view === "arcade"}
            onClick={() => onSwitchView("arcade")}
            onMouseEnter={() =>
              onHoverHint("切到兔山商店街手绘平面图，逛遍 13 处街坊店铺与二楼糸電話もち！")
            }
          >
            <span>🍡 兔山商店街</span>
            <span className="tamako-ep-count">{arcadeCount}</span>
          </button>
          <button
            type="button"
            className="tamako-view-btn"
            aria-pressed={view === "kyoto"}
            onClick={() => onSwitchView("kyoto")}
            onMouseEnter={() =>
              onHoverHint("切到和纸主题京都圣地地图，巡礼出町桝形、鸭川跳石、藤森与京都站もち！")
            }
          >
            <span>🗺️ 京都圣地地图</span>
            <span className="tamako-ep-count">{kyotoCount}</span>
          </button>
        </div>

        {/* Desktop & Tablet Action Navigation */}
        <nav className="tamako-topbar-actions" aria-label="地图功能导航">
          <button
            type="button"
            className={`tamako-nav-pill${epFilterCount > 0 ? " is-active" : ""}`}
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("episodes");
            }}
            onMouseEnter={() =>
              onHoverHint("按 TV 第 1–12 话、剧场版《玉子爱情故事》或短片筛选剧情もち！")
            }
          >
            <FloretIcon size={13} />
            <span>集数筛选</span>
            {epFilterCount > 0 && (
              <span className="tamako-nav-badge">{epFilterCount}</span>
            )}
          </button>

          <button
            type="button"
            className={`tamako-nav-pill${selectedChars.length > 0 ? " is-active" : ""}`}
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("characters");
            }}
            onMouseEnter={() =>
              onHoverHint("用真实人物头像筛选北白川家、高校同级生、大路家与商店街街坊もち！")
            }
          >
            {selectedChars.length > 0 ? (
              <span className="tamako-avatar-stack" aria-hidden="true">
                {selectedChars.slice(0, 3).map((ch) => (
                  <img key={ch.id} src={ch.avatarUrl} alt="" />
                ))}
              </span>
            ) : (
              <img
                className="tamako-nav-mini-avatar"
                src="/images/avatars/mochizou.webp"
                alt=""
              />
            )}
            <span>角色筛选</span>
            {selectedChars.length > 0 && (
              <span className="tamako-nav-badge">{selectedChars.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`tamako-nav-pill${filter.query.trim() ? " is-active" : ""}`}
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("search");
            }}
            onMouseEnter={() =>
              onHoverHint("搜索名台词、纸杯电话、鸭川、恋之歌或任意店铺名称もち！")
            }
          >
            <span>🔍 搜索</span>
            {filter.query.trim() && <span className="tamako-nav-badge">1</span>}
          </button>

          <button
            type="button"
            className="tamako-nav-pill is-custard"
            onClick={() => {
              setMenuOpen(false);
              onOpenDirectory();
            }}
            onMouseEnter={() =>
              onHoverHint("展开剧照事件手账，按集数或片区一览全部动画剧照卡片もち。")
            }
          >
            <span>📖 事件手账</span>
            <span className="tamako-ep-count">{matchedCount}</span>
          </button>

          <button
            type="button"
            className="tamako-nav-pill"
            onClick={() => {
              setMenuOpen(false);
              onOpenArchive();
            }}
            onMouseEnter={() =>
              onHoverHint("查看全 14 篇剧集主创名单与京都圣地巡礼礼仪指南もち。")
            }
          >
            <span>🗂️ 档案与巡礼</span>
          </button>
        </nav>

        {/* Mobile Quick Filter + Burger Menu */}
        <div className="tamako-mobile-triggers">
          <button
            type="button"
            className={`tamako-mobile-quickbtn${
              epFilterCount + selectedChars.length + (filter.query.trim() ? 1 : 0) > 0
                ? " is-active"
                : ""
            }`}
            aria-label="打开剧情与角色筛选"
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("all");
            }}
          >
            <span>筛选</span>
            {epFilterCount + selectedChars.length + (filter.query.trim() ? 1 : 0) > 0 && (
              <span className="tamako-nav-badge">
                {epFilterCount + selectedChars.length + (filter.query.trim() ? 1 : 0)}
              </span>
            )}
          </button>

          <button
            type="button"
            className="tamako-burger"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "关闭功能菜单" : "打开功能菜单"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile #FFB1B5 Drawer Menu */}
      {menuOpen && (
        <div className="tamako-mobile-menu" role="dialog" aria-label="移动端功能导航">
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("episodes");
            }}
          >
            🎬 按集数 / 剧场版筛选
          </button>
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("characters");
            }}
          >
            🐰 按人物头像筛选（22 人）
          </button>
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("search");
            }}
          >
            🔍 搜索台词 / 地点 / 剧情
          </button>
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenDirectory();
            }}
          >
            📖 打开剧照事件手账（{matchedCount} 幕）
          </button>
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenArchive();
            }}
          >
            🗂️ 全话制作档案 & 巡礼礼仪
          </button>
        </div>
      )}
    </header>
  );
}
