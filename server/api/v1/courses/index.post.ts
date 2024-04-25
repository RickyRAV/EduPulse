import {db} from '../../../utils/db.drizzle';
import {courses} from "~/drizzle/schema";
import {z} from 'zod';

const coursesSchema = z.object({
    name: z.string(),
    class_id: z.string(),
});

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => coursesSchema.safeParse(body));
    if (!result.success) {
        setResponseStatus(event, 400);
        return {status: 'error', message: result.error.issues};
    }
    try {
        const {name, class_id} = result.data;
        const data = await db.insert(courses)
                                                        .values({name, classId: class_id})
                                                        .returning({id: courses.id, name: courses.name, classId: courses.classId});
        setResponseStatus(event, 200);
        return {
            data
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return {message: (error as Error).message};
    }
});
