import React, { useState, useRef, useEffect } from 'react'
import {
  MdDeleteForever,
  MdOutlineCancel,
  MdFileDownloadDone
} from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { LI, TodoListButton, Label } from '../styles/TodoStyle'
import { TodoType, OnTodoFunction } from '../pages/Todo'

interface TodoListProps {
  todoItem: TodoType
  onEdit: OnTodoFunction
  onCheck: OnTodoFunction
  onDelete: OnTodoFunction
}

export default function TodoList({
  todoItem,
  onEdit,
  onCheck,
  onDelete
}: TodoListProps) {
  const { todo, isCompleted } = todoItem

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCompleted = e.target.checked ? true : false
    onCheck({ ...todoItem, isCompleted })
  }

  const handleDelete = () => onDelete(todoItem)
  const handleEditCheck = () => {
    setIsEditing(true)
    setEditValue(todo)
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onEdit({ ...todoItem, todo: editValue })
    setIsEditing(false)
    setEditValue('')
  }
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsEditing(false)
  }

  return (
    <LI>
      <input
        type="checkbox"
        id={`checkbox-${todoItem.id}`}
        onChange={handleChange}
        checked={isCompleted}
      />
      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          <input
            ref={inputRef}
            data-testid="modify-input"
            type="text"
            onChange={handleEditInput}
            value={editValue}
          />
          <TodoListButton data-testid="submit-button" type="submit">
            <MdFileDownloadDone />
          </TodoListButton>
          <TodoListButton data-testid="cancel-button" onClick={handleCancel}>
            <MdOutlineCancel />
          </TodoListButton>
        </form>
      )}
      {!isEditing && (
        <>
          <Label
            htmlFor={`checkbox-${todoItem.id}`}
            completed={isCompleted === true}
          >
            {todo}
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
  )
}
