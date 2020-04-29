# react-slider-template

[![ReactJs][react-image]][react-url]

<!-- [![Download Count][download-image]][download-url] -->

[![GitHub license][license-image]][license-url]

[react-image]: https://img.shields.io/badge/ReactJS-%5E16.13.1-blue.svg
[react-url]: https://reactjs.org

<!-- [download-image]: http://img.shields.io/npm/dm/react-simple-image-slider.svg?style=flat
[download-url]: http://www.npmjs.com/package/react-simple-image-slider -->

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/Eugene921/react-slider-template/blob/master/LICENSE

# Props

|          Name          |   Type    |  Required  | Description                                                                                                                                                                  | Default |
| :--------------------: | :-------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
|       **width**        | `Number`  | `Optional` | Image Slider Width                                                                                                                                                           | `0`     |
|       **height**       | `Number`  | `Optional` | Image Slider Height                                                                                                                                                          | `0`     |
|       **slides**       |  `Array`  | `Required` | Slides, Array Elements should be `[ 'url/your/image' ]`                                                                                                                      | `[]`    |
|  **activeSlideIndex**  | `Number`  | `Optional` | It slide will be shown first.<br>Count start at: `0`.<br>Max Value: `slides.length - 1`.                                                                                     | `0`     |
|       **pager**        | `Boolean` | `Optional` | Mark of pager availability. If mark `true` pager will be show.                                                                                                               | `true`  |
|      **controls**      | `Boolean` | `Optional` | Mark of controls availability. If mark `true` controls will be show.                                                                                                         | `true`  |
| **controlsStopAtLast** | `Boolean` | `Optional` | <ul> <li>`true` slider will be stoped at lats slide</li> <li>`false` after last slide, it goes to first </li> </ul>                                                          | `true`  |
|  **moveSwipeAction**   | `Boolean` | `Optional` | support gesture swipe left-right for touch monitors                                                                                                                          | `true`  |
| **sliderAspectRatio**  | `String`  | `Optional` | <ul><li>Using the parameter Slider calculates unreported sizes.</li> <li>`width: 500, height: 0 => 281.25`</li> <li>If `width: 500, height: 300` it will not work</li> </ul> | `16:9`  |
|     **autoResize**     | `Boolean` | `Optional` | It will be work like - `{ width: 100%, height: 100%, maxWidth: props.width, maxHeight: props.height }`                                                                       | `false` |

## verticalAlign && horizontalAlign

> If you pass true in two settings slider scale on full screen
> `width: window.innerWidth, height: window.innerHeight`
> 🚨 The settings will be ignore `width, height`

| **verticalAlign** | `Boolean` | `Optional` | If `true`, slider will be scale on vertical line and 🚨ignore `width`.<br>`height` will become a limitation. If `height` is not passed, it will become `window.innerHeight`<br>   | `false` |
| **horizontalAlign** | `Boolean` | `Optional` | If `true`, slider will be scale on horizontal line and 🚨ignore `height`.<br>`width` will become a limitation. If `width` is not passed, it will become `window.innerWidth`<br> | `false` |

# License

MIT
