# Implementation Prompt

You are a senior frontend engineer, creative developer, UI/UX engineer, and technical architect.

You are working on a highly personal interactive birthday experience.

I have provided two Markdown files:

* `🎬 Interactive Birthday Experience — _A Day Inside Your Story_.md`
* `🎨 Design System — _A Day Inside Your Story_.md`

These files are the **source of truth** for the project.

Your job is to turn them into a complete, polished, production-quality web experience.

---

# 1. READ THE PROJECT FIRST

Before writing code:

1. Read `🎬 Interactive Birthday Experience — _A Day Inside Your Story_.md` completely.
2. Read `🎨 Design System — _A Day Inside Your Story_.md` completely.
3. Understand the entire experience and emotional progression.
4. Understand the intended visual language.
5. Inspect the existing repository structure.
6. Identify the current framework, dependencies, scripts, and configuration.
7. Reuse existing infrastructure when appropriate instead of unnecessarily rebuilding the project.

Do not start coding until you understand both documents.

---

# 2. CORE OBJECTIVE

Build an immersive interactive birthday experience that feels like:

> **An interactive short film + personal digital scrapbook + dreamy storybook.**

This is NOT a generic landing page.

It should feel like someone created an entire digital world specifically for one person.

The technology should disappear behind the experience.

The final result should communicate:

**Mystery → Discovery → Nostalgia → Intimacy → Hope → Celebration → Emotional Finale**

---

# 3. IMPLEMENTATION PRIORITY

Prioritize in this order:

1. User experience
2. Visual quality
3. Storytelling
4. Interaction quality
5. Animation
6. Performance
7. Code quality

Do not sacrifice UX just to demonstrate technical complexity.

Do not add effects simply because they are technically possible.

---

# 4. RECOMMENDED TECHNOLOGY

Use the existing project stack if one already exists.

If the project is not established yet, prefer:

### Frontend

* React
* TypeScript
* Vite

### Styling

* Tailwind CSS

### Animation

* Framer Motion

### Advanced animation

* GSAP where appropriate

### 3D

* Three.js
* React Three Fiber
* Drei

### Audio

Use the Web Audio API or a lightweight audio library only if needed.

Do not introduce unnecessary dependencies.

---

# 5. ARCHITECTURE

Build the application as a collection of reusable experiences/components rather than one massive component.

Use a structure conceptually similar to:

```text
src/
├── components/
│   ├── ui/
│   ├── scene/
│   ├── memory/
│   ├── chapter/
│   └── finale/
│
├── sections/
│   ├── Intro/
│   ├── Room/
│   ├── Memories/
│   ├── Messages/
│   ├── Future/
│   └── Finale/
│
├── data/
│   └── birthday.ts
│
├── hooks/
│
├── lib/
│
├── styles/
│
└── App.tsx
```

Adapt this structure to the actual project.

Do not create unnecessary abstractions.

---

# 6. DATA-DRIVEN PERSONALIZATION

Personal content must be separated from presentation logic.

Create a central data model for things such as:

```text
name
birthday
memories
photos
messages
futureMoments
finalLetter
```

Conceptually:

```ts
birthdayData = {
  name: "...",
  birthday: "...",
  memories: [],
  messages: [],
  futureMoments: [],
  finalLetter: "..."
}
```

Use realistic placeholders when content is unavailable.

Do NOT invent personal facts.

The final implementation should make it easy to replace placeholder content with real information later.

---

# 7. EXPERIENCE FLOW

Implement the experience described in `🎬 Interactive Birthday Experience — _A Day Inside Your Story_.md`.

The high-level flow is:

```text
Opening
   ↓
A Normal Day
   ↓
Interactive Room
   ↓
Chapter Selection
   ↓
Memories
   ↓
Things I Want to Tell You
   ↓
Our Future
   ↓
Chapter Completion
   ↓
Birthday Finale
   ↓
Final Message
```

The exact flow and content should follow `🎬 Interactive Birthday Experience — _A Day Inside Your Story_.md`.

---

# 8. OPENING EXPERIENCE

Create a cinematic opening.

The user should immediately understand:

> "Something special is waiting for me."

Keep the initial UI minimal.

Use:

* Atmospheric background
* Subtle particles
* Central focal object
* Soft lighting
* Elegant typography
* Carefully timed animation

Avoid immediately showing a conventional navigation bar.

The opening should feel like entering an experience.

---

# 9. INTERACTIVE ROOM

Implement the "A Normal Day" room described in the plan.

The room should contain interactive objects such as:

* Window
* Clock
* Desk
* Photos
* Book
* Flower
* Gift

Objects should feel like part of the environment rather than buttons.

When an object is interactive:

* Use subtle hover/touch feedback.
* Use lighting or motion to communicate interactivity.
* Provide contextual feedback.
* Transition smoothly when selected.

If Three.js is appropriate, use React Three Fiber.

However:

**Do not force the entire scene into 3D if a 2D/cinematic solution produces a better experience.**

---

# 10. MEMORIES EXPERIENCE

Implement the Memories chapter as an immersive photographic experience.

Use:

* Realistic photo presentation
* Polaroid-inspired frames
* Depth
* Floating/layered compositions
* Subtle parallax
* Smooth selection transitions
* Memory details
* Short messages

When selecting a memory:

```text
Photo
↓
Focus transition
↓
Memory information
↓
Personal message
↓
Continue
```

The photo should feel like a physical memory.

Avoid making this look like a standard photo gallery.

---

# 11. MESSAGE EXPERIENCE

Implement "Things I Want to Tell You" as a quiet intimate section.

Use the typewriter/letter concept from the plan.

The experience should feel slower and more emotional.

Include:

* Paper/letter visual
* Typewriter-style reveal
* Text animation
* Message completion state
* "Tell me something else" interaction

Do not over-animate the text.

Readable text is more important than animation.

---

# 12. FUTURE EXPERIENCE

Implement "Our Future" as a dreamy, hopeful section.

Use:

* Soft glowing elements
* Stars
* Floating objects
* Future memory concepts
* Elegant typography
* Gentle motion

It should visually differ from the Memories section while still belonging to the same design system.

---

# 13. CHAPTER TRANSITIONS

Transitions between major chapters are extremely important.

They should feel like cinematic scene changes.

Possible techniques:

* Fade to black
* Camera movement
* Light sweep
* Particle transition
* Blur
* Scale
* Depth transition

Choose the technique that best fits each transition.

Do not use the same transition everywhere.

---

# 14. BIRTHDAY FINALE

The finale should be the strongest emotional moment.

Follow `🎬 Interactive Birthday Experience — _A Day Inside Your Story_.md`.

Build:

```text
Quiet ending
↓
"You've reached the end..."
↓
"Or maybe..."
↓
CONTINUE
↓
Birthday cake
↓
Candle
↓
"Make a wish."
↓
Interaction
↓
Celebration
↓
Final message
```

The final celebration may include:

* Confetti
* Fireworks
* Particles
* Hearts
* Light burst
* Music transition

But keep the visual composition controlled.

Do not turn the finale into visual noise.

---

# 15. CANDLE INTERACTION

Support:

### Primary

Tap/click candle.

### Optional

Microphone blow detection.

If microphone permissions are unavailable or denied:

**The experience must still work perfectly using tap/click.**

Never make microphone access mandatory.

---

# 16. FINAL MESSAGE

The final message should be visually simple.

After the celebration settles:

* Reduce particle intensity.
* Calm the animation.
* Focus attention on the message.
* Use the display typography from the design system.

The final message should feel like the emotional conclusion of the entire experience.

Do not bury it under effects.

---

# 17. DESIGN SYSTEM IMPLEMENTATION

Follow `🎨 Design System — _A Day Inside Your Story_.md` strictly.

Implement its:

* Color tokens
* Typography
* Spacing
* Radius
* Shadows
* Glows
* Buttons
* Cards
* Glass effects
* Photography style
* Motion language
* Responsive rules
* Accessibility rules

Use CSS variables/design tokens where appropriate.

Avoid arbitrary values scattered throughout the codebase.

---

# 18. MOTION SYSTEM

Use motion intentionally.

### Micro interactions

Approximately:

```text
150–250ms
```

### Standard UI transitions

Approximately:

```text
400–700ms
```

### Cinematic transitions

Approximately:

```text
800–1600ms
```

These are guidelines, not rigid rules.

Use spring physics for physical interactions where appropriate.

Avoid animating everything.

---

# 19. 3D PERFORMANCE

Three.js should be used selectively.

Prioritize:

* Stable frame rate
* Low-poly geometry where possible
* Optimized textures
* Lazy loading
* Limited particle counts
* Efficient rendering
* Mobile fallback

Do not create thousands of unnecessary objects.

If a visual can be achieved more efficiently with CSS or Canvas, consider that approach.

---

# 20. RESPONSIVE EXPERIENCE

The website must work on:

* Desktop
* Tablet
* Mobile

Do NOT simply shrink desktop.

### Desktop

Can use:

* Mouse movement
* Hover
* Parallax
* 3D camera effects

### Mobile

Use:

* Tap
* Swipe
* Touch gestures
* Simplified 3D
* Reduced particles
* Reduced motion complexity

No critical functionality should depend on hover.

---

# 21. ACCESSIBILITY

Implement:

* Semantic HTML
* Keyboard navigation where applicable
* Focus states
* Accessible buttons
* Alt text
* Sufficient contrast
* Reduced-motion support
* Audio mute control

Respect:

```css
prefers-reduced-motion
```

When reduced motion is enabled:

* Reduce camera movement
* Reduce particles
* Reduce animation intensity
* Disable unnecessary cursor effects

---

# 22. AUDIO

If audio is included:

* Do not autoplay aggressively.
* Respect browser autoplay policies.
* Provide mute/unmute.
* Keep audio optional.
* Never make audio necessary to understand the experience.

Use sound as atmosphere rather than as a requirement.

---

# 23. CUSTOM CURSOR

On desktop, implement a subtle custom cursor if it improves the experience.

Possible states:

```text
Default
Interactive
Explore
View
```

Use subtle scaling/glow.

Do not make the cursor distracting.

Disable or simplify it on touch devices.

---

# 24. LOADING

Create an intentional loading experience.

Instead of:

```text
Loading...
```

Use something consistent with the story, such as:

> Preparing something special...

Loading should never block the entire experience unnecessarily.

Lazy-load heavy assets where possible.

---

# 25. ERROR HANDLING

The experience should fail gracefully.

If:

* A photo fails to load
* Audio fails
* Microphone is unavailable
* A 3D asset fails
* A browser doesn't support a feature

The user should still be able to continue through the story.

Never leave the user trapped on a broken interaction.

---

# 26. MOBILE PERFORMANCE

Automatically reduce complexity on smaller devices.

Consider reducing:

* Particle count
* Blur
* Texture resolution
* 3D objects
* Animation complexity

The experience should remain beautiful without requiring a powerful GPU.

---

# 27. CODE QUALITY

Write production-quality TypeScript.

Requirements:

* Strong typing
* Reusable components
* Clear naming
* Small focused components
* No unnecessary duplication
* No dead code
* No console errors
* No unnecessary dependencies

Avoid:

```text
any
```

unless genuinely unavoidable.

Do not hide architectural problems behind excessive abstractions.

---

# 28. IMPLEMENTATION PROCESS

Work incrementally.

### Phase 1

Inspect the existing repository and understand the environment.

### Phase 2

Create the foundational design tokens and global styles.

### Phase 3

Implement the overall experience shell and navigation/state system.

### Phase 4

Implement the opening and first chapter.

### Phase 5

Implement Memories.

### Phase 6

Implement Messages.

### Phase 7

Implement Future.

### Phase 8

Implement Finale.

### Phase 9

Implement responsive/mobile behavior.

### Phase 10

Optimize performance.

### Phase 11

Perform a full visual and functional polish pass.

---

# 29. IMPORTANT: DON'T STOP AT A ROUGH PROTOTYPE

Do not consider the task complete when:

* The page technically works.
* The sections exist.
* Placeholder cards are visible.
* Animations are basic.
* The design looks like a generic template.

Continue refining until the experience feels cohesive and intentional.

Perform multiple polish passes.

Pay attention to:

* Spacing
* Typography
* Timing
* Layering
* Lighting
* Transitions
* Visual hierarchy
* Mobile behavior

---

# 30. CREATIVE FREEDOM

The Markdown files define the project's direction.

You have creative freedom to improve:

* Composition
* Interaction patterns
* Transitions
* Micro-interactions
* Visual details
* Component structure
* Technical implementation

But do not contradict the core concept or design system.

When something is ambiguous, choose the solution that best supports:

> **Personal + Cinematic + Emotional + Premium + Simple**

---

# 31. NO GENERIC AI DESIGN

Avoid common AI-generated UI patterns such as:

* Huge gradient hero
* Generic glassmorphism cards
* Excessive rounded containers
* Neon pink/purple everywhere
* Random floating blobs
* Generic heart icons everywhere
* SaaS-style navigation
* Stock romantic imagery
* Excessive text
* Unnecessary badges
* Random animations

The design should feel authored.

---

# 32. PERSONALIZATION RULE

Do not invent personal details.

Use placeholders for:

* Name
* Photos
* Dates
* Memories
* Messages
* Inside jokes
* Future moments
* Final letter

Structure the code so these can easily be replaced later.

---

# 33. FINAL SELF-REVIEW

Before declaring the implementation complete, inspect the entire experience as if you were the recipient.

Ask:

### Story

Does this feel like a journey?

### Emotion

Does the emotional progression feel natural?

### Personalization

Does it feel designed for one specific person?

### Visuals

Does it look premium?

### Motion

Are animations purposeful?

### UX

Does the user always know what to do without excessive instructions?

### Performance

Does it remain smooth?

### Mobile

Does it still feel magical on a phone?

### Finale

Does the final birthday reveal feel earned?

---

# 34. FINAL STANDARD

The goal is NOT:

> "Build a cool website."

The goal is:

> **"Turn memories into an experience."**

Every technical decision should serve that goal.

Build the complete experience described in the provided Markdown files, then polish it until it feels like a finished, intentional, emotionally meaningful product rather than a prototype.

Start by inspecting the repository and reading both Markdown files.
