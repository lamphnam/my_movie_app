---
applyTo: "src/**/*.{css,ts,tsx,js,jsx}"
---

## UI Theming rules

- When using shadcn/ui tokens, only edit CSS variables in globals.css (do not hardcode colors in components).
- Prefer semantic tokens: background/foreground/card/border/primary/accent/ring.
- Prefer subtle elevation: 1 border + 1 shadow max.
- No multi-layer gradients/glows unless explicitly requested.
