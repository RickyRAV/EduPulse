import {z} from "zod";

const routerParamSchema = z.object({
    id: z.string().uuid(),
});

export default routerParamSchema;