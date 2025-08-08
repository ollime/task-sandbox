"use client";
import { useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import Footer from "./footer";
import Card from "./card";

interface Card {
  label: string;
  x: number;
  y: number;
  color?: string;
}

export default function Home() {
  const [activeId, setActiveId] = useState<string>();
  const [data, setData] = useState<Array<Card>>([
    { label: "Card 1", x: 0, y: 0, color: "#fca503" },
    { label: "Card 2", x: 0, y: 0, color: "#fc3503" },
    { label: "Card 3", x: 0, y: 0 },
  ]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;

    setData(
      data.map((card: Card) =>
        card.label === active.id
          ? { ...card, x: card.x + delta.x, y: card.y + delta.y }
          : card
      )
    );
  }

  /** Sets activeId so that active card is visually moved to the top */
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(String(active.id));
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen px-8 py-4">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-screen-md mx-auto">
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <div
            className="relative flex flex-1 border-2 border-white rounded-md"
            // style={{
            //   position: "relative",
            //   width: 500,
            //   height: 500,
            //   border: "2px solid #888",
            //   margin: "40px auto",
            //   borderRadius: 8,
            //   userSelect: "none",
            // }}
          >
            {data.map((card) => (
              <Card
                key={card.label}
                label={card.label}
                color={card.color ?? undefined}
                position={{ x: card.x, y: card.y }}
                activeId={activeId ?? ""}
              />
            ))}
          </div>
        </DndContext>
        <Footer />
      </main>
    </div>
  );
}
