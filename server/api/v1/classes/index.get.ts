import { db } from '../../../utils/db.drizzle';
import { classes } from "~/drizzle/schema";
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
                id: classes.id,
                name: classes.name,
                year: classes.year,
            })
                .from(classes)
                .orderBy(desc(classes.createdAt))
                .limit(limit)
                .offset(offset),

            db.select({ totalCount: count() }).from(classes)
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
