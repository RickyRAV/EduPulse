import {db} from "~/server/utils/db.drizzle";
import {specializations, specializationsTeachers} from "~/drizzle/schema";
import {eq} from "drizzle-orm";

export default defineEventHandler(async (event) => {
    try {
        const {user: {id}} = event.context.user;
        setResponseStatus(event, 200);
        const data = await db.select({name: specializations.name, id: specializations.id})
            .from(specializationsTeachers)
            .innerJoin(specializations, eq(specializationsTeachers.specializationsId, specializations.id))
            .where(eq(specializationsTeachers.teachersId, id))
        return {
            data
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return {message: (error as Error).message};
    }
});