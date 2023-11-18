import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.getAll('id');

	const results = await prisma.testing.findMany({
		where: { id: { in: id } },
	});

	return Response.json({ results });
}
