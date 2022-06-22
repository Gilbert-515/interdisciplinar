import { useContext, useEffect } from 'react';
import { PageContext } from '~/App';
import { Auth as authContext } from '~/auth';
import { Login, Emprestimos } from '~/pages';

export function Home () {

  const [,setPage] = useContext(PageContext);
  const [auth,] = useContext(authContext);

  useEffect(() => {
    setPage(1);
  })

  return auth ? <Emprestimos/> : <Login/>;
}