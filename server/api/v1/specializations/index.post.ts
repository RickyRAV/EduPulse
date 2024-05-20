import { z } from 'zod';
import { specializationsTeachers } from "~/drizzle/schema";

const joiningSchema = z.object({
    teacher: z.string().uuid(),
    specializations: z.array(z.string().uuid())
});

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, joiningSchema.safeParse);
    if (!body.success) {
        setResponseStatus(event, 400);
        return {
            message: 'Validation Error',
            data: body.error,
        };
    }
    const { data: { teacher, specializations } } = body;
    try {
        const insertData = specializations.map(specializationId => ({
            specializationsId: specializationId,
            teachersId: teacher
        }));

        const data = await db.insert(specializationsTeachers).values(insertData).returning();

        return {
            data
        };
    } catch (error) {
        setResponseStatus(event, 500);
        return { message: (error as Error).message };
    }
});
