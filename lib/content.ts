import { t } from "@/lib/translations";

export type Content = typeof t;
type Json = Record<string, unknown>;

/** Immutable deep-merge of `over` onto `base` (objects only; arrays/scalars replaced). */
export function deepMerge<T>(base: T, over: unknown): T {
  if (!over || typeof over !== "object" || Array.isArray(over)) return base;
  if (!base || typeof base !== "object" || Array.isArray(base)) return base;
  const out: Json = { ...(base as Json) };
  for (const [k, ov] of Object.entries(over as Json)) {
    const bv = (base as Json)[k];
    if (
      ov && typeof ov === "object" && !Array.isArray(ov) &&
      bv && typeof bv === "object" && !Array.isArray(bv)
    ) {
      out[k] = deepMerge(bv, ov);
    } else if (ov !== undefined && ov !== null) {
      out[k] = ov;
    }
  }
  return out as T;
}

/** Merge saved CMS overrides on top of the default translations. */
export function mergeContent(overrides: unknown): Content {
  return deepMerge(t, overrides);
}
