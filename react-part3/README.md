# React Part 3 — Project Recap

A React + TypeScript project built with Vite, covering routing, component patterns, and drag-and-drop.

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19 | UI library |
| `react-dom` | ^19 | DOM rendering |
| `react-router` | ^8 | Client-side routing |
| `react-dnd` | ^16 | Drag and drop logic |
| `react-dnd-html5-backend` | ^16 | HTML5 drag-and-drop backend for react-dnd |
| `typescript` | ~6 | Type safety |
| `vite` | ^8 | Dev server & bundler |

---

## Installation

```bash
npm install
npm run dev
```

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/signin` | `Auth` | Sign in / sign up screen |
| `/dashboard` | `Dashboard` | User dashboard |
| `/board/:boardid` | `Board` | Drag-and-drop Kanban board |

---

## React DnD — How It's Used

### What is react-dnd?

`react-dnd` is a drag-and-drop library for React. It keeps components decoupled — the drag source and drop target don't need to know about each other directly. It uses a **backend** (here `react-dnd-html5-backend`) to talk to the browser's native drag-and-drop API.

### Setup — DndProvider

Every part of the app that uses DnD must be wrapped in `<DndProvider>`:

```tsx
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Board() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* columns and cards go here */}
    </DndProvider>
  );
}
```

### Making a Card Draggable — useDrag

```tsx
import { useDrag } from "react-dnd";

const [{ isDragging }, drag] = useDrag({
  type: "CARD",              // item type — must match the drop target
  item: { cardId, fromCol }, // data passed to the drop target
  collect: (monitor) => ({
    isDragging: monitor.isDragging(), // used for visual feedback
  }),
});

drag(ref); // attach drag to a DOM element via ref
```

- `type` — a string that links drag sources to drop targets. Only drop targets that accept the same type will respond.
- `item` — the data payload carried during the drag (which card, which column it came from).
- `collect` — lets you pull state out of the drag monitor (e.g. `isDragging` to change the card's opacity).

### Making a Column a Drop Target — useDrop

```tsx
import { useDrop } from "react-dnd";

const [{ isOver }, drop] = useDrop({
  accept: "CARD",  // matches the type in useDrag
  drop: (item: { cardId: number; fromCol: string }) => {
    if (item.fromCol !== column.id) {
      onMove(item.cardId, item.fromCol, column.id);
    }
  },
  collect: (monitor) => ({
    isOver: monitor.isOver(), // used to highlight the column
  }),
});

drop(ref); // attach drop to the column DOM element
```

- `accept` — must match the `type` used in `useDrag`.
- `drop` — fires when a draggable is released over this target. The `item` object is the payload from `useDrag`.
- `isOver` — used to show a blue highlight on the column while a card hovers over it.

### Data Flow

```
User drags card
  → useDrag fires, carries { cardId, fromCol }
    → User drops on a column
      → useDrop receives { cardId, fromCol }
        → onMove(cardId, fromCol, toColId) called
          → state updates, card moves to new column
```

### Visual Feedback

| State | Effect |
|---|---|
| Card is being dragged | Card opacity drops to 0.5, background turns light blue |
| Column is hovered during drag | Column background turns light blue |

---

## Component Structure

```
src/
├── App.tsx                         # Routes setup (BrowserRouter)
├── components/
│   ├── Auth.tsx                    # Auth screen wrapper
│   ├── Dashboard.tsx               # Dashboard screen wrapper
│   ├── Board.tsx                   # Kanban board (react-dnd)
│   └── screens/
│       ├── auth-screens/
│       │   ├── LeftSide.tsx        # Left panel of auth screen
│       │   ├── RightSide.tsx       # Right panel of auth screen
│       │   └── input/
│       │       └── Input.tsx       # Reusable input component
│       └── dashboard-screens/      # Dashboard sub-screens (WIP)
```

---

## Concepts Covered

- **React Router v8** — `BrowserRouter`, `Routes`, `Route`, dynamic route params (`:boardid`)
- **Children props** — passing JSX as children to wrapper components
- **react-dnd** — `DndProvider`, `useDrag`, `useDrop`, item types, collect monitors
- **useState** — managing board/column/card state
- **useRef** — attaching drag/drop refs to DOM elements
- **TypeScript** — typed props, state, and DnD item payloads
