import { useEffect, useState } from 'react';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import { Container } from './styled';
import { ButtonAcess, Label } from './components';

/*
  O componente Table recebe as colunas( colluns[] ) e as informação 
  que serão distribuidas pela tabela ( data[] ).
  Se existir data[].label necessariamente existira data[].situacao, 
  o label eh a cor que destacara a situação;
*/

export function Table ({ colluns, data, acess, handleAcess }) {

  const labels = ['danger', 'warning', 'success'];
  const situacoes = ['atrasado', 'aberto', 'fechado']

  const [page, setPage] = useState({ inicio: 0, fim: 6, index: 1 });

  const nextPage = () => {
    page.fim < data.length && setPage({ inicio: page.inicio + 6, fim: page.fim + 6, index: page.index + 1 });
  }
  const prevPage = () => {
    page.inicio != 0 && setPage({ inicio: page.inicio - 6, fim: page.fim - 6, index: page.index - 1 });
  }

  return (
    <Container>
      <table>
      <thead>
        <tr>
          { colluns.map((collum, index) => (
            <th key={ index }> { collum } </th>
          )) } 
          { acess && <th className='acesso'> </th> }
        </tr>
      </thead>
      <tbody>
        { data.slice( page.inicio, page.fim ).map((obj, index) => (
          
          <tr key={ index }>
            { Object.values(obj).map((key, value) => (
                !labels.concat(situacoes).includes(key) && <td key={ value }> { key } </td>
              ))
            }
            { obj.label && 
              <td> 
                <Label type={ obj.label }> { obj.situacao }</Label> 
              </td> 
            }
            { 
              acess && 
              <td className='acesso'> 
                <ButtonAcess onClick={ () => handleAcess(obj.codigo) }> acessar </ButtonAcess> 
              </td> 
            }
          </tr>
        ))
        }
      </tbody>
      </table>
      { data.length > 6 &&
        <div>
          <TbPlayerTrackPrev onClick={ prevPage }/> 
            <span>Pagina { page.index } de { Math.ceil(data.length / 6) }</span> 
          <TbPlayerTrackNext onClick={ nextPage }/>
        </div>
      }
    </Container>
  )
}