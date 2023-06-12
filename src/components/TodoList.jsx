import React from "react";

export default function TodoList({ todo, onCheck, onUpdate, onDelete }) {
  const { text } = todo;
  return (
    <li>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox">{text}</label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </li>
  );
}
