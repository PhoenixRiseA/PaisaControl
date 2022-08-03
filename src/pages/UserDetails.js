import classes from "./UserDetails.module.css";
import { useNavigate } from "react-router-dom";
import React, { useRef, useContext } from "react";

import AuthContext from "../store/AuthContext";
const UserDetails = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/");
  };
  const nameRef = useRef();
  const profilePhotoUrlRef = useRef();

  const updateProfileHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredProfilePhotoUrl = profilePhotoUrlRef.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAfEMJNUWanJky-jYSDG0n0CpMrB2rKz04";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
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
      <form onSubmit={updateProfileHandler}>
        <div className={classes.input}>
          <label htmlFor="FullName">Full Name</label>
          <input type="text" ref={nameRef} required />
          <label htmlFor="photoUrl">Profile Photo URL</label>
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
