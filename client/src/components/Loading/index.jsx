import loading from '~/assets/loading.gif';
import { Container } from './styled';

export function Loading () {
  return (
    <Container>
      <img src={ loading } alt='loading...' />
    </Container>
  )
}