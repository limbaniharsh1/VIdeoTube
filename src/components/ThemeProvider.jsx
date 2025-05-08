// If you're using TypeScript, name it `theme-provider.tsx`
// If you're using JavaScript, use `.js` or `.jsx` and remove types

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
