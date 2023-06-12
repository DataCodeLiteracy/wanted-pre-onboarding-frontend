import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) {
      return;
    }
    onAdd({ id: uuidv4(), text: value, state: "active" });
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="new-todo-input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="할 일을 입력해주세요."
      />
      <button data-testid="new-todo-add-button">추가</button>
    </form>
  );
}
