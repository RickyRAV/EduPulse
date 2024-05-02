import {db} from '../../../utils/db.drizzle';
import {courses, coursesTeachers, teachers} from "~/drizzle/schema";
import {count, desc, eq} from 'drizzle-orm';
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
        const data = await db.select()
            .from(courses)
            .where(eq(courses.classId, id))
            .orderBy(desc(courses.createdAt))
            .limit(limit)
            .offset(offset);
        // const total_records = await db.select({ count: count() })
        //     .from(courses)
        //     .innerJoin(coursesTeachers, eq(courses.id, coursesTeachers.coursesId))
        //     .innerJoin(teachers, eq(coursesTeachers.teachersId, teachers.userId))
        //     .where(eq(courses.classId, id));
        const total_records = await db.select({ count: count() }).from(courses).where(eq(courses.classId, id));
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