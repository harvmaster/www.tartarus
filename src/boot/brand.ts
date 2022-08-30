import { boot } from 'quasar/wrappers'
import { getCssVar, colors } from 'quasar'
const { lighten } = colors

export default boot(async () => {
  // const color = getCssVar('layout-1')
  // console.log(color)

  // let last = color || '#933'
  // for (let i = 0; i < 9; i++) {
  //   console.log(last)
  //   document.body.style.setProperty(`layout-${i+2}`, lighten(last, 10))
  //   last = lighten(last, 10)
  // }
})
