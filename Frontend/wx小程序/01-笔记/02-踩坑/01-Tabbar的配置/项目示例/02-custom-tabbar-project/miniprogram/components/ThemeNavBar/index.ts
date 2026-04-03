import { sysInfoBehavior } from '../../common/Behaviors/sysInfoBehavior'

Component({
  behaviors: [sysInfoBehavior],
  properties: {
    left: {
      type: String,
      value: '返回',
    },
    center: {
      type: String,
      value: '标题',
    },
    right: {
      type: String,
      value: '更多',
    },
  },
})
