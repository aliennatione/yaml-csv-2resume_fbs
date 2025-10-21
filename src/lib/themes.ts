export interface Theme {
  id: string;
  name: string;
  path: string;
}

export const THEMES: Theme[] = [
  {
    id: "professional",
    name: "Professional",
    path: "/professional-theme.css",
  },
  {
    id: "creative",
    name: "Creative",
    path: "/creative-theme.css",
  },
];
