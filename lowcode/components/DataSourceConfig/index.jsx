import React, { useState } from 'react'
export default function DataSourceConfig({ onConfig }) {
  const [url, setUrl] = useState('')
  return (
    <div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="请输入API地址" />
      <button onClick={() => onConfig(url)}>保存数据源</button>
    </div>
  )
}
