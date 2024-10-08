import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();

  return bcrypt.hashSync(password, salt);
};

export const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
