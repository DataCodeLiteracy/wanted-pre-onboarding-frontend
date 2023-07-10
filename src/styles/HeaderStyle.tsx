import styled from 'styled-components'

export const Button = styled.button`
  background: transparent;
  cursor: pointer;
  border: 1px solid rgba(195, 237, 92, 0.7);
  border-radius: 10%;
  margin: 0 20px 10px 20px;
  &:hover {
    background: rgba(195, 237, 92, 0.7)
  }
}
`

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid gray;
`
