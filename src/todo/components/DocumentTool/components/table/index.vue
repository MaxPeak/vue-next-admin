<template>
  <div class="table" v-on="$listeners">
    <table cellspacing="0" cellpadding="0" border="0" :style="virtualOffset">
      <colgroup>
        <col width="50" />
        <col :width="sourceWidth > 0 && sourceWidth" />
        <col />
      </colgroup>
      <slot />
    </table>
  </div>
</template>

<script>
export default {
  name: 'VTable',
  props: ['sourceWidth', 'virtualOffset']
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';

table {
  table-layout: fixed;
  width: 100%;
  user-select: none;
  thead {
    th {
      padding: 5px;
      text-align: left;
      font-weight: normal;
      border-bottom: $table-border;
      &:first-child {
        text-align: center;
      }
      &:not(:last-child) {
        border-right: $table-border;
      }
    }
  }
  tfoot {
    td {
      border-top: $table-border;
      div {
        display: flex;
        justify-content: space-between;
        padding: 5px 50px;
      }
    }
  }
}
</style>
