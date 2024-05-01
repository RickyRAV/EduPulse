import {db} from '../../../utils/db.drizzle';
import {courses} from "~/drizzle/schema";
import {asc, count} from 'drizzle-orm';
import paginationSchema from "~/server/api/schemas/pagination-schema";

export default defineEventHandler(async (event) => {
    const queryParams = getQuery(event);
    const result = paginationSchema.safeParse(queryParams);
    if (!result.success) {
        setResponseStatus(event, 400);
        return {status: 'error', message: result.error.issues};
    }
    const {offset, limit} = result.data;
    try {
        const data = await db.select({
                id: courses.id,
                name: courses.name,
            })
                .from(courses)
                .orderBy(asc(courses.name))
                .limit(limit)
                .offset(offset);
        const total_records = await db.select({count: count()}).from(courses);

        setResponseStatus(event, 200);
        return {
            data,
            pagination: { total_records: total_records[0].count }
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return {message: (error as Error).message};
    }
});
