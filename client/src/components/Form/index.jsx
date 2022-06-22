import { Container } from './styled';

export function Form ({ children, ...rest }) {
  return (
    <Container { ...rest }>
    { children }
    </Container>
  )
}