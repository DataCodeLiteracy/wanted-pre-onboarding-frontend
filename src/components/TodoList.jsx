import React, { useState } from "react";
import {
  MdDeleteForever,
  MdOutlineCancel,
  MdFileDownloadDone
} from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { LI, TodoListButton, Label } from "../styles/TodoStyle";

export default function TodoList({ todo, onEdit, onCheck, onDelete }) {
  const { text, state } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const handleChange = (e) => {
    const state = e.target.checked ? "completed" : "active";
    onCheck({ ...todo, state });
  };

  const handleDelete = () => onDelete(todo);
  const handleEditCheck = () => {
    setIsEditing(true);
    setEditValue(text);
  };
  const handleEditInput = (e) => {
    setEditValue(e.target.value);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit({ ...todo, text: editValue });
    setIsEditing(false);
    setEditValue("");
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <LI>
      <input
        type="checkbox"
        id={`checkbox-${text}`}
        onChange={handleChange}
        checked={state === "completed"}
      />
      {isEditing && (
        <>
          <input
            data-testid="modify-input"
            type="text"
            onChange={handleEditInput}
            value={editValue}
          />
          <TodoListButton
            data-testid="submit-button"
            onClick={handleEditSubmit}
          >
            <MdFileDownloadDone />
          </TodoListButton>
          <TodoListButton data-testid="cancel-button" onClick={handleCancel}>
            <MdOutlineCancel />
          </TodoListButton>
        </>
      )}
      {!isEditing && (
        <>
          <Label htmlFor={`checkbox-${text}`} completed={state === "completed"}>
            {text}
          </Label>
          <TodoListButton data-testid="modify-button" onClick={handleEditCheck}>
            <FiEdit />
          </TodoListButton>
          <TodoListButton data-testid="delete-button" onClick={handleDelete}>
            <MdDeleteForever />
          </TodoListButton>
        </>
      )}
    </LI>
  );
}
