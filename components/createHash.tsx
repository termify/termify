import * as crypto from "crypto";

const secret = "WebAPIConfig 4 Partner";
const sha256Hasher = crypto.createHmac("sha256", secret);

export const hash = (str: string) => sha256Hasher.update(str).digest("hex");

console.log(hash);
