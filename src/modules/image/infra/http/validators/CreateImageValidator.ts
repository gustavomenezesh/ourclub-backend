import * as Z from 'zod';

const schema = Z.object({
  productId: Z.number(),
  url: Z.string().nonempty().max(140),
  token: Z.string().nonempty(),
  size: Z.string().nonempty().max(10),
});

export default schema;
