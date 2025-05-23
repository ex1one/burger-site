
import styles from './not-found.module.css';

import { Link } from '@src/components';
import { PAGES } from '@src/consts';

export function NotFound() {
	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<form className={styles.contentBody}>
					<h2 className='text text_type_main-medium'>Страница не найдена!</h2>
				</form>
				<div className={styles.contentFooter}>
					<div className={styles.wrapperText}>
						<Link to={PAGES.HOME}>Вернуться на главную страницу</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
