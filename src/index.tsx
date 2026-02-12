import OBR from "@owlbear-rodeo/sdk";
import { extension } from "./extension";

OBR.onReady(async () => {
  await OBR.extensions.register(extension);
});
