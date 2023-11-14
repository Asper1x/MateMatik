import { IGetProblem, ICreateProblem, ITest } from './problem.interface';
import prisma from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { promises as fs } from 'fs';

const ProblemsService = {
	get(data: IGetProblem) {
		const tags = data.prompt?.tagNames
			? { tagNames: { hasEvery: data.prompt.tagNames } }
			: { tagNames: undefined };

		return prisma.problem.findMany({
			where: { ...data.prompt, ...tags },
			take: data.take,
			skip: data.take * (data.page - 1),
		});
	},

	create(data: ICreateProblem) {
		const tagConnect = data.tagNames.map((tag) => ({
			name: tag,
		}));
		return prisma.problem.create({
			data: {
				...data,
				publicId: nanoid(13),
				tags: { connect: tagConnect },
				tagNames: undefined,
			},
		});
	},

	async load(id: string) {
		const problem = await prisma.problem.findUnique({
			where: { publicId: id },
		});

		if (!problem) {
			return null;
		}

		const file = await fs.readFile(
			process.cwd() + `/public/tests/${id}.json`,
			'utf8',
		);
		const json = JSON.parse(file);

		return json.tests as ITest[];
	},
};

export default ProblemsService;

/*
let input: Record<string, any> = {};
    if (data.prompt) {
      if (data.prompt.publicId) {
        input = { ...input, publicId: data.prompt.publicId };
      }
      if (data.prompt.tagNames) {
        input = { ...input, tagIds: { hasEvery: [data.prompt?.tagNames] } };
      }
      if (data.prompt.title) {
        input = { ...input, title: data.prompt.title };
      }
    }

prisma.problem.findMany({
      where: input,
      take: data.take,
      skip: data.take * (data.page - 1),
    });
*/
