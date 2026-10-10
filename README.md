# Tanvi’s Atelier — Animated Creative Portfolio

A non-academic, animated, single-page creative portfolio website celebrating Tanvi’s passion for **Lippan art**, **mandala art**, **sketching**, **papercraft**, and **handmade mixed-media craft**.

Built with React (Vite & JSX), Tailwind CSS, Lucide React, Framer Motion, and HTML5 Canvas.

---

## 🎨 Color Palette & Aesthetics

- **Main Background**: `#FFF8FA`
- **Secondary Background**: `#FDF2F5`
- **Blush Surfaces**: `#FCE7ED`
- **Pink Borders**: `#FBCFE8`
- **Primary Accent**: `#DB2777`
- **Headings**: `#291D22`
- **Body Text**: `#4E3C44`
- **White**: `#FFFFFF`

---

## ✨ Features Implemented

1. **Delicate HTML5 Canvas Background**:
   - Baby-pink particles with 1.1–1.7px radii moving organically via sine waves and curling vortex functions.
   - Mouse ripple and displacement physics.
   - High-DPI screen support and mobile particle reduction.
   - Pauses on background tabs via Page Visibility API.
   - Respects `prefers-reduced-motion`.
   - Subtle drifting floral petals and corner sparkles.

2. **Floating Glassmorphic Navigation Bar**:
   - Brand: **Tanvi’s Atelier** with a gently pulsing pink dot.
   - Smooth scrolling links: About, Creative Mediums, Craft Workbench, Curated Works, Connect.
   - Active section tracker and responsive mobile menu.
   - **432 Hz Calming Ambient Sound Generator** using Web Audio API (with clear on/off toggle and full audio resource cleanup).

3. **Hero Section — Meet the Artist**:
   - Asymmetrical layout with warm storytelling about handmade expressions.
   - Five hobby badges: *Lippan Art*, *Mandala Art*, *Sketching*, *Papercraft*, and *Art & Craft*.
   - **Interactive Polaroid Photo Frame** labeled `TANVI • CRAFT ATELIER` with Tanvi’s supplied portrait.
   - **Change Photo Overlay & Modal**:
     - Upload custom photos from device with instant `URL.createObjectURL` preview.
     - Curated preset studio avatars.
     - Validation and memory cleanup for object URLs.

4. **About the Artist**:
   - Sincere storytelling celebrating stillness, tactile devotion, and creative values:
     - *Patience in every detail*
     - *Imagination without boundaries*
     - *Beauty in handmade imperfections*

5. **The Five Creative Pursuits**:
   - Visual panels for Lippan Art, Mandala Art, Sketching, Papercraft, and Art & Craft.
   - Detailed descriptions, techniques, materials, and artwork showcases.

6. **Interactive Craft Workbench ("A Little Studio Magic")**:
   - Working HTML5 Canvas simulator with stylus/touch/mouse support:
     - **Mode A (Mandala Symmetry)**: Radial symmetry (6, 8, or 12 axes), adjustable brush sizes, pen/eraser modes.
     - **Mode B (Lippan Mirror Placement)**: Place reflective circular mirrors with clay-like rims, specular highlights, and multiple sizes.
     - Undo, Clear, and Export PNG functions.

7. **Curated Works Archive ("Collected Little Wonders")**:
   - Filterable gallery (All, Lippan, Mandala, Sketching, Papercraft, Craft).
   - Like heart counters with dynamic states.
   - Accessible Lightbox modal with enlarged imagery, detailed craft stories, materials, time logs (clearly noted sample values), and arrow/Escape navigation.

8. **Creative Process Section**:
   - Connected 3-stage visual timeline: **Imagine**, **Create**, and **Cherish**.

9. **Inquiry & Contact Desk**:
   - Controlled React inputs for Name, Email, Medium of Interest, and Message.
   - Field validations, loading states, and verified demo submission mode.

10. **Refined Footer**:
    - Tagline: *"Tanvi’s Non-Academic Creative Portfolio — Handcrafted with baby-pink aesthetics & tactile care."*
    - Smooth back-to-top button.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
