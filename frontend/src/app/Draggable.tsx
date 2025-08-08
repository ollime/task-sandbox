import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/core/dist/types";

import { darkenHex } from "./color";

type DraggableProps = {
  id: string;
  children: ReactNode;
  position: Coordinates;
  color?: string;
  isActive: boolean;
};

export default function Draggable({
  id,
  children,
  position,
  color = "#0398fc",
  isActive,
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style: React.CSSProperties = {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: isDragging ? darkenHex(color, 20) : color,
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
    zIndex: isActive ? 1000 : 1,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
