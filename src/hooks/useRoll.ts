import OBR from "@owlbear-rodeo/sdk";

export async function rollD20(additionalModifier = 0) {
  const result = Math.floor(Math.random() * 20) + 1 + additionalModifier;
  await OBR.chat.sendMessage({
    elements: [
      { type: "text", text: `Бросок d20: ${result - additionalModifier} + ${additionalModifier} = ${result}` },
    ],
  });
  return result;
}
