import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Outlet } from "react-router-dom";

import styles from "./profile.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { NavLink, PasswordInput } from "@src/components";
import { PAGES } from "@src/consts";
import { userSelectors, userThunks } from "@src/services/user";
import { isPendingByStatus } from "@src/utils";
import { schemas } from "@src/schemas";

export function Profile() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelectors.userSelector);
  const status = useAppSelector(userSelectors.statusSelector);

  const isPending = isPendingByStatus(status);

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      login: "",
      password: "",
    },
    resolver: yupResolver(schemas.user.update),
  });

  const handleSubmit = (
    updatedFields: Required<NonNullable<typeof form.formState.defaultValues>>
  ) => {
    // Backend возвращает изначальную дату, поэтому данные меняться не будут
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
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              disabled={isPending}
            >
              Сохранить
            </Button>
            <Button
              htmlType="reset"
              type="primary"
              size="medium"
              onClick={handleClickCancelEdit}
              disabled={isPending}
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
          <NavLink
            to={PAGES.PROFILE}
            end
            className={styles.navigationMenuLink}
            size="md"
          >
            Профиль
          </NavLink>
          <NavLink
            to={PAGES.PROFILE_ORDERS}
            className={styles.navigationMenuLink}
            size="md"
          >
            История заказов
          </NavLink>
          <NavLink
            to="/"
            className={styles.navigationMenuLink}
            size="md"
            onClick={handleClickLogout}
          >
            Выход
          </NavLink>
        </div>
        <div className={styles.navigationMenuDescription}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>
      <Outlet />
    </div>
  );
}
