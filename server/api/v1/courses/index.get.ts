import {db} from '../../../utils/db.drizzle';
import {classes, courses, studentsClasses} from "~/drizzle/schema";
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
        })
            .from(studentsClasses)
            .innerJoin(classes, eq(studentsClasses.classesId, classes.id))
            .innerJoin(courses, eq(classes.id, courses.classId))
            .where(eq(studentsClasses.studentsId, user_id))
            .limit(limit)
            .offset(offset);
        const total_records = await db.select({count: count()})
            .from(studentsClasses)
            .innerJoin(classes, eq(studentsClasses.classesId, classes.id))
            .innerJoin(courses, eq(classes.id, courses.classId))
            .where(eq(studentsClasses.studentsId, user_id));
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
