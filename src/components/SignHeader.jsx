import React from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function SignHeader() {
  const navigate = useNavigate();

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
      </div>
    </nav>
  );
}
