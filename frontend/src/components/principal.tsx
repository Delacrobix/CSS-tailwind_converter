import React from 'react';
import { Card, Space } from 'antd';

export default function Principal() {
  return (
    <Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
      <Card className="w-[600px]" title="Card">
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  );
}
