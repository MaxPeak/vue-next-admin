import { ref } from "vue";

export type ColorData = {
  type: string;
  value: string[];
};

export const useColor = (color: string) => {
  const colorEnum = ref<ColorData[]>([
    {
      type: "RGBA",
      value: ["255", "255", "255", "1"]
    },
    {
      type: "HSLA",
      value: ["0", "100%", "50%", "1"]
    },
    {
      type: "HEX",
      value: ["#FFFFFF"]
    }
  ]);
  return {
    colorEnum
  };
};
