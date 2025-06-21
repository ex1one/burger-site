import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import styles from "./reset-password.module.css";

import { Link, PasswordInput } from "@src/components";
import { PAGES, schemas } from "@src/consts";
import { useAppDispatch, useAppSelector } from "@src/hooks";
import { userSelectors, userThunks } from "@src/services/user";
import { isPendingByStatus } from "@src/utils";

const defaultValues = {
  password: "",
  code: "",
};

export function ResetPassword() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(userSelectors.statusSelector);
  const isPending = isPendingByStatus(status);

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schemas.auth.resetPassword),
  });

  const handleSubmit = ({ password, code }: typeof defaultValues) => {
    dispatch(userThunks.changePassword({ password, code }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <form
          className={styles.contentBody}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          <Controller
            name="password"
            control={form.control}
            render={({ field, formState }) => {
              return (
                <PasswordInput
                  placeholder="Введите новый пароль"
                  error={Boolean(formState.errors.password)}
                  errorText={formState.errors.password?.message}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="code"
            control={form.control}
            render={({ field, formState }) => {
              return (
                <Input
                  placeholder="Введите код из письма"
                  error={Boolean(formState.errors.code)}
                  errorText={formState.errors.code?.message}
                  {...field}
                />
              );
            }}
          />
          <Button type="primary" htmlType="submit" disabled={isPending}>
            Сохранить
          </Button>
        </form>
        <div className={styles.contentFooter}>
          <div className={styles.wrapperText}>
            Вспомнили пароль? <Link to={PAGES.SIGN_IN}>Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
