# 🎨 Design System — "A Day Inside Your Story"

## 1. Design Philosophy

The website should feel like a **personal cinematic experience**, not a traditional website.

The visual language should communicate:

- Warmth
- Nostalgia
- Intimacy
- Wonder
- Mystery
- Celebration
- Personalization

### Core Principle

> **Elegant enough to feel magical, personal enough to feel real.**

Avoid excessive visual effects.

Every animation, color, glow, shadow, and interaction should support the story.

---

# 2. Visual Direction

## Overall Aesthetic

**Cinematic + Dreamy + Nostalgic + Modern**

The design should combine:

- Dark cinematic environments
- Warm highlights
- Soft gradients
- Subtle glass surfaces
- Film-inspired photography
- Gentle particle effects
- Elegant typography
- Large amounts of negative space

The interface should feel closer to:

```text
Interactive Film
+
Digital Scrapbook
+
Dreamy Storybook
```

rather than:

```text
Dashboard
+
Landing Page
+
Generic Valentine's Template
```

---

# 3. Color System

Use a dark foundation with warm romantic accents.

## Base Colors

```text
Background / Deep Space
#09070D

Primary Surface
#12101A

Secondary Surface
#1A1723

Elevated Surface
#24202F
```

These colors should provide the foundation for the cinematic scenes.

---

## Text Colors

### Primary Text

```text
#FFF8F3
```

Used for:

- Main headings
- Important messages
- Hero text
- Final birthday message

### Secondary Text

```text
#CFC6D0
```

Used for:

- Supporting text
- Descriptions
- Memory metadata

### Muted Text

```text
#8F8793
```

Used sparingly for:

- Dates
- Chapter indicators
- Secondary metadata

---

# 4. Accent Colors

Use accents carefully.

## Rose

```text
#EFA6B8
```

Primary emotional accent.

Use for:

- Important highlights
- Hearts
- Selected states
- Small decorative elements

---

## Soft Pink

```text
#F6C6D5
```

Use for:

- Glow effects
- Secondary highlights
- Soft gradients

---

## Champagne

```text
#E8C98A
```

Use for:

- Birthday elements
- Candle light
- Premium details
- Special moments

This should be rare so that it feels meaningful.

---

## Lavender

```text
#B9A7D8
```

Use for:

- Dreamy environments
- Future chapter
- Cosmic details

---

# 5. Gradients

Gradients should be subtle.

## Cosmic Gradient

```text
#09070D → #161124 → #24182C
```

Use for:

- Galaxy scenes
- Chapter transitions
- Background environments

---

## Romantic Gradient

```text
#160C14 → #2A1421 → #3B1D30
```

Use for:

- Memory sections
- Emotional scenes
- Final message

---

## Golden Glow

```text
#241B10 → #3A2814
```

Use for:

- Birthday finale
- Candle light
- Special reveals

---

# 6. Typography

Typography should feel elegant and cinematic.

Use **two font families**:

### Display Font

Recommended:

```text
Cormorant Garamond
```

Alternative:

```text
Playfair Display
```

Use for:

- Chapter titles
- Emotional statements
- Large quotes
- Final birthday message

---

### UI / Body Font

Recommended:

```text
Inter
```

Alternative:

```text
Manrope
```

Use for:

- Buttons
- Navigation
- Metadata
- Descriptions
- Small labels

---

# 7. Type Scale

## Display

```text
Hero
64px — 88px
Weight: 400
Line-height: 0.95
```

Used for the main opening/final messages.

---

## H1

```text
48px — 64px
Weight: 400
Line-height: 1.05
```

---

## H2

```text
36px — 48px
Weight: 400
Line-height: 1.1
```

---

## H3

```text
24px — 32px
Weight: 500
Line-height: 1.2
```

---

## Body Large

```text
18px — 20px
Weight: 400
Line-height: 1.6
```

---

## Body

```text
16px
Weight: 400
Line-height: 1.6
```

---

## Caption

```text
12px — 14px
Weight: 500
Letter-spacing: 0.08em
```

Use uppercase for chapter labels and metadata.

---

# 8. Typography Rules

### Do

- Use large elegant headings.
- Keep emotional text short.
- Give headings plenty of breathing room.
- Use lowercase/sentence case for emotional content.
- Use uppercase only for small labels.

### Don't

- Use huge blocks of text.
- Use bold typography everywhere.
- Mix many font families.
- Use decorative fonts for body text.
- Overuse italic text.

---

# 9. Spacing System

Use a consistent 8px spacing system.

```text
4px
8px
12px
16px
24px
32px
48px
64px
80px
96px
128px
160px
```

### Common Usage

```text
8px   → tiny gaps
16px  → component internal spacing
24px  → card spacing
32px  → section spacing
48px  → content separation
64px  → major separation
96px+ → cinematic breathing room
```

---

# 10. Border Radius

Use soft rounded corners.

```text
Small
8px

Medium
14px

Large
20px

Extra Large
28px

Pill
999px
```

Recommended defaults:

```text
Cards → 20px
Buttons → 999px
Images → 20px
Modal → 28px
```

Avoid excessive rounding on every element.

---

# 11. Glassmorphism

Glass effects should be used sparingly.

## Glass Surface

Conceptually:

```text
background:
rgba(255,255,255,0.05)

border:
rgba(255,255,255,0.10)

backdrop-blur:
16px — 24px
```

Use for:

- Floating navigation
- Memory information panels
- Small overlays
- Chapter indicators

Do not use glassmorphism for every component.

---

# 12. Shadows & Glow

The experience should rely more on **soft light** than heavy shadows.

## Soft Shadow

Use subtle shadows for depth.

```text
0 20px 60px rgba(0,0,0,0.35)
```

---

## Rose Glow

Use subtle pink/rose glow around important elements.

```text
0 0 40px rgba(239,166,184,0.20)
```

---

## Candle Glow

Use a warm golden glow for the birthday finale.

```text
0 0 50px rgba(232,201,138,0.30)
```

Glow should fade naturally and never look like neon UI.

---

# 13. Buttons

Buttons should feel like part of the cinematic environment.

## Primary Button

Shape:

```text
Pill
```

Height:

```text
44px — 52px
```

Padding:

```text
20px — 28px
```

Typography:

```text
14px — 15px
Medium
```

Example:

```text
Continue →
```

---

## Secondary Button

Minimal transparent button.

Example:

```text
← Back
```

No heavy background.

---

## Button Interaction

### Default

Subtle.

### Hover

- Slight brightness increase
- 2–4px upward movement
- Soft glow

### Press

- Slight scale down
- Quick spring animation

Avoid aggressive animations.

---

# 14. Cards

Cards should feel like physical objects rather than UI components.

## Memory Card

Properties:

```text
Border radius: 20px
Overflow: hidden
Aspect ratio: 4 / 5
```

Use:

- High-quality image
- Soft shadow
- Very subtle border
- Optional glass metadata

---

## Memory Card Hover

On desktop:

```text
scale: 1.02
rotateX: subtle
rotateY: subtle
translateY: -4px
```

Add a very subtle glossy reflection.

---

# 15. Photography Style

Photos are one of the most important elements.

They should feel:

**real > polished**

Prefer:

- Real photos
- Slight film grain
- Natural colors
- Warm lighting
- Authentic moments

Avoid:

- Excessive filters
- Overly saturated colors
- Heavy HDR
- Generic stock imagery

The photos should carry the emotional weight.

---

# 16. Polaroid Style

For memories, use a subtle Polaroid-inspired frame.

Structure:

```text
┌──────────────────────┐
│                      │
│       PHOTO          │
│                      │
│                      │
├──────────────────────┤
│   Memory #03         │
└──────────────────────┘
```

The frame should be slightly warm/off-white rather than pure white.

Possible color:

```text
#F5EEE7
```

Text:

```text
#332B30
```

---

# 17. Particles

Particles should be atmospheric, not distracting.

Use different particle behaviors depending on the chapter.

### Room

Small floating dust particles.

### Memories

Tiny warm particles.

### Future

Stars / small glowing particles.

### Finale

Higher particle density for celebration.

Particle density should automatically decrease on mobile.

---

# 18. Motion System

Animation is a core part of the design system.

The motion language should be:

**Slow + Smooth + Cinematic**

---

## Micro Interaction

```text
150ms — 250ms
```

Used for:

- Buttons
- Hover
- Small UI transitions

---

## Standard Transition

```text
400ms — 700ms
```

Used for:

- Cards
- Content
- UI elements

---

## Cinematic Transition

```text
800ms — 1600ms
```

Used for:

- Chapter changes
- Camera movements
- Major reveals

---

# 19. Easing

Preferred easing:

```text
ease-out
ease-in-out
custom cubic-bezier
spring
```

For emotional transitions:

```text
slow ease-in-out
```

For interactive elements:

```text
spring
```

Avoid linear animation except for continuous effects.

---

# 20. Page Transitions

Transitions between chapters should feel like **scene changes in a movie**.

Possible techniques:

- Fade to black
- Camera movement
- Light sweep
- Particle transition
- Blur transition
- Scale transition

Avoid standard:

```text
page slides left
```

unless it fits the scene.

---

# 21. Cursor

Desktop can have a custom cursor.

### Normal

Small subtle dot.

### Interactive

Expand slightly when hovering an interactive object.

### Special

For major interactive elements:

```text
View
Explore
Open
```

The cursor can leave a very subtle particle trail.

### Important

Do not make the cursor distracting.

Disable custom cursor behavior on touch devices.

---

# 22. Chapter Indicators

Use minimal chapter indicators.

Example:

```text
CHAPTER 02
MEMORIES
```

Position:

```text
Top-left
```

or

```text
Bottom-left
```

Keep opacity relatively low.

---

# 23. Loading Screen

The loading screen should feel intentional.

Avoid a generic:

```text
Loading...
```

Instead:

```text
Preparing something special...
```

Then:

```text
Almost there...
```

Use subtle particles or a slowly glowing object.

---

# 24. Empty States

If a memory/photo doesn't exist yet, don't display broken UI.

Use a cinematic placeholder.

Example:

```text
Some memories
are still waiting to be made.
```

This can also be used intentionally in the Future chapter.

---

# 25. Audio UI

The audio control should be extremely minimal.

Example:

```text
♪ Sound
```

or a small icon.

Position:

```text
Bottom-right
```

It should never dominate the screen.

Always allow:

```text
Mute
Unmute
```

---

# 26. Responsive Design

Design mobile-first where possible.

## Desktop

Use:

- Full-screen environments
- 3D camera movement
- Hover interactions
- Larger typography
- Floating elements

---

## Tablet

Reduce:

- Particle density
- 3D complexity
- Large spacing

---

## Mobile

Prioritize:

- Touch interaction
- Readability
- Performance
- Simple camera movement

Avoid relying on:

- Hover
- Mouse position
- Tiny controls

---

# 27. Breakpoints

Recommended:

```text
Mobile
< 640px

Tablet
640px — 1024px

Desktop
1024px — 1440px

Large Desktop
> 1440px
```

The layout should adapt naturally rather than simply shrinking.

---

# 28. Accessibility

Even though the project is highly visual, it should remain accessible.

Requirements:

- Good text contrast
- Keyboard navigation where possible
- Visible focus states
- Alt text for meaningful images
- Reduced-motion support
- Audio controls
- No interaction should depend exclusively on sound

Respect:

```text
prefers-reduced-motion
```

When enabled:

- Reduce particles
- Disable unnecessary camera movement
- Reduce transition duration
- Remove cursor trails

---

# 29. Mobile Performance

On mobile:

```text
Reduce particles
Reduce blur
Reduce 3D objects
Reduce texture resolution
Reduce animation complexity
```

Never sacrifice usability for visual effects.

---

# 30. Component Visual Hierarchy

The hierarchy should generally follow:

```text
Environment
    ↓
Main Story Element
    ↓
Primary Message
    ↓
Supporting Content
    ↓
Navigation
```

The environment should never compete with the story.

---

# 31. Do / Don't

## DO

- Use whitespace.
- Use subtle gradients.
- Use cinematic lighting.
- Use real memories.
- Use meaningful animation.
- Keep UI minimal.
- Let important moments breathe.
- Use sound carefully.
- Make the experience personal.

## DON'T

- Overuse hearts.
- Use neon pink everywhere.
- Add animations just because they're possible.
- Make every element 3D.
- Use generic romantic stock imagery.
- Fill every empty space.
- Use excessive glassmorphism.
- Make text difficult to read.
- Turn the website into a UI showcase.

---

# 32. Emotional Progression

The visual design should evolve with the story.

```text
Chapter 01
Mystery
↓
Dark + Quiet + Minimal

Memories
↓
Warm + Nostalgic

Things I Want to Tell You
↓
Intimate + Soft

Our Future
↓
Dreamy + Hopeful

Birthday Finale
↓
Warm + Bright + Celebratory
```

The design should therefore **change gradually throughout the experience** instead of using one static visual style.

---

# 33. Final Design Rule

The most important rule of the entire design system:

> **Don't design a birthday website. Design a memory she can experience.**

The goal is not to impress her with technical complexity.

The goal is for her to finish the experience and think:

> **"He made this specifically for me."**

Technology, animation, typography, photography, sound, and 3D should all work together to create that feeling.