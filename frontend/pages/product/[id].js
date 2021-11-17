import { useState, useEffect } from 'react';

import useStandard from '../../hooks/use-standard';
import getData from '../../helpers/get-data2-non-json-parsed';

// ==============================================

export default function ProductPage() {
  // --------------------------------------------

  const { router, authCtx, loadingCtx, notificationCtx } = useStandard();

  const [product, setProduct] = useState();

  // --------------------------------------------

  useEffect(() => {
    (async () => {
      try {
        loadingCtx.setIsLoading(true);

        const id = router.query.id;

        // notificationCtx.begin({ message: 'fetching course' });

        const token = authCtx.token;

        // -Update the courses table:
        const response = await getData(`/courses/${id}`, token);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log('product with specified id: ', data);

        setProduct(data);

        // notificationCtx.endSuccess({ message: 'fetched course' });

        loadingCtx.setIsLoading(false);
      } catch (err) {
        console.log(
          'Error in /pages/products/[id].js --> useEffect(() => { getData(`/courses/${id}`); }, []) -- err: ',
          err
        );
        loadingCtx.setIsLoading(false);
        notificationCtx.endError({ message: err.message });
      }
    })();
  }, []);

  // --------------------------------------------

  return <div>{product && product.title}</div>;
}
