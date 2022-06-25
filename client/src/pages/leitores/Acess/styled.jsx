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
    margin: 2rem 0;

    .content {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      
      span {
        font-size: .9rem;
        margin: .6rem 0;
        font-style: oblique;
      }

    }
  }

  .footer {
    margin-top: 6rem;

    .btn {
      width: 10%;
      margin: auto;
      margin-right:0;
    }
  }

  @media (max-width: 500px) { 
    margin-top: 1.5rem;
    padding: 1.9rem 1.25rem;

    .row .content {
      width: 100%;
    }
    .footer .btn {
      width: 100%;
    }
  }
`;