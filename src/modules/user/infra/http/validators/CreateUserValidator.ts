import * as Z from 'zod';

const schema = Z.object({
  name: Z.string().nonempty().max(64),
  lastName: Z.string().nonempty().max(64),
  email: Z.string().nonempty().max(64),
  phone: Z.string().nonempty().max(12),
  gender: Z.enum(['MASCULINO', 'FEMININO', 'OUTROS']),
  role: Z.enum(['CLIENTE', 'ADM']),
  secret: Z.string().nonempty(),
});

export default schema;
