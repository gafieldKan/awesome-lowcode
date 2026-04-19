/**
 * 插件注册中心
 * 负责管理所有插件的注册、初始化和生命周期
 */

// 插件类型定义
export const PluginType = {
  COMPONENT: 'component',        // UI 组件插件
  FORM_COMPONENT: 'formComponent', // 表单组件插件
  DATA_SOURCE: 'dataSource',     // 数据源插件
  WORKFLOW_NODE: 'workflowNode',  // 工作流节点插件
  TOOLBAR: 'toolbar',            // 工具栏插件
  PANEL: 'panel',                // 面板插件
  MIDDLEWARE: 'middleware',      // 中间件插件
}

// 插件生命周期
export const PluginLifecycle = {
  INIT: 'init',
  ON_LOAD: 'onLoad',
  ON_SAVE: 'onSave',
  ON_DESTROY: 'onDestroy',
  ON_ACTIVATE: 'onActivate',
  ON_DEACTIVATE: 'onDeactivate',
}

// 默认插件配置
const defaultPluginConfig = {
  version: '1.0.0',
  author: '',
  description: '',
  dependencies: [],
}

class PluginRegistryClass {
  constructor() {
    this.plugins = new Map()
    this.pluginByType = new Map()
    this.initializedPlugins = new Set()
  }

  /**
   * 注册插件
   * @param {Object} plugin - 插件对象
   * @param {string} plugin.name - 插件名称
   * @param {string} plugin.type - 插件类型
   * @param {Object} plugin.config - 插件配置
   * @param {Function} plugin.init - 初始化函数
   * @param {Function} plugin.onLoad - 加载钩子
   * @param {Function} plugin.onSave - 保存钩子
   */
  register(plugin) {
    if (!plugin.name || !plugin.type) {
      throw new Error('插件必须包含 name 和 type 属性')
    }

    if (!Object.values(PluginType).includes(plugin.type)) {
      throw new Error(`无效的插件类型：${plugin.type}`)
    }

    const config = { ...defaultPluginConfig, ...plugin.config }
    const pluginInstance = {
      ...plugin,
      config,
      loaded: false,
      active: false,
    }

    this.plugins.set(plugin.name, pluginInstance)

    // 按类型索引
    if (!this.pluginByType.has(plugin.type)) {
      this.pluginByType.set(plugin.type, [])
    }
    this.pluginByType.get(plugin.type).push(plugin.name)

    console.warn(`[PluginRegistry] 插件已注册：${plugin.name} (${plugin.type})`)
    return this
  }

  /**
   * 获取插件
   */
  get(name) {
    return this.plugins.get(name)
  }

  /**
   * 按类型获取所有插件
   */
  getByType(type) {
    const names = this.pluginByType.get(type) || []
    return names.map(name => this.plugins.get(name)).filter(Boolean)
  }

  /**
   * 初始化插件
   */
  async init(name) {
    const plugin = this.plugins.get(name)
    if (!plugin) {
      throw new Error(`插件不存在：${name}`)
    }

    if (this.initializedPlugins.has(name)) {
      console.warn(`[PluginRegistry] 插件已初始化：${name}`)
      return
    }

    if (plugin.init) {
      await plugin.init()
    }

    this.initializedPlugins.add(name)
    plugin.loaded = true
    console.warn(`[PluginRegistry] 插件已初始化：${name}`)
  }

  /**
   * 加载插件
   */
  async load(name, context = {}) {
    const plugin = this.plugins.get(name)
    if (!plugin) {
      throw new Error(`插件不存在：${name}`)
    }

    if (plugin.onLoad) {
      await plugin.onLoad(context)
    }

    plugin.active = true
    console.warn(`[PluginRegistry] 插件已加载：${name}`)
  }

  /**
   * 保存插件状态
   */
  async save(name, data) {
    const plugin = this.plugins.get(name)
    if (!plugin) {
      throw new Error(`插件不存在：${name}`)
    }

    if (plugin.onSave) {
      await plugin.onSave(data)
    }
  }

  /**
   * 销毁插件
   */
  async destroy(name) {
    const plugin = this.plugins.get(name)
    if (!plugin) {
      return
    }

    if (plugin.onDestroy) {
      await plugin.onDestroy()
    }

    this.plugins.delete(name)
    this.initializedPlugins.delete(name)
    console.warn(`[PluginRegistry] 插件已销毁：${name}`)
  }

  /**
   * 激活插件
   */
  async activate(name) {
    const plugin = this.plugins.get(name)
    if (!plugin) return

    if (plugin.onActivate) {
      await plugin.onActivate()
    }
    plugin.active = true
  }

  /**
   * 停用插件
   */
  async deactivate(name) {
    const plugin = this.plugins.get(name)
    if (!plugin) return

    if (plugin.onDeactivate) {
      await plugin.onDeactivate()
    }
    plugin.active = false
  }

  /**
   * 获取所有已注册的插件
   */
  getAll() {
    return Array.from(this.plugins.values())
  }

  /**
   * 清除所有插件
   */
  clear() {
    this.plugins.clear()
    this.pluginByType.clear()
    this.initializedPlugins.clear()
  }
}

// 导出单例
export const pluginRegistry = new PluginRegistryClass()

// 导出注册方法
export const registerPlugin = (plugin) => pluginRegistry.register(plugin)

export default pluginRegistry
