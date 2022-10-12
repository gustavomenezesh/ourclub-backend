import * as Z from 'zod';

const schema = Z.object({
    description: Z.string().nonempty().max(20),
});

export default schema;
