<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class FiltroController extends Controller
{
    public function leitor(Request $request) {
        $nome = '%' . $request->nome . '%';

        $leitores = DB::select('select id as codigo, nome, telefone from leitors where nome like :nome order by id desc', [$nome]);
        
        foreach ($leitores as $leitor) {

            $situacoes = DB::select('select (
                case when data_devolucao is not null then "fechado"
                when data_prevista_devolucao < now() then "atrasado"
                else "aberto"
                end
                ) as situacao,
                (case when data_devolucao is not null then "success"
                when data_prevista_devolucao < now() then "danger"
                else "warning"
                end
                ) as label
                from emprestimos 
                where leitor_id = :codigo
                order by id desc limit 1', [$leitor->codigo]
            );

            if ($situacoes) {
                foreach ($situacoes as $situacao) {
                    $leitor->situacao = $situacao->situacao;
                    $leitor->label = $situacao->label;
                }
            }
            else{
                $leitor->situacao = "fechado";
                $leitor->label = "success";
            }

        }

        return response(json_encode($leitores), 201);
    }

    public function livro(Request $request) {
        $filtro = $request->filtro;

        $livros;

        if($filtro == 'Código') {

            $livros = DB::select('select lv.id as codigo, lv.titulo, lv.quantidade  as qtd_disponivel 
            from livros lv where lv.id = :codigo order by lv.id desc', [$request->codigo]
            );

            foreach($livros as $livro) {

                $qtd_emprestada = DB::select('select count(*) as qtd_emprestada from livros lv
                    inner join empretimo__livros el on el.livro_id = lv.id
                    inner join emprestimos emp on emp.id = el.emprestimo_id
                    where lv.id = :codigo and emp.data_devolucao is null
                    group by lv.id', [$livro->codigo]
                );
    
                foreach($qtd_emprestada as $qtd) {
    
                    $livro->qtd_disponivel =  $livro->qtd_disponivel - $qtd->qtd_emprestada;
                }
    
            }
            return response(json_encode($livros), 201);
        }
        else {

            $nome = '%' . $request->nome . '%';
            $livros = DB::select('select lv.id as codigo, lv.titulo, lv.quantidade  as qtd_disponivel 
            from livros lv where lv.titulo like :nome order by lv.id desc', [$nome]
            );

            foreach($livros as $livro) {

                $qtd_emprestada = DB::select('select count(*) as qtd_emprestada from livros lv
                    inner join empretimo__livros el on el.livro_id = lv.id
                    inner join emprestimos emp on emp.id = el.emprestimo_id
                    where lv.id = :codigo and emp.data_devolucao is null
                    group by lv.id', [$livro->codigo]
                );
    
                foreach($qtd_emprestada as $qtd) {
    
                    $livro->qtd_disponivel =  $livro->qtd_disponivel - $qtd->qtd_emprestada;
                }
    
            }
            return response(json_encode($livros), 201);
        }
    }

    public function emprestimo(Request $request) {

        $filtro = $request->filtro;

        if ($filtro == 'Leitor') {

            $emprestimos = DB::select('select emp.id as codigo, l.nome, emp.data_emprestimo,
                (case 
                    when emp.data_devolucao is not null then "fechado"
                    when emp.data_prevista_devolucao < now() then "atrasado"
                    else "aberto"
                    end
                ) as situacao,
                (case 
                    when emp.data_devolucao is not null then "success"
                    when emp.data_prevista_devolucao < now() then "danger"
                    else "warning"
                    end
                ) as label
                from emprestimos emp
                inner join leitors l on l.id = emp.leitor_id 
                where l.nome like :nome
                order by emp.id desc', ['%' . $request->nome . '%']
            );

            return response(json_encode($emprestimos), 201);
        }
        else {

            $emprestimos = DB::select('select emp.id as codigo, l.nome, emp.data_emprestimo,
                (case 
                    when emp.data_devolucao is not null then "fechado"
                    when emp.data_prevista_devolucao < now() then "atrasado"
                    else "aberto"
                    end
                ) as situacao,
                (case 
                    when emp.data_devolucao is not null then "success"
                    when emp.data_prevista_devolucao < now() then "danger"
                    else "warning"
                    end
                ) as label
                from emprestimos emp
                inner join leitors l on l.id = emp.leitor_id 
                where emp.id = :codigo
                order by emp.id desc', [$request->codigo]
            );

            return response(json_encode($emprestimos), 201);

        }

    }
}
