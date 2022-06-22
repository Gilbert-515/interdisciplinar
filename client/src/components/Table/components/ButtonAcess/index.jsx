import { Container } from './styled';

export function ButtonAcess ({ children, ...rest }) {
  return (
    <Container { ...rest }>
      { children }
    </Container>
  )
}