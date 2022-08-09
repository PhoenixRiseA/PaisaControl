import { Fragment } from "react";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import classes from './Layout.module.css'
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};
export default Layout;
