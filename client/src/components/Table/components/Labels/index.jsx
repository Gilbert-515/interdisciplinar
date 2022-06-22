import { useState, useEffect } from 'react';
import { Container } from './styled';

export function Label ({ children, type }) {

  const [color, setColor] = useState('');

  useEffect(() => {
    if (type == 'success')
      setColor('#279D56');
    else if (type == 'danger')
      setColor('#DD2525');
    else
      setColor('#EAAD10')
  })

  return (
    <Container color={ color }>
      { children }
    </Container>
  );
}