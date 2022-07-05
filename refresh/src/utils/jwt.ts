import jwt from 'jsonwebtoken';

// const publicKey = Buffer.from(
//   process.env.PUBLIC_KEY as string,
//   'base64'
// ).toString('ascii');
// const privateKey = Buffer.from(
//   process.env.PRIVATE_KEY as string,
//   'base64'
// ).toString('ascii');


export function signJWT(object: Object, privateKey: string, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}
export function verifyJWT<T>(token: string, publicKey: string): T | null {
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (err) {
    console.error('error validating user: ', err);
    return null;
  }
}
