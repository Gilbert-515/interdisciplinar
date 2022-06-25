import styled from 'styled-components';

export const Container = styled.div`

  width: 100%;
  max-height: 78vh;
  margin: 0 auto 2rem;
  background: #EDEDED;
  padding: 2rem;
  border-radius: .25rem;
  overflow-y: auto;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    svg {
      font-size: 1.6rem;
      font-weight: bold;
      transition: .5s;
      cursor: pointer;

      &:hover {
        color: var(--red)
      }
    }
  }

  .row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2.5rem 0;

    .content {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      label {
        font-weight: bold;
        margin-bottom: .7rem;
      }
      span {
        font-size: .9rem;
        margin: .3rem 0;
      }

    }
  }

  .label{
    padding: .4rem 1rem;
    border-radius: .3rem;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: 1.25px;
    font-size: .9rem;
  }
  .danger {
    background: #DD2525;
  }
  .success {
    background: #279D56;
  }

  .footer {
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;

    .btn {
      width: 17%;
    }

    span {
      font-size: .9rem;
      font-weight: 500;
      color: #2b2b2b;
    }
  }

  @media (max-width: 500px) {  
    margin-top: 1.5rem;
    padding: 1.9rem 1.25rem;

    .footer {
      flex-direction: column;
      margin-top: 2rem;

      span {
        margin-bottom: 2rem;
      }
    }
  }

`;