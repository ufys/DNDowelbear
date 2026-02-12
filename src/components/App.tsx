import React from "react";
import { Sheet } from "./Sheet";
import "../styles/global.css";

export function App({ itemId }: { itemId: string }) {
  return (
    <div className="h-full bg-dark-bg text-dark-text p-4 overflow-auto">
      <Sheet itemId={itemId} />
    </div>
  );
}
