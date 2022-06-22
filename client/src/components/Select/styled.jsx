import styled from 'styled-components';

export const Container = styled.div`

  width: 100%;

  select {
    width: 100%;
    margin-top: .4rem;
    padding: 1rem;
    font-size: .9rem;
    border: 1px solid ${ ({ error }) => error ? '#E22626' : '#3b3b3b' };
    border-radius: .2rem;
    transition: .7s;

    &:focus {
      border-color: var(--primary);
    }

    &::placeholder {
      color: #636363;
    }
  }

  label {
    font-weight: 500;
    font-size: .9rem;
  }

  span {
    color: #E22626;
    font-size: .8rem;
    display: flex;
    justify-content: flex-end;
  }

`; 