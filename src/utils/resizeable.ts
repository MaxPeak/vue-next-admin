import { toHyphenate } from "./string";
import Draggable, { Axis } from "./draggable";

class Resizeable {
  [key: string]: any;
  element: HTMLElement;
  option: any;

  constructor(element: HTMLElement) {
    this.option = {
      barSize: 6,
      barColor: "red",
    };
    this.element = this.setStyle(element, { position: "fixed" });
    this.initHandleBar();
  }

  initHandleBar() {
    const { barColor, barSize } = this.option;
    const barSizeCenter = barSize / 2;
    const rect = this.element.getBoundingClientRect();
    const handleBarMap = {
      "n-resize": {
        top: `-${barSizeCenter}px`,
        left: "50%",
        marginLeft: `-${barSizeCenter}px`,
        axis: "y",
        move: (x: number, y: number) => {
          this.setStyle(this.element, {
            height: `${rect.height - y}px`,
            top: `${rect.top + y}px`,
          });
        },
      },
      "s-resize": {
        bottom: `-${barSizeCenter}px`,
        left: "50%",
        marginLeft: `-${barSizeCenter}px`,
        axis: "y",
        move: (x: number, y: number) => {
          this.setStyle(this.element, {
            height: `${rect.height + y}px`,
            bottom: `${rect.bottom - y}px`,
          });
        },
      },
      "w-resize": {
        left: `-${barSizeCenter}px`,
        top: "50%",
        marginTop: `-${barSizeCenter}px`,
        axis: "x",
        move: (x: number, y: number) => {
          this.setStyle(this.element, {
            width: `${rect.width - x}px`,
            left: `${rect.left + x}px`,
          });
        },
      },
      "e-resize": {
        right: `-${barSizeCenter}px`,
        top: "50%",
        marginTop: `-${barSizeCenter}px`,
        axis: "x",
        move: (x: number, y: number) => {
          this.setStyle(this.element, {
            width: `${rect.width + x}px`,
            right: `${rect.right - x}px`,
          });
        },
      },

      "ne-resize": {
        right: `-${barSizeCenter}px`,
        top: `-${barSizeCenter}px`,
        axis: "x,y",
        move(x: number, y: number) {},
      },
      "nw-resize": {
        left: `-${barSizeCenter}px`,
        top: `-${barSizeCenter}px`,
        axis: "x,y",
        move(x: number, y: number) {},
      },
      "se-resize": {
        right: `-${barSizeCenter}px`,
        bottom: `-${barSizeCenter}px`,
        axis: "x,y",
        move(x: number, y: number) {},
      },
      "sw-resize": {
        left: `-${barSizeCenter}px`,
        bottom: `-${barSizeCenter}px`,
        axis: "x,y",
        move(x: number, y: number) {},
      },
    };
    const bars = Object.entries(handleBarMap).reduce(
      (fragment, [key, value]) => {
        const div = document.createElement("div");
        div.classList.add(key);
        new Draggable(div, {
          limit: false,
          axis: value.axis as Axis,
          customEvent: true,
          onMove: value.move,
        });
        Reflect.deleteProperty(value, "axis");
        this.setStyle(div, {
          position: "absolute",
          ...value,
          width: `${barSize}px`,
          height: `${barSize}px`,
          backgroundColor: barColor,
          borderRadius: "100%",
          cursor: key,
        });
        fragment.appendChild(div);
        return fragment;
      },
      document.createDocumentFragment()
    );
    this.element.appendChild(bars);
  }

  setStyle(element: HTMLElement, style: Partial<CSSStyleDeclaration>) {
    const styles = Object.entries(style).reduce((str, [key, value]) => {
      str += `${toHyphenate(key)}:${value};`;
      return str;
    }, "");
    element.style.cssText += styles;
    return element;
  }
}

export default Resizeable;
