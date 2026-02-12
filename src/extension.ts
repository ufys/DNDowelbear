import OBR, { Item } from "@owlbear-rodeo/sdk";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

export const extension = {
  id: "com.example.character-sheet",
  name: "D&D 5e Character Sheet",
  version: "1.0.0",
  icon: "/icon.svg",
  description: "Интерактивный лист персонажа",
  onLoad: async () => {
    // Добавляем кнопку на панель инструментов
    OBR.tool.create({
      id: "character-sheet-tool",
      icons: [
        {
          icon: "/icon.svg",
          label: "Character Sheet",
        },
      ],
      onClick: async (context) => {
        // Создаём предмет-контейнер для данных персонажа
        const items = await OBR.scene.items.getItems(
          (item) => item.id === "character-sheet-item"
        );
        let item: Item;
        if (items.length === 0) {
          // Создаём новый предмет
          item = await OBR.scene.items.addItem({
            id: "character-sheet-item",
            name: "Character Sheet",
            type: "CHARACTER_SHEET",
            layer: "CHARACTER",
            visible: true,
            locked: false,
            position: { x: 0, y: 0 }, // будет размещён вне доски
            metadata: {
              "com.example.character-sheet": getDefaultCharacter(),
            },
          });
        } else {
          item = items[0];
        }

        // Открываем боковую панель с React-приложением
        OBR.panel.open({
          id: "character-sheet-panel",
          title: "Character Sheet",
          width: 800,
          height: 600,
          render: (root) => {
            createRoot(root).render(<App itemId={item.id} />);
          },
        });
      },
    });
  },
};

function getDefaultCharacter() {
  return {
    name: "New Character",
    race: "",
    subrace: "",
    class: "",
    subclass: "",
    level: 1,
    speed: 30,
    initiative: 0,
    image: null,
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    savingThrows: {
      str: false,
      dex: false,
      con: false,
      int: false,
      wis: false,
      cha: false,
    },
    skills: { /* объект с уровнями владения */ },
    attacks: [],
    features: [],
    inventory: [],
    personality: { alignment: "", background: "", traits: "", ideals: "", bonds: "", flaws: "", appearance: "", history: "" },
    goals: [],
    notes: "",
    spells: [],
    editMode: true,
  };
}
