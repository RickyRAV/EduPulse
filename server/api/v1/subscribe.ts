import {z} from 'zod';
import {Resend} from "resend";

const emailSchema = z.object({
    email: z.string().email(),
});

export default defineEventHandler(async (event) => {
    try {
        const result = await readValidatedBody(event, body => emailSchema.safeParse(body));

        if (!result.success) throw result.error.issues

        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.contacts.create({
            email: result.data.email, unsubscribed: false, audienceId: process.env.RESEND_AUDIENCE_ID!
        });

        return { 'status': 'ok'}
    } catch (error) {
        return { 'status': 'error', 'message': (error as Error).message}
    }
});