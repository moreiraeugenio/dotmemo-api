import { injectable } from "tsyringe";
import FirebaseIntegration from "../integration/firebase/firebase.integration";
import User from "../model/user.model";
import UserRepository from "../repository/user.repository";
import UserAlreadyExistsError from "./error/user-already-exists.error";

@injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly firebaseIntegration: FirebaseIntegration,
  ) {}

  async register(user: User): Promise<void> {
    const existsByEmail = await this.userRepository.existsByEmail(user.email);
    if (existsByEmail) {
      throw new UserAlreadyExistsError(user.email);
    }
    const userWithHashedPassword = await user.withHashedPassword();
    await this.userRepository.createPartial(userWithHashedPassword);
    await this.firebaseIntegration.signUp(user.email, user.password);
    await this.userRepository.completeRegistration(user.id);
  }

  async login(email: string, password: string): Promise<string> {
    const response = await this.firebaseIntegration.signIn(email, password);
    return response.idToken;
  }
}
