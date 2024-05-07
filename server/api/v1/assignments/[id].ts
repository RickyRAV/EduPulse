import {db} from '../../../utils/db.drizzle';
import {assignments, courses} from "~/drizzle/schema";
import {count, eq} from 'drizzle-orm';
import paginationSchema from "~/server/api/schemas/pagination-schema";
import routerParamSchema from "~/server/api/schemas/router-param-schema";

export default defineEventHandler(async (event) => {
    const router = routerParamSchema.safeParse(getRouterParams(event));
    const query = paginationSchema.safeParse(await getQuery(event));
    if (!router.success) {
        return {
            statusCode: 400,
            message: 'Validation Error',
            data: router.error,
        };
    }
    if (!query.success) {
        return {
            statusCode: 400,
            message: 'Validation Error',
            data: query.error,
        };
    }
    try {
        const {id} = router.data;
        const {offset, limit} = query.data;
        const {user: {id: user_id}} = event.context.user;
        const data = await db.select({
            id: assignments.id,
            title: assignments.title,
            description: assignments.description,
            difficulty: assignments.difficulty,
            max_hours: assignments.maxHours,
        })
            .from(assignments)
            .innerJoin(courses, eq(assignments.courseId, courses.id))
            .where(eq(courses.id, id))
            .limit(limit)
            .offset(offset);
        const total_records = await db.select({count: count()})
            .from(assignments)
            .innerJoin(courses, eq(assignments.courseId, courses.id))
            .where(eq(courses.id, id));
        setResponseStatus(event, 200);
        return {
            data,
            pagination: { total_records: total_records[0].count }
        }
    } catch (error) {
        setResponseStatus(event, 500);
        return {message: (error as Error).message};
    }
});