import classes from "./AuthForm.module.css";
import { useRef, useState, useContext } from "react";
import AuthContext from "../../store/AuthContext";
const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassWord = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    setLoading(true);

    if (enteredConfirmPassword !== enteredPassWord) {
      console.log("passwords do not match");
      throw new Error("passwords do not match");
    }

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfEMJNUWanJky-jYSDG0n0CpMrB2rKz04",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassWord,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
        })
        .catch((err) => {
          alert(err.message);
        });
    }
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
          <label htmlFor="password">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{loading ? "loading" : isLogin ? "login" : "Sign up"}</button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
