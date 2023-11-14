import Problems, {
	IProblemsSearchParams,
} from '@/app/components/page/ProblemPage/Problems';
import ILocale from '@/app/types/props/lang/ILocale';

export default function ProblemsPage({
	params,
	searchParams,
}: {
	params: ILocale;
	searchParams: IProblemsSearchParams;
}) {
	return <Problems searchParams={searchParams} params={params} />;
}
