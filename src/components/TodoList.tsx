import React, { useState, useRef, useEffect } from 'react'
import {
  MdDeleteForever,
  MdOutlineCancel,
  MdFileDownloadDone
} from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { Li, TodoListButton, Label } from '../styles/TodoStyle'
import { ITodo, OnTodoFunction } from '../pages/Todo'
import { alertError } from '../utils/error'
import { AxiosError } from 'axios'

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
  const [editValue, setEditValue] = useState<string>('')

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const isCompleted = !!e.target.checked
      onCheck({ ...todoItem, isCompleted })
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(error)
      }
    }
  }

  const handleDelete = () => {
    try {
      onDelete(id)
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(error)
      }
    }
  }

  const handleEditCheck = () => {
    try {
      handleEditAction(todo)
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(error)
      }
    }
  }

  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setEditValue(e.target.value)
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(error)
      }
    }
  }

  const handleEditAction = (value: string) => {
    handleToggleAction()
    setEditValue(value)
  }

  const handleToggleAction = () => {
    setIsEditing(!isEditing)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      onEdit({ ...todoItem, todo: editValue })
      handleEditAction('')
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(error)
      }
    }
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()
      handleEditAction('')
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(error)
      }
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
