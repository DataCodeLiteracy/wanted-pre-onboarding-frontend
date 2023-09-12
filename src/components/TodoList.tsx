import React, { useState, useRef, useEffect } from 'react'
import {
  MdDeleteForever,
  MdOutlineCancel,
  MdFileDownloadDone
} from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { Li, TodoListButton, Label } from '../styles/TodoStyle'
import { ITodo, OnTodoFunction } from '../pages/Todo'
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
    const isCompleted = !!e.target.checked
    onCheck({ ...todoItem, isCompleted })
  }

  const handleDelete = () => {
    try {
      onDelete(id)
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error)
      }
    }
  }

  const handleEditCheck = () => {
    handleEditAction(todo)
  }

  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const handleEditAction = (value: string) => {
    handleToggleAction()
    setEditValue(value)
  }

  const handleToggleAction = () => {
    setIsEditing(!isEditing)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!editValue) {
      setEditValue('')
      return
    }

    onEdit({ ...todoItem, todo: editValue })
    handleEditAction('')
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleToggleAction()
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
