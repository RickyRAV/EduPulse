import {db} from '../../../utils/db.drizzle';
import {classes, courses, coursesTeachers, studentsClasses} from "~/drizzle/schema";
import {count, eq} from 'drizzle-orm';
import paginationSchema from "~/server/api/schemas/pagination-schema";
import { serverSupabaseClient } from '#supabase/server'
import {jwtDecode, type JwtPayload} from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    user_role: string;
}

export default defineEventHandler(async (event) => {
    const queryParams = getQuery(event);
    const result = paginationSchema.safeParse(queryParams);
    if (!result.success) {
        setResponseStatus(event, 400);
        return {status: 'error', message: result.error.issues};
    }
    const {offset, limit} = result.data;
    const client = await serverSupabaseClient(event)
    const session = (await client.auth.getSession()).data.session
    try {
        const {user_role} = jwtDecode<CustomJwtPayload>(session!.access_token);
        const {user: {id: user_id}} = event.context.user;
        // console.log(event.context.user);
        if(user_role==='student') {
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
        }
        else if(user_role==='teacher') {
            const data = await db.select({
                id: courses.id,
                name: courses.name,
                class: classes.name,
                year: classes.year,
            })
                .from(coursesTeachers)
                .innerJoin(courses, eq(courses.id, coursesTeachers.coursesId))
                .innerJoin(classes, eq(classes.id, courses.classId))
                .where(eq(coursesTeachers.teachersId, user_id))
                .limit(limit)
                .offset(offset);
            const total_records = await db.select({count: count()})
                .from(coursesTeachers)
                .innerJoin(courses, eq(courses.id, coursesTeachers.coursesId))
                .innerJoin(classes, eq(classes.id, courses.classId))
                .where(eq(coursesTeachers.teachersId, user_id))
            setResponseStatus(event, 200);
            return {
                data,
                pagination: {total_records: total_records[0].count}
            };
        }
    } catch (error) {
        setResponseStatus(event, 500);
        return {message: (error as Error).message};
    }
});
