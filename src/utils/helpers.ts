import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();

  return bcrypt.hashSync(password, salt);
};
