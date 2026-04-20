import React from 'react'
import { HolderOutlined } from '@ant-design/icons'

const DraggableComponent = ({ component, isSelected, onSelect }) => {
  const renderComponent = () => {
    const { type, props, label } = component

    switch (type) {
      case 'Input':
        return <input placeholder="输入框" className="component-input" />
      case 'Button':
        return <button className="component-button">{props?.text || '按钮'}</button>
      case 'Select':
        return (
          <select className="component-select">
            <option>选项 1</option>
          </select>
        )
      case 'Checkbox':
        return (
          <label>
            <input type="checkbox" /> 复选框
          </label>
        )
      case 'Radio':
        return (
          <label>
            <input type="radio" /> 单选框
          </label>
        )
      case 'Table':
        return (
          <table className="component-table">
            <thead>
              <tr>
                <th>列 1</th>
                <th>列 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>数据 1</td>
                <td>数据 2</td>
              </tr>
            </tbody>
          </table>
        )
      case 'Text':
        return <p className="component-text">{props?.text || '文本文本'}</p>
      case 'Image':
        return <div className="component-image">图片占位</div>
      case 'Card':
        return <div className="component-card">卡片内容</div>
      case 'Divider':
        return <hr className="component-divider" />
      default:
        return <div>{label}</div>
    }
  }

  return (
    <div className={`draggable-component ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="component-header">
        <span className="component-type-tag">{component.type}</span>
        <HolderOutlined className="component-drag-handle" />
      </div>
      <div className="component-preview">{renderComponent()}</div>
    </div>
  )
}

export default DraggableComponent
