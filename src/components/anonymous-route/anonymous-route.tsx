import { Navigate, useLocation } from "react-router-dom";

import { Loader } from "../loader";

import styles from "./anonymous-route.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { AuthStatus, userSelectors, userThunks } from "@src/services/user";
import { PAGES } from "@src/consts";

export const AnonymousRoute = ({ element }: { element: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const from = location.state?.from || PAGES.HOME;

  const status = useAppSelector(userSelectors.statusSelector);

  const loader = (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );

  if (status === AuthStatus.Authenticated) {
    return <Navigate to={from} />;
  }

  if (status === AuthStatus.Anonymous) {
    return element;
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
