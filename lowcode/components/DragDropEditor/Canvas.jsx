import React from 'react'
import { Empty, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import useEditorStore from '../../store/editorStore'
import DraggableComponent from './DraggableComponent'

const Canvas = () => {
  const { components, selectedComponent, selectComponent, removeComponent, clearCanvas } = useEditorStore()

  const handleDrop = (e) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData('componentType')
    const label = e.dataTransfer.getData('label')

    if (componentType) {
      const { addComponent } = useEditorStore.getState()
      addComponent({
        type: componentType,
        label: label,
      })
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="canvas-container">
      <div className="canvas-toolbar">
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={clearCanvas}
          disabled={components.length === 0}
        >
          清空画布
        </Button>
        {selectedComponent && (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeComponent(selectedComponent)}
          >
            删除选中
          </Button>
        )}
      </div>
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {components.length === 0 ? (
          <Empty description="从左侧拖拽组件到此处" />
        ) : (
          <div className="canvas-content">
            {components.map((comp) => (
              <DraggableComponent
                key={comp.id}
                component={comp}
                isSelected={selectedComponent === comp.id}
                onSelect={() => selectComponent(comp.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Canvas
