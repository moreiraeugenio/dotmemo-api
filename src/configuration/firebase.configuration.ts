import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { singleton } from "tsyringe";
import EnvironmentConfiguration from "./dotenv.configuration";

@singleton()
export default class FirebaseConfiguration {
  private readonly configuration = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  };

  constructor(private readonly environmentConfiguration: EnvironmentConfiguration) {
    this.configuration.apiKey = this.environmentConfiguration.getStringValue("FIREBASE_API_KEY");
    this.configuration.authDomain =
      this.environmentConfiguration.getStringValue("FIREBASE_AUTH_DOMAIN");
    this.configuration.projectId =
      this.environmentConfiguration.getStringValue("FIREBASE_PROJECT_ID");
    this.configuration.storageBucket =
      this.environmentConfiguration.getStringValue("FIREBASE_STORAGE_BUCKET");
    this.configuration.messagingSenderId = this.environmentConfiguration.getStringValue(
      "FIREBASE_MESSAGING_SENDER_ID",
    );
    this.configuration.appId = this.environmentConfiguration.getStringValue("FIREBASE_APP_ID");
  }

  getFirestore(): Firestore {
    const firebaseApplication = initializeApp(this.configuration);
    return getFirestore(firebaseApplication);
  }

  getDatabaseName(): string {
    return this.environmentConfiguration.getStringValue("USERS_TABLE_NAME");
  }
}
