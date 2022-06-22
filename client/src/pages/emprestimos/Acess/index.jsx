import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FaEdit, FaRegClock, FaRegCalendarCheck } from 'react-icons/fa';
import { Table, Button, Loading } from '~/components';
import { Container } from './styled';
import { Form } from '../Form';

export function Acess ({ codigo, close }) {

  const [component, setComponent] = useState(1);
  const [emprestimo, setEmprestimo] = useState();

  async function getEmprestimo() {
    const { data } = await axios.post('/api/getEmprestimo', { codigo });

    data.forEach(infos => {
      const [year, month, day] = infos.data_emprestimo.split('-'); 
      const dataFormat = [day, month, year].join('/');
      infos.data_emprestimo = dataFormat;
    });
    data.forEach(infos => {
      const [year, month, day] = infos.data_prevista_devolucao.split('-'); 
      const dataFormat = [day, month, year].join('/');
      infos.data_prevista_devolucao = dataFormat;
    });
    data.forEach(infos => {
      if (infos.data_devolucao) {
        const [year, month, day] = infos.data_devolucao.split('-'); 
        const dataFormat = [day, month, year].join('/');
        infos.data_devolucao = dataFormat;
      }
    });

    setEmprestimo(data[0]);
    console.log(data[0]);
  }

  const devolver = async () => {
    const { data } = await axios.post('/api/devolver', { codigo });
    console.log(data);
    close();
  }

  const renovar = async () => {
    const { data } = await axios.post('/api/renovar', { codigo });
    console.log(data);
    close();
  }

  useEffect(() => {
    getEmprestimo();
  }, [component])

  return (
    <>
    { component == 1 &&
      <Container>
      { emprestimo ?
        <>
        <div className="header">
          <h2>Empréstimo { codigo }</h2>
          <AiOutlineCloseSquare onClick={ close }/>
        </div>
          { emprestimo.situacao == 'aberto' && <span className='label warning'>aberto</span> }
          { emprestimo.situacao == 'atrasado' && <span className='label danger'>atrasado</span> }
          { emprestimo.situacao == 'fechado' && <span className='label success'>fechado</span> }
        <div className="row">
          <div className="content">
            <label> Leitor: </label>
            <span> { emprestimo.leitor_nome } </span>
            <span> { emprestimo.leitor_email } </span>
          </div>
          <div className="content">
            <label> Livros: </label>
            { emprestimo.livros.map((livro, index) => (
              <span key={ index }> { livro.nome } </span>
            )) }
          </div>
        </div>

        <Table 
        colluns={ ['Data do Empréstimo', 'Data Prevista para Devolução', 'Data da Devolução'] } 
        data={ [{ data_emprestimo: emprestimo.data_emprestimo, 
                  data_prev_devolucao: emprestimo.data_prevista_devolucao, 
                  data_devolucao: emprestimo.data_devolucao
        }] 
        }/>

        <div className="footer">
          <div className="btn">
            <Button color='var(--blue)' color_action='var(--blue_active)' onClick={ () => setComponent(2)}>
              <FaEdit/> Editar
            </Button>
          </div>
          { emprestimo.situacao != 'fechado' &&
            <>
            <div className="btn">
              <Button color='var(--success)' color_action='var(--success_active)' onClick={ devolver }>
                <FaRegCalendarCheck/> Devolvido
              </Button>
            </div>
            <div className="btn">
              <Button color='var(--default)' color_action='var(--default_active)' onClick={ renovar }>
                <FaRegClock/> Renovar
              </Button>
            </div>
            </>
          }
        </div>
      </>
        :
        <Loading/>
      }
      </Container>
    }
    { component == 2 && <Form edit={ emprestimo } close={ () => setComponent(1) } /> }
    </>
  );
}