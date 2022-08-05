import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <ul>
        {authCtx.isLoggedIn && <h2>Welcome to expense tracker!</h2>}
        {authCtx.isLoggedIn && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home"
            >
              Home
            </NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            Your profile is incomplete
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/home/userDetails"
            >
              <p> </p>complete now
            </NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/expenses"
            >
              Expenses
            </NavLink>
          </li>
        )}

        {!authCtx.isLoggedIn && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/auth"
            >
              Login
            </NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <button className={classes.button} onClick={authCtx.logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};
export default MainNavigation;
