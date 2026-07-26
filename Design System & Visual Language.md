\# Document 5 — **Design System \& Visual Language**



\## Project: the\_byume (Working Title)



\*\*Version:\*\* 1.0

\*\*Status:\*\* Design Foundation



> \*\*Purpose:\*\* This document defines the visual identity, interaction language, component behavior, and design tokens for the application. It acts as the single source of truth for designers and developers throughout the project.



\---



\# Table of Contents



```text

1\. Design Philosophy



2\. Brand Personality



3\. Emotional Goals



4\. Visual Language



5\. Design Principles



6\. Color System



7\. Typography System



8\. Iconography



9\. Illustration Style



10\. Layout System



11\. Spacing System



12\. Elevation \& Shadows



13\. Borders \& Shapes



14\. Motion Principles



15\. Micro Interactions



16\. Design Tokens



17\. Components



18\. Accessibility



19\. Responsive Rules



20\. Design Do's \& Don'ts



21\. Future Extensions

```



\---



\# 1. Design Philosophy



\## Thread \& Paper



The website should not resemble:



\* Amazon

\* Etsy

\* Shopify

\* Flipkart



Instead it should feel like



> \*\*Opening a beautifully handmade scrapbook kept inside a cozy craft studio.\*\*



Everything should feel



\* Personal

\* Soft

\* Handmade

\* Artistic

\* Warm

\* Calm

\* Intentional



\---



\## Core Inspiration



Your references already establish a strong visual direction.



They combine



\* Craft studio

\* Notebook

\* Journal

\* Sewing kit

\* Postcards

\* Paper textures

\* Wooden desk

\* Crochet yarn

\* Polaroids

\* Scrapbook

\* Pinterest



Those become the foundation of the interface.



\---



\# 2. Brand Personality



Imagine the application as a person.



| Trait     | Value |

| --------- | ----- |

| Friendly  | ★★★★★ |

| Calm      | ★★★★★ |

| Creative  | ★★★★★ |

| Elegant   | ★★★★☆ |

| Premium   | ★★★★☆ |

| Playful   | ★★★☆☆ |

| Luxurious | ★★☆☆☆ |

| Corporate | ☆☆☆☆☆ |



\---



The interface should always feel



> "Made by an artist."



Never



> "Made by a software company."



\---



\# 3. Emotional Journey



Customer should experience



```text

Curiosity



↓



Comfort



↓



Creativity



↓



Trust



↓



Excitement



↓



Anticipation



↓



Delight



↓



Attachment

```



If we achieve this,



customers naturally return.



\---



\# 4. Visual Language



Every visual element belongs to one of these materials.



\## Paper



Cards



Forms



Feedback



Timeline



\---



Fabric



Buttons



Badges



Tags



\---



Thread



Progress



Loading



Dividers



Animations



\---



Wood



Backgrounds



Shelves



Frames



\---



Polaroid



Gallery



Customer Reviews



Recent Orders



\---



Craft Labels



Prices



Tags



Categories



\---



\# 5. Design Principles



\## Principle 1



Large whitespace.



Never clutter.



\---



\## Principle 2



Rounded corners.



Nothing harsh.



\---



\## Principle 3



Soft shadows.



No floating glassmorphism.



\---



\## Principle 4



Organic layouts.



Not rigid grids.



\---



\## Principle 5



Illustrations > Icons



Whenever possible.



\---



\## Principle 6



Animations should feel handcrafted.



Never robotic.



\---



\# 6. Color System



\## Primary Palette



| Name       | Hex     | Usage      |

| ---------- | ------- | ---------- |

| Cotton     | #FFFDF9 | Background |

| Ivory      | #FAF7F2 | Cards      |

| Kraft      | #E8D8C4 | Sections   |

| Warm Beige | #DCC9B6 | Borders    |

| Cocoa      | #6D5447 | Headings   |

| Espresso   | #3A2E2A | Body Text  |



\---



\## Secondary



| Name       | Hex     |

| ---------- | ------- |

| Sage       | #A6B49C |

| Dusty Rose | #D8A4A4 |

| Lavender   | #C7BEDF |

| Sky        | #C8E4F5 |

| Terracotta | #C9826D |

| Mustard    | #D8B55B |



\---



\## Status



Success



```text

\#5F8B6B

```



Warning



```text

\#D6A441

```



Danger



```text

\#CC6C63

```



Info



```text

\#7CA6D8

```



\---



\## Accent Rule



Only one accent color per section.



Never



```text

Pink



Green



Blue



Purple



Orange



all together.

```



\---



\# 7. Typography



\## Heading Font



Recommended



\* Recoleta

\* Fraunces

\* DM Serif Display



Use for



Hero



Sections



Titles



\---



\## Body Font



\* Manrope

\* Inter



\---



\## Handwritten Font



Only for



\* Notes

\* Labels

\* Artist messages

\* Stickers



Examples



\* Caveat

\* Patrick Hand

\* Kalam



\---



Typography Scale



| Type    | Size |

| ------- | ---- |

| Hero    | 72   |

| H1      | 56   |

| H2      | 42   |

| H3      | 32   |

| H4      | 24   |

| H5      | 20   |

| Body    | 16   |

| Caption | 14   |

| Tiny    | 12   |



\---



\# 8. Iconography



Your uploaded sewing icons become the primary icon family.



Categories



🧶 Yarn



✂ Scissors



🪡 Needle



📍 Pins



🧵 Thread



🧷 Safety Pin



📦 Package



📮 Letter



🏷 Tags



No generic dashboard icons wherever a craft-specific equivalent exists.



\---



\# 9. Illustration Style



Illustrations should resemble



\* Watercolor

\* Pencil sketch

\* Paper cutout

\* Fabric collage

\* Soft vector

\* Flat handcrafted art



Avoid



\* 3D corporate characters

\* Isometric offices

\* Cartoon mascots unrelated to crafts



\---



\# 10. Layout System



Use a \*\*12-column grid\*\* on desktop and \*\*4-column grid\*\* on mobile.



Breakpoints:



| Device  |        Width |

| ------- | -----------: |

| Mobile  |   360–767 px |

| Tablet  |  768–1023 px |

| Laptop  | 1024–1439 px |

| Desktop |     1440 px+ |



Maximum content width: \*\*1280 px\*\*.



\---



\# 11. Spacing System



Follow an 8-point spacing scale.



| Token | Value |

| ----- | ----: |

| xs    |  4 px |

| sm    |  8 px |

| md    | 16 px |

| lg    | 24 px |

| xl    | 32 px |

| 2xl   | 48 px |

| 3xl   | 64 px |

| 4xl   | 96 px |



This aligns well with Tailwind CSS and creates visual consistency.



\---



\# 12. Elevation \& Shadows



Use soft, natural shadows.



Levels:



\* Level 0: Flat

\* Level 1: Cards

\* Level 2: Floating panels

\* Level 3: Dialogs



Avoid heavy drop shadows and glowing effects.



\---



\# 13. Borders \& Shapes



Corner radius tokens:



| Token |  Radius |

| ----- | ------: |

| sm    |    8 px |

| md    |   12 px |

| lg    |   20 px |

| xl    |   28 px |

| pill  | 9999 px |



Decorative elements may use stitched borders, torn-paper edges, or label-shaped cutouts where appropriate.



\---



\# 14. Motion Principles



Animations should feel like real materials moving.



Timing:



\* Micro interactions: 120–180 ms

\* Component transitions: 200–300 ms

\* Page transitions: 350–500 ms



Preferred easing:



\* ease-out

\* ease-in-out



Avoid elastic or exaggerated bounces except in playful illustrations.



\---



\# 15. Micro Interactions



These interactions become part of the product's identity.



\### Yarn Loader



A yarn ball rolls while a thread draws the logo.



\---



\### Progress Timeline



The connecting line is a thread that grows as stages are completed.



\---



\### Save Inspiration



A thread loops around a pin before the item is saved.



\---



\### Successful Order



Instead of a green checkmark, a stitched "Made with Love" fabric seal appears.



\---



\### Feedback Submission



The postcard folds, receives a postage stamp, and gently slides onto the feedback wall.



\---



\### Hover Effects



Cards lift slightly, as though resting on stacked paper.



Buttons depress subtly like stitched fabric.



\---



\# 16. Design Tokens



Example token structure:



```text

Color.Background.Primary



Color.Background.Secondary



Color.Text.Primary



Color.Text.Secondary



Color.Border.Default



Color.Success



Spacing.MD



Radius.LG



Shadow.Level2



Motion.Fast



Motion.Standard

```



These tokens should map directly to Tailwind CSS variables and Figma Variables.



\---



\# 17. Core Components



The design system should include specifications for:



\### Navigation



\* Desktop navbar

\* Mobile bottom navigation

\* Breadcrumbs



\### Buttons



\* Primary

\* Secondary

\* Ghost

\* Icon

\* Floating Action Button



\### Inputs



\* Text

\* Textarea

\* Search

\* Select

\* Date picker

\* File upload



\### Cards



\* Product card

\* Order card

\* Feedback postcard

\* Notification card

\* Sticky note

\* Polaroid card



\### Feedback



\* Rating

\* Letter editor

\* Pinned postcard

\* Corkboard layout



\### Timeline



\* Order progress

\* Milestones

\* Delivery tracking



\### Overlays



\* Dialog

\* Drawer

\* Bottom sheet

\* Toast

\* Tooltip



Each component should later receive its own specification sheet with states, variants, accessibility notes, and interaction behavior.



\---



\# 18. Accessibility



Minimum requirements:



\* WCAG 2.2 AA contrast compliance.

\* Visible keyboard focus indicators.

\* Touch targets of at least 44×44 px.

\* Meaningful alt text for product imagery.

\* Reduced-motion support for users who prefer it.



Decorative textures and illustrations should never reduce readability.



\---



\# 19. Responsive Design Rules



The design should be \*\*mobile-first\*\*.



Key adaptations:



\* Bottom navigation on mobile.

\* Sticky primary action ("Create Order").

\* Swipeable galleries.

\* Collapsible filters.

\* Larger touch targets.

\* Reduced decorative elements on smaller screens to maintain performance.



\---



\# 20. Design Do's \& Don'ts



\## Do



\* Use natural spacing.

\* Mix photography with paper textures.

\* Let products remain the visual focus.

\* Use subtle motion.

\* Keep interactions warm and inviting.



\## Don't



\* Use neon colors.

\* Overuse gradients.

\* Apply glassmorphism everywhere.

\* Fill pages with dense text.

\* Use generic stock illustrations.

\* Turn the interface into a scrapbook so busy that it distracts from the products.



The craft aesthetic should support usability, not compete with it.



\---



\# 21. Future Extensions



The design system should be extensible enough to support:



\* Seasonal themes (Christmas, Valentine's Day, Diwali).

\* Dark mode (optional).

\* Multi-artist branding.

\* Workshops and event pages.

\* Community galleries.

\* AI-generated inspiration boards.



\---



\# Conclusion



This document defines the visual language but intentionally stops short of individual screen layouts.



\## I recommend splitting the next phase into \*\*two documents instead of one\*\*, because this project is much richer than a typical website:



\### \*\*Document 6A — UX Flows \& Wireframes\*\*



\* Complete low-fidelity wireframes.

\* User flows for every page.

\* Navigation between screens.

\* Layout decisions before styling.



\### \*\*Document 6B — UI Component Specifications\*\*



\* Pixel-level component behavior.

\* States (hover, focus, disabled, loading).

\* Animation timings.

\* Figma Auto Layout rules.

\* Tailwind implementation notes.

\* Responsive variants.



This separation mirrors how product teams at companies like Airbnb, Notion, and Linear organize design documentation and will make the eventual implementation much smoother.



