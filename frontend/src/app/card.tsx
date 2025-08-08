import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable";
import { restrictToParentElement } from "@dnd-kit/modifiers";

interface Coordinates {
  x: number;
  y: number;
}

export default function Card() {
  const [position, setPosition] = useState<Coordinates>({ x: 0, y: 0 });

  function handleDragEnd(event: DragEndEvent) {
    const { delta } = event;
    setPosition((pos) => ({
      x: pos.x + delta.x,
      y: pos.y + delta.y,
    }));
  }

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
      <Draggable position={position}>
        <div>DSLFdsklfj</div>
      </Draggable>
    </DndContext>
  );
}
