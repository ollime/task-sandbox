import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  children: ReactNode;
};

export default function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
    width: "100%",
    height: "100%",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
