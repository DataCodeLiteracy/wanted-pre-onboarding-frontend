import React, { useState } from 'react'
import { TodoButton, Input, TodoInputMain } from '../styles/TodoStyle'
import { onAddFunction } from '../pages/Todo'

interface OnAddProps {
  onAdd: onAddFunction
}

export default function TodoInput({ onAdd }: OnAddProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value.trim().length === 0) {
      return
    }
    onAdd(value)
    setValue('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
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
  )
}
