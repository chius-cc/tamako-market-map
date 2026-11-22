import { describe, expect, it } from "vitest";
import { CHARACTERS } from "../data/characters";
import { EPISODES } from "../data/episodes";
import { STORY_EVENTS } from "../data/events";
import { LOCATIONS } from "../data/locations";
import { getMapLabelExpression } from "../data/tamakoMapStyle";
import {
  localizeCharacter,
  localizeEpisode,
  localizeEvent,
  localizeLocation,
} from "../i18n";
import { CHARACTERS_EN, CHARACTERS_JA } from "../i18n/charactersI18n";
import { EPISODES_EN, EPISODES_JA } from "../i18n/episodesI18n";
import { EVENTS_EN, EVENTS_JA } from "../i18n/eventsI18n";
import { LOCATIONS_EN, LOCATIONS_JA } from "../i18n/locationsI18n";
import { UI_MESSAGES } from "../i18n/ui";
import { DEFAULT_FILTER_STATE, filterEvents } from "../lib/filter";
import { parseUrlState, serializeUrlState } from "../lib/urlState";
import type { Locale } from "../types/tamako";

const LOCALES: Locale[] = ["zh", "en", "ja"];

describe("Trilingual (zh / en / ja) coverage & localization", () => {
  it("provides complete English and Japanese translations for all 14 episodes", () => {
    for (const ep of EPISODES) {
      expect(EPISODES_EN[ep.id], `missing EPISODES_EN[${ep.id}]`).toBeDefined();
      expect(EPISODES_JA[ep.id], `missing EPISODES_JA[${ep.id}]`).toBeDefined();

      for (const locale of LOCALES) {
        const loc = localizeEpisode(ep, locale);
        expect(loc.shortLabel.length).toBeGreaterThan(0);
        expect(loc.title.length).toBeGreaterThan(0);
        expect(loc.summary.length).toBeGreaterThan(10);
      }
    }
  });

  it("provides complete English and Japanese translations for all 22 characters", () => {
    for (const ch of CHARACTERS) {
      expect(
        CHARACTERS_EN[ch.id],
        `missing CHARACTERS_EN[${ch.id}]`
      ).toBeDefined();
      expect(
        CHARACTERS_JA[ch.id],
        `missing CHARACTERS_JA[${ch.id}]`
      ).toBeDefined();

      for (const locale of LOCALES) {
        const loc = localizeCharacter(ch, locale);
        expect(loc.name.length).toBeGreaterThan(0);
        expect(loc.affiliation.length).toBeGreaterThan(0);
        expect(loc.bio.length).toBeGreaterThan(10);
        expect(loc.deraComment.length).toBeGreaterThan(5);
      }
    }
  });

  it("provides complete English and Japanese translations for all 28 locations", () => {
    for (const spot of LOCATIONS) {
      expect(
        LOCATIONS_EN[spot.id],
        `missing LOCATIONS_EN[${spot.id}]`
      ).toBeDefined();
      expect(
        LOCATIONS_JA[spot.id],
        `missing LOCATIONS_JA[${spot.id}]`
      ).toBeDefined();

      for (const locale of LOCALES) {
        const loc = localizeLocation(spot, locale);
        expect(loc.name.length).toBeGreaterThan(0);
        expect(loc.subtitle.length).toBeGreaterThan(0);
        expect(loc.description.length).toBeGreaterThan(10);
      }
    }
  });

  it("provides complete English and Japanese translations for all 43 story events", () => {
    for (const ev of STORY_EVENTS) {
      expect(EVENTS_EN[ev.id], `missing EVENTS_EN[${ev.id}]`).toBeDefined();
      expect(EVENTS_JA[ev.id], `missing EVENTS_JA[${ev.id}]`).toBeDefined();

      if (ev.quoteJa) {
        expect(
          EVENTS_EN[ev.id]?.quoteTranslated,
          `missing English quote for ${ev.id}`
        ).toBeDefined();
      }

      for (const locale of LOCALES) {
        const loc = localizeEvent(ev, locale);
        expect(loc.title.length).toBeGreaterThan(0);
        expect(loc.sceneBadge.length).toBeGreaterThan(0);
        expect(loc.summary.length).toBeGreaterThan(10);
        expect(loc.staffNote.length).toBeGreaterThan(5);
      }
    }
  });

  it("supports cross-language search queries (English, Japanese, Chinese)", () => {
    const enSearch = filterEvents(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      query: "paper-cup phone",
    });
    expect(
      enSearch.some((e) => e.id === "ev-m07-kyoto-station-climax")
    ).toBe(true);

    const jaSearch = filterEvents(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      query: "糸電話",
    });
    expect(
      jaSearch.some((e) => e.id === "ev-11-string-phone-night")
    ).toBe(true);
  });

  it("serializes and parses ?lang= URL parameter and MapLibre label expressions", () => {
    for (const locale of LOCALES) {
      expect(UI_MESSAGES[locale].brandTitle.length).toBeGreaterThan(0);
      expect(Array.isArray(getMapLabelExpression(locale))).toBe(true);
    }

    const qsEn = serializeUrlState({
      lang: "en",
      view: "kyoto",
      filter: DEFAULT_FILTER_STATE,
      eventId: null,
    });
    expect(qsEn).toContain("lang=en");
    expect(parseUrlState(qsEn).lang).toBe("en");

    const qsJa = serializeUrlState({
      lang: "ja",
      view: "arcade",
      filter: DEFAULT_FILTER_STATE,
      eventId: null,
    });
    expect(qsJa).toBe("?lang=ja");
    expect(parseUrlState(qsJa).lang).toBe("ja");
  });
});
