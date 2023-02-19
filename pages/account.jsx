import React from 'react';
import nookies from 'nookies';
import { verifyIdToken } from '../lib/firebaseAdmin';
import firebaseClient from '../lib/firebaseClient';
import { useRouter } from 'next/router';

const Account = ({ session }) => {
  firebaseClient();
  const router = useRouter();
  if (session) {
    return (
      <>
        <h1>{session.email}</h1>
        <h1>{session.uid}</h1>
      </>
    );
  } else {
    router.push('/login');
  }
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: {
        session: {
          email: email,
          uid: uid,
        },
      },
    };
  } catch (err) {
    context.res.writeHead(302, { location: '/login' });
    context.res.end();
    return { props: [] };
  }
}

export default Account;
