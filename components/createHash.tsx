import * as crypto from "crypto";

const str = "1";

const secret = "WebAPIConfig 4 Partner";

const sha256Hasher = crypto.createHmac("sha256", secret);

export const hash = sha256Hasher.update(str).digest("hex");

console.log(hash);
