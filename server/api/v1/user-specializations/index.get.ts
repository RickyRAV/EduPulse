import {db} from "~/server/utils/db.drizzle";
import {courses, specializationsTeachers} from "~/drizzle/schema";
import {z} from "zod";

export default defineEventHandler(async (event) => {
    try {
        const {user: {id}} = event.context.user;
        setResponseStatus(event, 200);
        const data = db.select().from(specializationsTeachers);
        return {
            data
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return {message: (error as Error).message};
    }
});