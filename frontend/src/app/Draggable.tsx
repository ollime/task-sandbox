import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

interface Coordinates {
  x: number;
  y: number;
}

type DraggableProps = {
  id: string;
  children: ReactNode;
  position: Coordinates;
};

export default function Draggable({ id, children, position }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style: React.CSSProperties = {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: isDragging ? "#1e40af" : "#2563eb",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "grab",
    top: position.y,
    left: position.x,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    touchAction: "none",
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
