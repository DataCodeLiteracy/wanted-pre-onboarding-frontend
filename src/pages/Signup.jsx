import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignHeader from "../components/SignHeader";
import {
  SignWrapper,
  SignTitle,
  SignMain,
  SignForm
} from "../styles/SignStyle";
import { Button } from "../styles/HeaderStyle";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || ""
  );

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

      navigate("/signin");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <SignWrapper>
      <SignHeader />
      <SignMain>
        <SignTitle>회원가입</SignTitle>
        <SignForm onSubmit={handleSignup}>
          <div>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              data-testid="email-input"
              type="text"
              placeholder="이메일 입력"
              autoComplete="on"
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

          <Button
            data-testid="signup-button"
            type="submit"
            disabled={btnDisabled}
          >
            가입하기
          </Button>
        </SignForm>
      </SignMain>
    </SignWrapper>
  );
}
