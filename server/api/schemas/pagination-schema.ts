import { z } from 'zod';

const paginationSchema = z.object({
    offset: z.coerce.number().default(0),
    limit: z.coerce.number().default(10),
});

export default paginationSchema;
