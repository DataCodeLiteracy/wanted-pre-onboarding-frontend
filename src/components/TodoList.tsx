import React, { useState, useRef, useEffect } from 'react'
import {
  MdDeleteForever,
  MdOutlineCancel,
  MdFileDownloadDone
} from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { Li, TodoListButton, Label } from '../styles/TodoStyle'
import { ITodo, OnTodoFunction } from '../pages/Todo'
import useError from '../Hooks/useError'

interface TodoListProps {
  todoItem: ITodo
  onEdit: OnTodoFunction
  onCheck: OnTodoFunction
  onDelete: (id: number) => void
}

export default function TodoList({
  todoItem,
  onEdit,
  onCheck,
  onDelete
}: TodoListProps) {
  const { id, todo, isCompleted } = todoItem

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const { alertError } = useError()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const isCompleted = !!e.target.checked
      onCheck({ ...todoItem, isCompleted })
    } catch (error) {
      alertError(error.message)
    }
  }

  const handleDelete = () => {
    try {
      onDelete(id)
    } catch (error) {
      alertError(error.message)
    }
  }

  const handleEditCheck = () => {
    try {
      setIsEditing(true)
      setEditValue(todo)
    } catch (error) {
      alertError(error.message)
    }
  }

  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setEditValue(e.target.value)
    } catch (error) {
      alertError(error.message)
    }
  }
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      onEdit({ ...todoItem, todo: editValue })
      setIsEditing(false)
      setEditValue('')
    } catch (error) {
      alertError(error.message)
    }
  }
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()
      setIsEditing(false)
    } catch (error) {
      alertError(error.message)
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  return (
    <Li>
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
    </Li>
  )
}
