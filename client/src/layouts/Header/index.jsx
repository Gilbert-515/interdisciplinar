import { useContext } from 'react';
import { Auth } from '~/auth';
import { Container } from './styled';

export function Header () {

  const [auth,] = useContext(Auth);

  return (
    auth && 
    <Container>
        BookBorrower
    </Container>
  );
}