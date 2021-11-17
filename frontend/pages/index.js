import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '../context/auth-context';

// ==============================================

export default function HomePage() {
  // --------------------------------------------

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // --------------------------------------------

  const router = useRouter();
  const authCtx = useContext(AuthContext);

  // --------------------------------------------

  if (authCtx.isLoggedIn) {
    if (authCtx.user.role === 'admin') {
      router.push('/dashboard-admin');
    } else {
      router.push('/dashboard-customer');
    }
  } else if (mounted) {
    router.push('/auth');
  }

  // --------------------------------------------

  return (
    <>
      <h1>Homepage</h1>
    </>
  );
}
