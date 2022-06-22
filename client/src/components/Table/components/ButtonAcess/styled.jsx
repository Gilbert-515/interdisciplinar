import styled from 'styled-components';

export const Container = styled.button`

  background: var(--blue);
  color: #FFF;
  font-size: .8rem;
  border: 1px solid #000;
  border-radius: .25rem;
  padding: .4rem .8rem;
  transition: .7s;
  cursor: pointer;

  &:hover {
    background: var(--blue_active);
  }
`;