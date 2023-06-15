import React, { useState } from "react";
import { TodoButton, Input, TodoInputMain } from "../styles/TodoStyle";

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) {
      return;
    }
    onAdd({ text: value, isCompleted: false });
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <TodoInputMain onSubmit={handleSubmit}>
      <Input
        data-testid="new-todo-input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="할 일을 입력해주세요."
      />
      <TodoButton data-testid="new-todo-add-button">추가</TodoButton>
    </TodoInputMain>
  );
}
