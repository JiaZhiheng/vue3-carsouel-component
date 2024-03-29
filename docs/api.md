---
title: API
titleTemplate: API 文档
description: 轮播图参数
head:
  - - meta
    - name: description
      content: carousel api docs
  - - meta
    - name: keywords
      content: carousel slide scroll fade
layout: doc
navbar: true
sidebar: false
aside: left
outline: [2, 4]
lastUpdated: false
editLink: false
footer: true
pageClass: api-page-class
---

# API

## Carousel Props

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

## Carousel Methods

| 名称            | 类型                      | 说明         |
| --------------- | ------------------------- | ------------ |
| to              | `(index: number) => void` | 滑动至某一页 |
| prev            | `() => void`              | 滑动至前一页 |
| next            | `() => void`              | 滑动至后一页 |
| getCurrentIndex | `() => number`            | 获取当前页   |

## Carousel Events

| 名称   | 类型           | 说明           |
| ------ | -------------- | -------------- |
| change | `() => number` | 轮播切换时触发 |

## Carousel Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `()` | 轮播的内容 |
| arrow | `(info: { total: number, currentIndex: number, to: (index: number) => void, prev: () => void, next: () => void })` | 箭头 |
| dots | `(info: { total: number, currentIndex: number, to: (index: number) => void })` | 指示点 |
