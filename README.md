# vue3-carsouel-component

A Vue 3 carousel component

### API

#### Carousel Props

| 参数            | 说明                   | 类型                          | 默认值       |
| --------------- | ---------------------- | ----------------------------- | ------------ |
| direction       | 轮播图显示的方向       | 'horizontal' \| 'vertical'    | 'horizontal' |
| effect          | 轮播图切换时的过渡效果 | 'scroll' \| 'fade' \| 'slide' | 'fade'       |
| turnDirection   | 轮播方向               | boolean                       | true         |
| showDots        | 是否展示指示点         | boolean                       | false        |
| showArrow       | 是否显示箭头按钮       | boolean                       | false        |
| slidesPerView   | 每一页显示的轮播图数量 | number                        | 1            |
| spaceBetween    | 轮播图之间的间距       | number                        | 0            |
| interval        | 自动播放的间隔（ms）   | number                        | 4000         |
| transitionStyle | 过渡效果的样式         | string                        | -            |
| immediate       | 是否立即开始轮播       | boolean                       | false        |
| autoplay        | 是否自动播放           | boolean                       | true         |
| dotPlacement    | 轮播指示点位置         | string                        | 'bottom      |
| arrowPlacement  | 轮播箭头位置           | string                        | 'center'     |
| dotType         | 轮播指示点样式         | 'line' \| 'dot'               | 'line'       |
| delay           | 延时播放时间           | number                        | 0            |

#### Carousel Methods

| 名称 | 类型                    | 说明         |
| ---- | ----------------------- | ------------ |
| to   | (index: number) => void | 滑动至某一页 |
| prev | () => void              | 滑动至前一页 |
| next | () => void              | 滑动至后一页 |

### 后续更新计划

防抖

loop

scroll

getCurrentIndex

Slot arrow dot

单元测试

Vitepress 文档迁移

TypeScript
