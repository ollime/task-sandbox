"use client";
import { useState } from "react";
import Draggable from "./Draggable";
import { Coordinates } from "@dnd-kit/core/dist/types";

import ContextMenu from "./ContextMenu";
import { useContextMenu } from "@/hooks/ContextMenuProvider";
import { sizePreset } from "./card.types";

interface CardProps {
  position: Coordinates;
  size: Coordinates;
  label: string;
  color?: string;
  activeId: string;
  setActiveId: (value: string) => void;
}

export default function Card({
  position,
  label,
  color,
  activeId,
  size,
  setActiveId,
}: CardProps) {
  const [cardSize, setCardSize] = useState<Coordinates>(size);
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  function handleOpenMenu(evt: React.MouseEvent) {
    evt.preventDefault();
    setClicked(label);
    setPoints({
      x: evt.pageX - position.x - 50,
      y: evt.pageY - position.y - 50,
    });
    setActiveId(label);
  }

  function handleSetCardSize(value: Coordinates) {
    setCardSize(value);
  }

  return (
    <Draggable
      id={label}
      position={position}
      color={color}
      isActive={label === activeId}
      draggable={!clicked}
    >
      <div
        className="flex flex-1 items-center justify-center"
        style={{ height: cardSize.y, width: cardSize.x }}
        onContextMenu={(evt) => handleOpenMenu(evt)}
      >
        {label}
      </div>
      {clicked === label ? (
        <ContextMenu
          top={points.y}
          left={points.x}
          currentSize={
            Object.entries(sizePreset).find(([_, val]) => val === cardSize)?.[0]
          }
          setCardSize={handleSetCardSize}
        ></ContextMenu>
      ) : (
        ""
      )}
    </Draggable>
  );
}
