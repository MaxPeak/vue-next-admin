import getOS from "./os";
import { isDOM, isFunction } from "./type";

export type EventMap = {
  mouse: {
    start: "mousedown";
    move: "mousemove";
    stop: "mouseup";
  };
  touch: {
    start: "touchstart";
    move: "touchmove";
    stop: "touchend";
  };
};

export type PositionInfo = {
  [key: string]: number;
  mousedownX: number;
  mousedownY: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  elementX: number;
  elementY: number;
  x: number;
  y: number;
};

export interface DragEvent extends MouseEvent, TouchList {
  [key: string]: any;
}

export type AxisMap = {
  x: "ew-resize";
  y: "ns-resize";
  "x,y": "move";
};

export type Axis = keyof AxisMap;

export type DraggableOptions = {
  limit: boolean;
  root: HTMLElement;
  axis: Axis;
  customEvent: boolean;
  onStart?: () => void;
  onMove?: (x: number, y: number) => void;
  onStop?: () => void;
};

class Draggable {
  element: HTMLElement;
  options: DraggableOptions;
  positionInfo: PositionInfo;
  listenerOption: AddEventListenerOptions;
  eventName: EventMap[keyof EventMap];
  axis: string[][];
  axisMap: AxisMap;

  constructor(element: HTMLElement, options?: Partial<DraggableOptions>) {
    // 默认值
    const defaultOptions: DraggableOptions = {
      limit: true,
      root: element.parentElement || document.body,
      axis: "x,y",
      customEvent: false
    };
    const dragOptions = Object.assign(defaultOptions, options);
    this.axisMap = {
      x: "ew-resize",
      y: "ns-resize",
      "x,y": "move"
    };

    // 参数校验
    const checkWindow = () => {
      if (typeof window === "undefined") {
        return "Runs only in a browser environment";
      }
    };
    const checkDOM = (element: HTMLElement, msg: string) => {
      if (!isDOM(element)) {
        return msg;
      }
    };
    const checkIgnore = (element: HTMLElement) => {
      const ignoreList = [
        "#document",
        "BODY",
        "HEAD",
        "SCRIPT",
        "META",
        "LINK",
        "TITLE",
        "STYLE"
      ];
      if (ignoreList.includes(element.nodeName)) {
        return `The [${element.nodeName.toLocaleLowerCase()}] element is not supported`;
      }
    };
    const checkAxis = (axis: Axis) => {
      const target = Object.keys(this.axisMap);
      if (!target.includes(axis)) {
        return `The axis must be ${target.join("|")}`;
      }
    };
    const checkFn = (fn: any, msg: string) => {
      if (!isFunction(fn)) {
        return msg;
      }
    };
    const checkAll = (checks: Array<string | undefined>) => {
      const result = checks.find(item => item);
      return {
        result: !Boolean(result),
        errMsg: result || ""
      };
    };
    const { result, errMsg } = checkAll([
      checkWindow(),
      checkDOM(element, "The argument must be Element"),
      checkIgnore(element),
      checkDOM(dragOptions.root, "The root must be Element"),
      checkAxis(dragOptions.axis),
      dragOptions.onStart &&
        checkFn(dragOptions.onStart, `The start must be Function`),
      dragOptions.onMove &&
        checkFn(dragOptions.onMove, `The move must be Function`),
      dragOptions.onStop &&
        checkFn(dragOptions.onStop, `The stop must be Function`)
    ]);
    if (!result) throw new Error(errMsg);

    // 初始化
    this.element = this.setStyle(element, {
      position: "fixed",
      cursor: this.axisMap[dragOptions.axis]
    });
    this.options = dragOptions;
    this.listenerOption = { passive: false };
    this.eventName = {
      start: "mousedown",
      move: "mousemove",
      stop: "mouseup"
    };
    this.positionInfo = this.initPosition();
    this.axis = this.initAxis();
    this.computedLimit();
    this.initEvent();
  }

  setStyle(element: HTMLElement, style: Partial<CSSStyleDeclaration>) {
    const styles = Object.entries(style).reduce((str, [key, value]) => {
      str += `${key}:${value};`;
      return str;
    }, "");
    element.style.cssText += styles;
    return element;
  }

  initPosition() {
    return {
      mousedownX: 0,
      mousedownY: 0,
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      elementX: 0,
      elementY: 0,
      x: 0,
      y: 0
    };
  }

  initAxis() {
    return this.options.axis
      .split(",")
      .map(axis => [axis.toLocaleLowerCase(), axis.toLocaleUpperCase()]);
  }

  computedLimit() {
    const {
      top: targetTop,
      right: targetRight,
      bottom: targetBottom,
      left: targetLeft
    } = this.element.getBoundingClientRect();
    const {
      top: rootTop,
      right: rootRight,
      bottom: rootBottom,
      left: rootLeft
    } = this.options.root.getBoundingClientRect();

    const minX = rootLeft - targetLeft;
    const maxX = rootRight - targetRight;
    const minY = rootTop - targetTop;
    const maxY = rootBottom - targetBottom;
    this.positionInfo = Object.assign(this.positionInfo, {
      minX,
      maxX,
      minY,
      maxY
    });
  }

  initEvent() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onStop = this.onStop.bind(this);

    const { isPc } = getOS();
    const eventType = isPc ? "mouse" : "touch";
    const eventMap: EventMap = {
      mouse: { start: "mousedown", move: "mousemove", stop: "mouseup" },
      touch: { start: "touchstart", move: "touchmove", stop: "touchend" }
    };
    const { start } = (this.eventName = eventMap[eventType]);
    this.element.addEventListener(start, this.onStart, this.listenerOption);
  }

  getEvent(e: MouseEvent | TouchEvent) {
    const { isPc } = getOS();
    if (isPc) return e as MouseEvent;
    return (e as TouchEvent).touches[0];
  }

  limit(min: number, value: number, max: number) {
    return Math.max(min, Math.min(value, max));
  }

  onStart(e: MouseEvent | TouchEvent) {
    document.ondragstart = () => false;
    const { clientX: mousedownX, clientY: mousedownY } = this.getEvent(e);
    const { x, y } = this.positionInfo;

    this.positionInfo = Object.assign(this.positionInfo, {
      mousedownX,
      mousedownY,
      elementX: x,
      elementY: y
    });

    const { move, stop } = this.eventName;
    document.addEventListener(move, this.onMove, this.listenerOption);
    document.addEventListener(stop, this.onStop, this.listenerOption);

    this.options.onStart?.();
  }

  onMove(e: MouseEvent | TouchEvent) {
    e.preventDefault();

    const ev = this.getEvent(e) as DragEvent;

    this.axis.forEach(([lowerCase, uperCase]) => {
      // coordinates
      const move = ev[`client${uperCase}`];
      const mousedown = this.positionInfo[`mousedown${uperCase}`];
      const element = this.positionInfo[`element${uperCase}`];
      this.positionInfo[lowerCase] = move - mousedown + element;
    });

    if (this.options.limit) {
      this.axis.forEach(([lowerCase, uperCase]) => {
        const min = this.positionInfo[`min${uperCase}`];
        const max = this.positionInfo[`max${uperCase}`];
        const val = this.positionInfo[lowerCase];
        this.positionInfo[lowerCase] = this.limit(min, val, max);
      });
    }

    this.options.onMove?.(this.positionInfo.x, this.positionInfo.y);

    // GPU acceleration
    !this.options.customEvent &&
      this.setStyle(this.element, {
        transform: `translate(${this.positionInfo.x}px,${this.positionInfo.y}px)`
      });
  }

  onStop() {
    document.ondragstart = null;

    const { move, stop } = this.eventName;
    document.removeEventListener(move, this.onMove, this.listenerOption);
    document.removeEventListener(stop, this.onStop, this.listenerOption);

    this.options.onStop?.();
  }

  destroy() {
    this.positionInfo = this.initPosition();

    const { start } = this.eventName;
    this.element.removeEventListener(start, this.onStart, this.listenerOption);
  }
}

export default Draggable;
