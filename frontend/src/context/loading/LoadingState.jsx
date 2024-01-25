import React, { useState } from 'react'
import loadingContext from './loadingContext';

const LoadingState = (props) => {
    const[loading,setLoading] = useState(false);

    const handleLoading = () => {
        setLoading(true);
    }

    const handleNotLoading = () => {
        setLoading(false);
    }
  return (
    <loadingContext.Provider value={{handleLoading, loading, handleNotLoading}}>
      {props.children}
    </loadingContext.Provider>
  )
}

export default LoadingState;
