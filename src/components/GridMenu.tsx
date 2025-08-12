import { useState } from "react";
import { ColorKeys, colorPreset, sizePreset } from "../utils/card.types";
import { Coordinates } from "@dnd-kit/core/dist/types";
import { gridSizeType, gridSizes } from "@/utils/grid.types";

interface ContextMenuProps {
  top: number;
  left: number;
  gridSize?: gridSizeType;
  setGridSize: (size: gridSizeType) => void;
}

export default function ContextMenu({
  top,
  left,
  gridSize,
  setGridSize,
}: ContextMenuProps) {
  const [size, setSize] = useState<gridSizeType | undefined>(
    gridSize ?? undefined
  );
  const liStyles = "p-2 hover:cursor-pointer hover:bg-black";
  const radioStyles = "m-1 mr-2 scale-160";
  const radioButtonStyles = "hover:bg-neutral-400 bg-neutral-500 rounded-lg px-2 py-1 hover:cursor-pointer";
  const styles: React.CSSProperties = {
    position: "absolute",
    minWidth: "250px",
    backgroundColor: "#383838",
    top: top,
    left: left,
    zIndex: 1000,
  };

  /** Size buttons */
  const radioBtns: React.ReactNode = gridSizes.map((item) => (
    <div key={item} className="flex flex-row my-1" onClick={() => handleUpdateSize(item as gridSizeType)}>
      <input
        type="radio"
        name="size"
        id={"size-" + item}
        value={item}
        defaultChecked={item === size}
        className={`${radioStyles} appearance-none`}
      />
      <label htmlFor={"size-" + item} className={radioButtonStyles}>
        {item} units
      </label>
    </div>
  ));

  function handleUpdateSize(newSize: gridSizeType) {
      setGridSize(newSize);
      setSize(newSize);
  }

  return (
    <div style={styles} className="rounded-lg" role="menu">
      <ul role="menu">
        <li className={`p-2 hover:bg-black rounded-t-lg`} role="menuitem">
          <p className="mb-2">Size</p>
          <div className="flex flex-row flex-wrap align-center">
            {radioBtns}
          </div>
        </li>
        <li className={liStyles} role="menuitem">
          Rename
        </li>
        <li className={liStyles} role="menuitem">
          Delete
        </li>
        <li className={`${liStyles} rounded-b-lg`} role="menuitem">
          Archive
        </li>
      </ul>
    </div>
  );
}
