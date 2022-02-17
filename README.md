<div>
  <h1>count-up-es-react</h1>
  <p>
    <br />
    <strong>React组件数组动画增长或者减少到某个数字（例如：1-100）</strong>
  </p>
</div>

<hr />

## Installation

```
yarn add count-up-es-react
// or
npm i count-up-es-react
```

该组件是一个在指定时间内，从一个数字动态变化到另一个数字，动画类型丰富，涵盖了非常多的 easing 动画算法，值得推荐使用，特别适合开发大屏使用。 demo 图片示例： ![C.gif](https://upload-images.jianshu.io/upload_images/4981782-c5bffea292e0f279.gif?imageMogr2/auto-orient/strip)

搭配自定义字体使用： ![A.gif](https://upload-images.jianshu.io/upload_images/4981782-f1f4de88bf8740c8.gif?imageMogr2/auto-orient/strip)

## API

<table style="margin-top: 24px;"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>isCounting</td><td>是否开启计算动画，默认开启</td><td><code>boolean</code></td><td><code>--</code></td></tr><tr><td>start</td><td>开始值</td><td><code>number</code></td><td><code>--</code></td></tr><tr><td>end</td><td>结束值</td><td><code>number</code></td><td><code>--</code></td></tr><tr><td>duration</td><td>时间 毫秒为单位</td><td><code>number</code></td><td><code>--</code></td></tr><tr><td>decimalPlaces</td><td>小数位数。默认值:0</td><td><code>number</code></td><td><code>--</code></td></tr><tr><td>prefix</td><td>值前缀</td><td><code>string</code></td><td><code>--</code></td></tr><tr><td>suffix</td><td>值后缀</td><td><code>string</code></td><td><code>--</code></td></tr><tr><td>onComplete</td><td>结束后回调</td><td><code>(totalElapsedTime: number) =&gt; void | OnComplete</code></td><td><code>--</code></td></tr><tr><td>easing</td><td>动画类型 'easeOutCubic' | 'easeInCubic' | 'linear' | EasingFn</td><td><code>Easing</code></td><td><code>--</code></td></tr><tr><td>render</td><td>渲染项</td><td><code>(props: CountUpReturnProps) =&gt; ReturnValue</code></td><td><code>--</code></td></tr><tr><td>autoResetKey</td><td>监听参数，参数改变动画重新开始</td><td><code>AutoResetKey</code></td><td><code>--</code></td></tr></tbody></table>

## Demo

## Component basic usage

```jsx
import { CountUp } from 'count-up-es-react';

const MyComponent = () => (
  <div>
    <CountUp start={0} end={200} duration={3000} />
  </div>
);
```

Demo:

```tsx
import React, { useState } from 'react';
import { CountUp } from 'count-up';
import { Avatar, Badge, Button, Card, Col, Progress, Row, Slider, Statistic } from 'antd';
import 'antd/dist/antd.css';
import { ArrowUpOutlined } from '@ant-design/icons';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="App">
      <h4>普通用法Easing动画类型展示</h4>
      <Row style={{ marginBottom: 12 }}>
        {[
          'linear',
          'easeOutExpo',
          'easeInOutQuart',
          'easeInCirc',
          'easeInSine',
          'easeOutBounce',
        ].map((rs) => {
          return (
            <Col span={4}>
              <Card title={rs}>
                <CountUp
                  start={0}
                  end={200}
                  duration={3000}
                  easing={rs as any}
                  autoResetKey={[refresh]}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
      <h4>render自定义使用</h4>
      <Row style={{ marginTop: 12 }}>
        <Col span={6}>
          <Card title="Statistic统计数值">
            <CountUp
              start={0}
              end={617}
              duration={2000}
              easing={'easeOutExpo'}
              autoResetKey={[refresh]}
              render={({ value }) => {
                return (
                  <>
                    <Statistic
                      precision={0}
                      title="新能源车辆销量"
                      value={value as any}
                      valueStyle={{ color: 'red' }}
                      suffix="辆"
                      prefix={<ArrowUpOutlined />}
                    />
                  </>
                );
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Slider滑动输入条(easeInOutQuart)">
            <CountUp
              start={22}
              end={200}
              duration={7000}
              easing={'easeInOutQuart'}
              autoResetKey={[refresh]}
              render={({ value }) => {
                return (
                  <>
                    <Slider min={22} max={201} value={value as any} />
                  </>
                );
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Slider滑动输入条(easeInCirc)">
            <CountUp
              start={0}
              end={100}
              duration={12000}
              easing={'easeInCirc'}
              autoResetKey={[refresh]}
              render={({ value }) => {
                return (
                  <>
                    <Progress type="circle" percent={value as any} />
                  </>
                );
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Badge徽标数(easeInSine)">
            <CountUp
              start={0}
              end={100}
              duration={9000}
              easing={'easeInSine'}
              autoResetKey={[refresh]}
              render={({ value }) => {
                return (
                  <>
                    <Badge count={value as any} overflowCount={99}>
                      <Avatar shape="square" size="large" />
                    </Badge>
                  </>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
      <CountUp
        start={0}
        end={617}
        duration={2000}
        easing={'easeOutExpo'}
        autoResetKey={[refresh]}
        render={({ value }) => {
          return (
            <>
              <Statistic
                precision={0}
                title="新能源车辆销量"
                value={value as any}
                valueStyle={{ color: 'red' }}
                suffix="辆"
                prefix={<ArrowUpOutlined />}
              />
            </>
          );
        }}
      />
    </div>
  );
}

export default App;
```
