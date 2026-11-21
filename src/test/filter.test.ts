import { describe, expect, it } from "vitest";
import { STORY_EVENTS } from "../data/events";
import {
  countByCharacter,
  countByEpisode,
  DEFAULT_FILTER_STATE,
  filterEvents,
  getLocationEvents,
  getPreferredViewForEvent,
} from "../lib/filter";
import { parseUrlState, serializeUrlState } from "../lib/urlState";

describe("Event filtering and URL state synchronization", () => {
  it("returns all events sorted chronologically under default filter", () => {
    const res = filterEvents(STORY_EVENTS, DEFAULT_FILTER_STATE);
    expect(res).toHaveLength(STORY_EVENTS.length);
    for (let i = 1; i < res.length; i++) {
      expect(res[i].order).toBeGreaterThan(res[i - 1].order);
    }
  });

  it("filters by work kind (tv / movie / short)", () => {
    const movieEvents = filterEvents(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      work: "movie",
    });
    expect(movieEvents.length).toBeGreaterThanOrEqual(7);
    expect(movieEvents.every((e) => e.episodeId === "movie")).toBe(true);
  });

  it("filters by multiple episode IDs", () => {
    const res = filterEvents(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      episodeIds: ["ep01", "ep09"],
    });
    expect(res.length).toBeGreaterThanOrEqual(5);
    expect(
      res.every((e) => e.episodeId === "ep01" || e.episodeId === "ep09")
    ).toBe(true);
  });

  it("filters by multiple characters in OR and AND modes", () => {
    const orRes = filterEvents(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      characterIds: ["mochizou", "shiori"],
      charMatch: "or",
    });
    const andRes = filterEvents(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      characterIds: ["mochizou", "tamako"],
      charMatch: "and",
    });
    expect(orRes.length).toBeGreaterThan(andRes.length);
    expect(
      andRes.every(
        (e) =>
          e.characterIds.includes("mochizou") &&
          e.characterIds.includes("tamako")
      )
    ).toBe(true);
  });

  it("searches across Chinese/Japanese titles, quotes, locations, and characters", () => {
    const cupEvents = filterEvents(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      query: "纸杯电话",
    });
    expect(cupEvents.some((e) => e.id === "ev-m07-kyoto-station-climax")).toBe(
      true
    );

    const japaneseSearch = filterEvents(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      query: "鴨川デルタ",
    });
    expect(
      japaneseSearch.some((e) => e.id === "ev-m03-kamogawa-confession")
    ).toBe(true);
  });

  it("computes episode and character counts accurately", () => {
    const epCounts = countByEpisode(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      characterIds: ["choi"],
    });
    expect(epCounts.ep07).toBeGreaterThan(0);
    expect(epCounts.ep01).toBe(0);

    const charCounts = countByCharacter(STORY_EVENTS, {
      ...DEFAULT_FILTER_STATE,
      work: "movie",
    });
    expect(charCounts.tamako).toBeGreaterThan(0);
    expect(charCounts.mochizou).toBeGreaterThan(0);
  });

  it("resolves location events and preferred views properly", () => {
    const arcadeTamaya = getLocationEvents(STORY_EVENTS, "tamaya-shop", "arcade");
    expect(arcadeTamaya.length).toBeGreaterThanOrEqual(4);

    const kyotoStation = getLocationEvents(STORY_EVENTS, "kyoto-station", "kyoto");
    expect(kyotoStation.some((e) => e.id === "ev-m07-kyoto-station-climax")).toBe(
      true
    );

    const climaxEvent = kyotoStation.find(
      (e) => e.id === "ev-m07-kyoto-station-climax"
    )!;
    const pref = getPreferredViewForEvent(climaxEvent, "arcade");
    expect(pref.view).toBe("kyoto");
    expect(pref.locationId).toBe("kyoto-station");
  });

  it("serializes and parses URL query state losslessly while dropping invalid IDs", () => {
    const serialized = serializeUrlState({
      view: "kyoto",
      filter: {
        work: "movie",
        episodeIds: ["movie", "ep11"],
        characterIds: ["tamako", "mochizou"],
        charMatch: "and",
        query: "鸭川",
      },
      eventId: "ev-m03-kamogawa-confession",
    });

    const parsed = parseUrlState(serialized);
    expect(parsed.view).toBe("kyoto");
    expect(parsed.filter.work).toBe("movie");
    expect(parsed.filter.episodeIds).toEqual(["movie", "ep11"]);
    expect(parsed.filter.characterIds).toEqual(["tamako", "mochizou"]);
    expect(parsed.filter.charMatch).toBe("and");
    expect(parsed.filter.query).toBe("鸭川");
    expect(parsed.eventId).toBe("ev-m03-kamogawa-confession");

    const sanitized = parseUrlState(
      "?view=invalid&ep=ep01,unknown&char=tamako,bad&event=nope"
    );
    expect(sanitized.view).toBe("arcade");
    expect(sanitized.filter.episodeIds).toEqual(["ep01"]);
    expect(sanitized.filter.characterIds).toEqual(["tamako"]);
    expect(sanitized.eventId).toBeNull();
  });
});
