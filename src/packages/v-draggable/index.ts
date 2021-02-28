import { App } from "vue";
import DraggableComponent from "./DraggableComponent.vue";
import draggableDirective from "./draggableDirective";

export { DraggableComponent, draggableDirective };
export { useDraggable } from "./useDraggable";

export default (app: App): App => {
  const componentName = "VueDraggable";
  const directiveName = "draggable";
  app.component(componentName, DraggableComponent);
  app.directive(directiveName, draggableDirective);
  return app;
};
