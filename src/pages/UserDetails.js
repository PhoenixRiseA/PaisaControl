import classes from "./UserDetails.module.css";
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

// import AuthContext from "../store/AuthContext";
const UserDetails = () => {
  // const authCtx = useContext(AuthContext);
  const idToken = useSelector((state) => state.auth.token);
  console.log("in userDetails component", idToken);
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/");
  };
  const nameRef = useRef();
  const profilePhotoUrlRef = useRef();
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAfEMJNUWanJky-jYSDG0n0CpMrB2rKz04",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
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
        nameRef.current.value = data.users[0].displayName;
        profilePhotoUrlRef.current.value = data.users[0].photoUrl;
      })
      .catch((err) => {
        let errorMessage = "failed to get details";
        alert(errorMessage);
        throw new Error(err.message);
      });
  }, [idToken]);

  const UpdateProfileHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredProfilePhotoUrl = profilePhotoUrlRef.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAfEMJNUWanJky-jYSDG0n0CpMrB2rKz04";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
        displayName: enteredName,
        photoUrl: enteredProfilePhotoUrl,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        let errorMessage = "details could not be updated";
        alert(errorMessage);
        throw new Error(err.message);
      });
  };

  return (
    <section>
      <div className={classes.typeOfDetail}>
        <h3>Contact details</h3>
        <button onClick={cancelHandler}>Cancel</button>
      </div>
      <form onSubmit={UpdateProfileHandler} className={classes.form}>
        <div>
          <label htmlFor="FullName">Full Name:</label>
          <input type="text" ref={nameRef} required />
          <label htmlFor="photoUrl">Profile Photo URL:</label>
          <input type="text" ref={profilePhotoUrlRef} required />
        </div>
        <div className={classes.actions}>
          <button>Update</button>
        </div>
      </form>
    </section>
  );
};
export default UserDetails;
