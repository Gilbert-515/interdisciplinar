import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FaSave, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { Input, Button, DataList , Form as Container, Loading} from '~/components';

export function Form ({ close, edit }) {

    const { register, handleSubmit } = useForm();
    const bookAdds = useRef();
    const renders = useRef(0);
    
    const [books_add, setBooks_add] = useState(
        edit && edit.livros.length > 1 ? 
        edit.livros.filter(livro => livro.nome != edit.livros[edit.livros.length - 1].nome ) 
        : 
        []
    );
    const [book_index, setBook_index] = useState(1);
    const [livros, setLivros] = useState([]);
    const [leitores, setLeitores] = useState([]);
    const [leitor_error, setLeitor_error] = useState();
    const [livro_error, setLivro_error] = useState();

    const date = new Date();
    date.setDate(date.getDate() + 30);

    const getOptions = async () => {

        const { data: livros_options } = await axios.get('/api/getLivros');
        livros_options.forEach(livro => {
            setLivros(livros => [...livros, livro.titulo]);
        });

        const { data: leitores_options } = await axios.get('/api/getLeitores');
        leitores_options.forEach(leitor => {
            setLeitores(leitores => [...leitores, leitor.nome]);
        });

    }

    const addBook = () => {
        setBooks_add(books => [...books, `book-${ book_index }`]);
        setBook_index(index => index + 1);
    }
    const removeBook = (item) => {
        setBooks_add(books => books.filter(book => book != item));
    }

    const submitForm = async (data, e) => {
        e.preventDefault();

        let books = [];
        const livrosAll = bookAdds.current;
        const livrosDiv = Array.prototype.slice.call( livrosAll.children );
        livrosDiv.forEach(div => books.push(div.children[0].children[0].children[0].value));

        books.push(data.livros);
        data.livros = books;
        data.data_devolucao = data.data_devolucao + ' 00:00:00';
        
        if(!edit){
            const { data: response } = await axios.post('/api/newEmprestimo', data);

            if(response.save == false) {
                response.leitor_message ?
                setLeitor_error(response.leitor_message) :
                setLivro_error(response.livro_message);
            }
            else {
                close();
            }
        }
        else {
            data.codigo = edit.id;
            const { data: response } = await axios.post('/api/editEmprestimo', data);
            if(response.save == false) {
                response.leitor_message ?
                setLeitor_error(response.leitor_message) :
                setLivro_error(response.livro_message);
            }
            else {
                close();
            }
        }
    }

    useEffect(() => {
        renders.current += 1;
        renders.current == 1 && getOptions();
    }, [])

    return (
        <Container onSubmit={ handleSubmit(submitForm) }>
       {  leitores && leitores.length != 0 ? 
        <>
            <div className="header">
                { edit? <h3>Editar Empréstimo</h3> : <h3>Novo Empréstimo</h3> }
                <AiOutlineCloseSquare onClick={ () => close() }/>
            </div>
            <div className="row">
                <div className="content">
                    <DataList 
                    label='Leitor:' 
                    options={ leitores } 
                    register={ register } 
                    name='leitor' id='leitores' 
                    placeholder='Informe o nome do leitor' 
                    value={ edit && edit.leitor_nome }
                    autoComplete="off"
                    error={ leitor_error }
                    onFocus={ () => setLeitor_error('') }
                    required/>
                </div>
                <div className="content">
                    <Input 
                    label='Data de Devolução:' 
                    type='date' 
                    name='data_devolucao' 
                    register={ register }
                    value={ edit ? 
                        (edit.data_prevista_devolucao.split('/').reverse().join('-')) :
                        ( date?.toLocaleDateString("pt-BR").split('/').reverse().join('-'))
                    }
                    required/>
                </div>
            </div>
            <div className="row">
                <div className="content">
                    <div className='input-content'>
                        <DataList 
                        label='Livros:' 
                        options={ livros } 
                        name='livros' 
                        id='livro' 
                        register={ register }
                        placeholder='Infome o nome do livro' 
                        value={ edit && edit.livros[edit.livros.length -1].nome }
                        autoComplete="off"
                        error={ livro_error }
                        onFocus={ () => setLivro_error('') }
                        required/>
                    </div>
                    <button className='btn-add' type='button' onClick={ addBook }> <FaPlus/> </button>
                </div>
            </div>
            <div className="items-adds">
                <div className="items" ref={ bookAdds }>

                    { books_add && books_add.map((book, index) => (
                        <div className="item" key={ index } >
                            <div className='input-content'>
                                <DataList 
                                options={ livros } 
                                name={ `livs-${ index }` }
                                id={ `livros-${ index }` } 
                                placeholder='Infome o nome do livro' 
                                register={ register }
                                value={ book.nome && book.nome }
                                autoComplete="off"
                                onFocus={ () => setLivro_error('') }
                                required/>
                            </div>
                            <button type='button' className='btn-trash' onClick={ () => removeBook(book) }> <FaTrashAlt/> </button>
                        </div>
                    )) }
   
                </div>
            </div>
            <div className="footer">
                <div className='btn'>
                    <Button color='var(--success)' color_action='var(--success_active)'>
                        <FaSave/> Salvar 
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