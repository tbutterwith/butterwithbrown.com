import { decode, encode } from 'jwt-simple';
import addDays from 'date-fns/addDays'
import { GuestType } from '../src/types/data';

type jwtBody = {
  type: string,
  exp: number,
};

const checkAndGetPermissions = (authToken: string): string => {
  const secret = process.env.JWT_SECRET;
  try {
    const body: jwtBody = decode(authToken, secret);
    return body.type;
  } catch (err) { // Squash errors and return blank
    console.log(err);
    return '';
  }
}

const generateToken = (permissions: GuestType): string => {
  const secret = process.env.JWT_SECRET;

  const expiryTimeMillis = addDays(new Date(), 7).getTime();

  const expiryTimeSeconds = Math.round(expiryTimeMillis / 1000);

  const body: jwtBody = { type: permissions, exp: expiryTimeSeconds };

  return encode(body, secret);
}

export { checkAndGetPermissions, generateToken };