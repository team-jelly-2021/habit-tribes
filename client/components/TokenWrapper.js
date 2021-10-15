import * as React from 'react'
import { useToken } from '../lib/useToken'

function TokenWrapper({ children }) {
  const token = useToken();
  return (
    <>
     {children} 
    </>
  )
}

export default TokenWrapper
