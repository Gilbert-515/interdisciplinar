import { Container } from './styled';

export function Input ({ register, error, label, name, icon: Icon, value, handleSubmit, ...rest }) {
  return (
    <Container error={ error }>
      { label && <label htmlFor={ name }> { label } </label> }
      <div className='group'>
        <input { ...register(name, { value })} name={ name } id={ name } { ...rest }/>
        { Icon && <div className='icon'> <Icon onClick={ () => handleSubmit() } /> </div> }
      </div>
      { error && <span> { error } </span> }
    </Container>
  );
}