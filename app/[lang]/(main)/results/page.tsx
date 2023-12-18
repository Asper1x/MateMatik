import Results, {
	IResultsSearchParams,
} from '@/app/components/page/ResultsPage/Results';
import ILocale from '@/app/types/props/lang/ILocale';

export default async function ResultsPage({
	params,
	searchParams,
}: {
	params: ILocale;
	searchParams: IResultsSearchParams;
}) {
	return <Results searchParams={searchParams} params={params} />;
}
