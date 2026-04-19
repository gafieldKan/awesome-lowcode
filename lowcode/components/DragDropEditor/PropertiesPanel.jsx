import React from 'react'
import { Card, Form, Input, Select, Switch, Tag } from 'antd'
import useEditorStore from '../../store/editorStore'

const PropertiesPanel = () => {
  const { components, selectedComponent, updateComponent } = useEditorStore()
  const selected = components.find((c) => c.id === selectedComponent)

  if (!selected) {
    return (
      <div className="properties-panel">
        <Card title="属性面板" size="small">
          <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>
            请在画布中选择一个组件以编辑属性
          </div>
        </Card>
      </div>
    )
  }

  const handlePropChange = (key, value) => {
    updateComponent(selected.id, {
      props: { ...selected.props, [key]: value },
    })
  }

  const renderCommonProps = () => {
    const props = selected.props || {}

    return (
      <>
        <Form.Item label="文本">
          <Input
            value={props.text || ''}
            onChange={(e) => handlePropChange('text', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="标签">
          <Input
            value={props.label || ''}
            onChange={(e) => handlePropChange('label', e.target.value)}
          />
        </Form.Item>
      </>
    )
  }

  const renderSpecificProps = () => {
    switch (selected.type) {
      case 'Input':
        return (
          <>
            <Form.Item label="占位符">
              <Input
                value={selected.props?.placeholder || ''}
                onChange={(e) =>
                  handlePropChange('placeholder', e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="是否必填">
              <Switch
                checked={selected.props?.required || false}
                onChange={(checked) =>
                  handlePropChange('required', checked)
                }
              />
            </Form.Item>
          </>
        )
      case 'Button':
        return (
          <>
            <Form.Item label="按钮类型">
              <Select
                value={selected.props?.type || 'default'}
                onChange={(value) => handlePropChange('type', value)}
              >
                <Select.Option value="primary">主要</Select.Option>
                <Select.Option value="default">默认</Select.Option>
                <Select.Option value="dashed">虚线</Select.Option>
                <Select.Option value="danger">危险</Select.Option>
              </Select>
            </Form.Item>
          </>
        )
      default:
        return renderCommonProps()
    }
  }

  return (
    <div className="properties-panel">
      <Card title="属性面板" size="small">
        <Form layout="vertical">
          <Form.Item label="组件类型">
            <Tag color="blue">{selected.type}</Tag>
          </Form.Item>
          <Form.Item label="组件 ID">
            <code className="component-id">{selected.id}</code>
          </Form.Item>
          {renderSpecificProps()}
        </Form>
      </Card>
    </div>
  )
}

export default PropertiesPanel
