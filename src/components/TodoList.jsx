import React from "react";
import { MdDeleteForever } from "react-icons/md";

export default function TodoList({ todo, onCheck, onUpdate, onDelete }) {
  const { text } = todo;

  const handleDelete = () => onDelete(todo);
  return (
    <li>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox">{text}</label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button" onClick={handleDelete}>
        <MdDeleteForever />
      </button>
    </li>
  );
}
