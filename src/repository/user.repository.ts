import bcrypt from "bcrypt";
import * as firebase from "../integration/firebase/firebase-sdk.integration";
import { User } from "../model/user.model";

export const existsByEmail = async (email: string): Promise<boolean> => {
  const user = await firebase.existsByEmail(email);
  return !!user;
};

export const create = async (newUser: User): Promise<void> => {
  console.log(newUser);
  const hashedPassword = await hashPassword(newUser.password);
  const user = User.withHashedPassword(newUser, hashedPassword);
  await firebase.createUser(user.email);
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await generateSalt();
  return await bcrypt.hash(password, salt);
};

const generateSalt = async (): Promise<string> => {
  return await bcrypt.genSalt(12);
};

// };

// const findByEmail = async (email: string): Promise<User | null> => {
//   return database.find((user: User) => user.email === email) || null;
// };

// function loadUsersFromFile(): User[] {
//   try {
//     console.log(`Loading users from ${USERS_FILE_PATH}`);
//     const data = fs.readFileSync(USERS_FILE_PATH, USERS_FILE_ENCODING);
//     return JSON.parse(data);
//   } catch (error) {
//     console.log(`Error while loading users: ${error}`);
//     return [];
//   }
// }

// function saveUsersToFile() {
//   try {
//     fs.writeFileSync(
//       USERS_FILE_PATH,
//       JSON.stringify(users),
//       USERS_FILE_ENCODING,
//     );
//     console.log(`Users successfully saved to ${USERS_FILE_PATH}`);
//   } catch (error) {
//     console.log(`Error while saving users: ${error}`);
//   }
// }

// export const findAll = async (): Promise<User[]> => Object.values(users);

// export const findById = async (id: string): Promise<User | null> => {
//   return users.find((user: User) => user.id === id) || null;
// };

// export const findByEmail = async (email: string): Promise<User | null> => {
//   return users.find((user: User) => user.email === email) || null;
// };

// export const create = async (newUser: User): Promise<User> => {
//   let id = generateUuidv4();
//   let doesIdAlreadyExist = await findById(id);
//   while (doesIdAlreadyExist) {
//     id = generateUuidv4();
//     doesIdAlreadyExist = await findById(id);
//   }
//   const hashedPassword = await hashPassword(newUser.password);
//   const user: User = {
//     id: id,
//     email: newUser.email,
//     password: hashedPassword,
//   };
//   users.push(user);
//   saveUsersToFile();
//   return user;
// };

// // export const comparePassword = async (
// //   email: string,
// //   suppliedPassword: string,
// // ): Promise<UnitUser | null> => {
// //   const user = await findByEmail(email);
// //   const decryptPassword = await bcrypt.compare(
// //     suppliedPassword,
// //     user!.password,
// //   );
// //   return decryptPassword ? user : null;
// // };

// export const update = async (
//   id: string,
//   newUser: User,
// ): Promise<User | null> => {
//   const existingUser = await findById(id);
//   if (!existingUser) {
//     return null;
//   }
//   if (newUser.password) {
//     const newHashedPassword = await hashPassword(newUser.password);
//     newUser.password = newHashedPassword;
//   }
//   let user = users.find((user: User) => user.id === id);
//   user = {
//     ...existingUser,
//     ...newUser,
//   };
//   saveUsersToFile();
//   return user;
// };

// export const remove = async (id: string): Promise<void | null> => {
//   const user = await findOne(id);
//   if (!user) {
//     return null;
//   }
//   delete users[id];
//   saveUsers();
// };
