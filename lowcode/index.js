/**
 * Awesome Lowcode 核心导出
 * 统一导出所有核心模块
 */

// 引擎模块
export { componentEngine, ComponentDef, ComponentCategory } from './engine/ComponentEngine.js'

export { appEngine, AppState, defaultAppConfig } from './engine/AppEngine.js'

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
} from './engine/EventEngine.js'

// 核心模块
export {
  pluginRegistry,
  PluginType,
  PluginLifecycle,
  registerPlugin,
} from './core/PluginRegistry.js'

export { schemaManager, FieldTypes, ComponentTypes } from './core/SchemaManager.js'

export {
  permissionManager,
  PermissionLevel,
  PermissionType,
  defaultRoles,
  Operations,
  DataScope,
  hasPermission,
  hasRole,
  getUserPermissions,
} from './core/PermissionManager.js'

// 数据模型 Schema
export {
  FieldType,
  ValidationType,
  FieldConfig,
  ModelConfig,
  RelationType,
  RelationConfig,
  defineModel,
  defineField,
} from './core/ModelSchema.js'

// 引擎索引导出
export * from './engine/index.js'
