import styled from 'styled-components';

export const Container = styled.div`

  width: 100%;

  label {
    font-weight: 500;
    font-size: .9rem;
  }

  input {
    border: 1px solid ${ ({ error }) => error ? '#E22626' : '#3b3b3b' };
    border-radius: .2rem;
    padding: 1rem;
    width: 100%;
    font-size: .9rem;
    margin-top: .4rem;
    transition: .7s;

    &::placeholder {
      color: #636363;
    }

    &:focus {
      border-color: var(--primary);
    }
  }

  span {
    color: #E22626;
    font-size: .8rem;
    display: flex;
    justify-content: flex-end;
  }
`;