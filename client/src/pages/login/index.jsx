import { useContext, useState } from 'react';
import { Auth } from '~/auth';
import { useForm } from 'react-hook-form';
import { Form } from './styled';
import { Input, Button } from '~/components';

export function Login () {
  const [, setAuth] = useContext(Auth);
  const { register, handleSubmit } = useForm();

  const [errors, setErrors] = useState({ usuario: null, senha: null });

  const formSubmit = (data) => {
    if (data.usuario == 'teste123')
      console.log(data.usuario);
    else
      setErrors({ senha: 'testando...'});
      setAuth(true);
  };
  
  return (
    <Form onSubmit={ handleSubmit(formSubmit) }>
        <Input 
        label='Usuario:' 
        name='usuario' 
        placeholder='Informe o nome de usuario' 
        register={ register } 
        error={ errors.usuario } 
        onChange={ () => setErrors({ usuario: null }) }
        required/>
      <div>
        <Input 
        label='Senha:' 
        type='password' 
        name='senha' 
        placeholder='Informe a senha' 
        register={ register } 
        autoComplete='on' 
        error={ errors.senha }
        onChange={ () => setErrors({ senha: null }) }
        required/>
      </div>
      <div className='buttonDiv'>
        <Button 
        color='var(--primary)' 
        color_action='var(--primary_active)' 
        type='submit'>
          Login
        </Button>
      </div>
    </Form>
  )
}