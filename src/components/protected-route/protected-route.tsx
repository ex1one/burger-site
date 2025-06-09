import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import API from "@src/api";
import {
  getCookie,
  getItemFromLocalStorage,
  setCookie,
  setItemToLocalStorage,
} from "@src/api/utils";
import { PAGES } from "@src/consts";
import { useAppDispatch, useAppSelector } from "@src/hooks";
import { userSelectors, userActions } from "@src/services/user";

export const ProtectedRoute = ({
  element,
  isAnonymous = false,
}: {
  element: JSX.Element;
  isAnonymous?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.userSelector);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const location = useLocation();
  const from = location.state?.from || "/";

  /*

		Смотри по порядку:
		1. https://www.youtube.com/watch?v=pPAxIU7VvpY&t=3746s (тут начало проекта)
		2. https://www.youtube.com/watch?v=a83r-YGWMBc&t=6058s (тут уже полноценная работа над входом и регистрацией)
		3. https://www.youtube.com/watch?v=DChSroCxOJE (тут он работал в основном над страницей ингредиентов)

		Основные мысли после просмотра видео:
		- Для каждой страницы, в зависимости от ее логики. (Для Anonymous, Authorized Users своя "фабрика")
		-- Страница Анонимная (Логин, Авторизация)
		-- Страница для авторизированных пользователей. (Профиль)

		- Когда мы ходим за сессией пользователя, сова показывает loader на всю страницу. Так что это норм практика.
		- У него для каждой thunk функции (у него это effect), есть состояния: isLoading, done, fail.
		- TODO: Написать обертку для каждой thunk функции в которой будет состояние ее:
		-- isLoading, reset, selector (который позволяет получать состояние thunk в компонентах. возможно этого не сделали разрабы, потому что это противоречит одному из паттернов архитектурных)


		Мини-план по переписыванию:
		- Для начала посмотреть сову еще раз. Youtobe - https://www.youtube.com/watch?v=pPAxIU7VvpY&t=3746s. GitHub Code - https://github.com/debabin/effector-power/tree/main.
		- На ютубе смотри видос с 1:43:58, когда он начал писать код в комментариях
		- После этого накидать план по переписыванию.
		- Там лучше наверное написать: Работа со стороны redux-thunk. Для Anonymous, Authorized Users.


	*/

  // TODO: Вынести это. Подумать над добавлением поле status в slice user. И как с ним работать. Посмотреть видео
  // Как сова делал авторизацию. Я помню смотрел его видос по авторизации, он писал на effector.
  const init = async () => {
    try {
      if (user) {
        setUserLoaded(true);
        return;
      }

      let accessToken = getItemFromLocalStorage("accessToken");
      let refreshToken = getCookie("token");

      if (refreshToken) {
        if (!accessToken) {
          const {
            accessToken: refreshedAccessToken,
            refreshToken: refreshedRefreshToken,
          } = await API.user.refreshAccessToken(refreshToken);

          accessToken = refreshedAccessToken;
          refreshToken = refreshedRefreshToken;

          setCookie("token", refreshedRefreshToken);
          setItemToLocalStorage("accessToken", refreshedAccessToken);
        }

        const { user } = await API.user.getUser(accessToken);
        dispatch(userActions.setUser(user));

        setUserLoaded(true);
      }
    } finally {
      setUserLoaded(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  // Чтобы у авторизованного пользователя не было доступа к /sign-in и другим таким маршрутам.
  // Мы его перенаправляем обратно на тот маршрут откуда он пришел. Сценарий такой:
  // 1. Пользователь авторизовался. И чтобы потом у него не было возможности вернуться на страницу входа.
  if (isAnonymous && user) {
    return <Navigate to={from} />;
  }

  if (!isAnonymous && !user) {
    return <Navigate to={PAGES.SIGN_IN} state={{ from: location }} />;
  }

  return element;
};
