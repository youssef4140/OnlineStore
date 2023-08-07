import {OAuth2Client} from 'google-auth-library';

const client = new OAuth2Client();
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "708309533369-seta0qag3n2t6n0ph6ppalt9gkesjsej.apps.googleusercontent.com",  
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  return payload;
}

export default verify;