import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ConfigProvider, Layout, Menu } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { HomeOutlined, EditOutlined, PartitionOutlined, ProjectOutlined } from '@ant-design/icons'
import DragDropEditor from '../lowcode/components/DragDropEditor'
import ModelDesigner from '../lowcode/components/ModelDesigner'
import WorkflowDesigner from '../lowcode/components/WorkflowDesigner'

const { Content } = Layout

function HomePage() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Awesome Lowcode 低代码平台</h1>
      <p style={{ marginTop: 16, color: '#666' }}>快速构建企业级应用的低代码开发平台</p>
      <div style={{ marginTop: 32 }}>
        <Link to="/editor">
          <button
            style={{
              padding: '12px 24px',
              fontSize: 16,
              background: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            开始使用
          </button>
        </Link>
      </div>
      <div
        style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          maxWidth: 800,
          margin: '48px auto 0',
        }}
      >
        <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 8 }}>
          <h3>🎨 拖拽式编辑</h3>
          <p style={{ color: '#666', marginTop: 8 }}>通过简单的拖拽操作快速构建页面</p>
        </div>
        <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 8 }}>
          <h3>📦 丰富组件</h3>
          <p style={{ color: '#666', marginTop: 8 }}>内置丰富的 UI 组件满足各种场景需求</p>
        </div>
        <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 8 }}>
          <h3>🚀 实时预览</h3>
          <p style={{ color: '#666', marginTop: 8 }}>所见即所得，实时查看页面效果</p>
        </div>
      </div>
    </div>
  )
}

function MainLayout({ children, currentPath }) {
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
      path: '/',
    },
    {
      key: '/editor',
      icon: <EditOutlined />,
      label: '表单设计器',
      path: '/editor',
    },
    {
      key: '/models',
      icon: <PartitionOutlined />,
      label: '模型设计器',
      path: '/models',
    },
    {
      key: '/workflow',
      icon: <ProjectOutlined />,
      label: '工作流',
      path: '/workflow',
    },
  ]

  return (
    <Layout className="app-layout">
      <Layout.Header className="app-header">
        <div className="app-logo">
          <span>🚀</span> Awesome Lowcode
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentPath]}
          items={menuItems}
          onClick={({ key }) => (window.location.href = key)}
          style={{ flex: 1, marginLeft: 24 }}
        />
      </Layout.Header>
      <Content className="app-content">{children}</Content>
    </Layout>
  )
}

function App() {
  const [currentPath, setCurrentPath] = React.useState(() => window.location.pathname)

  React.useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePathChange)
    window.addEventListener('pushState', handlePathChange)
    window.addEventListener('replaceState', handlePathChange)
    return () => {
      window.removeEventListener('popstate', handlePathChange)
      window.removeEventListener('pushState', handlePathChange)
      window.removeEventListener('replaceState', handlePathChange)
    }
  }, [])

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout currentPath={currentPath}>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/editor"
            element={
              <MainLayout currentPath={currentPath}>
                <DragDropEditor />
              </MainLayout>
            }
          />
          <Route
            path="/models"
            element={
              <MainLayout currentPath={currentPath}>
                <ModelDesigner />
              </MainLayout>
            }
          />
          <Route
            path="/workflow"
            element={
              <MainLayout currentPath={currentPath}>
                <WorkflowDesigner />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
