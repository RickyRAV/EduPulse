import {db} from '../../../utils/db.drizzle';
import {classes, courses, coursesTeachers} from "~/drizzle/schema";
import {count, eq} from 'drizzle-orm';
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
        const {user: {id: user_id}} = event.context.user;
        const data = await db.select({
            id: courses.id,
            name: courses.name,
            class_name: classes.name,
            class_id: classes.id,
        })
            .from(coursesTeachers)
            .innerJoin(courses, eq(courses.id, coursesTeachers.coursesId))
            .innerJoin(classes, eq(courses.classId, classes.id))
            .where(eq(coursesTeachers.teachersId, user_id))
            .limit(limit)
            .offset(offset);
        const total_records = await db.select({count: count()})
            .from(coursesTeachers)
            .where(eq(coursesTeachers.teachersId, user_id));
        setResponseStatus(event, 200);
        return {
            data,
            pagination: {total_records: total_records[0].count}
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return {message: (error as Error).message};
    }
});
