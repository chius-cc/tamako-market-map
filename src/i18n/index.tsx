import { createContext, useContext } from "react";
import type {
  Character,
  Episode,
  Locale,
  Location,
  StoryEvent,
} from "../types/tamako";
import { isValidLocale } from "../lib/urlState";
import { CHARACTERS_EN, CHARACTERS_JA } from "./charactersI18n";
import { EPISODES_EN, EPISODES_JA } from "./episodesI18n";
import { EVENTS_EN, EVENTS_JA } from "./eventsI18n";
import { LOCATIONS_EN, LOCATIONS_JA } from "./locationsI18n";
import { UI_MESSAGES, type UiMessages } from "./ui";

export const SUPPORTED_LOCALES: { id: Locale; label: string; aria: string }[] = [
  { id: "zh", label: "中", aria: "切换为简体中文" },
  { id: "en", label: "EN", aria: "Switch to English" },
  { id: "ja", label: "日", aria: "日本語に切り替え" },
];

export const LOCALE_STORAGE_KEY = "tamako-map-locale";

export function detectInitialLocale(search: string): Locale {
  const params = new URLSearchParams(search);
  const fromUrl = params.get("lang");
  if (isValidLocale(fromUrl)) return fromUrl;

  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isValidLocale(stored)) return stored;
    } catch {
      // Ignore storage access errors in private browsing
    }

    const nav = (window.navigator.language || "").toLowerCase();
    if (nav.startsWith("ja")) return "ja";
    if (nav.startsWith("en")) return "en";
    if (nav.startsWith("zh")) return "zh";
  }

  return "zh";
}

export interface LocalizedEpisode {
  shortLabel: string;
  title: string;
  secondaryTitle: string;
  seasonLabel: string;
  releaseInfo: string;
  staff: Episode["staff"];
  summary: string;
}

export function localizeEpisode(ep: Episode, locale: Locale): LocalizedEpisode {
  if (locale === "en") {
    const en = EPISODES_EN[ep.id];
    if (en) {
      return {
        shortLabel: en.shortLabel,
        title: en.title,
        secondaryTitle: ep.titleJa,
        seasonLabel: en.seasonLabel,
        releaseInfo: en.releaseInfo,
        staff: en.staff,
        summary: en.summary,
      };
    }
  }
  if (locale === "ja") {
    const ja = EPISODES_JA[ep.id];
    const en = EPISODES_EN[ep.id];
    if (ja) {
      return {
        shortLabel: ja.shortLabel,
        title: ja.title,
        secondaryTitle: en?.title ?? "",
        seasonLabel: ja.seasonLabel,
        releaseInfo: ja.releaseInfo,
        staff: ja.staff,
        summary: ja.summary,
      };
    }
  }
  return {
    shortLabel: ep.shortLabel,
    title: ep.titleZh,
    secondaryTitle: ep.titleJa,
    seasonLabel: ep.seasonLabel,
    releaseInfo: ep.releaseInfo,
    staff: ep.staff,
    summary: ep.summaryZh,
  };
}

export interface LocalizedCharacter {
  name: string;
  secondaryName: string;
  cv: string;
  affiliation: string;
  bio: string;
  deraComment: string;
}

export function localizeCharacter(
  ch: Character,
  locale: Locale
): LocalizedCharacter {
  if (locale === "en") {
    const en = CHARACTERS_EN[ch.id];
    if (en) {
      return {
        name: en.name,
        secondaryName: ch.nameJa,
        cv: en.cv,
        affiliation: en.affiliation,
        bio: en.bio,
        deraComment: en.deraComment,
      };
    }
  }
  if (locale === "ja") {
    const ja = CHARACTERS_JA[ch.id];
    const en = CHARACTERS_EN[ch.id];
    if (ja) {
      return {
        name: ja.name,
        secondaryName: en?.name ?? "",
        cv: ja.cv,
        affiliation: ja.affiliation,
        bio: ja.bio,
        deraComment: ja.deraComment,
      };
    }
  }
  return {
    name: ch.nameZh,
    secondaryName: ch.nameJa,
    cv: ch.cv,
    affiliation: ch.affiliation,
    bio: ch.bioZh,
    deraComment: ch.deraComment,
  };
}

export interface LocalizedLocation {
  name: string;
  secondaryName: string;
  subtitle: string;
  areaLabel: string;
  realWorldRef: string;
  realWorldAddress?: string;
  description: string;
  settingNote: string;
}

export function localizeLocation(
  loc: Location,
  locale: Locale
): LocalizedLocation {
  if (locale === "en") {
    const en = LOCATIONS_EN[loc.id];
    if (en) {
      return {
        name: en.name,
        secondaryName: loc.nameJa,
        subtitle: en.subtitle,
        areaLabel: en.areaLabel,
        realWorldRef: en.realWorldRef,
        realWorldAddress: en.realWorldAddress,
        description: en.description,
        settingNote: en.settingNote,
      };
    }
  }
  if (locale === "ja") {
    const ja = LOCATIONS_JA[loc.id];
    const en = LOCATIONS_EN[loc.id];
    if (ja) {
      return {
        name: ja.name,
        secondaryName: en?.name ?? "",
        subtitle: ja.subtitle,
        areaLabel: ja.areaLabel,
        realWorldRef: ja.realWorldRef,
        realWorldAddress: ja.realWorldAddress,
        description: ja.description,
        settingNote: ja.settingNote,
      };
    }
  }
  return {
    name: loc.nameZh,
    secondaryName: loc.nameJa,
    subtitle: loc.subtitle,
    areaLabel: loc.areaLabel,
    realWorldRef: loc.realWorldRef,
    realWorldAddress: loc.realWorldAddress,
    description: loc.descriptionZh,
    settingNote: loc.settingNoteZh,
  };
}

export interface LocalizedEvent {
  title: string;
  secondaryTitle: string;
  sceneBadge: string;
  seasonTime: string;
  tags: string[];
  summary: string;
  quotePrimary?: string;
  quoteSecondary?: string;
  staffNote: string;
  pilgrimageTip?: string;
}

export function localizeEvent(
  ev: StoryEvent,
  locale: Locale
): LocalizedEvent {
  if (locale === "en") {
    const en = EVENTS_EN[ev.id];
    if (en) {
      return {
        title: en.title,
        secondaryTitle: ev.titleJa,
        sceneBadge: en.sceneBadge,
        seasonTime: en.seasonTime,
        tags: en.tags,
        summary: en.summary,
        quotePrimary: ev.quoteJa,
        quoteSecondary: en.quoteTranslated,
        staffNote: en.staffNote,
        pilgrimageTip: en.pilgrimageTip,
      };
    }
  }
  if (locale === "ja") {
    const ja = EVENTS_JA[ev.id];
    const en = EVENTS_EN[ev.id];
    if (ja) {
      return {
        title: ja.title,
        secondaryTitle: en?.title ?? "",
        sceneBadge: ja.sceneBadge,
        seasonTime: ja.seasonTime,
        tags: ja.tags,
        summary: ja.summary,
        quotePrimary: ev.quoteJa,
        quoteSecondary: undefined,
        staffNote: ja.staffNote,
        pilgrimageTip: ja.pilgrimageTip,
      };
    }
  }
  return {
    title: ev.titleZh,
    secondaryTitle: ev.titleJa,
    sceneBadge: ev.sceneBadge,
    seasonTime: ev.seasonTime,
    tags: ev.tags,
    summary: ev.summaryZh,
    quotePrimary: ev.quoteJa,
    quoteSecondary: ev.quoteZh,
    staffNote: ev.staffNoteZh,
    pilgrimageTip: ev.pilgrimageTipZh,
  };
}

export interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  ui: UiMessages;
  tEp: (ep: Episode) => LocalizedEpisode;
  tChar: (ch: Character) => LocalizedCharacter;
  tLoc: (loc: Location) => LocalizedLocation;
  tEvent: (ev: StoryEvent) => LocalizedEvent;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: "zh",
  setLocale: () => {},
  ui: UI_MESSAGES.zh,
  tEp: (ep) => localizeEpisode(ep, "zh"),
  tChar: (ch) => localizeCharacter(ch, "zh"),
  tLoc: (loc) => localizeLocation(loc, "zh"),
  tEvent: (ev) => localizeEvent(ev, "zh"),
});

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
