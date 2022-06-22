import { Container } from './styled';

export function Select ({ name, register, label, options, error, value, ...rest }) {
  return (
    <Container error={ error }>
      { label && <label>{ label }</label> }
      <select name={ name } { ...register(name, { value }) }  { ...rest }>
        {
          options.map((option, index) => (
            <option key={ index }>{ option }</option>
          ))
        }
      </select>
      { error && <span> { error } </span> }
    </Container>
  )
}