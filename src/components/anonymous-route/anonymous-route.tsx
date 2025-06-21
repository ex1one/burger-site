import { Navigate, useLocation } from "react-router-dom";

import { Loader } from "../loader";

import styles from "./anonymous-route.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { userSelectors, userThunks } from "@src/services/user";
import { PAGES, AuthStatus } from "@src/consts";

export const AnonymousRoute = ({ element }: { element: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const from = location.state?.from || PAGES.HOME;

  const authStatus = useAppSelector(userSelectors.authStatusSelector);

  const loader = (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );

  if (authStatus === AuthStatus.Authenticated) {
    return <Navigate to={from} />;
  }

  if (authStatus === AuthStatus.Anonymous) {
    return element;
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
