import { Tooltip, Popover } from "bootstrap";

export const tooltip = {
  mounted(el: HTMLElement) {
    new Tooltip(el);
  },
};

export const popover = {
  mounted(el: HTMLElement) {
    new Popover(el);
  },
};
