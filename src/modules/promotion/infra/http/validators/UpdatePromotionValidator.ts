import * as Z from 'zod';

const schema = Z.object({
    title: Z.string().nonempty().max(64),
    description: Z.string().nonempty().max(1024),
    code: Z.string().nonempty().max(64),
    value: Z.number(),
});

export default schema;
