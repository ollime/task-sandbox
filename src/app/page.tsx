"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import Footer from "../components/footer";
import Card from "../components/card";
import {
  CardData,
  colorPreset,
  SizeKeys,
  sizePreset,
} from "../utils/card.types";
import { ContextMenuProvider } from "@/utils/ContextMenuProvider";

export default function Home() {
  const [activeId, setActiveId] = useState<string>();
  const [data, setData] = useState<Array<CardData>>([
    {
      label: "Card 1",
      position: { x: 0, y: 0 },
      color: colorPreset.green,
      size: "smRect",
    },
    {
      label: "Card 2",
      position: { x: 0, y: 0 },
      color: colorPreset.red,
      size: "lgRect",
    },
    {
      label: "Card 3",
      position: { x: 0, y: 0 },
      size: "lgSquare",
    },
  ]);

  useEffect(() => {
    /** loads initial data */
    async function getCardData() {
      try {
        await fetch("/api/cards")
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            /** Save to local app state */
            for (const card of json) {
              data.push(card);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }

    /** adds a new card */
    async function sendCardData(taskData: CardData) {
      console.log(JSON.stringify(taskData));
      try {
        await fetch("/api/cards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        });
      } catch (err) {
        console.error(err);
      }
    }

    // const newTask: CardData = {
    //   label: "Test Card",
    //   color: colorPreset.red,
    //   size: "lgSquare",
    //   position: { x: 0, y: 0 },
    // };
    // sendCardData(newTask);
    getCardData();
  }, []);

  /** Updates position data for card when being dragged */
  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    setData(
      data.map((card: CardData) =>
        card.label === active.id
          ? {
            ...card,
            position: {
              x: card.position.x + delta.x,
              y: card.position.y + delta.y,
            },
          }
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
    <div className={styles.root}>
      <main className={styles.main}>
        <ContextMenuProvider>
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <div className={styles.grid} style={gridBackgroundStyle}>
              <div className={styles.draggable}>
                {data.map((card) => (
                  <Card
                    key={card.label}
                    label={card.label}
                    color={card.color}
                    position={card.position}
                    activeId={activeId ?? ""}
                    setActiveId={setActiveId}
                    size={sizePreset[card.size as SizeKeys]}
                  />
                ))}
              </div>
            </div>
          </DndContext>
        </ContextMenuProvider>
        <Footer />
      </main>
    </div>
  );
}

const styles = {
  root: "font-sans grid grid-rows-[20px_1fr_20px] min-h-screen px-8 py-4",
  main: "flex flex-col gap-8 row-start-2 w-full max-w-screen-md mx-auto",
  grid: "relative flex flex-1 border-2 border-white rounded-md",
  draggable: "relative flex flex-1 rounded-md p-2",
};

/** Adds background gridlines */
const gridBackgroundStyle = {
  backgroundImage: `
    repeating-linear-gradient(
      to right,
      #505050,
      #505050 1px,
      transparent 1px,
      transparent 50px
    ),
    repeating-linear-gradient(
      to bottom,
      #505050,
      #505050 1px,
      transparent 1px,
      transparent 50px
    )
  `,
};
