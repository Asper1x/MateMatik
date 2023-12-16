import ILocale from '@/app/types/props/lang/ILocale';
import Testing from '@/app/components/page/TestingPage/Testing';
import { getTranslation } from '../../../localize';
import { ITesting } from '@/lib/services/testing/testing.interface';
import { TestingService } from '@/lib/services/testing/testing.service';
import ErrorComponent from '@/app/components/error/Error';
import UserNavbar from '@/app/components/nav/UserNavbar';
import ProblemsService from '@/lib/services/problem/problem.service';
import { TestUtils } from '@/lib/utils/test/TestUtils';
import Finished from '@/app/components/page/FinishedPage/Finished';

interface TestingPageParams extends ILocale {
	id: string;
}

export default async function TestingPage({
	params,
}: {
	params: TestingPageParams;
}) {
	let testing: ITesting | undefined;
	let HOSTNAME: string | null;
	let test: string[] | undefined;

	try {
		testing = await TestingService.getTesting(params.id, true);
		[HOSTNAME] = await getTranslation(params.lang, 'host.name');
		test = (await ProblemsService.load(testing.problemId))?.map(
			TestUtils.autoGen.bind(TestUtils),
		);
	} catch (e: any) {
		console.log(e);

		testing = undefined;
		HOSTNAME = null;
		test = undefined;
	}

	return testing && HOSTNAME && test ? (
		<>
			{testing.answers.length >= test.length ||
			(testing.started &&
				testing.problem?.maxTime &&
				testing.started.getTime() + testing.problem?.maxTime * 1000 <=
					Date.now()) ? (
				<Finished testing={testing} test={test} lang={params.lang} />
			) : (
				<Testing testing={testing} test={test} HOSTNAME={HOSTNAME} />
			)}
		</>
	) : (
		<>
			<UserNavbar lang={params.lang} />
			<ErrorComponent name="errors.testNotFounded" params={params} />
		</>
	);
}
