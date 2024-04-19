import * as crypto from "crypto";

// Derive encryption key from password using PBKDF2
function deriveKeyFromPassword(password: string, salt: string): Buffer {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
}

// Encrypt data with symmetric key
function encryptDataWithKey(data: string, key: Buffer): string {
  const iv = crypto.randomBytes(16); // Generate initialization vector (IV)
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedData = cipher.update(data, "utf8", "base64");
  encryptedData += cipher.final("base64");
  return iv.toString("base64") + ":" + encryptedData;
}

// Decrypt data with symmetric key
function decryptDataWithKey(encryptedData: string, key: Buffer): string {
  const [ivBase64, encryptedDataBase64] = encryptedData.split(":");
  const iv = Buffer.from(ivBase64, "base64");
  const encryptedDataBuffer = Buffer.from(encryptedDataBase64, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedData = decipher.update(encryptedDataBuffer, undefined, "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

// Example usage
const password = "user_password";
const salt = "random_salt"; // Salt should be unique per user
const userData = "Sensitive information";

// Derive encryption key from password
const encryptionKey = deriveKeyFromPassword(password, salt);
console.log("Encryption key:", encryptionKey);

const newEncryptionKey = deriveKeyFromPassword("user_password", salt);
console.log("New encryption key:", newEncryptionKey);

// Encrypt data with symmetric key
const encryptedData = encryptDataWithKey(userData, encryptionKey);
console.log("Encrypted data:", encryptedData);

console.log("Are encryption keys equal?", encryptionKey.equals(newEncryptionKey));

// Decrypt data with symmetric key
const decryptedData = decryptDataWithKey(encryptedData, encryptionKey);
console.log("Decrypted data:", decryptedData);
