# Copilot Instructions (UI refactor)

## Goal

Refactor the UI theme to look brand-authentic (not "AI purple + glossy Claude vibe").
Keep shadcn/ui semantic CSS variables and Tailwind usage.

## Non-negotiables

- Do NOT use violet/purple/indigo as primary, accent, ring, glow colors.
- Remove "premium gradient everywhere" styling. Gradients allowed only in 1–2 places (hero/CTA), never as global default.
- Avoid glassmorphism + glow stacks by default. Prefer solid surfaces + subtle borders + realistic shadows.
- Avoid "AI-coded" utility classes: shimmer/glow/float should be opt-in and used only for skeleton/loading states.
- Keep contrast accessible on dark background.

## Process

1. Audit where these classes/tokens are used: text-gradient*, glass-*, hover-glow, hover-lift, animate-shimmer, animate-float, animate-pulse-glow.
2. Replace theme tokens in globals.css:
   - Change --primary/--accent/--ring away from purple.
   - Make borders/surfaces more neutral (less blue/purple cast).
3. Replace colored shadows:
   - Never `shadow-primary/*`. Use neutral shadows (rgba(0,0,0,...) or hsl(var(--foreground)/...)).
4. Reduce motion:
   - Add prefers-reduced-motion: reduce to disable non-essential animations.
5. Icon policy:
   - Use ONE icon system consistently.
   - Avoid "sparkles/wand/zap" default AI vibes unless context requires it.

## Acceptance criteria

- Primary color is NOT purple/indigo.
- No colored glow shadows on hover/focus besides subtle ring.
- Only one gradient token exists and it appears in at most 2 components.
- Animations are disabled under prefers-reduced-motion.
- Visual looks calmer: solid cards, readable borders, fewer “premium” effects.
