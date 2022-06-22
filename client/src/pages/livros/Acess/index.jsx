import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { Container } from './styled';
import { Button, Loading } from '~/components';
import { Form } from '../Form';

export function Acess ({ close, codigo }) {

  const [book, setBook] = useState();
  const [component, setComponent] = useState(1);

  async function getBook() {
    const { data } = await axios.post('/api/getlivro', { codigo });
    setBook(data[0]);
    console.log(data[0]);
  }

  useEffect(() => {
    getBook();
  }, [component])

  return(
    <>
    { component == 1 &&
      <Container>
      { book ?
        <>
        <div className="header">
          <h2>{ book.titulo }</h2>
          <AiOutlineCloseSquare onClick={ close }/>
        </div>

        { book.qtd_disponivel > 0 ? 
          <span className="label success"> disponivel </span> :
          <span className="label danger"> em falta </span> 
        }

        <div className="row">
          <div className="content">
            <label>Autores:</label>
            { book.autores.map((autor, index) => (
              <span key={ index }> { autor.nome } </span>
            )) }
          </div>
        </div>
        <div className="row">
          <div className="content">
            <label>Editora:</label>
            <span> { book.editora } </span>
          </div>
        </div>
        <div className="footer">
          <span> { book.qtd_disponivel } exemplares disponiveis / { book.quantidade } exemplares totais </span>
          <Button color='var(--blue)' color_action='var(--blue_active)' onClick={ () => setComponent(2) }>
            <FaEdit/> Editar
          </Button>
        </div>
        </>
        :
        <Loading/>
      }
      </Container>
      
    }
    { component == 2 && <Form edit={ book } close={ () => setComponent(1) } /> }
    </>
  )
}