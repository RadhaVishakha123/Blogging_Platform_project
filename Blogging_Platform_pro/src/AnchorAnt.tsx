import React from "react";
import { Anchor } from "antd";

export default function AnchorAnt() {
  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px" }}>
      {/* 🧭 Left Sidebar - Anchor Navigation */}
      <Anchor
        offsetTop={80} // space from top
         // keeps it sticky
        items={[
          { key: "part-1", href: "#part1", title: "Part 1" },
          { key: "part-2", href: "#part2", title: "Part 2" },
        ]}
      />

      {/* 📄 Right Side - Page Content */}
      <div style={{ flex: 1 }}>
        <div
          id="part1"
          style={{
            height: "100vh",
            backgroundColor: "#001529",
            color: "white",
            padding: "40px",
            borderRadius: "8px",
          }}
        >
          <h2>Part 1</h2>
          <p>Hello user 👋</p>
        </div>

        <div
          id="part2"
          style={{
            height: "100vh",
            backgroundColor: "#f0f2f5",
            color: "#333",
            padding: "40px",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <h2>Part 2</h2>
          <p>Welcome to Ant Design Anchor example 🎯</p>
        </div>
      </div>
    </div>
  );
}
