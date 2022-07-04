import config from 'config';
import jwt from 'jsonwebtoken';
const publicKey = Buffer.from(
  config.get<string>('publicKey'),
  'base64'
).toString('ascii');
const privateKey = Buffer.from(
  config.get<string>('privateKey'),
  'base64'
).toString('ascii');


console.log('privateKey: ', config.get('privateKey'));
export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}
export function verifyJWT<T>(token: string): T | null {
  // create try catch
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (err) {
    console.error('error validating user: ', err);
    return null;
  }
}
