import { db } from '../../utils/db.drizzle';
import { assignments } from "~/drizzle/schema";

export default defineEventHandler(async (event) => {
    try {
        const data = await db.select().from(assignments).limit(10);
        return {
            status: 200,
            data
        }
    } catch (error) {
        return { 'status': 'error', 'message': (error as Error).message}
    }
});