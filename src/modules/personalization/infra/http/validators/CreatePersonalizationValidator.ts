import * as Z from 'zod';

const schema = Z.object({
  productId: Z.number(),
  name: Z.string().nonempty().max(64),
  number: Z.string().nonempty().max(6),
  color: Z.string().nonempty().max(14),
  value: Z.number().nonnegative(),
});

export default schema;
