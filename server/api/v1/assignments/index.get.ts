import {db} from '../../../utils/db.drizzle';
import {assignments, courses, coursesTeachers, teachers} from "~/drizzle/schema";
import paginationSchema from "~/server/api/schemas/pagination-schema";
import {count, desc, eq} from "drizzle-orm";

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
            id: assignments.id,
            title: assignments.title,
            description: assignments.description,
            difficulty: assignments.difficulty,
            max_hours: assignments.maxHours,
            course: {
                id: courses.id,
                name: courses.name,
                class_id: courses.classId,
            }
        })
            .from(assignments)
            .innerJoin(courses, eq(assignments.courseId, courses.id))
            .innerJoin(coursesTeachers, eq(courses.id, coursesTeachers.coursesId))
            .innerJoin(teachers, eq(coursesTeachers.teachersId, teachers.userId))
            .orderBy(desc(assignments.createdAt))
            .where(eq(teachers.userId, user_id))
            .limit(limit)
            .offset(offset);
        const total_records = await db.select({ count: count() }).from(assignments);
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