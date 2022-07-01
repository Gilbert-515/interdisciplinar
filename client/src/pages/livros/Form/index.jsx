import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaSave, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { Form as Container, Input, DataList, Button, Loading } from '~/components';

export function Form({ close, edit }) {

  const { register, handleSubmit } = useForm();
  const renders = useRef(0);
  const autoresAdds = useRef();

  const [autores_add, setAutores_add] = useState(
    edit && edit.autores.length > 1 ? 
    edit.autores.filter(autor => autor.nome != edit.autores[edit.autores.length - 1].nome ) : 
    []
  );
  const [autor_index, setAutor_index] = useState(1);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [error, setError] = useState()

  const getOptions = async () => {

    const { data: autors } = await axios.get('/api/getAutores');
    autors.forEach(autor => {
      setAutores(autores => [...autores, autor.nome]);
    })

    const { data: editors } = await axios.get('/api/getEditoras');
    editors.forEach(editora => {
      setEditoras(editoras => [...editoras, editora.nome]);
    })
  }

  const addAutor = () => {
    setAutores_add(autores => [...autores, `autor-${autor_index}`]);
    setAutor_index(index => index + 1);
  }
  const removeAutor = (item) => {
    setAutores_add(autores => autores.filter(autor => autor != item));
  }

  const submitForm = async (infos, e) => {
    e.preventDefault();

    let autores = [];
    const autoresAll = autoresAdds.current;
    const autoresDiv = Array.prototype.slice.call(autoresAll.children);
    autoresDiv.forEach(div => autores.push(div.children[0].children[0].children[0].value));

    autores.push(infos.autores);
    infos.autores = autores;
    
    if(!edit) {
      const { data } = await axios.post('/api/newLivro', infos);
      data.save == false ?
      setError(data.message) :
      close(data.id);
    }
    else {
      infos.codigo = edit.id;
      const { data } = await axios.post('/api/editLivro', infos);
      console.log(data);
      close();
    }
  }

  useEffect(() => {
    renders.current += 1;
    renders.current == 1 && getOptions();
  }, []);

  return (
    <Container onSubmit={handleSubmit(submitForm)}>
    { autores ?
      <>
      <div className="header">
        { edit? <h3> Editar Livro </h3> : <h3> Adicionar Livro </h3> }
        <AiOutlineCloseSquare onClick={ () => close() } />
      </div>
      <div className="row">
        <div className="content">
          <Input
            name='nome'
            label='Nome:'
            register={register}
            placeholder='Informe o nome do livro'
            value={ edit && edit.titulo }
            error={ error }
            onChange={ () => setError('') }
            required />
        </div>
        <div className="content">
          <Input
            name='quantidade'
            label='Quantidade:'
            register={register}
            type='number' 
            placeholder='Informe a quantidade de exemplares'
            value={ edit && edit.quantidade }
            required />
        </div>
      </div>
      <div className="row">
        <div className="content">
          <div className='input-content'>
            <DataList
              label='Autores:'
              options={ autores }
              name='autores'
              id='autor'
              register={register}
              placeholder='Infome o nome do autor'
              value={ edit && edit.autores[edit.autores.length -1].nome }
              autoComplete="off"
              required />
          </div>
          <button
            className='btn-add'
            type='button'
            onClick={addAutor}>
            <FaPlus />
          </button>
        </div>
        <div className="content">
          <DataList
            name='editora'
            id='editor'
            label='Editora:'
            register={register}
            placeholder='Informe a editora do livro'
            options={ editoras }
            value={ edit && edit.editora }
            autoComplete="off"
            required />
        </div>
      </div>
      <div className="items-adds">
        <div className="items" ref={autoresAdds}>

          { autores_add && autores_add.map((autor, index) => (
            <div className="item" key={index} >
              <div className='input-content'>
                <DataList
                  options={ autores }
                  name={ `autors-${ index }` }
                  id={`autor-${index}`}
                  placeholder='Infome o nome do autor'
                  value={ autor.nome && autor.nome }
                  register={ register }
                  autoComplete="off"
                  required />
              </div>
              <button
                type='button'
                className='btn-trash'
                onClick={() => removeAutor(autor)}>
                <FaTrashAlt />
              </button>
            </div>
          ))
          }

        </div>
      </div>
      <div className="footer">
        <div className='btn'>
          <Button color='var(--success)' color_action='var(--success_active)'>
            <FaSave /> Salvar
          </Button>
        </div>
      </div>
      </>
      :
      <Loading/>
    }
    </Container>
  )
}