import * as React from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

export function useToken() {
  const [token, setToken] = React.useState('')
  const { currentUser } = useAuth();

  React.useEffect(() => {
    getToken();
  }, [currentUser])


  const getToken = async () => {
    const token = await currentUser.getIdToken();
    setToken(token)
    if (token) {
        axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  }
} 