import * as React from "react";

export default function CustomTextarea({ name, handleChange, value }) {
  return (
    <textarea
      style={{
        width: "100%",
        minHeight: "200px",
        maxHeight: "250px",
        overflow: "scroll",
        textWrap: "wrap",
        maxWidth: "100%",
      }}
      name={name}
      value={value}
      onChange={(e) => handleChange(name, e.target.value)}
    >
      fafas
    </textarea>
  );
}
