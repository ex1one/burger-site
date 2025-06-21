import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./sign-in.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { userSelectors, userThunks } from "@src/services/user";
import { Link, PasswordInput } from "@src/components";
import { PAGES, schemas } from "@src/consts";
import { isPendingByStatus } from "@src/utils";

// TODO: Придумать куда вынести работу с формой
const defaultValues = {
  email: "",
  password: "",
};

export function SignIn() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(userSelectors.statusSelector);
  const isPending = isPendingByStatus(status);

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schemas.auth.signIn),
  });

  const handleSubmit = ({ email, password }: typeof defaultValues) => {
    dispatch(userThunks.signIn({ email, password }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <form
          className={styles.contentBody}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <h2 className="text text_type_main-medium">Вход</h2>
          <Controller
            name="email"
            control={form.control}
            render={({ field, formState }) => (
              <Input
                placeholder="E-mail"
                error={Boolean(formState.errors.email)}
                errorText={formState.errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, formState }) => (
              <PasswordInput
                error={Boolean(formState.errors.password)}
                errorText={formState.errors.password?.message}
                {...field}
              />
            )}
          />
          <Button type="primary" htmlType="submit" disabled={isPending}>
            Войти
          </Button>
        </form>
        <div className={styles.contentFooter}>
          <div className={styles.wrapperText}>
            Вы — новый пользователь?{" "}
            <Link to={PAGES.SIGN_UP}>Зарегистрироваться</Link>
          </div>
          <div className={styles.wrapperText}>
            Забыли пароль?{" "}
            <Link to={PAGES.FORGOT_PASSWORD}>Восстановить пароль</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
