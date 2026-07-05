"use client";

import { createContext, useContext, type ReactNode } from "react";
import { t } from "@/lib/translations";
import type { Content } from "@/lib/content";

const ContentContext = createContext<Content>(t);

export function ContentProvider({
  value,
  children,
}: {
  value: Content;
  children: ReactNode;
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

/** Merged site content (defaults + saved CMS overrides). Drop-in for the old `t`. */
export function useContent(): Content {
  return useContext(ContentContext);
}
