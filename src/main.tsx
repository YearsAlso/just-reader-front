import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './global.css'
import { setDomFontSize } from '@/utils/DomUtils'

import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs'

setDomFontSize()
const px2rem = px2remTransformer({
  rootValue: 16 // 32px = 1rem; @default 16
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyleProvider transformers={[px2rem]}>
      <ConfigProvider locale={zhCN} componentSize={'large'}>
        <App />
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>
)
