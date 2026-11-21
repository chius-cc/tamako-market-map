import { describe, expect, it } from "vitest";
import { CHARACTER_MAP, CHARACTERS } from "../data/characters";
import { EPISODE_MAP, EPISODES } from "../data/episodes";
import { STORY_EVENTS } from "../data/events";
import {
  ARCADE_LOCATIONS,
  KYOTO_LOCATIONS,
  LOCATION_MAP,
  LOCATIONS,
} from "../data/locations";
import { STORY_ROUTES } from "../data/routes";

describe("Tamako Market & Love Story curated dataset integrity", () => {
  it("covers all 12 TV episodes, the movie, and the short", () => {
    expect(EPISODES).toHaveLength(14);
    const ids = EPISODES.map((e) => e.id);
    for (let i = 1; i <= 12; i++) {
      expect(ids).toContain(`ep${String(i).padStart(2, "0")}`);
    }
    expect(ids).toContain("movie");
    expect(ids).toContain("short");
  });

  it("ensures every episode has at least one curated story event", () => {
    for (const ep of EPISODES) {
      const count = STORY_EVENTS.filter((ev) => ev.episodeId === ep.id).length;
      expect(count, `episode ${ep.id} should have >=1 event`).toBeGreaterThanOrEqual(1);
    }
  });

  it("validates every event's foreign keys (episode, locations, characters) and unique order", () => {
    const orders = new Set<number>();
    const ids = new Set<string>();

    for (const ev of STORY_EVENTS) {
      expect(ids.has(ev.id), `duplicate event id ${ev.id}`).toBe(false);
      ids.add(ev.id);

      expect(orders.has(ev.order), `duplicate order ${ev.order}`).toBe(false);
      orders.add(ev.order);

      expect(EPISODE_MAP[ev.episodeId], `missing episode ${ev.episodeId}`).toBeDefined();
      expect(
        Boolean(ev.arcadeLocationId || ev.kyotoLocationId),
        `event ${ev.id} must have at least one location`
      ).toBe(true);

      if (ev.arcadeLocationId) {
        const loc = LOCATION_MAP[ev.arcadeLocationId];
        expect(loc, `missing arcade location ${ev.arcadeLocationId}`).toBeDefined();
        expect(loc.arcadeCoord).toBeDefined();
      }
      if (ev.kyotoLocationId) {
        const loc = LOCATION_MAP[ev.kyotoLocationId];
        expect(loc, `missing kyoto location ${ev.kyotoLocationId}`).toBeDefined();
        expect(loc.kyotoCoord).toBeDefined();
      }

      expect(ev.characterIds.length).toBeGreaterThan(0);
      for (const cid of ev.characterIds) {
        expect(CHARACTER_MAP[cid], `missing character ${cid}`).toBeDefined();
      }
    }
  });

  it("covers all 13 arcade locations with at least one event", () => {
    expect(ARCADE_LOCATIONS).toHaveLength(13);
    for (const loc of ARCADE_LOCATIONS) {
      const count = STORY_EVENTS.filter(
        (ev) => ev.arcadeLocationId === loc.id
      ).length;
      expect(count, `arcade location ${loc.id} should have >=1 event`).toBeGreaterThanOrEqual(1);
    }
  });

  it("ensures all Kyoto GPS coordinates fall within Kyoto Prefecture bounds", () => {
    expect(KYOTO_LOCATIONS.length).toBeGreaterThanOrEqual(14);
    for (const loc of KYOTO_LOCATIONS) {
      const coord = loc.kyotoCoord!;
      expect(coord.lat).toBeGreaterThan(34.9);
      expect(coord.lat).toBeLessThan(35.1);
      expect(coord.lng).toBeGreaterThan(135.7);
      expect(coord.lng).toBeLessThan(135.85);
    }
  });

  it("validates linked location references and route point IDs", () => {
    for (const loc of LOCATIONS) {
      if (loc.linkedKyotoId) {
        expect(LOCATION_MAP[loc.linkedKyotoId]?.kyotoCoord).toBeDefined();
      }
      if (loc.linkedArcadeId) {
        expect(LOCATION_MAP[loc.linkedArcadeId]?.arcadeCoord).toBeDefined();
      }
    }
    for (const route of STORY_ROUTES) {
      expect(route.path.length).toBeGreaterThanOrEqual(2);
      for (const locId of route.locationIds) {
        expect(LOCATION_MAP[locId]?.kyotoCoord).toBeDefined();
      }
    }
    expect(CHARACTERS.length).toBe(15);
  });
});
