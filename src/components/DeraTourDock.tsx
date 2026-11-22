import { useState } from "react";
import { useI18n } from "../i18n";

export function DeraTourDock({
  mascotHint,
  activeIndex,
  totalFiltered,
  onPrev,
  onNext,
  onOpenCurrentModal,
}: {
  mascotHint: string;
  activeIndex: number;
  totalFiltered: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenCurrentModal: () => void;
}) {
  const { ui } = useI18n();
  const [bubbleOpen, setBubbleOpen] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 900 : false
  );

  return (
    <div className="tamako-dera-dock" aria-label={ui.deraDockAria}>
      {bubbleOpen && (
        <div className="tamako-dera-bubble" aria-live="polite">
          <div className="tamako-dera-bubble-head">
            <strong>{ui.deraGuideTitle}</strong>
            <button
              type="button"
              className="tamako-dera-collapse"
              aria-label={ui.deraToggleCollapseAria}
              onClick={() => setBubbleOpen(false)}
            >
              {ui.collapseBtn}
            </button>
          </div>
          <p>{mascotHint}</p>
        </div>
      )}

      <div className="tamako-dera-bar">
        <button
          type="button"
          className="tamako-dera-avatar-btn"
          aria-expanded={bubbleOpen}
          aria-label={
            bubbleOpen ? ui.deraToggleCollapseAria : ui.deraToggleExpandAria
          }
          onClick={() => setBubbleOpen((v) => !v)}
        >
          <img
            src="/images/avatars/dera.webp"
            alt="Dera"
            width={40}
            height={40}
          />
        </button>

        <button
          type="button"
          className="tamako-pill-btn"
          disabled={totalFiltered === 0}
          onClick={onPrev}
          aria-label={ui.prevSceneAria}
        >
          {ui.prevScene}
        </button>

        <button
          type="button"
          className="tamako-pill-btn is-custard"
          disabled={totalFiltered === 0}
          onClick={onOpenCurrentModal}
        >
          {ui.tourLabel}
          {totalFiltered > 0
            ? ` ${activeIndex >= 0 ? activeIndex + 1 : 1}/${totalFiltered}`
            : " 0"}
        </button>

        <button
          type="button"
          className="tamako-pill-btn is-primary"
          disabled={totalFiltered === 0}
          onClick={onNext}
          aria-label={ui.nextSceneAria}
        >
          {ui.nextScene}
        </button>
      </div>
    </div>
  );
}
