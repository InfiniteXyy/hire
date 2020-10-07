# 编写工程化的业务模块

## 题目描述

不限语言，不限框架，完成一个 `Autocomplete` 组件。

## 代码要求

- 样式不是考察的重点，可以参考 https://ant.design/components/auto-complete-cn/ 来完成样式部分，也可以参考其它组件库的 `Autocomplete`，不需要像素级别还原
- 你认为过于复杂的细节可以不实现，我们考察的是代码组织能力、抽象能力、代码风格等方面
- 单元测试的 coverage 越高越好
- 以 GitHub repo 的形式存放你的代码，`CI/CD` 越自动越好。比如 push 之后的 `lint`，`test`，`codestyle` 检查，`git push tags` 之后的自动发布到 `npm` 等

### TodoList

由于时间颇为仓促，有些地方还是没有细细打磨

- [ ] dropdown 下拉菜单可以自定义大小
- [ ] dropdown 的显示和关闭有更好的交互策略
- [ ] 在使用 useKeyPress 时可以做一些性能优化，例如避免重复创建 map
- [ ] Loading 效果和空列表效果可以自定义
- [x] 移除生产环境下的 data-testid
- [ ] 使用组件时可以传入 React 原生 props，例如键入 Enter 后，根据传入参数的返回值决定是否要打开 dropdown
