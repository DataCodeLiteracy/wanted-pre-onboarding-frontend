import styled from "styled-components";

export const Wrapper = styled.section`
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

export const Title = styled.h1`
  margin-bottom: 70px;
  font-size: 3rem;
  text-align: center;
  color: black;
`;

export const WhiteShadowTitle = styled(Title)`
  color: white;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);
`;

export const Main = styled.div`
  height: 70%;
`;
