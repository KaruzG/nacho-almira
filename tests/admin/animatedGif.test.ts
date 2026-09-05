import { expect, it } from "vitest";
import sharp from "sharp";
import { readFileSync } from "node:fs";

it("the GIF browser fixture contains two distinct decoded frames", async () => {
  const source = readFileSync("cypress/support/media-page.tsx", "utf8");
  const base64 = source.match(/data:image\/gif;base64,([^"]+)/)![1];
  const bytes = Buffer.from(base64, "base64");
  const gif = sharp(bytes, { animated: true });
  expect((await gif.metadata()).pages).toBe(2);
  const { data, info } = await gif.raw().toBuffer({ resolveWithObject: true });
  expect(data.subarray(0, info.channels)).not.toEqual(data.subarray(info.channels, info.channels * 2));
});
