<template>
  <my-div color="red">styled-component</my-div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Style from "@components/Style/index";
const MyDiv = Style.div`
  width:500px;
  height:500px;
  background-color:pink;
  color:#fff;
  text-align:center;
  line-height:500px;
`;

export default defineComponent({
  components: {
    MyDiv
  }
});
</script>
