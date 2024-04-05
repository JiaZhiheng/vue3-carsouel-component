# vue3-carsouel-component

A Vue 3 carousel component

### API

#### Carousel Props

| 参数            | 类型                             | 默认值         | 说明                   |
| --------------- | -------------------------------- | -------------- | ---------------------- |
| direction       | `'horizontal' \| 'vertical'`     | `'horizontal'` | 轮播图显示的方向       |
| effect          | `'scroll' \| 'fade' \| 'slide'`  | `'fade'`       | 轮播图切换时的过渡效果 |
| turnDirection   | `boolean`                        | `true`         | 轮播方向               |
| showDots        | `'always' \| 'hover' \| 'never'` | `'hover'`      | 是否展示指示点         |
| showArrow       | `'always' \| 'hover' \| 'never'` | `'hover'`      | 是否显示箭头按钮       |
| slidesPerView   | `number`                         | `1`            | 每一页显示的轮播图数量 |
| spaceBetween    | `number`                         | `0`            | 轮播图之间的间距       |
| interval        | `number`                         | `4000`         | 自动播放的间隔（ms）   |
| transitionStyle | `string`                         | `undefined`    | 过渡效果的样式         |
| autoplay        | `boolean`                        | `true`         | 是否自动播放           |
| dotPlacement    | `string`                         | `'bottom'`     | 轮播指示点位置         |
| arrowPlacement  | `string`                         | `'center'`     | 轮播箭头位置           |
| dotType         | `'line' \| 'dot'`                | `'line'`       | 轮播指示点样式         |
| delay           | `number`                         | `0`            | 延时播放时间           |
| loop            | `boolean`                        | `true`         | 是否循环播放           |
| trigger         | `string`                         | `click`        | 触发切换的方式         |
| defaultIndex    | `number`                         | `0`            | 默认显示页             |

#### Carousel Methods

| 名称            | 类型                      | 说明         |
| --------------- | ------------------------- | ------------ |
| to              | `(index: number) => void` | 滑动至某一页 |
| prev            | `() => void`              | 滑动至前一页 |
| next            | `() => void`              | 滑动至后一页 |
| getCurrentIndex | `() => number`            | 获取当前页   |

#### Carousel Events

| 名称   | 类型           | 说明           |
| ------ | -------------- | -------------- |
| change | `() => number` | 轮播切换时触发 |

#### Carousel Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `()` | 轮播的内容 |
| arrow | `(info: { total: number, currentIndex: number, to: (index: number) => void, prev: () => void, next: () => void })` | 箭头 |
| dots | `(info: { total: number, currentIndex: number, to: (index: number) => void })` | 指示点 |

### Bugs && 待检验

完善示例文档

轮播第一圈有间隙 / 纯色标签验证

跨页跳转动画 slie scroll

禁用循环播放时 最后一页到首页怎么跳

### 后续更新计划

检查代码规范

相对路径改绝对路径

代码整理 文件结构整理

多张切换 / 一次切一组

加速轮播

css 瘦身 检查 z-index 必要性

重构代码展示组件 抽离到 npm

脱离 tdesign

单元测试

TypeScript

node

react

### 致谢

感谢我尊敬的大学室友 康斯坦丁·益铭王爵士 为本项目提供了诸多宝贵建议以及解决方案、特别是在解决 tdesign-site-components 库引入后导致 ssr 构建失败的问题上作出的杰出贡献。

他的 GitHub ⬇️

<a href="https://github.com/peterpeterkang"><img width="40px;" src="https://avatars.githubusercontent.com/peterpeterkang"></a>
