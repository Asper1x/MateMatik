import { getTranslation } from '@/app/[lang]/localize';
import Icon from '../ui/icon/Icon';
import ILocale from '@/app/types/props/lang/ILocale';

export default async function ErrorComponent({
	name,
	params,
}: {
	name: string;
	params: ILocale;
}) {
	const [message] = await getTranslation(params.lang, name);

	return (
		<div className="error_container">
			<Icon name="x-circle" size={200} />
			<h1>{message}</h1>
		</div>
	);
}
