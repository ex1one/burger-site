import { Navigate, useLocation } from "react-router-dom";

import { Loader } from "../loader";

import styles from "./authorized-route.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { userSelectors, userThunks } from "@src/services/user";
import { AuthStatus, PAGES } from "@src/consts";

export const AuthorizedRoute = ({ element }: { element: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const from = location.state?.from || PAGES.SIGN_IN;

  const authStatus = useAppSelector(userSelectors.authStatusSelector);

  const loader = (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );

  if (authStatus === AuthStatus.Authenticated) {
    return element;
  }

  if (authStatus === AuthStatus.Anonymous) {
    return <Navigate to={from} state={{ from: location }} />;
  }

  if (authStatus === AuthStatus.Initial) {
    dispatch(userThunks.sessionRequest());

    return loader;
  }

  if (authStatus === AuthStatus.Pending) {
    return loader;
  }

  return null;
};
