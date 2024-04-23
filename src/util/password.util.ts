import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await generateSalt();
  return await bcrypt.hash(password, salt);
};

const generateSalt = async (): Promise<string> => {
  return await bcrypt.genSalt(SALT_ROUNDS);
};
