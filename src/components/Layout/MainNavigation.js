import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <ul>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/home"
          >
            Home
          </NavLink>
        </li>

        {authCtx.isLoggedIn && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/auth"
            >
              Login
            </NavLink>
          </li>
        )}
        {!authCtx.isLoggedIn && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/auth"
            >
              Sign up
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};
export default MainNavigation;
