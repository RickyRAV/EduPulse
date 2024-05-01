import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
});

export default loginSchema;