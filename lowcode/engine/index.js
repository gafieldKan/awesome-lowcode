/**
 * 低代码引擎核心
 * 统一导出引擎各模块
 */

// 组件引擎
export { componentEngine, ComponentDef, ComponentCategory } from './ComponentEngine.js'

// 应用引擎
export { appEngine, AppState, defaultAppConfig } from './AppEngine.js'

// 事件引擎
export {
  eventEngine,
  EventPriority,
  EventType,
  on,
  once,
  off,
  emit,
  addInterceptor,
  removeInterceptor,
} from './EventEngine.js'

// 核心模块重新导出
export { pluginRegistry, PluginType, PluginLifecycle, registerPlugin } from '../core/PluginRegistry.js'
export { schemaManager, FieldTypes, ComponentTypes } from '../core/SchemaManager.js'
export { permissionManager, PermissionLevel, PermissionType, defaultRoles } from '../core/PermissionManager.js'
