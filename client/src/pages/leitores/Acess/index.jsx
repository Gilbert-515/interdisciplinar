import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { Container } from './styled';
import { Acess as AcessEmprestimo } from '~/pages/emprestimos/Acess';
import { Table, Button, Loading } from '~/components';
import { Form } from '../Form';
export function Acess ({ codigo, close }) {

  const [component, setComponent] = useState(1)
  const [leitor, setLeitor] = useState();
  const [acess, setAcess] = useState();

  async function getLeitor() {
    const { data } = await axios.post('/api/getLeitor', { codigo });

    if(data.ultimo_emprestimo) {
      data.ultimo_emprestimo.forEach(infos => {
        const [year, month, day] = infos.data_emprestimo.split('-'); 
        const dataFormat = [day, month, year].join('/');
        infos.data_emprestimo = dataFormat;
      });
    }

    setLeitor(data);
    console.log(data);
  }

  const acessPage = (codigo) => {
    setAcess(codigo);
    setComponent(3);
  }

  useEffect(() => {
    getLeitor();
  }, [component])

  return (
    <>
    { component == 1 &&
      <Container>
        { leitor ?
          <>
          <div className="header">
            <h2>{ leitor.nome }</h2>
            <AiOutlineCloseSquare onClick={ () => close() }/>
          </div>
          <div className="row">
            <div className="content">
              <span>{ leitor.telefone }</span>
              <span>{ leitor.email }</span>

              { leitor.qtd_emprestimo ? 
                ( leitor.qtd_emprestimo == 1 ?
                  <span>{ leitor.qtd_emprestimo } empréstimo realizado</span> 
                  :
                  <span>{ leitor.qtd_emprestimo } empréstimos realizados</span>
                ) 
                :
                <span>Nenhum empréstimos realizados</span> 
              }

            </div>
          </div>

          { leitor.ultimo_emprestimo &&  <Table colluns={[ 'Último Emprestimo', 'Data', 'Situação' ]} 
            data={ leitor.ultimo_emprestimo } 
            acess 
            handleAcess={ acessPage }
            />}

          <div className="footer">
            <div className="btn">
              <Button color='var(--blue)' color_action='var(--blue_active)' onClick={ () => setComponent(2) }>
                <FaEdit/> Editar
              </Button>
            </div>
          </div>
          </> 
          :
          <Loading/>
        }
      </Container>
    }
    { component == 2 && <Form edit={ leitor } close={ () => setComponent(1) } />}

    { component == 3 && <AcessEmprestimo codigo={ acess } close={ () => setComponent(1) } />}
    </>
  )
}