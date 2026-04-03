const getImagePath = (imageName: string) => {
  return `/images/${imageName}`
}

export type TTabBarItemConfig = {
  key: any
  text: string
  pagePath: string
  iconPath: string
  selectedIconPath: string
}

export const CommonLayoutDefaultTabs: TTabBarItemConfig[] = [
  {
    key: 'homePage',
    pagePath: '/pages/index/index',
    iconPath: getImagePath('icon_component.png'),
    selectedIconPath: getImagePath('icon_API_HL.png'),
    text: '首页',
  },
  {
    key: 'insuranceServices',
    pagePath: '/pages/InsuranceServices/index',
    iconPath: getImagePath('icon_API.png'),
    selectedIconPath: getImagePath('icon_API_HL.png'),
    text: '保险服务',
  },
  {
    key: 'healthServices',
    pagePath: '/pages/HealthServices/index',
    iconPath: getImagePath('icon_API.png'),
    selectedIconPath: getImagePath('icon_API_HL.png'),
    text: '健康服务',
  },
  {
    key: 'personalCenter',
    pagePath: '/pages/PersonalCenter/index',
    iconPath: getImagePath('icon_API.png'),
    selectedIconPath: getImagePath('icon_API_HL.png'),
    text: '个人中心',
  },
]
