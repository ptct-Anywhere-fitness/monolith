import { useContext } from 'react';
import { useRouter } from 'next/router';

import { CartContext } from '../context/cart-context';
import { AuthContext } from '../context/auth-context';
import { LoadingContext } from '../context/loading-context';
import NotificationContext from '../context/notification-context';

// --------------------------------------------

export default function useStandard() {
  const router = useRouter();
  const loadingCtx = useContext(LoadingContext);
  const authCtx = useContext(AuthContext);
  const notificationCtx = useContext(NotificationContext);
  const cartCtx = useContext(CartContext);

  return { router, loadingCtx, authCtx, notificationCtx, cartCtx };
}
