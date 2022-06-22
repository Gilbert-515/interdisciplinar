import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Auth as authContext } from '~/auth';
import { PageContext } from '~/App';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Container } from './styled';
import { Table, Input, Select, Button, Loading } from '~/components';
import { Form } from './Form';
import { Acess } from './Acess';

export function Livros () {

  const [, setPage] = useContext(PageContext);
  const [auth,] = useContext(authContext);
  const navigate = useNavigate();

  const { register } = useForm();
  const [component, setComponent] = useState(1);
  const [acess, setAcess] = useState();
  const [books, setBooks] = useState();

  async function getBooks() {
    const { data } = await axios.get('/api/getAllLivros');
    setBooks(data);
  }

  const acessPage = (codigo) => {
    setAcess(codigo);
    setComponent(3);
  }

  useEffect(() => {
    !auth && navigate('/');
    setPage(2);
    getBooks();
  }, [component])

  return (
    <>
    { component == 1 && auth &&
      <Container>
        <div className='filterGroup'>
          <div className='inputGroup'>
            <div className="select">
              <Select name='filtros' options={ ['Nome', 'Código'] } register={ register }/>
            </div>
            <div className="input">
              <Input name='filtro' placeholder='Informe o nome do livro?' register={ register } icon={ FaSearch } />
            </div>
          </div>
          <Button color='var(--success)' color_action='var(--success_active)' onClick={ e => setComponent(2) }>
            <FaPlus/> Adicionar Livro
          </Button>
        </div>
        { books ? (
            books.length != 0 ?
            <Table 
            colluns={ ['Código', 'Livro', 'Qtd. Disponivel'] } 
            data={ books } 
            acess
            handleAcess={ acessPage }/>
            :
            <h3>Não há livros cadastrados</h3>
          )
          :
          <Loading/>
        }
      </Container>
    }
    { component == 2 && <Form close={ e => setComponent(1) }/> }
    { component == 3 && <Acess close={ e => setComponent(1) } codigo={ acess }/> }
    </>
  )
}