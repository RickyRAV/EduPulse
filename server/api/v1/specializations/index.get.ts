import { db } from '../../../utils/db.drizzle';
import { specializations } from "~/drizzle/schema";
import { desc, count } from 'drizzle-orm';
import { z } from 'zod';

const paginationSchema = z.object({
    offset: z.coerce.number(),
    limit: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
    const queryParams = getQuery(event);
    const result = paginationSchema.safeParse(queryParams);
    if (!result.success) {
        setResponseStatus(event, 400);
        return { status: 'error', message: result.error.issues };
    }
    const { offset, limit } = result.data;
    try {
        const [data, [{ totalCount }]] = await Promise.all([
            db.select({
                id: specializations.id,
                name: specializations.name,
            })
                .from(specializations)
                .orderBy(desc(specializations.createdAt))
                .limit(limit)
                .offset(offset),

            db.select({ totalCount: count() }).from(specializations)
        ]);

        setResponseStatus(event, 200);
        return {
            data,
            totalCount
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return { message: (error as Error).message };
    }
});
