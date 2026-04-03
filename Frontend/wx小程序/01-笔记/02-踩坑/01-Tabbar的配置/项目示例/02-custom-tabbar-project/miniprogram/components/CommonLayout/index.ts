import { CommonLayoutDefaultTabs } from '../../common/constants'

Component({
  properties: {
    header: {
      type: Boolean,
      value: true,
    },
    footer: {
      type: Boolean,
      value: true,
    },
    footerActions: {
      type: Array<any>,
      value: CommonLayoutDefaultTabs,
    },
  },
})
