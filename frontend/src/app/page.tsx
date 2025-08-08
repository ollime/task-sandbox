"use client";
import { useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import Footer from "./footer";
import Card from "./card";
import { sizePreset } from "./card.types";
import { Coordinates } from "@dnd-kit/core/dist/types";
import { ContextMenuProvider } from "@/hooks/ContextMenuProvider";

interface Card {
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  size: Coordinates;
}

export default function Home() {
  const [activeId, setActiveId] = useState<string>();
  const [data, setData] = useState<Array<Card>>([
    {
      label: "Card 1",
      x: 0,
      y: 0,
      color: "#fca503",
      size: sizePreset.smRect,
    },
    { label: "Card 2", x: 0, y: 0, color: "#fc3503", size: sizePreset.lgRect },
    {
      label: "Card 3",
      x: 0,
      y: 0,
      size: sizePreset.lgSquare,
    },
  ]);

  /** Updates position data for card when being dragged */
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
        <ContextMenuProvider>
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <div className="relative flex flex-1 border-2 border-white rounded-md">
              {data.map((card) => (
                <Card
                  key={card.label}
                  label={card.label}
                  color={card.color ?? undefined}
                  position={{ x: card.x, y: card.y }}
                  activeId={activeId ?? ""}
                  size={
                    card.width && card.height
                      ? { x: card.width, y: card.height }
                      : card.size
                  }
                />
              ))}
            </div>
          </DndContext>
        </ContextMenuProvider>
        <Footer />
      </main>
    </div>
  );
}
