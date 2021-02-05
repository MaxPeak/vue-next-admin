<template>
  <div class="upload-file">
    <div>断点续传</div>
    <p><input type="file" @change="handleChange" /></p>
    <div>
      <button @click="handleClick">{{ isUpload ? "stop" : "upload" }}</button>
      <span>上传进度：{{ progress }}%</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let blobList: Blob[];
    let filename: string;
    const uploadIndex = ref(0);
    const progress = ref(0);
    const isStop = ref(false);
    const isUpload = ref(false);
    const handleClick = () => {
      if (!blobList) {
        alert("Choose File");
        return;
      }
      if (isUpload.value) {
        isStop.value = true;
        isUpload.value = false;
        return;
      }
      isUpload.value = true;
      isStop.value = false;
      upload(blobList, filename);
    };
    const handleChange = (e: Event) => {
      const { files } = e.target as HTMLInputElement;
      const file = (files as FileList)[0];
      filename = file.name;
      blobList = sliceFile(file);
    };
    const sliceFile = (file: File, piece = 1024 * 1024 * 1) => {
      const size = file.size;
      let start = 0;
      let end = start + piece;
      const chunks = [];
      while (start < size) {
        const blob = file.slice(start, end);
        chunks.push(blob);
        start = end;
        end = start + piece;
      }
      return chunks;
    };
    const upload = async (blobList: Blob[], filename: string) => {
      const formData = new FormData();
      formData.append("name", filename);
      formData.append("id", "0");
      formData.append("data", blobList[uploadIndex.value]);
      // axios
      await mock();
      if (uploadIndex.value < blobList.length && isStop.value === false) {
        uploadIndex.value++;
        progress.value = Math.floor(
          (uploadIndex.value / blobList.length) * 100
        );
        upload(blobList, filename);
      } else if (uploadIndex.value >= blobList.length) {
        isUpload.value = false;
      }
    };
    const mock = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1 * 1000);
      });
    };
    return {
      handleChange,
      handleClick,
      progress,
      isUpload
    };
  }
});
</script>
