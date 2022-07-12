import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Nav from "../components/Nav";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Boards from "../views/Boards";
import Board from "../views/Board";
import Account from "../views/Account";

export default function Routes() {
  const { pathname } = useLocation();
  return (
    <>
      {!pathname.includes("sign") && <Nav />}
      <Switch>
        <PrivateRoute path="/account" exact component={Account} />
        <PrivateRoute path="/boards" exact component={Boards} />
        <PrivateRoute path="/b/:id/" component={Board} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Redirect from="/" to="/boards" />
      </Switch>
    </>
  );
}
