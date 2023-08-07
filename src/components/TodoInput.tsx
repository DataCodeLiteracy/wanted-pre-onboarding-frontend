import React, { useState } from 'react'
import { TodoButton, Input, TodoInputMain, Message } from '../styles/TodoStyle'
import { onAddFunction } from '../pages/Todo'
import useError from '../Hooks/useError'

interface OnAddProps {
  onAdd: onAddFunction
}

export default function TodoInput({ onAdd }: OnAddProps) {
  const [value, setValue] = useState('')
  const [isInputEmpty, setIsInputEmpty] = useState(false)

  const { alertError } = useError()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      onAdd(value)
      setValue('')
      setIsInputEmpty(true)
    } catch (error) {
      alertError(error.message)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setValue(e.target.value)
      setIsInputEmpty(false)
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
        />
        <TodoButton data-testid="new-todo-add-button">추가</TodoButton>
      </div>
      {isInputEmpty && (
        <Message>내용을 입력한 후 추가 버튼이나 Enter를 눌러주세요.</Message>
      )}
    </TodoInputMain>
  )
}
