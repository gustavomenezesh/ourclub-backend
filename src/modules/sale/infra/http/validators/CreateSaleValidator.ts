import * as Z from 'zod';

const schema = Z.object({
  userId: Z.number().nonnegative(),
  adressId: Z.number().nonnegative(),
  description: Z.string().max(1024),
  total: Z.number().nonnegative(),
  paymentType: Z.string().max(32),
  products: Z.array(Z.object({
    product: Z.number().nonnegative(),
    size: Z.number().nonnegative(),
    personalization: Z.object({
      name: Z.string().max(32).optional(),
      number: Z.string().max(2).optional(),
      value: Z.number().nonnegative().optional(),
    }).optional(),
    quantity: Z.number().nonnegative(),
  })),
});

export default schema;
