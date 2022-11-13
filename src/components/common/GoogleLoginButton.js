import axios from "axios";
import { useEffect, useState } from "react";

export default function GoogleLoginButton() {
  const googleLoginHandler = () => {
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
    window.location.href = GOOGLE_LOGIN_URL;
  };
  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const code = params.get("code");
    params.delete("code");
    if (loading === false && code !== null) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER}/auth/google/login-student/token?code=${code}`
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem("TOKEN", `Bearer ${res.data.token}`);
        });
    }
  }, []);

  return <button onClick={googleLoginHandler}>구글로그인</button>;
}
