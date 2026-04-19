/**
 * 多租户管理器
 * 提供租户隔离、租户配置、资源配额管理
 * 参考 Frappe 多租户和 SaaS 架构设计
 */

import { EventEmitter } from 'events'

// 租户状态
export const TenantState = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  ARCHIVED: 'archived',
  PENDING: 'pending',
}

// 默认配额
const DEFAULT_QUOTAS = {
  maxUsers: 10,
  maxModels: 50,
  maxStorage: 1024 * 1024 * 100, // 100MB
  maxWorkflows: 20,
  maxPlugins: 10,
  maxApiCalls: 10000, // 每月
}

// 租户类
export class Tenant {
  constructor(config) {
    this.id = config.id
    this.name = config.name
    this.slug = config.slug // URL 友好的租户标识
    this.state = config.state || TenantState.PENDING
    this.createdAt = config.createdAt || Date.now()
    this.settings = config.settings || {}
    this.metadata = config.metadata || {}
    this._quotas = { ...DEFAULT_QUOTAS, ...config.quotas }
    this._usage = { ...config.usage }
  }

  /**
   * 检查资源配额
   */
  checkQuota(resource, count = 1) {
    const limit = this._quotas[resource]
    const usage = this._usage[resource] || 0

    if (limit === -1) return true // -1 表示无限制
    return usage + count <= limit
  }

  /**
   * 增加使用量
   */
  incrementUsage(resource, amount = 1) {
    if (!this._usage[resource]) {
      this._usage[resource] = 0
    }
    this._usage[resource] += amount
  }

  /**
   * 重置使用量
   */
  resetUsage(resource) {
    if (resource) {
      this._usage[resource] = 0
    } else {
      this._usage = {}
    }
  }

  /**
   * 获取配额使用率
   */
  getQuotaUsage() {
    const usage = {}
    for (const [key, limit] of Object.entries(this._quotas)) {
      const used = this._usage[key] || 0
      usage[key] = {
        used,
        limit,
        percent: limit === -1 ? 100 : Math.round((used / limit) * 100),
      }
    }
    return usage
  }

  /**
   * 更新设置
   */
  updateSettings(settings) {
    this.settings = { ...this.settings, ...settings }
  }

  /**
   * 获取设置
   */
  getSetting(key, defaultValue) {
    return key ? this.settings[key] ?? defaultValue : this.settings
  }

  /**
   * 检查租户是否活跃
   */
  isActive() {
    return this.state === TenantState.ACTIVE
  }

  /**
   * 转换为 JSON
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      state: this.state,
      createdAt: this.createdAt,
      settings: this.settings,
      metadata: this.metadata,
      quotas: this._quotas,
    }
  }
}

class TenantManagerClass extends EventEmitter {
  constructor() {
    super()
    this.tenants = new Map()
    this.currentTenant = null
    this.defaultTenantId = null
  }

  /**
   * 创建租户
   */
  createTenant(config) {
    if (!config.id || !config.name || !config.slug) {
      throw new Error('租户必须包含 id, name 和 slug')
    }

    if (this.tenants.has(config.id)) {
      throw new Error(`租户已存在：${config.id}`)
    }

    const tenant = new Tenant(config)
    this.tenants.set(config.id, tenant)

    // 设置默认租户
    if (!this.defaultTenantId) {
      this.defaultTenantId = config.id
    }

    this.emit('tenant:create', tenant)
    console.warn(`[TenantManager] 创建租户：${config.slug}`)

    return tenant
  }

  /**
   * 获取租户
   */
  getTenant(tenantId) {
    return this.tenants.get(tenantId)
  }

  /**
   * 通过 slug 获取租户
   */
  getTenantBySlug(slug) {
    for (const tenant of this.tenants.values()) {
      if (tenant.slug === slug) {
        return tenant
      }
    }
    return null
  }

  /**
   * 设置当前租户
   */
  setCurrentTenant(tenantId) {
    const tenant = this.tenants.get(tenantId)
    if (!tenant) {
      throw new Error(`租户不存在：${tenantId}`)
    }

    if (!tenant.isActive()) {
      throw new Error(`租户未激活：${tenantId}`)
    }

    this.currentTenant = tenantId
    this.emit('tenant:switch', tenant)
    return tenant
  }

  /**
   * 获取当前租户
   */
  getCurrentTenant() {
    return this.currentTenant ? this.tenants.get(this.currentTenant) : null
  }

  /**
   * 获取所有租户
   */
  getAllTenants() {
    return Array.from(this.tenants.values())
  }

  /**
   * 获取活跃的租户
   */
  getActiveTenants() {
    return this.getAllTenants().filter(t => t.isActive())
  }

  /**
   * 更新租户状态
   */
  updateTenantState(tenantId, state) {
    const tenant = this.tenants.get(tenantId)
    if (!tenant) {
      throw new Error(`租户不存在：${tenantId}`)
    }

    tenant.state = state
    this.emit('tenant:update', tenant)
    return tenant
  }

  /**
   * 暂停租户
   */
  suspendTenant(tenantId) {
    return this.updateTenantState(tenantId, TenantState.SUSPENDED)
  }

  /**
   * 激活租户
   */
  activateTenant(tenantId) {
    return this.updateTenantState(tenantId, TenantState.ACTIVE)
  }

  /**
   * 归档租户
   */
  archiveTenant(tenantId) {
    return this.updateTenantState(tenantId, TenantState.ARCHIVED)
  }

  /**
   * 删除租户
   */
  deleteTenant(tenantId) {
    const tenant = this.tenants.get(tenantId)
    if (!tenant) {
      throw new Error(`租户不存在：${tenantId}`)
    }

    this.tenants.delete(tenantId)
    this.emit('tenant:delete', tenant)
    console.warn(`[TenantManager] 删除租户：${tenant.slug}`)

    return true
  }

  /**
   * 检查当前租户资源配额
   */
  checkQuota(resource, count = 1) {
    const tenant = this.getCurrentTenant()
    if (!tenant) {
      throw new Error('当前无租户上下文')
    }
    return tenant.checkQuota(resource, count)
  }

  /**
   * 增加当前租户使用量
   */
  incrementUsage(resource, amount = 1) {
    const tenant = this.getCurrentTenant()
    if (!tenant) {
      throw new Error('当前无租户上下文')
    }
    tenant.incrementUsage(resource, amount)
  }

  /**
   * 获取当前租户配额使用率
   */
  getQuotaUsage() {
    const tenant = this.getCurrentTenant()
    if (!tenant) {
      return {}
    }
    return tenant.getQuotaUsage()
  }

  /**
   * 导出租户配置
   */
  exportTenantConfig(tenantId) {
    const tenant = this.tenants.get(tenantId)
    if (!tenant) {
      throw new Error(`租户不存在：${tenantId}`)
    }
    return tenant.toJSON()
  }

  /**
   * 导入租户配置
   */
  importTenantConfig(config) {
    if (!config.id || !config.slug) {
      throw new Error('导入配置必须包含 id 和 slug')
    }
    return this.createTenant(config)
  }

  /**
   * 清空所有租户
   */
  clear() {
    this.tenants.clear()
    this.currentTenant = null
    this.defaultTenantId = null
    this.emit('tenant:clear')
  }
}

// 导出单例
export const tenantManager = new TenantManagerClass()

// 快捷方法
export const createTenant = tenantManager.createTenant.bind(tenantManager)
export const getTenant = tenantManager.getTenant.bind(tenantManager)
export const getCurrentTenant = tenantManager.getCurrentTenant.bind(tenantManager)
export const setCurrentTenant = tenantManager.setCurrentTenant.bind(tenantManager)

export default tenantManager
