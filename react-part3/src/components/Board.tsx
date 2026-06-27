import { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardType = {
  id: number;
  text: string;
};

type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

const ITEM_TYPE = "CARD";

// ─── Card Component ───────────────────────────────────────────────────────────

function Card({
  card,
  columnId,
}: {
  card: CardType;
  columnId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Make this card draggable
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { cardId: card.id, fromCol: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div
      ref={ref}
      style={{
        padding: "10px 14px",
        marginBottom: 8,
        background: isDragging ? "#d0e8ff" : "#fff",
        border: "1px solid #d1d5db",
        borderRadius: 8,
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        fontSize: 14,
        transition: "opacity 0.2s",
      }}
    >
      {card.text}
    </div>
  );
}

// ─── Column Component ─────────────────────────────────────────────────────────

function Column({
  column,
  onMove,
  onAddCard,
}: {
  column: ColumnType;
  onMove: (cardId: number, fromCol: string, toCol: string) => void;
  onAddCard: (colId: string, text: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");
  const [adding, setAdding] = useState(false);

  // Make this column a drop target
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { cardId: number; fromCol: string }) => {
      if (item.fromCol !== column.id) {
        onMove(item.cardId, item.fromCol, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  const handleAdd = () => {
    if (inputText.trim()) {
      onAddCard(column.id, inputText.trim());
      setInputText("");
      setAdding(false);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        flex: 1,
        minHeight: "100vh",
        background: isOver ? "#e0f0ff" : "#f4f5f7",
        borderRight: "1px dotted #d1d5db",
        padding: 16,
        transition: "background 0.2s",
      }}
    >
      {/* Column header */}
      <h3
        style={{
          margin: "0 0 12px 0",
          fontSize: 14,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: "#374151",
        }}
      >
        {column.title}
        <span
          style={{
            marginLeft: 8,
            background: "#e5e7eb",
            borderRadius: 999,
            padding: "1px 8px",
            fontSize: 12,
            fontWeight: 600,
            color: "#6b7280",
          }}
        >
          {column.cards.length}
        </span>
      </h3>

      {/* Cards */}
      {column.cards.map((card) => (
        <Card key={card.id} card={card} columnId={column.id} />
      ))}

      {/* Add card input */}
      {adding ? (
        <div style={{ marginTop: 8 }}>
          <textarea
            autoFocus
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleAdd()}
            placeholder="Enter card title…"
            rows={2}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #93c5fd",
              fontSize: 13,
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <button
              onClick={handleAdd}
              style={{
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "5px 12px",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Add
            </button>
            <button
              onClick={() => setAdding(false)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#6b7280",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          style={{
            marginTop: 8,
            width: "100%",
            background: "transparent",
            border: "1px dashed #9ca3af",
            borderRadius: 6,
            padding: "6px 0",
            color: "#6b7280",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          + Add card
        </button>
      )}
    </div>
  );
}

// ─── Board ────────────────────────────────────────────────────────────────────

let nextId = 10;

const initialColumns: ColumnType[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: 1, text: "Research competitors" },
      { id: 2, text: "Write project brief" },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    cards: [
      { id: 3, text: "Design wireframes" },
      { id: 4, text: "Setup project repo" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: 5, text: "Kickoff meeting" },
      { id: 6, text: "Define MVP scope" },
    ],
  },
];

function Board() {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);

  // Move a card from one column to another
  const handleMove = (cardId: number, fromColId: string, toColId: string) => {
    setColumns((prev) => {
      const fromCol = prev.find((c) => c.id === fromColId)!;
      const card = fromCol.cards.find((c) => c.id === cardId)!;

      return prev.map((col) => {
        if (col.id === fromColId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        if (col.id === toColId) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      });
    });
  };

  // Add a new card to a column
  const handleAddCard = (colId: string, text: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === colId
          ? { ...col, cards: [...col.cards, { id: ++nextId, text }] }
          : col
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ fontFamily: "sans-serif" }}>
        {/* Board header */}
        <div
          style={{
            padding: "14px 24px",
            background: "#1e3a5f",
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Project Board
        </div>

        {/* Columns */}
        <div style={{ display: "flex" }}>
          {columns.map((col) => (
            <Column
              key={col.id}
              column={col}
              onMove={handleMove}
              onAddCard={handleAddCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default Board;
