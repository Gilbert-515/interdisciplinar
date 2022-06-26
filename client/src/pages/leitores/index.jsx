import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Auth as authContext } from '~/auth';
import { PageContext } from '~/App';
import { Container } from './styled';
import { Table, Input, Button, Loading } from '~/components';
import { Form } from './Form';
import { Acess } from './Acess';

export function Leitores () {

  const [, setPage] = useContext(PageContext);
  const [auth,] = useContext(authContext);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [component, setComponent] = useState(1);
  const [acess, setAcess] = useState();
  const [leitores, setLeitores] = useState();

  async function getLeitores() {
    const { data } = await axios.get('/api/allLeitores');
    setLeitores(data);
  }

  async function getFilter(infos) {
    const { data } = await axios.post('/api/filtroLeitor', { nome: infos.filtro });
    setLeitores(data);
  }

  const acessPage = (codigo) => {
    setAcess(codigo);
    setComponent(3);
  }

  useEffect(() => {
    !auth && navigate('/');
    setPage(3);
    getLeitores();
  }, [component])

  return (
    <>
      { component == 1 && auth &&
        <Container>
        <div className='filterGroup'>
          <div className='inputGroup'>
            <div className="input">
              <Input 
              name='filtro' 
              placeholder='Quem você está procura?' 
              register={ register } 
              icon={ FaSearch } 
              handleSubmit={ handleSubmit(getFilter) }
              required/>
            </div>
        </div>
          <Button color='var(--success)' color_action='var(--success_active)' onClick={ e => setComponent(2) }>
            <FaPlus/> Adicionar Leitor
          </Button>
        </div>
        { leitores ? 
          ( leitores.length != 0 ?
             <Table 
            colluns={ ['Código', 'Nome', 'Telefone', 'Situação'] } 
            data={ leitores } 
            handleAcess={ acessPage }
            acess/> 
            :
            <h3>Não há leitores cadastrados</h3>
          )
          :
          <Loading/>
        }
        </Container>
      }
      { component == 2 && <Form close={ e => setComponent(1) } /> }
      { component == 3 && <Acess codigo={ acess } close={ e => setComponent(1) } /> }
    </>
  )
}