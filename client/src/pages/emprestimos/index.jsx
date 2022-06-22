import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Container } from './styled';
import { Table, Input, Select, Button, Loading } from '~/components';
import { Form } from './Form';
import { Acess } from './Acess';

export function Emprestimos () {

  const { register } = useForm();
  const [component, setComponent] = useState(1);
  const [acess, setAcess] = useState();
  const [emprestimos, setEmprestimos] = useState();

  const acessPage = (codigo) => {
    setAcess(codigo);
    setComponent(3);
  }

  async function getEmprestimos() {
    const { data } = await axios.get('/api/getAllEmprestimos');
   
    data.forEach(infos => {
      const [year, month, day] = infos.data_emprestimo.split('-'); 
      const dataFormat = [day, month, year].join('/');
      infos.data_emprestimo = dataFormat;
    });

    setEmprestimos(data);
  }

  useEffect(() => {
    getEmprestimos();
  }, [component])

  return (
    <>
      { component == 1 &&
        <Container>
        <div className='filterGroup'>
          <div className='inputGroup'>
            <div className="select">
              <Select name='filtros' options={ ['Leitor', 'Código', 'Situação'] } register={ register }/>
            </div>
            <div className="input">
              <Input name='filtro' placeholder='Quem você procura?' register={ register } icon={ FaSearch } />
            </div>
        </div>
          <Button color='var(--success)' color_action='var(--success_active)' onClick={ e => setComponent(2) }>
            <FaPlus/> Novo Empréstimo 
          </Button>
        </div>
        { emprestimos ? (
          emprestimos.length != 0 ?
            <Table 
            colluns={ ['Código', 'Leitor', 'Data', 'Situação'] } 
            data={ emprestimos } 
            handleAcess={ acessPage }
            acess 
            /> 
            :
            <h3>Nenhum Empréstimo Cadastrado</h3>
          )
          :
          <Loading/>
        }
        </Container>
      }
      { component == 2 && <Form close={ e => setComponent(1) }/> }
      { component == 3 && <Acess codigo={ acess } close={ e => setComponent(1) }/> }
    </>
    
  );
}