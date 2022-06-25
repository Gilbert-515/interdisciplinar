import { useContext, useEffect, useState } from 'react';
import { PageContext } from '~/App';
import { Auth as authContext } from '~/auth';
import { Login, Emprestimos } from '~/pages';
import { Loading } from '~/components';

export function Home () {

  const [,setPage] = useContext(PageContext);
  const [auth, setAuth] = useContext(authContext);

  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    const session = Number(sessionStorage.getItem('authToken'));
    console.log(session);
    session && setAuth(true);
    setLoading(false);
  }

  useEffect(() => {
    checkSession();
    setPage(1);
  })

  return loading ? 
  <Loading /> : 
  (auth ? <Emprestimos/> : <Login/>) ;
}