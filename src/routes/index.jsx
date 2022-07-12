import { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
const SignIn = lazy(() => import("../views/SignIn"));
const SignUp = lazy(() => import("../views/SignUp"));
const Boards = lazy(() => import("../views/Boards"));
const Board = lazy(() => import("../views/Board"));
const Account = lazy(() => import("../views/Account"));
const Nav = lazy(() => import("../components/Nav"));
const Loader = lazy(() => import("../components/Loader"));

export default function Routes() {
  const { pathname } = useLocation();
  return (
    <>
      {!pathname.includes("sign") && (
        <Suspense fallback={<Loader />}>
          <Nav />
        </Suspense>
      )}
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute path="/account" exact component={<Account />} />
          <PrivateRoute path="/boards" exact component={<Boards />} />
          <PrivateRoute path="/b/:id/" component={<Board />} />
          <Route path="/sign-in" component={<SignIn />} />
          <Route path="/sign-up" component={<SignUp />} />
          <Redirect from="/" to="/boards" />
        </Switch>
      </Suspense>
    </>
  );
}
