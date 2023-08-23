import React, { useState } from 'react'
import { TodoButton, Input, TodoInputMain, Message } from '../styles/TodoStyle'
import { onAddFunction } from '../pages/Todo'
import { alertError } from '../utils/error'
import { CHECK_TODO_INPUT } from '../utils/message'

interface OnAddProps {
  onAdd: onAddFunction
}

export default function TodoInput({ onAdd }: OnAddProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      onAdd(value)
      setValue('')
    } catch (error) {
      alertError(error.message)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setValue(e.target.value)
    } catch (error) {
      alertError(error.message)
    }
  }

  return (
    <TodoInputMain onSubmit={handleSubmit}>
      <div>
        <Input
          data-testid="new-todo-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="할 일을 입력해주세요."
          aria-invalid="true"
          aria-errormessage="invalid-input-value"
        />
        <TodoButton data-testid="new-todo-add-button">추가</TodoButton>
      </div>
      {!value && <Message id="invalid-input-value">{CHECK_TODO_INPUT}</Message>}
    </TodoInputMain>
  )
}
