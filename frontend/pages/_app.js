import Head from 'next/head';

import Layout from '../components/layout';

import { AuthContext } from '../context/auth-context';
import { useAuth } from '../hooks/auth-hook';

import { CartContext } from '../context/cart-context';
import { useCart } from '../hooks/cart-hook';

import { LoadingContext } from '../context/loading-context';
import { useLoading } from '../hooks/loading-hook';

import { NotificationContextProvider } from '../context/notification-context';

// import '../styles/bs-mod.scss';
import '../styles/styles.css';

// ==============================================

export default function App({ Component, pageProps }) {
  // --------------------------------------------

  const { token, login, logout, user } = useAuth();
  const { cart, cart_total, addToCart, deleteFromCart, resetCart } = useCart();
  const { is_loading, setIsLoading } = useLoading();

  // --------------------------------------------

  return (
    // -When the value of any of thse change the ne value
    //  is passed down to the components that are interested.
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, user }}
    >
      <CartContext.Provider
        value={{ cart, cart_total, addToCart, deleteFromCart, resetCart }}
      >
        <LoadingContext.Provider value={{ is_loading, setIsLoading }}>
          <NotificationContextProvider>
            <Layout token={token} user={user} logout={logout}>
              <Head>
                <title>Anywhere Fitness</title>
                <meta
                  name='description'
                  content='Anywhere Fitness is the all-in-one solution to meet your “on-location” fitness class needs. AnywhereFitness makes it painless for Instructors and Clients alike to hold and attend Fitness classes wherever they might be held. '
                />
                <meta
                  name='viewport'
                  content='width=device-width, initial-scale=1.0'
                />
                <link rel='icon' href='/react.svg' />
                {/* <link rel='manifest' href='/manifest.json' /> */}
              </Head>

              <Component {...pageProps} />
            </Layout>
          </NotificationContextProvider>
        </LoadingContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
