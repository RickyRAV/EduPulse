import {db} from '../../../utils/db.drizzle';
import {courses, classes} from "~/drizzle/schema";
import {eq} from 'drizzle-orm';
import {z} from 'zod';

const paginationSchema = z.object({
    offset: z.coerce.number(),
    limit: z.coerce.number(),
});
const routerParamSchema = z.object({
    id: z.coerce.string(),
});

export default defineEventHandler(async (event) => {
    //const classID = getValidatedRouterParams(event, body=> routerParamSchema.safeParse(body));
    const {name}  = getRouterParams(event);
    const data = await db.select().from(courses).where(eq(courses.classId, name));

    return {
        data
    }
})
