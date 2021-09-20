import crypto from "crypto";

const encKey = process.env.TARGET_ENCRYPTION_KEY || "__ENC_KEY_KERE__";

export function encrypt(plainText) {
  const iv = Buffer.alloc(0);
  const cipher = crypto.createCipheriv("aes-128-ecb", encKey, iv);
  cipher.setAutoPadding(true);
  return Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final()
  ]).toString("base64");
}

export function decrypt(cipherText64) {
  const iv = Buffer.alloc(0);
  const cipher = crypto.createDecipheriv("aes-128-ecb", encKey, iv);
  cipher.setAutoPadding(true);
  let decrypted = cipher.update(cipherText64, "base64");
  decrypted += cipher.final();
  return decrypted;
}
