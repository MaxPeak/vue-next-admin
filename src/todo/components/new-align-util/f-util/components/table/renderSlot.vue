<script>
export default {
  name: 'RenderSlot',
  functional: true,
  props: {
    slotContent: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  render(h, c) {
    const { slotContent } = c.props
    return slotContent
  }
}
</script>
