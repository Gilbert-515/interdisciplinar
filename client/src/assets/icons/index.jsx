import leitorIcon from './images/leitor.png'
import livroIcon from './images/livro.png'
import relatorioIcon from './images/relatorio.png'
import emprestimoIcon from './images/emprestimo.png';

export const EmprestimoIcon = ({ width }) => {
  return <img src={ emprestimoIcon } alt='emprestimo icone' width={ width } />;
}
export const LivroIcon = ({ width }) => {
  return <img src={ livroIcon } alt='livro icone' width={ width } />;
}
export const LeitorIcon = ({ width }) => {
  return <img src={ leitorIcon } alt='leitor icone' width={ width } />;
}
export const RelatorioIcon = ({ width }) => {
  return <img src={ relatorioIcon } alt='relatorio icone' width={ width } />;
}