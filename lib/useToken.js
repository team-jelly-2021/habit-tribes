import * as React from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

export function useToken() {
  const [token, setToken] = React.useState('')
  const { currentUser } = useAuth();

  React.useEffect(() => {
    
    getToken();
  }, [currentUser])

  React.useEffect(() => {
    console.log('setting axios headers', token)
    console.log('currentUser: ', currentUser)
    if (token) {
      console.log('token obtained', token)
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  }, [token])

  const getToken = async () => {
    const token = await currentUser.getIdToken();
    console.log('received token: ', token)
    setToken(token)
  }
} 