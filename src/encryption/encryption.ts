// @ts-ignore: No typescript support
import crypto from "crypto-browserify";
import { Buffer } from "buffer/";

export interface SecretsInterace {
  key: string;
  iv: any;
}

const encrypt = (secret: string, data: any) => {
  let serializedData = JSON.stringify(data);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secret, "base64"),
    iv
  );
  let encrypted = cipher.update(serializedData, "utf8", "base64");
  encrypted += cipher.final("base64");

  return { data: encrypted, iv };
};

const decrypt = (secrets: SecretsInterace, data: any) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secrets.key, "base64"),
    secrets.iv
  );
  let decrypted = decipher.update(data, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
};

export { encrypt, decrypt };
