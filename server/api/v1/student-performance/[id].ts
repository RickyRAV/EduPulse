import {db} from '../../../utils/db.drizzle';
import routerParamSchema from "~/server/api/schemas/router-param-schema";
import paginationSchema from "~/server/api/schemas/pagination-schema";
import {assignments, assignmentsCompletions, courses} from "~/drizzle/schema";
import {count, eq, sql} from "drizzle-orm";

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

    try{
        const {id} = router.data;
        const {offset, limit} = query.data;

        const data = await db.select({
            avg_student_hours: sql<number>`CAST(AVG(${assignmentsCompletions.timeSpent}) AS DECIMAL(4,2))`,
            avg_student_difficulty: sql<number>`CAST(AVG(${assignmentsCompletions.difficultyReported}) AS DECIMAL(4,2))`
        })
            .from(assignmentsCompletions)
            .innerJoin(assignments, eq(assignments.id, assignmentsCompletions.assignmentId))
            .innerJoin(courses, eq(courses.id, assignments.courseId))
            .groupBy(assignmentsCompletions.assignmentId)
            .where(eq(courses.id, id))
            .limit(limit)
            .offset(offset);
        const total_records = await db.select({count: count()})
            .from(assignmentsCompletions)
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