import React from 'react';
import Loading from 'Root/components/Loading';
import Header from 'Root/components/Header';

const FetchData = () => {
  return (
      <>
        <Header/>
        <div style={ {marginTop: '170px'} }>
          <Loading title="Sending to network" size={ 125 }/>
        </div>
      </>
  );
};

export default FetchData;
