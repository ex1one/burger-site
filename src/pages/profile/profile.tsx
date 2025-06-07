import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Outlet } from "react-router-dom";

import styles from "./profile.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { Link, PasswordInput } from "@src/components";
import { PAGES, schemas } from "@src/consts";
import { userSelectors, userThunks } from "@src/services/user";

const defaultValues = {
  name: "",
  login: "",
  password: "",
};

export function Profile() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelectors.userSelector);

  const form = useForm({
    values: { ...defaultValues, name: user?.name || "" },
    resolver: yupResolver(schemas.user.update),
  });

  const handleSubmit = (updatedFields: typeof defaultValues) => {
    dispatch(userThunks.update(updatedFields));
  };

  const handleClickCancelEdit = () => {
    form.reset();
  };

  return (
    <form className={styles.content} onSubmit={form.handleSubmit(handleSubmit)}>
      <Controller
        name="name"
        control={form.control}
        render={({ field, formState }) => {
          return (
            <Input
              placeholder="Имя"
              error={Boolean(formState.errors.name)}
              errorText={formState.errors.name?.message}
              {...field}
            />
          );
        }}
      />
      <Controller
        name="login"
        control={form.control}
        render={({ field, formState }) => {
          return (
            <Input
              placeholder="Логин"
              error={Boolean(formState.errors.login)}
              errorText={formState.errors.login?.message}
              {...field}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, formState }) => {
          return (
            <PasswordInput
              error={Boolean(formState.errors.password)}
              errorText={formState.errors.password?.message}
              {...field}
            />
          );
        }}
      />
      <div className={styles.contentFooter}>
        {form.formState.isDirty && (
          <>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
            <Button
              htmlType="reset"
              type="primary"
              size="medium"
              onClick={handleClickCancelEdit}
            >
              Отменить
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

export function ProfileLayout() {
  const dispatch = useAppDispatch();

  const handleClickLogout = () => {
    dispatch(userThunks.logout());
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationMenu}>
        <div className={styles.navigationMenuList}>
          <Link
            to={PAGES.PROFILE}
            isNavLink
            className={styles.navigationMenuLink}
          >
            Профиль
          </Link>
          <Link
            to={PAGES.PROFILE_ORDERS}
            isNavLink
            className={styles.navigationMenuLink}
          >
            История заказов
          </Link>
          {/* TODO: Это вообще должна кнопка */}
          <Link
            to="/"
            isNavLink
            className={styles.navigationMenuLink}
            onClick={handleClickLogout}
          >
            Выход
          </Link>
        </div>
        <div className={styles.navigationMenuDescription}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>
      <Outlet />
    </div>
  );
}
