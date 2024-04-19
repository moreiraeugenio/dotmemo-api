const DELETE_ATTRIBUTE_DISPLAY_NAME = "DISPLAY_NAME";
const DELETE_ATTRIBUTE_PHOTO_URL = "PHOTO_URL";

export class FirebaseUpdateProfileRequest {
  private _idToken: string;
  private _displayName: string | null = null;
  private _photoUrl: string | null = null;
  private _deleteAttribute: string[] = [];

  constructor(idToken: string, displayName: string | null = null, photoUrl: string | null = null) {
    this._idToken = idToken;
    this._displayName = displayName;
    this._photoUrl = photoUrl;
  }
}
