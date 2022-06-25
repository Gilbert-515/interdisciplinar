import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PageContext } from '~/App';
import { Auth as authContext } from '~/auth';
import { Login, Emprestimos } from '~/pages';
import { Loading } from '~/components';

export function Home () {

  const [,setPage] = useContext(PageContext);
  const [auth, setAuth] = useContext(authContext);

  const [loading, setLoading] = useState(true);

  const checkSession = () => {
    const session = Number(sessionStorage.getItem('authToken'));

    axios.post('/api/verifySession', { token: session })
    .then(({ data: response }) => {
      const [data] = response; 
      data.session && setAuth(true);
      setLoading(false);
    })
    .catch(err => {
      console.log('erro session: ' + err);
      setLoading(false);
    });
  }

  useEffect(() => {
    checkSession();
    setPage(1);
  })

  return loading ? 
  <Loading /> : 
  (auth ? <Emprestimos/> : <Login/>) ;
}