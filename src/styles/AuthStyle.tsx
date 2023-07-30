import styled from 'styled-components'

export const AuthWrapper = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #55f180;
  padding: 10px;
  width: 100%;
  min-width: 300px;
  max-width: 450px;
  min-height: 500px;
  border: 1px solid #c5dcf1;
  border-radius: 5px;
`

export const AuthMain = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  min-height: 350px;
  background-color: rgba(248, 241, 246, 0.2);
  margin-top: 10px;
  border: 1px solid rgba(248, 241, 246, 0.2);
`

export const AuthH1 = styled.h1`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 100px;
`

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 95%;
  height: 150px;
`

export const ValidLabel = styled.label`
  display: block;
  text-align: center;
  font-size: 12px;
  color: red;
  padding-top: 15px;
`
