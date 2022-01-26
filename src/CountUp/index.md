## CountUp

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

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
