import React from "react";
import "./styles.css";

function MyInput() {
  const [value, setValue] = React.useState("");
  function onChange(e) {
    setValue(e.target.value);
  }
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}

export default MyInput;
