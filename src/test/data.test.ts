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
import { TAMAKO_KYOTO_MAP_STYLE } from "../data/tamakoMapStyle";

const PUBLIC_IMAGE_FILES = new Set(
  Object.keys(import.meta.glob("/public/images/**/*.webp")).map((p) =>
    p.replace(/^\/public/, "")
  )
);

function assertPublicAssetExists(assetUrl: string, label: string) {
  expect(
    assetUrl.startsWith("/images/"),
    `${label} should start with /images/`
  ).toBe(true);
  expect(
    PUBLIC_IMAGE_FILES.has(assetUrl),
    `missing file in public/ for ${label}: ${assetUrl}`
  ).toBe(true);
}

describe("Tamako Market & Love Story v2 curated dataset & assets integrity", () => {
  it("covers all 12 TV episodes, the movie, and the short with valid still images", () => {
    expect(EPISODES).toHaveLength(14);
    const ids = EPISODES.map((e) => e.id);
    for (let i = 1; i <= 12; i++) {
      expect(ids).toContain(`ep${String(i).padStart(2, "0")}`);
    }
    expect(ids).toContain("movie");
    expect(ids).toContain("short");

    for (const ep of EPISODES) {
      assertPublicAssetExists(ep.stillUrl, `episode ${ep.id} stillUrl`);
    }
  });

  it("ensures every episode has at least one curated story event", () => {
    for (const ep of EPISODES) {
      const count = STORY_EVENTS.filter((ev) => ev.episodeId === ep.id).length;
      expect(count, `episode ${ep.id} should have >=1 event`).toBeGreaterThanOrEqual(1);
    }
  });

  it("validates all 22 characters, real avatar images, and event appearances", () => {
    expect(CHARACTERS).toHaveLength(22);
    for (const ch of CHARACTERS) {
      assertPublicAssetExists(ch.avatarUrl, `character ${ch.id} avatarUrl`);
      const appearances = STORY_EVENTS.filter((ev) =>
        ev.characterIds.includes(ch.id)
      ).length;
      expect(
        appearances,
        `character ${ch.id} should appear in >= 1 event`
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it("validates every event's foreign keys, unique order, and real scene still file", () => {
    const orders = new Set<number>();
    const ids = new Set<string>();

    for (const ev of STORY_EVENTS) {
      expect(ids.has(ev.id), `duplicate event id ${ev.id}`).toBe(false);
      ids.add(ev.id);

      expect(orders.has(ev.order), `duplicate order ${ev.order}`).toBe(false);
      orders.add(ev.order);

      assertPublicAssetExists(ev.stillUrl, `event ${ev.id} stillUrl`);

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

  it("covers all 13 arcade and 15 Kyoto locations with real stills and valid owner references", () => {
    expect(ARCADE_LOCATIONS).toHaveLength(13);
    expect(KYOTO_LOCATIONS).toHaveLength(15);

    for (const loc of ARCADE_LOCATIONS) {
      const count = STORY_EVENTS.filter(
        (ev) => ev.arcadeLocationId === loc.id
      ).length;
      expect(count, `arcade location ${loc.id} should have >=1 event`).toBeGreaterThanOrEqual(1);
    }

    for (const loc of LOCATIONS) {
      assertPublicAssetExists(loc.imageUrl, `location ${loc.id} imageUrl`);
      for (const cid of loc.ownerCharacterIds ?? []) {
        expect(CHARACTER_MAP[cid], `invalid owner ${cid} on ${loc.id}`).toBeDefined();
      }
      if (loc.linkedKyotoId) {
        expect(LOCATION_MAP[loc.linkedKyotoId]?.kyotoCoord).toBeDefined();
      }
      if (loc.linkedArcadeId) {
        expect(LOCATION_MAP[loc.linkedArcadeId]?.arcadeCoord).toBeDefined();
      }
    }

    for (const loc of KYOTO_LOCATIONS) {
      const coord = loc.kyotoCoord!;
      expect(coord.lat).toBeGreaterThan(34.9);
      expect(coord.lat).toBeLessThan(35.1);
      expect(coord.lng).toBeGreaterThan(135.7);
      expect(coord.lng).toBeLessThan(135.85);
    }
  });

  it("validates Kyoto routes and custom Tamako MapLibre vector style specification", () => {
    for (const route of STORY_ROUTES) {
      expect(route.path.length).toBeGreaterThanOrEqual(2);
      for (const locId of route.locationIds) {
        expect(LOCATION_MAP[locId]?.kyotoCoord).toBeDefined();
      }
    }

    expect(TAMAKO_KYOTO_MAP_STYLE.version).toBe(8);
    expect(TAMAKO_KYOTO_MAP_STYLE.sources.openmaptiles).toBeDefined();
    expect(TAMAKO_KYOTO_MAP_STYLE.layers.length).toBeGreaterThanOrEqual(15);
  });
});
