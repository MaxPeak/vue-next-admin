# v-draggable

基于 vue3 的拖拽库，提供组件、指令、hooks 三种使用方式

## 安装

```
yarn add v-draggable
```

## 全局使用

```
import { createApp } from "vue";
import VDraggable from 'v-draggable'

import App from "./App.vue";

createApp(App)
  .use(VDraggable)
  .mount("#app");
```

## 按需使用

### 组件

```
<template>
  <div>
    <v-draggable>
      <p>content</p>
    </v-draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { DraggableComponent } from 'v-draggable'

export default defineComponent({
  components:{
    VueDraggable: DraggableComponent
  }
});
</script>
```

### 指令

```
<template>
  <div>
    <p v-drag>content</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { DraggableDirective } from 'v-draggable'

export default defineComponent({
  directives:{
    draggable: DraggableDirective
  }
});
```

### hooks

```
<template>
  <div>
    <p ref="targetEle">content</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useDraggable } from 'v-draggable'

export default defineComponent({
  setup() {
    const targetEle = ref<HTMLElement>();
    const { x,y } = useDraggable(targetEle)
    return {
      targetEle
    };
  }
});
```
