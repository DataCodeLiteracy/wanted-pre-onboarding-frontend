import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, FlexDiv, Nav } from "../styles/HeaderStyle";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Nav>
      <h1>Wanted-Pre-Onboarding</h1>
      <FlexDiv>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </Button>
        <Button
          onClick={() => {
            navigate("/signin");
          }}
        >
          로그인
        </Button>
      </FlexDiv>
    </Nav>
  );
}
