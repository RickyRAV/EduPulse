import supabase from "~/server/utils/client.supabase";

export default defineEventHandler(async (event) => {
    const headerToken = getHeader(event, 'Authorization')?.split('Bearer ')[1];

    const cookieToken = getCookie(event, 'token');

    const token = headerToken || cookieToken;

    if (!token) {
        setResponseStatus(event, 401);
        return {
            message: 'Unauthorized',
        };
    }

    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        setResponseStatus(event, 401);
        return {
            message: 'Unauthorized',
        };
    }
    event.context.user = user;
})
