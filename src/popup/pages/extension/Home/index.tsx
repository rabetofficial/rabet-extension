import React from 'react';

import useLoadHome from 'popup/hooks/useLoadHome';

const Home = () => {
  const isLoading = useLoadHome();

  return <p>{isLoading.toString()}</p>;
};

export default Home;
