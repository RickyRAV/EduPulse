import { serverSupabaseClient } from '#supabase/server'
import {getRequestURL} from "h3";

export default defineEventHandler(async (event) => {
    const {pathname} = getRequestURL(event)
    // console.log(pathname)
    const publicRoutes = ['/api/v1/login', '/api/v1/register', '/', '/signup', '/api-docs/'];
    if (publicRoutes.includes(pathname)) {
        return;
    }

    const headerToken = getHeader(event, 'Authorization')?.split('Bearer ')[1];

    const cookieToken = getCookie(event, 'sb-access-token');

    const token = headerToken || cookieToken;
    // console.log(token);
    if (!token) {
        setResponseStatus(event, 401);
        return {
            message: 'No token provided',
        };
    }
    const supabase = await serverSupabaseClient(event)
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        setResponseStatus(event, 401);
        return {
            message: 'Unauthorized',
        };
    }
    event.context.user = user;
})
