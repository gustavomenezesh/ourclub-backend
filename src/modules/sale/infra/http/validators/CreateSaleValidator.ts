import * as Z from 'zod';

const schema = Z.object({
  userId: Z.number().nonnegative(),
  adressId: Z.number().nonnegative(),
  description: Z.string().max(1024),
  total: Z.number().nonnegative(),
  paymentType: Z.string().max(32),
  productsSize: Z.array(Z.object({
    product: Z.number().nonnegative(),
    size: Z.number().nonnegative(),
  })),
});

export default schema;
