"use client";
import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import Droppable from "./Droppable";
import Footer from "./footer";
import Card from "./card";

export default function Home() {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    } else {
      setIsDropped(false);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-screen-md mx-auto">
        {/* {!isDropped ? draggableMarkup : null}
          <div className="h-[500px] bg-slate-500">
            <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
          </div> */}
        <div
          style={{
            position: "relative",
            width: 500,
            height: 500,
            border: "2px solid #888",
            margin: "40px auto",
            borderRadius: 8,
            userSelect: "none",
          }}
        >
          <Card></Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
