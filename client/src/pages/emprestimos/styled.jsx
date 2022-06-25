import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
 

  .filterGroup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 4rem;

    .inputGroup { 
      width: 60%;
      display: flex;
      justify-content: space-between ;
      flex-wrap: wrap;
      align-items: center;

      .input {
        width: 70%;
      }
      .select {
        width: 20%;
      }
    }
  }

  @media (max-width: 500px) { 

    .filterGroup {
      .inputGroup {
        width: 100%;
        margin: 1rem 0;

        .input {
          width: 100%;
          margin: 1rem 0;
        }
        .select {
          width: 100%;
        }
      }
    }
  }

`;