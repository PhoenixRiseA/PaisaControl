import classes from "./AuthForm.module.css";
import { useRef, useState, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassWord = passwordInputRef.current.value;
    let enteredConfirmPassword;
    if (!isLogin) {
      enteredConfirmPassword = confirmPasswordInputRef.current.value;
      confirmPasswordInputRef.current.value = "";
      if (enteredConfirmPassword !== enteredPassWord) {
        console.log("passwords do not match");
        throw new Error("passwords do not match");
      }
    }

    setLoading(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfEMJNUWanJky-jYSDG0n0CpMrB2rKz04";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfEMJNUWanJky-jYSDG0n0CpMrB2rKz04";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassWord,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          res.json.then((data) => {
            let errorMessage = "Authentication failed";
            console.log(data);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.idToken);
        setIsLogin(true);
        authCtx.login(data.idToken);
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          {!isLogin && <label htmlFor="password">Confirm password</label>}

          {!isLogin && (
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordInputRef}
              required
            />
          )}
        </div>
        <div className={classes.actions}>
          <button>{loading ? "loading" : isLogin ? "login" : "Sign up"}</button>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "create new account" : "login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
