import { Navigate, useLocation } from "react-router-dom";

import { Loader } from "../loader";

import styles from "./authorized-route.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { AuthStatus, userSelectors, userThunks } from "@src/services/user";
import { PAGES } from "@src/consts";

export const AuthorizedRoute = ({ element }: { element: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const from = location.state?.from || PAGES.SIGN_IN;

  const status = useAppSelector(userSelectors.statusSelector);

  const loader = (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );

  if (status === AuthStatus.Authenticated) {
    return element;
  }

  if (status === AuthStatus.Anonymous) {
    return <Navigate to={from} state={{ from: location }} />;
  }

  if (status === AuthStatus.Initial) {
    dispatch(userThunks.sessionRequest());

    return loader;
  }

  if (status === AuthStatus.Pending) {
    return loader;
  }

  return null;
};
