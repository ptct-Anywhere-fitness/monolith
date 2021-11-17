import { useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '../context/auth-context';
import { LoadingContext } from '../context/loading-context';
import NotificationContext from '../context/notification-context';

// --------------------------------------------

export default function useStandard() {
  const router = useRouter();
  const loadingCtx = useContext(LoadingContext);
  const authCtx = useContext(AuthContext);
  const notificationCtx = useContext(NotificationContext);

  return { router, loadingCtx, authCtx, notificationCtx };
}
