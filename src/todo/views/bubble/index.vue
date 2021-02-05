<template>
  <div class="bubble">
    <div :class="['cca-chat-message', { current: true }]">
      <div class="avatar"></div>
      <div class="message">
        <v-bubble model>
          1111
        </v-bubble>
      </div>
    </div>
    <div :class="['cca-chat-message', { current: false }]">
      <div class="avatar"></div>
      <div class="message">
        <v-bubble>
          222
        </v-bubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bubble {
  display: flex;
  flex-direction: column;
  .cca-chat-message {
    display: flex;
    padding: 10px 0;
    width: 500px;
    .avatar {
      width: 50px;
      height: 50px;
      background-color: skyblue;
      border-radius: 50%;
      margin: 0 10px 0 0;
    }
    &.current {
      flex-direction: row-reverse;
      .avatar {
        margin: 0 0 0 10px;
      }
      .message {
        text-align: right;
      }
    }
    .message {
      color: #9ca3b1;
      font-size: 14px;
      .name {
        font-size: 14px;
      }
      .date {
        font-size: 12px;
      }
      .translate {
        margin-top: 5px;
        padding-top: 5px;
        border-top: 1px solid #8b8b8b;
      }
    }
  }
}
</style>
