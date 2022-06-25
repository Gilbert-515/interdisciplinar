import styled from 'styled-components';

export const Container = styled.div`

  width: 6% ;
  height: 90vh;

  .active {
    background: rgba(255, 255, 255, 0.35);
  }

  @media (min-width: 1600px) {
    width: 4% ;
  }

  @media (max-width: 500px) {
    position: fixed;
    bottom:0 ;
    width: 0%;
  }

`;