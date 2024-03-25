import type { App } from "vue";
import { Icon } from "./Icon";
import Particles from "./particles/index.vue";
import { XButton, XTextButton } from "./XButton";
import { Verify } from "./Verifition";
import { CountTo } from "./CountTo";
import TopHeader from "./TopHeader/index.vue";

export const setupGlobCom = (app: App<Element>): void => {
  app.component("Icon", Icon);
  app.component("XButton", XButton);
  app.component("XTextButton", XTextButton);
  app.component("Particles", Particles);
  app.component("Verify", Verify);
  app.component("CountTo", CountTo);
  app.component("TopHeader", TopHeader);
};
