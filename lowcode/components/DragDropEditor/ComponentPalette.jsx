import React from 'react'
import { Card, Collapse, Button } from 'antd'
import { DragOutlined } from '@ant-design/icons'
import useEditorStore from '../../store/editorStore'

const { Panel } = Collapse

const ComponentPalette = () => {
  const { componentTypes, addComponent } = useEditorStore()

  // Group components by category
  const groupedComponents = componentTypes.reduce((acc, comp) => {
    if (!acc[comp.category]) {
      acc[comp.category] = []
    }
    acc[comp.category].push(comp)
    return acc
  }, {})

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('componentType', component.type)
    e.dataTransfer.setData('label', component.label)
  }

  const handleAddClick = (component) => {
    addComponent(component)
  }

  return (
    <div className="component-palette">
      <Card title="组件面板" size="small" className="palette-card">
        <Collapse defaultActiveKey={['base']}>
          {Object.entries(groupedComponents).map(([category, components]) => (
            <Panel header={category} key={category}>
              <div className="component-list">
                {components.map((comp) => (
                  <div
                    key={comp.type}
                    className="component-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, comp)}
                  >
                    <DragOutlined className="drag-icon" />
                    <span className="component-label">{comp.label}</span>
                    <Button
                      type="primary"
                      size="small"
                      className="add-btn"
                      onClick={() => handleAddClick(comp)}
                    >
                      添加
                    </Button>
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </Collapse>
      </Card>
    </div>
  )
}

export default ComponentPalette
