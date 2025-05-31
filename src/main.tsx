import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './global.less'
import { setDomFontSize } from '@/utils/DomUtils'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false // 禁用自动添加CSS，避免重复引入

import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs'

setDomFontSize()
const px2rem = px2remTransformer({
  rootValue: 16 // 32px = 1rem; @default 16
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyleProvider transformers={[px2rem]}>
      <ConfigProvider locale={zhCN} componentSize={'large'} theme={{
        token: {
          colorPrimary: '#687864',
          borderRadius: 10
        }
      }}>
        <App />
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>
)
