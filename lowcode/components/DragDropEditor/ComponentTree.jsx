import React from 'react'
import { Card, Tree, Button, Space } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import useEditorStore from '../../store/editorStore'

const ComponentTree = () => {
  const { components, selectComponent, selectedComponent, removeComponent } =
    useEditorStore()

  const treeData = components.map((comp, index) => ({
    title: (
      <div className="tree-node">
        <span>{`${comp.label} (${comp.type})`}</span>
        <Space size={4} style={{ marginLeft: 8 }}>
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              selectComponent(comp.id)
            }}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              removeComponent(comp.id)
            }}
          />
        </Space>
      </div>
    ),
    key: comp.id,
  }))

  return (
    <div className="component-tree">
      <Card title="组件树" size="small" className="tree-card">
        {components.length > 0 ? (
          <Tree
            treeData={treeData}
            selectedKeys={[selectedComponent]}
            onSelect={(keys) => selectComponent(keys[0])}
          />
        ) : (
          <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>
            暂无组件
          </div>
        )}
      </Card>
    </div>
  )
}

export default ComponentTree
