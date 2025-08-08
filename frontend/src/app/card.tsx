import Draggable from "./Draggable";
import { Coordinates } from "@dnd-kit/core/dist/types";

import ContextMenu from "./ContextMenu";
import useContextMenu from "../hooks/useContextMenu";

interface CardProps {
  position: Coordinates;
  size: Coordinates;
  label: string;
  color?: string;
  activeId: string;
}

export default function Card({
  position,
  label,
  color,
  activeId,
  size,
}: CardProps) {
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  function handleOpenMenu(evt: React.MouseEvent) {
    evt.preventDefault();
    setClicked(!clicked);
    setPoints({
      x: evt.pageX - position.x - 50,
      y: evt.pageY - position.y - 50,
    });
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
        style={{ height: size.y, width: size.x }}
        onContextMenu={(evt) => handleOpenMenu(evt)}
      >
        {label}
      </div>
      {clicked ? (
        <ContextMenu top={points.y} left={points.x}></ContextMenu>
      ) : (
        ""
      )}
    </Draggable>
  );
}
