import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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
    <nav>
      <h1>Wanted-Pre-Onboarding</h1>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <AiFillHome />
        </button>
        <button data-testid="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </nav>
  );
}
