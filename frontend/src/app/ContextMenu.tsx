import { useState } from "react";
import { ColorKeys, colorPreset, sizePreset } from "./card.types";
import { Coordinates } from "@dnd-kit/core/dist/types";

interface ContextMenuProps {
  top: number;
  left: number;
  currentSize?: string;
  setCardSize: (size: Coordinates) => void;
  currentColor: string;
  setCardColor: (color: string) => void;
}

export default function ContextMenu({
  top,
  left,
  currentSize,
  setCardSize,
  currentColor,
  setCardColor,
}: ContextMenuProps) {
  const [size, setSize] = useState<string | undefined>(
    currentSize ?? undefined
  );
  const liStyles = "p-2 hover:cursor-pointer hover:bg-black";
  const radioStyles = "m-2 scale-160";
  const styles: React.CSSProperties = {
    position: "absolute",
    width: "200px",
    backgroundColor: "#383838",
    top: top,
    left: left,
    zIndex: 1000,
  };

  /** Size buttons */
  const radioBtns: React.ReactNode = Object.keys(sizePreset).map((item) => (
    <div key={item} className="flex flex-row">
      <input
        type="radio"
        name="size"
        id={item}
        value={item}
        defaultChecked={item === size}
        className={radioStyles}
        onClick={() => handleUpdateSize(item)}
      />
      <label htmlFor={item} className="flex flex-1">
        {isValidSizeKey(item) ? sizePreset[item].label : item}
      </label>
    </div>
  ));

  /** Color buttons */
  const colorBtns: React.ReactNode = (
    Object.keys(colorPreset) as ColorKeys[]
  ).map((item) => (
    <div key={item} className="flex-row inline-block">
      <input
        type="radio"
        name="color"
        id={item}
        defaultChecked={colorPreset[item] === currentColor}
        className={radioStyles}
        value={colorPreset[item]}
        style={{
          accentColor: colorPreset[item],
        }}
        onClick={() => handleUpdateColor(item)}
      />
    </div>
  ));

  function isValidSizeKey(key: string): key is keyof typeof sizePreset {
    return key in sizePreset;
  }

  function handleUpdateColor(newColor: ColorKeys) {
    setCardColor(colorPreset[newColor]);
  }

  function handleUpdateSize(newSize: string) {
    if (isValidSizeKey(newSize)) {
      setCardSize(sizePreset[newSize]);
      setSize(newSize);
    }
  }

  return (
    <div style={styles} className="rounded-lg" role="menu">
      <ul role="menu">
        <li className={`${liStyles} rounded-t-lg`} role="menuitem">
          <p className="mb-2">Size</p>
          {radioBtns}
        </li>
        <li className={liStyles} role="menuitem">
          <p className="mb-2">Color</p>
          {colorBtns}
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
