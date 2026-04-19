import React from 'react'
import { Layout } from 'antd'
import ComponentPalette from './ComponentPalette'
import Canvas from './Canvas'
import PropertiesPanel from './PropertiesPanel'
import ComponentTree from './ComponentTree'
import './styles.css'

const { Header, Content, Sider } = Layout

export default function DragDropEditor() {
  return (
    <Layout className="editor-layout">
      <Header className="editor-header">
        <h1 className="editor-title">Awesome Lowcode - 拖拽编辑器</h1>
      </Header>
      <Layout className="editor-body">
        <Sider width={240} className="editor-sidebar-left">
          <ComponentPalette />
        </Sider>
        <Content className="editor-content">
          <ComponentTree />
          <Canvas />
        </Content>
        <Sider width={300} className="editor-sidebar-right">
          <PropertiesPanel />
        </Sider>
      </Layout>
    </Layout>
  )
}
