import { Handler } from '@netlify/functions';
import cookie from 'cookie';
import { generateToken } from '../jwt';

const handler: Handler = async (event, context) => {
  if (event.httpMethod != 'POST') {
    return { statusCode: 405 };
  }

  const reqBody = JSON.parse(event.body);

  const dayGuestPass = process.env.DAY_GUEST_PASS;
  const eveGuestPass = process.env.EVE_GUEST_PASS;

  const userPassword = reqBody.password;

  if (userPassword != dayGuestPass && userPassword != eveGuestPass) {
    return { statusCode: 401 };
  }

  const guestType = userPassword == dayGuestPass ? 'all_day' : 'evening';

  const token = generateToken(guestType);

  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'local',
        sameSite: 'Strict',
      }),
    },
  };
};

export { handler };
