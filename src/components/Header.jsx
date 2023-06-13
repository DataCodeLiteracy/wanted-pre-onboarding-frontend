import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav>
      <h1>Wanted-Pre-Onboarding</h1>
      <div>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </button>
        <button
          onClick={() => {
            navigate("/signin");
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            navigate("/todo");
          }}
        >
          TODOLIST
        </button>
      </div>
    </nav>
  );
}
