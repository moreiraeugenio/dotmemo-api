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
  where,
} from "firebase/firestore";
import { injectable } from "tsyringe";
import FirebaseConfiguration from "../configuration/firebase.configuration";
import ItemModel from "../model/item.model";

@injectable()
export default class ItemRepository {
  private readonly firestore: Firestore;
  private readonly databaseName: string;

  constructor(firebaseConfiguration: FirebaseConfiguration) {
    this.firestore = firebaseConfiguration.getFirestore();
    this.databaseName = firebaseConfiguration.getItemsDatabaseName();
  }

  async findAllByUserEmail(userEmail: string): Promise<ItemModel[]> {
    const queryByEmailSnapshot = await this.queryByEmailSnapshot(userEmail);
    const items: ItemModel[] = [];
    queryByEmailSnapshot.forEach((queryDocumentSnapshot) => {
      const item = queryDocumentSnapshot.data() as ItemModel;
      items.push(item);
    });
    return items;
  }

  private async queryByEmailSnapshot(email: string): Promise<QuerySnapshot> {
    const documentQuery = query(collection(this.firestore, this.databaseName), where("userEmail", "==", email));
    return await getDocs(documentQuery);
  }

  async create(item: ItemModel): Promise<void> {
    const documentReference = doc(this.firestore, this.databaseName, item.id).withConverter(this.itemConverter);
    await setDoc(documentReference, item);
  }

  private itemConverter = {
    toFirestore: (item: ItemModel) => {
      return {
        id: item.id,
        key: item.key,
        value: item.value,
        userEmail: item.userEmail,
        updatedAt: item.updatedAt,
        createdAt: item.createdAt,
      };
    },
    fromFirestore: (queryDocumentSnapshot: QueryDocumentSnapshot, snapshotOptions: SnapshotOptions) => {
      return queryDocumentSnapshot.data(snapshotOptions) as ItemModel;
    },
  };
}
