import * as Z from 'zod';

const schema = Z.object({
  name: Z.string().nonempty().max(64).optional(),
  number: Z.string().nonempty().max(6).optional(),
  color: Z.string().nonempty().max(14).optional(),
  value: Z.number().nonnegative().optional(),
});

export default schema;
