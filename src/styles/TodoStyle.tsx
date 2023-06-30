import styled from "styled-components";
import { SignMain } from "./SignStyle";
import { Button } from "./HeaderStyle";

export const TodoWrapper = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #55f180;
  padding: 10px;
  width: 100%;
  min-width: 300px;
  max-width: 450px;
  min-height: 500px;
  border: 1px solid #c5dcf1;
  border-radius: 5px;
`;

export const TodoTitle = styled.h1`
  font-size: 2rem;
  margin: 10px 0 20px 0;
`;

export const TodoMain = styled(SignMain)`
  margin-bottom: 15px;
  width: 95%;
`;

export const TodoInputMain = styled.form`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 45px;
`;

export const TodoButton = styled(Button)`
  border: 1px solid #c5dcf1;
  background-color: rgba(132, 184, 87.84, 0.2);
  margin: 0 10px 20px 10px;
`;

export const TodoListButton = styled(TodoButton)`
  margin: 0 10px 0 10px;
`;

export const Input = styled.input`
  outline: none;
  border: 1px solid #c5dcf1;
  background-color: rgba(132, 184, 87.84, 0.2);
  width: 70%;
  margin: 0 0 20px 0;
`;

export const ListInput = styled(Input)`
  width: 150px;
`;

export const UL = styled.ul`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: rgba(62, 152, 222, 0.1);
  padding: 20px;
`;

export const LI = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 5px;
  border: 1px solid rgba(134, 193, 93, 0.1)
  width: 100%;
  height: 20px;
`;

export const Label = styled.label`
  overflow-x: auto;
  margin-left: 20px;
  width: 200px;
  height: 20px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;
