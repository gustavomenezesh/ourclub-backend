import * as Z from 'zod';

const schema = Z.object({
  categoryId: Z.number().nonnegative(),
  description: Z.string().nonempty().max(64),
});

export default schema;
