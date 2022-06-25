import styled from 'styled-components';

export const Container = styled.div`

  width: 100%;
  height: 10vh;
  padding: 1rem 1.5rem;
  background: var(--secundary) ;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-style: italic;

  @media (max-width: 500px) { 
    position: fixed;
  }

`;