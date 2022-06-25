import { useContext } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { Auth } from '~/auth';
import { Container } from './styled';

export function Header ({ openMenu }) {

  const [auth,] = useContext(Auth);

  return (
    auth && 
    <Container>
      <RiMenuLine fontSize='1.9rem' cursor='pointer' onClick={ () => openMenu() }/>
        <span>BookBorrower</span>
    </Container>
  );
}