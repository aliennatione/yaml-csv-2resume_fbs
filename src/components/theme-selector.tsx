"use client";

import * as React from "react";
import { THEMES, type Theme } from "@/lib/themes";

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-selector" className="text-sm font-medium">Theme:</label>
      <select
        id="theme-selector"
        value={selectedTheme.id}
        onChange={(e) => {
          const newThemeId = e.target.value;
          const newTheme = THEMES.find((theme) => theme.id === newThemeId);
          if (newTheme) {
            onThemeChange(newTheme);
          }
        }}
        className="px-2 py-1 border rounded-md bg-background"
      >
        {THEMES.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}
