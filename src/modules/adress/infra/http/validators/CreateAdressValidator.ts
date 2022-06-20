import * as Z from 'zod';

const schema = Z.object({
  userId: Z.number().nonnegative(),
  cep: Z.string().nonempty().max(8),
  state: Z.string().nonempty().max(20),
  city: Z.string().nonempty().max(64),
  street: Z.string().nonempty().max(64),
  number: Z.string().nonempty().max(5),
  district: Z.string().nonempty().max(64),
  complement: Z.string().nonempty().max(64).nullable(),
});

export default schema;
