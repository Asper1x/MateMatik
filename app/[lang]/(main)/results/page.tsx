import Results from '@/app/components/page/ResultsPage/Results';
import ILocale from '@/app/types/props/lang/ILocale';

export default async function ResultsPage({ params }: { params: ILocale }) {
	return <Results params={params} />;
}
