import prisma from '@/lib/prisma';
import { ITag } from './tag.interface';

export const TagService = {
	async getAll(): Promise<ITag[]> {
		return prisma.tag.findMany();
	},
};
