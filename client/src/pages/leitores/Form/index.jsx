import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { Form as Container, Input, Button } from '~/components';

export function Form ({ close, edit }) {

  const { register, handleSubmit } = useForm();

  const [errors, setErrors] = useState({
    nome: null,
    telefone: null,
    email: null
  });

  const submitForm = async (infos, e) => {
    e.preventDefault();

    if (edit) {
      infos.codigo = edit.id;
      const { data } = await axios.post('/api/editLeitor', infos);
      close();
    }
    else {
      const { data } = await axios.post('/api/newleitor', infos);
      data.save == false ?
      setErrors({ nome: data.message }) :
      close(data.infos.id);
    }
  }

  return (
    <Container onSubmit={ handleSubmit(submitForm) }>
      <div className="header">
        { edit ? <h3> Editar Leitor </h3> : <h3> Adicionar Leitor </h3> }
        <AiOutlineCloseSquare onClick={ () => close() } />
      </div>
      <div className="row">
        <div className="content">
          <Input 
          label='Nome:' 
          name='nome' 
          register={ register } 
          placeholder='Informe o nome' 
          value={ edit && edit.nome } 
          error={ errors.nome }
          onChange={ () => setErrors({ nome: '' }) }
          required/>
        </div>
        <div className="content">
          <Input 
          label='Telefone:' 
          type='tel' 
          name='telefone' 
          register={ register } 
          placeholder='Informe o telefone' 
          value={ edit && edit.telefone } required/>
        </div>
      </div>
      <div className="row">
        <div className="content">
          <Input 
          label='Email:' 
          type='email' 
          name='email' 
          register={ register }
          placeholder='Informe o email' 
          value={ edit && edit.email } 
          required/>
        </div>
      </div>
      <div className="footer">
        <div className="btn">
          <Button color='var(--success)' color_action='var(--success_active)'>
            <FaSave/> Salvar
          </Button>
        </div>
      </div>
    </Container>
  )
}