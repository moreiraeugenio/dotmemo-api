import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { v4 as generateUuidv4 } from "uuid";

dotenv.config();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const databaseName = process.env.USERS_TABLE_NAME as string;

// export const findByEmail = async (email: string): Promise<User | null> => {
//   const usersReference = collection(database, "users");
//   const query = usersReference.where("email", "==", email);
//   const querySnapshot = await getDocs(query);
// };

// export const findByEmail = async (email: string): Promise<User | null> => {
//   const usersReference = collection(database, databaseName);
//   const query = usersReference.where("email", "==", email);
//   const querySnapshot = await getDocs(usersReference);

//   const db = firebase.firestore();
//   const casesRef = db.collection("mgm/hospital/cases");
//   var query = casesRef.where("patientDetails.status", "==", "active").limit(25);
//   const queryRef = query.get();
//   queryRef.then(function(documentSnapshots) {
//     const cases = documentSnapshots.docs.map((doc) => doc.data());
//     console.log(cases);
//   });

//   for (const doc of querySnapshot.docs) {
//     if (doc.data().email === email) {
//       return new User(doc.id, doc.data().email);
//     }
//   }
//   return null;
// };

async function create() {
  try {
    const docRef = await addDoc(collection(database, databaseName), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function read() {
  try {
    const querySnapshot = await getDocs(collection(database, databaseName));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

// async function test() {
//   try {
//     const documentReference = await addDoc(collection(database, databaseName), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815,
//     });
//     console.log("Document written with ID: ", documentReference.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// async function test2() {
//   const querySnapshot = await getDocs(collection(database, databaseName));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
//   });
// }

// interface User {
//   firstName: string;
//   lastName: string;
//   isGreat: boolean;
//   blackLivesMatter: true;
// }

const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (queryDocumentSnapshot: QueryDocumentSnapshot) =>
    queryDocumentSnapshot.data() as T,
});

// const dataPoint = <T>(collectionPath: string) =>
//   firestore().collection(collectionPath).withConverter(converter<T>());

// const database = {
//   users: dataPoint<User>("users"),
//   //   userPosts: (userId: string) =>
//   //     dataPoint<YourOtherType>(`users/${userId}/posts`),
// };

// export { database as db };
// export default database;

// const example = async (id: string) => {
//   // firestore just as you know it, but with types
//   const userDoc = await database.users.doc(id).get();
//   const { blackLivesMatter } = userDoc.data();
//   return blackLivesMatter === true; // obviously
// };

// const createExample = async (userId: string) => {
//   await database.userPosts(userId).doc().create({
//     something: false,
//     somethingElse: true,
//   });
// };

// // Always use set for updates as firestore doesn't type update function correctly yet!
// const updateExample = async (id: string) => {
//   await database.users.doc(id).set(
//     {
//       firstName: "Jamie",
//       blackLivesMatter: true,
//     },
//     { merge: true },
//   );
// };

// queryByEmail();

export class User {
  id: string;
  email: string;

  constructor(email: string) {
    this.id = generateUuidv4();
    this.email = email;
  }

  toString() {
    return JSON.stringify(this);
  }
}

// const converter = <T>() => ({
//   toFirestore: (data: Partial<T>) => data,
//   fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
//     snap.data() as T,
// });

const userConverter = {
  toFirestore: (user: User) => {
    return {
      id: user.id,
      email: user.email,
    };
  },
  fromFirestore: (
    queryDocumentSnapshot: QueryDocumentSnapshot,
    snapshotOptions: SnapshotOptions,
  ) => {
    return queryDocumentSnapshot.data(snapshotOptions) as User;
  },
};

// const ref = doc(db, "cities", "LA").withConverter(cityConverter);
// await setDoc(ref, new City("Los Angeles", "CA", "USA"))

const findByEmail = async (email: string): Promise<User | null> => {
  const documentQuery = query(collection(database, databaseName), where("email", "==", email));
  const querySnapshot = await getDocs(documentQuery);
  if (querySnapshot.empty) {
    return null;
  }
  const user = querySnapshot.docs[0].data() as User;
  console.log(user);
  return user;
};

export const existsByEmail = async (email: string): Promise<boolean> => {
  const documentQuery = query(collection(database, databaseName), where("email", "==", email));
  const querySnapshot = await getDocs(documentQuery);
  return querySnapshot.empty === false;
};

export const createUser = async (email: string): Promise<void> => {
  // console.log(email);
  // const user = new User(email);
  // const doesExistByEmail = await existsByEmail(user.email);
  // if (doesExistByEmail) {
  //   console.log("User already exists");
  //   return;
  // }
  // const documentReference = doc(database, databaseName, user.id).withConverter(userConverter);
  // console.log("Going to setDoc");
  // await setDoc(documentReference, user);
};

// createUser("me+1@eugeniomoreira.com");
// findByEmail("me+1@eugeniomoreira.com");
