import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  return (
    <div className={classes.header}>
      <ul>
        <li>Home</li>
        <li>Expenses</li>
        <li>About us</li>
        <li>Login/Sign Up</li>
      </ul>
    </div>
  );
};
export default MainNavigation;
