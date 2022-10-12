import * as Z from 'zod';

const schema = Z.object({
  description: Z.string().nonempty().max(64),
});

export default schema;
