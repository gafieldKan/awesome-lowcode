import React, { useState } from "react";
import { Button } from "antd";

const componentsList = [
  { type: "Input", label: "输入框" },
  { type: "Button", label: "按钮" },
  { type: "Table", label: "表格" },
];

export default function DragDropEditor({ onChange }) {
  const [layout, setLayout] = useState([]);

  const handleDrop = (component) => {
    setLayout([...layout, { ...component, id: Date.now() }]);
    onChange && onChange([...layout, { ...component, id: Date.now() }]);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "200px" }}>
        {componentsList.map((c) => (
          <Button
            key={c.type}
            style={{ margin: 8 }}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("component", JSON.stringify(c));
            }}
          >
            {c.label}
          </Button>
        ))}
      </div>
      <div
        style={{ flex: 1, minHeight: 300, border: "1px dashed #ccc" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const comp = JSON.parse(e.dataTransfer.getData("component"));
          handleDrop(comp);
        }}
      >
        {layout.map((item) => (
          <div key={item.id}>{item.label} 组件</div>
        ))}
      </div>
    </div>
  );
}