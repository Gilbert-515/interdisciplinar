import { Container } from './styled';

export function DataList ({ register, label, error, name, id, options, value, ...rest }) {
    return (
        <Container error={ error }>
            { label && <label htmlFor={ id }> { label } </label> }
            { register ? 
                <input list={ name } name={ name } id={ id } { ...rest } { ...register(name, { value }) }/> 
                :
                <input list={ name } name={ name } id={ id } { ...rest }/> 
            }
            <datalist id={ name } >
                {
                    options.map((option, index) => (
                        <option key={ index } value={ option }/>
                    ))
                }
            </datalist>
            { error && <span> { error } </span> }
        </Container>
    );
}