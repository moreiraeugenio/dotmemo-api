import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../model/user.model";
import * as userRepository from "../repository/user.repository";
import { ErrorResponse } from "./response/error.response";

export const register = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      const errorResponse = ErrorResponse.ofEmailAndPasswordAreRequired(request.path);
      return response.status(errorResponse.status).json(errorResponse);
    }
    const existsByEmail = await userRepository.existsByEmail(email).catch(() => {
      console.log("Error while checking if user exists");
      return false;
    });
    if (existsByEmail) {
      const errorResponse = ErrorResponse.ofEmailAlreadyRegistered(request.path);
      return response.status(errorResponse.status).json(errorResponse);
    }
    await userRepository.create(User.withEmailAndPassword(email, password)).catch(() => {
      console.log("Error while creating user");
    });
    return response.status(StatusCodes.CREATED);
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// export const getById = async (id: string): Promise<UnitUser | null> => {
//   return await userRepository.findOne(id);
// };

// export const getAll = async (request: Request, response: Response) => {
//   try {
//     const users = await userRepository.findAll();
//     return response.status(StatusCodes.OK).json(UserResponse.fromUsers(users));
//   } catch (error) {
//     const errorResponse = ErrorResponse.fromError(error, request.path);
//     return response.status(errorResponse.status).json(errorResponse);
//   }
// };

// userRouter.get("/users/:id", async (req: Request, res: Response) => {
//   console.log("entrei");
//   try {
//     console.log(req.params.id);
//     const user: UnitUser = await userRepository.findOne(req.params.id);
//     if (!user) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: `User not found!` });
//     }
//     return res.status(StatusCodes.OK).json({ user });
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//   }
// });

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ error: "Please provide all the required parameters.." });
//     }
//     const user = await userRepository.findByEmail(email);
//     if (!user) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "No user exists with the email provided.." });
//     }
//     const comparePassword = await userRepository.comparePassword(
//       email,
//       password,
//     );
//     if (!comparePassword) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ error: `Incorrect Password!` });
//     }
//     return res.status(StatusCodes.OK).json({ user });
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//   }
// });

// userRouter.put("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
//     const getUser = await userRepository.findOne(req.params.id);
//     if (!username || !email || !password) {
//       return res
//         .status(401)
//         .json({ error: `Please provide all the required parameters..` });
//     }
//     if (!getUser) {
//       return res
//         .status(404)
//         .json({ error: `No user with id ${req.params.id}` });
//     }
//     const updateUser = await userRepository.update(req.params.id, req.body);
//     return res.status(201).json({ updateUser });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error });
//   }
// });

// userRouter.delete("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const user = await userRepository.findOne(id);
//     if (!user) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: `User does not exist` });
//     }
//     await userRepository.remove(id);
//     return res.status(StatusCodes.OK).json({ msg: "User deleted" });
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//   }
// });
