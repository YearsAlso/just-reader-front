import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import LoginPage from '../pages/auth'

test('renders name', async () => {
  // 修复：为LoginPage传递一个空对象作为props
  const { getByText, getByRole } = render(<LoginPage />);

  // 修复：expect.element 不是标准API，改为使用标准API
  expect(getByText('Username')).toBeInTheDocument()

  // 假设按钮点击后不会立即更新UI，可能需要等待异步操作完成
  await getByRole('button', { name: 'Increment' }).click()

  // 验证Password文本是否存在
  expect(getByText('Password')).toBeInTheDocument()
})
