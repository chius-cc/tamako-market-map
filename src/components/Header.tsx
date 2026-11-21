import { useEffect, useState } from "react";
import { FloretIcon } from "./Icons";

export function Header({
  onHoverHint,
}: {
  onHoverHint: (hint: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const navItems = [
    {
      href: "#filter-panel",
      label: "筛选剧情",
      hint: "按 TV 第 1–12 话、剧场版《玉子爱情故事》或角色来筛选事件もち！",
    },
    {
      href: "#map-stage",
      label: "双景地图",
      hint: "在兔山商店街平面图和真实京都巡礼地图之间自由切换もち！",
    },
    {
      href: "#event-directory",
      label: "事件手账",
      hint: "用卡片流顺一遍每一话的暖心瞬间和名台词もち。",
    },
    {
      href: "#episode-guide",
      label: "全话导览",
      hint: "展开晴空蓝胶囊，查看 TV 全 12 话和剧场版的制作名单もち。",
    },
  ];

  return (
    <header
      className={`tamako-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}
    >
      <div className="tamako-nav-shell">
        <a
          href="#top"
          className="tamako-brand"
          onMouseEnter={() =>
            onHoverHint("欢迎来到兔山商店街！点选下方地图圆章开始逛街吧もち。")
          }
          onFocus={() =>
            onHoverHint("欢迎来到兔山商店街！点选下方地图圆章开始逛街吧もち。")
          }
        >
          <span className="tamako-brand-mark">
            <FloretIcon size={18} />
          </span>
          <span>兔山商店街剧情地图</span>
        </a>

        <button
          type="button"
          className="tamako-burger"
          aria-expanded={menuOpen}
          aria-controls="tamako-primary-nav"
          aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="tamako-primary-nav"
          className="tamako-nav-wrap"
          aria-label="页面主导航"
        >
          <ul className="tamako-nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={() => onHoverHint(item.hint)}
                  onFocus={() => onHoverHint(item.hint)}
                >
                  <FloretIcon size={14} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
