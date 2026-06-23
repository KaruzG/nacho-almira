import { describe, it, expect } from "vitest";
import { formatTime } from "../../lib/youtube";

describe("formatTime", () => {
  it("returns '0:00' for 0", () => {
    expect(formatTime(0)).toBe("0:00");
  });

  it("returns '0:00' for negative values", () => {
    expect(formatTime(-5)).toBe("0:00");
  });

  it("returns '0:00' for NaN", () => {
    expect(formatTime(NaN)).toBe("0:00");
  });

  it("returns '0:00' for Infinity", () => {
    expect(formatTime(Infinity)).toBe("0:00");
  });

  it("pads seconds with a leading zero", () => {
    expect(formatTime(65)).toBe("1:05");
  });

  it("formats exact minutes correctly", () => {
    expect(formatTime(120)).toBe("2:00");
  });

  it("truncates decimal seconds instead of rounding", () => {
    expect(formatTime(59.9)).toBe("0:59");
  });

  it("handles values over one hour", () => {
    expect(formatTime(3661)).toBe("61:01");
  });
});