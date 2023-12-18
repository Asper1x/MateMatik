'use client';

import { AGetTesting } from '@/app/actions/testing/testing.action';
import { getSavedTestings, saveTesting } from '@/app/hooks/storage/useStorage';
import { DateUtils } from '@/lib/utils/test/DateUtils';
import { useQuery } from '@tanstack/react-query';
import { IResultsSearchParams } from './Results';

export default function Entities({ params }: { params: IResultsSearchParams }) {
	const { data } = useQuery({
		queryKey: ['userTestingData'],
		queryFn: () => AGetTesting(getSavedTestings(), params.top10),
	});

	return (
		<>
			{data ? (
				data.map((testing) => (
					<tr key={testing.id}>
						<td>{testing.userName}</td>
						<td>{testing.problem.title}</td>
						<td>
							{DateUtils.format(
								DateUtils.diff(
									testing.updated,
									testing.started ?? new Date(),
								),
							)}
						</td>
						<td>{testing.mark ?? '?'}</td>
					</tr>
				))
			) : (
				<tr>
					<th>Loading...</th>
					<th>Loading...</th>
					<th>Loading...</th>
					<th>Loading...</th>
				</tr>
			)}
		</>
	);
}
