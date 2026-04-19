import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useEditorStore = create(
  persist(
    (set, get) => ({
      // Canvas components
      components: [],

      // Selected component
      selectedComponent: null,

      // Available component types
      componentTypes: [
        { type: 'Input', label: '输入框', category: '基础' },
        { type: 'Button', label: '按钮', category: '基础' },
        { type: 'Select', label: '下拉框', category: '基础' },
        { type: 'Checkbox', label: '复选框', category: '基础' },
        { type: 'Radio', label: '单选框', category: '基础' },
        { type: 'Table', label: '表格', category: '展示' },
        { type: 'Text', label: '文本', category: '展示' },
        { type: 'Image', label: '图片', category: '展示' },
        { type: 'Card', label: '卡片', category: '布局' },
        { type: 'Divider', label: '分割线', category: '布局' },
      ],

      // Actions
      addComponent: (component) => {
        const newComponent = {
          ...component,
          id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          props: component.defaultProps || {},
        }
        set((state) => ({ components: [...state.components, newComponent] }))
        return newComponent
      },

      updateComponent: (id, updates) => {
        set((state) => ({
          components: state.components.map((comp) =>
            comp.id === id ? { ...comp, ...updates } : comp
          ),
        }))
      },

      removeComponent: (id) => {
        set((state) => ({
          components: state.components.filter((comp) => comp.id !== id),
          selectedComponent: state.selectedComponent === id ? null : state.selectedComponent,
        }))
      },

      selectComponent: (id) => {
        set({ selectedComponent: id })
      },

      reorderComponents: (newOrder) => {
        set({ components: newOrder })
      },

      clearCanvas: () => {
        set({ components: [], selectedComponent: null })
      },

      // Import/Export
      exportSchema: () => {
        return JSON.stringify(get().components, null, 2)
      },

      importSchema: (schema) => {
        try {
          const components = JSON.parse(schema)
          set({ components })
          return true
        } catch (e) {
          return false
        }
      },
    }),
    {
      name: 'editor-storage',
      partialize: (state) => ({ components: state.components }),
    }
  )
)

export default useEditorStore
