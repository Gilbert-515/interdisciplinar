import styled from 'styled-components';

export const Container = styled.div`

  button {
    width: 100%;
    padding: 1rem;
    border: 1px solid #3b3b3b;
    border-radius: .25rem;
    background: ${ ({ color })  => color};
    cursor: pointer;
    font-size: .9rem;
    font-weight: bold;
    color: #FFF;
    transition: .7s;

    display: flex;
    justify-content: center ;
    align-items: center;

    &:hover {
      background: ${ ({ colorAction })  => colorAction} ;
      border-color: ${ ({ colorAction })  => colorAction};
    }

    svg {
      font-size: 1rem;
      margin-right: .25rem;
    }
  }

`;