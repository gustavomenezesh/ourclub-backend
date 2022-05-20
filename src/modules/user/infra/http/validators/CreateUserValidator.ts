import * as Z from 'zod';

const schema = Z.object({
  name: Z.string().nonempty().max(64),
  lastName: Z.string().nonempty().max(64),
  email: Z.string().nonempty().max(64),
  phone: Z.string().nonempty().max(12),
  gender: Z.enum(['MASCULINO', 'FEMININO', 'OUTROS']),
  role: Z.enum(['CLIENTE', 'ADM']),
  secret: Z.string().nonempty(),
  cep: Z.string().nonempty().max(8),
  state: Z.string().nonempty().max(20),
  city: Z.string().nonempty().max(64),
  street: Z.string().nonempty().max(64),
  number: Z.string().nonempty().max(5),
  district: Z.string().nonempty().max(64),
  complement: Z.string().nonempty().max(64).nullable(),
});

export default schema;
