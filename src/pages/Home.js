import classes from "./Home.module.css";
import React, { useEffect, useState } from "react";
// import AuthContext from "../store/AuthContext";
import { useSelector } from "react-redux";

const Home = () => {
  // const authCtx = useContext(AuthContext);
  const token = useSelector((state) => state.auth.token);
  console.log("in home", token);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAfEMJNUWanJky-jYSDG0n0CpMrB2rKz04",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.users[0].emailVerified) {
          setIsVerified(true);
        }
      })
      .catch((err) => {
        let errorMessage = "failed to get details";
        alert(errorMessage);
        throw new Error(err.message);
      });
  }, [token]);

  const VerifyEmailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAfEMJNUWanJky-jYSDG0n0CpMrB2rKz04",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        let errorMessage = "failed to verify";
        alert(errorMessage);
        throw new Error(err.message);
      });
  };
  return (
    <section className={classes.section}>
      <h1 className={classes.title}>Welcome!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      {!isVerified && (
        <div>
          <button onClick={VerifyEmailHandler}>Verify email</button>
        </div>
      )}
    </section>
  );
};
export default Home;
