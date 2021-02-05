export default {
  computed: {
    createMenu() {
      return [
        {
          label: 'label1',
          handle() {
            console.log(1)
          }
        },
        {
          label: 'label2',
          handle() {
            console.log(2)
          }
        },
        {
          label: 'label3',
          handle() {
            console.log(3)
          }
        }
      ]
    }
  }
}
