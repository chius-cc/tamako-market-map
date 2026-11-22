import { useEffect, useState } from "react";
import { CHARACTER_MAP } from "../data/characters";
import { SUPPORTED_LOCALES, useI18n } from "../i18n";
import type { FilterState, MapViewMode } from "../types/tamako";
import { FloretIcon } from "./Icons";

export type FilterTabFocus = "all" | "episodes" | "characters" | "search";

export function Header({
  view,
  filter,
  arcadeCount,
  kyotoCount,
  matchedCount,
  totalCharacters,
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
  totalCharacters: number;
  onSwitchView: (next: MapViewMode) => void;
  onOpenFilter: (focus: FilterTabFocus) => void;
  onOpenDirectory: () => void;
  onOpenArchive: () => void;
  onHoverHint: (hint: string) => void;
}) {
  const { locale, setLocale, ui } = useI18n();
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
  const totalActiveFilterBadges =
    epFilterCount + selectedChars.length + (filter.query.trim() ? 1 : 0);

  return (
    <header className={`tamako-topbar${menuOpen ? " is-open" : ""}`}>
      <div className="tamako-topbar-awning" aria-hidden="true" />
      <div className="tamako-topbar-inner">
        {/* Brand */}
        <div
          className="tamako-brand-lockup"
          onMouseEnter={() => onHoverHint(ui.hintBrand)}
        >
          <img
            className="tamako-brand-avatar"
            src="/images/avatars/tamako.webp"
            alt=""
            width={36}
            height={36}
          />
          <div className="tamako-brand-text">
            <h1 className="tamako-brand-title">{ui.brandTitle}</h1>
            <span className="tamako-brand-sub">{ui.brandSub}</span>
          </div>
        </div>

        {/* Center Core Switcher: Dual Interactive Maps */}
        <div
          className="tamako-view-switch tamako-topbar-switch"
          role="group"
          aria-label={ui.viewSwitchAria}
        >
          <button
            type="button"
            className="tamako-view-btn"
            aria-pressed={view === "arcade"}
            onClick={() => onSwitchView("arcade")}
            onMouseEnter={() => onHoverHint(ui.hintSwitchArcade)}
          >
            <span>{ui.viewArcade}</span>
            <span className="tamako-ep-count">{arcadeCount}</span>
          </button>
          <button
            type="button"
            className="tamako-view-btn"
            aria-pressed={view === "kyoto"}
            onClick={() => onSwitchView("kyoto")}
            onMouseEnter={() => onHoverHint(ui.hintSwitchKyoto)}
          >
            <span>{ui.viewKyoto}</span>
            <span className="tamako-ep-count">{kyotoCount}</span>
          </button>
        </div>

        {/* Right Action Navigation + Trilingual Switcher */}
        <div className="tamako-topbar-right">
          <nav className="tamako-topbar-actions" aria-label={ui.navAria}>
            <button
              type="button"
              className={`tamako-nav-pill${epFilterCount > 0 ? " is-active" : ""}`}
              onClick={() => {
                setMenuOpen(false);
                onOpenFilter("episodes");
              }}
              onMouseEnter={() => onHoverHint(ui.hintOpenEpisodes)}
            >
              <FloretIcon size={13} />
              <span>{ui.navEpisodes}</span>
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
              onMouseEnter={() => onHoverHint(ui.hintOpenCharacters)}
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
              <span>{ui.navCharacters}</span>
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
              onMouseEnter={() => onHoverHint(ui.hintOpenSearch)}
            >
              <span>{ui.navSearch}</span>
              {filter.query.trim() && <span className="tamako-nav-badge">1</span>}
            </button>

            <button
              type="button"
              className="tamako-nav-pill is-custard"
              onClick={() => {
                setMenuOpen(false);
                onOpenDirectory();
              }}
              onMouseEnter={() => onHoverHint(ui.hintOpenDirectory)}
            >
              <span>{ui.navDirectory}</span>
              <span className="tamako-ep-count">{matchedCount}</span>
            </button>

            <button
              type="button"
              className="tamako-nav-pill"
              onClick={() => {
                setMenuOpen(false);
                onOpenArchive();
              }}
              onMouseEnter={() => onHoverHint(ui.hintOpenArchive)}
            >
              <span>{ui.navArchive}</span>
            </button>
          </nav>

          {/* Always-Accessible Trilingual Segmented Pill (中 / EN / 日) */}
          <div
            className="tamako-lang-switch"
            role="group"
            aria-label={ui.langSwitchAria}
          >
            {SUPPORTED_LOCALES.map((item) => (
              <button
                key={item.id}
                type="button"
                className="tamako-lang-btn"
                aria-pressed={locale === item.id}
                aria-label={item.aria}
                onClick={() => setLocale(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Quick Filter + Burger Menu */}
          <div className="tamako-mobile-triggers">
            <button
              type="button"
              className={`tamako-mobile-quickbtn${
                totalActiveFilterBadges > 0 ? " is-active" : ""
              }`}
              onClick={() => {
                setMenuOpen(false);
                onOpenFilter("all");
              }}
            >
              <span>{ui.mobileFilterBtn}</span>
              {totalActiveFilterBadges > 0 && (
                <span className="tamako-nav-badge">{totalActiveFilterBadges}</span>
              )}
            </button>

            <button
              type="button"
              className="tamako-burger"
              aria-expanded={menuOpen}
              aria-label={
                menuOpen ? ui.mobileMenuCloseAria : ui.mobileMenuOpenAria
              }
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile #FFB1B5 Drawer Menu */}
      {menuOpen && (
        <div
          className="tamako-mobile-menu"
          role="dialog"
          aria-label={ui.mobileDialogAria}
        >
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("episodes");
            }}
          >
            {ui.mobileEpisodes}
          </button>
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("characters");
            }}
          >
            {ui.mobileCharacters(totalCharacters)}
          </button>
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenFilter("search");
            }}
          >
            {ui.mobileSearch}
          </button>
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenDirectory();
            }}
          >
            {ui.mobileDirectory(matchedCount)}
          </button>
          <button
            type="button"
            className="tamako-mobile-menu-btn"
            onClick={() => {
              setMenuOpen(false);
              onOpenArchive();
            }}
          >
            {ui.mobileArchive}
          </button>
        </div>
      )}
    </header>
  );
}
