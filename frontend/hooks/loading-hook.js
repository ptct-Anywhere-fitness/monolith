import { useState } from 'react';

// ==============================================

export const useLoading = () => {
  const [is_loading, setIsLoading] = useState(false);

  return { is_loading, setIsLoading };
};
