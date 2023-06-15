import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button, FlexDiv, Nav } from "../styles/HeaderStyle";

export default function TodoHeader() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAccessToken("");
    window.alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <Nav>
      <h1>Wanted-Pre-Onboarding</h1>
      <FlexDiv>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          <AiFillHome />
        </Button>
        <Button data-testid="logout-button" onClick={handleLogout}>
          로그아웃
        </Button>
      </FlexDiv>
    </Nav>
  );
}
