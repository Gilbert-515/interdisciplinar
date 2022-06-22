import { Container } from './styled';

export function Button ({ type, color, color_action, children, ...rest }) {
  return (
    <Container color={ color } colorAction={ color_action }>
      <button type={ type } { ...rest }>
        { children }
      </button>
    </Container>
  )
}