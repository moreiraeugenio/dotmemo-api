import {
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  SnapshotOptions,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { injectable } from "tsyringe";
import FirebaseConfiguration from "../configuration/firebase.configuration";
import UserModel from "../model/user.model";

@injectable()
export default class UserRepository {
  private readonly firestore: Firestore;
  private readonly databaseName: string;

  constructor(firebaseConfiguration: FirebaseConfiguration) {
    this.firestore = firebaseConfiguration.getFirestore();
    this.databaseName = firebaseConfiguration.getUsersDatabaseName();
  }

  async existsByEmail(email: string): Promise<boolean> {
    const queryByEmailSnapshot = await this.queryByEmailSnapshot(email);
    return queryByEmailSnapshot.empty === false;
  }

  private async queryByEmailSnapshot(email: string): Promise<QuerySnapshot> {
    const documentQuery = query(collection(this.firestore, this.databaseName), where("email", "==", email));
    return await getDocs(documentQuery);
  }

  async createPartial(user: UserModel): Promise<void> {
    const documentReference = doc(this.firestore, this.databaseName, user.id).withConverter(this.userConverter);
    await setDoc(documentReference, user);
  }

  private userConverter = {
    toFirestore: (user: UserModel) => {
      return {
        id: user.id,
        email: user.email,
        password: user.password,
        isPartial: user.isPartial,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      };
    },
    fromFirestore: (queryDocumentSnapshot: QueryDocumentSnapshot, snapshotOptions: SnapshotOptions) => {
      return queryDocumentSnapshot.data(snapshotOptions) as UserModel;
    },
  };

  async completeRegistration(userId: string): Promise<void> {
    const documentReference = doc(this.firestore, this.databaseName, userId);
    await updateDoc(documentReference, {
      isPartial: false,
      updatedAt: new Date(),
    });
  }
}
