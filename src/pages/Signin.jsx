import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || ""
  );
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current = email;
    passwordRef.current = password;

    const isValidEmail = emailRef.current.indexOf("@") !== -1;
    const isValidPassword = passwordRef.current.length >= 8;

    setBtnDisabled(!isValidEmail || !isValidPassword);
  }, [email, password]);

  useEffect(() => {
    if (accessToken) {
      navigate("/todo");
    }
  }, [accessToken, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const saveToken = (token) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const SIGNIN_API =
      "https://www.pre-onboarding-selection-task.shop/auth/signin";

    try {
      const req = await axios.post(
        SIGNIN_API,
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
      window.alert("로그인이 완료되었습니다!");

      const { access_token } = req.data;
      if (access_token) {
        saveToken(access_token);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section>
      <h1>로그인</h1>
      <form onSubmit={handleSignin}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            data-testid="email-input"
            type="text"
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
          />
        </div>

        <button
          data-testid="signup-button"
          type="submit"
          disabled={btnDisabled}
        >
          로그인
        </button>
      </form>
    </section>
  );
}
