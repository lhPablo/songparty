import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const songSearchRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "60 s"),
  prefix: "ratelimit:songs",
});
