const DELETE_ATTRIBUTE_DISPLAY_NAME = "DISPLAY_NAME";
const DELETE_ATTRIBUTE_PHOTO_URL = "PHOTO_URL";

export class FirebaseUpdateProfileRequest {
  private readonly idToken: string;
  private readonly displayName: string | null = null;
  private readonly photoUrl: string | null = null;
  private readonly deleteAttribute: string[] = [];

  constructor(idToken: string, displayName: string | null = null, photoUrl: string | null = null) {
    this.idToken = idToken;
    this.displayName = displayName;
    this.photoUrl = photoUrl;
  }
}
