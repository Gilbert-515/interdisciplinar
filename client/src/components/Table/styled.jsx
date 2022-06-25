import styled from 'styled-components';

export const Container = styled.div`

  table{
    width: 100%;
    border: 1px solid #000;
    border-collapse: collapse ;

    thead {
      background: var(--primary);
      font-size: .9rem;
    }
    tbody {
      text-align: center ;
      font-size: .9rem;
    }
    th{
      padding: .8rem ;
      border: 1px solid #000;
    }
    td {
      padding: 1rem 0;
      border: 1px solid #000;
    }

    tbody tr:nth-child(odd){
      background: #D9D9D9;
    }
    tbody tr:nth-child(even){
      background: #ffffff;
    }

    .acesso {
      padding: 0 ;
      max-width: 2.5rem ;
    }
  }

  div {
    width:  100%;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin: 1.5rem 3rem;
      font-size: .9rem;
      font-weight: 500;
    }

    svg {
        font-size: 1.25rem;
        cursor: pointer;
        transition: .7s;

        &:hover {
          color: var(--primary);
        }
      }
  }

  @media (max-width: 500px) {
    overflow: auto;

    table {

      .acesso {
      padding: 0 1rem;
      max-width: 6.5rem ;
      }

      td, th {
        padding: 1rem ;
      }
      
    }
    
  }

`;