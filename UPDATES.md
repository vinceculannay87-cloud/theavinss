# UPDATES — For My Love v2

## New Design Language
- Luxury romantic aesthetic: soft pink, rose gold accents, white glassmorphism over a deep rose-night background.
- Typography: Playfair Display (display), Cormorant Garamond (italic accents), Inter (body), Dancing Script (signatures).
- Replaced all emojis with modern Font Awesome 6 icons.
- Floating particle background, smooth fade/scale/slide animations.

## Global Navigation
- Removed the old top nav.
- New fixed top bar with brand and three-line hamburger button.
- Side menu slides in from the right with a frosted glass / blur backdrop.
- Active page is highlighted with a soft pink gradient pill.
- Fully responsive (mobile and desktop), with overlay dim and smooth open/close.

## Pages

### Home (`index.html`)
- Cleaner, premium hero. Typing intro, gradient title, scripted name, primary CTA.

### Our Story (`story.html`)
- Vertical zig-zag timeline, scroll-reveal cards, modern icons.

### Gallery (`gallery.html`) — NEW dynamic memory gallery
- "Add Memory" button opens a glass modal form.
- Fields: Photo (with live preview, image only), Date (picker, required), Description (textarea, required).
- Memories are saved to `localStorage` and rendered as glass cards with image, date, description.
- Responsive masonry-style grid, hover lift, fade-in, delete on hover.

### Timeline (`timeline.html`) — NEW "Something Happened Today"
- "Add Event" button opens a modal that captures only a message.
- Date and time are stored automatically (`Date.now()`).
- Vertical feed with elegant glass cards and connecting style.
- Persisted in `localStorage`.

### Countdown (`timer.html`)
- Live days/hours/minutes/seconds counter; label flips automatically based on past/future date.

### Letter / Confession / Future
- Editorial layout with serif body, signature script.

### Reasons (`reasons.html`)
- 3D flip cards, gradient fronts, glass backs.

### Music (`music.html`)
- Premium player card with embedded `<audio>` controls.

### Game (`game.html`)
- "Find My Heart" interactive grid with restart.

### Marry Me (`marry.html`) — NEW
- Centered elegant title and italic subtitle.
- Soft-pink gradient YES button and neutral NO button.
- NO button escapes the cursor (mouse, touch, focus) and teleports to random positions.
- With each attempt: YES grows progressively (1.0 → 1.15 → 1.3 → 1.5 → 1.75 → 2.0 …) and NO shrinks (1.0 → 0.9 → 0.78 …).
- On YES: page transitions to a celebration screen with blooming pink flowers, endless falling petals, and the message "She Said Yes" followed by "Forever starts today."

## Technical
- Pure HTML, CSS, JavaScript (no frameworks).
- Mobile-first responsive layout.
- LocalStorage for memories and timeline events.
- Modular `script.js` with documented sections.
- All pages share one `style.css` and `script.js`.
- Performance: fonts preconnected, lazy DOM creation, single observer for reveals.

## File Structure
```
index.html
story.html
gallery.html
timeline.html        (NEW)
timer.html
letter.html
reasons.html
future.html
music.html
game.html
confession.html
marry.html           (NEW)
style.css
script.js
UPDATES.md           (this file)
image/               (your photos)
music/               (your song)
```
