import loginSchema from "~/server/api/schemas/login-schema";
import supabase from "~/server/utils/client.supabase";


export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, loginSchema.safeParse);
    if (!body.success) {
        setResponseStatus(event, 400);
        return {
            message: 'Validation Error',
            data: body.error,
        };
    }
    const {data: {email, password}} = body;
    try {
        const {data, error} = await supabase.auth.signUp({
            email, password
        });
        const {session} = data;
        if(!session || error) {
            setResponseStatus(event, 400);
            return {
                message: error?.message,
            };
        }
        setCookie(event, 'token', session.access_token, {
            maxAge: 3600,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        setResponseStatus(event, 200);
        return {
            message: 'User registered successfully',
        }
    }  catch (error) {
        setResponseStatus(event, 500);
        return {message: (error as Error).message};
    }
});