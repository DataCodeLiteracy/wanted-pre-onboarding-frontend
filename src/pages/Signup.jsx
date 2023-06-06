import axios from "axios";
import React, { useState } from "react";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const SIGNUP_API =
      "https://www.pre-onboarding-selection-task.shop/auth/signup";

    try {
      const req = await axios.post(
        SIGNUP_API,
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      window.alert("회원가입이 완료되었습니다!");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            data-testid="email-input"
            type="text"
            placeholder="이메일 입력"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div>{error}</div>}

        <button data-testid="signup-button" type="submit">
          가입하기
        </button>
      </form>
    </div>
  );
}
