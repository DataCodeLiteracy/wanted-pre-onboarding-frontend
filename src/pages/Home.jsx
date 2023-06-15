import React from "react";
import Header from "../components/Header";
import { Title, WhiteShadowTitle, Wrapper, Main } from "../styles/HomeStyle";

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Title>FRONTEND</Title>
        <WhiteShadowTitle>INTERNSHIP</WhiteShadowTitle>
      </Main>
      <div>Made By DataLiteracy</div>
    </Wrapper>
  );
}
