<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\Models\Emprestimo;
use App\Models\Empretimo_Livro;

class EmprestimoController extends Controller
{
    public function newEmprestimo(Request $request) {
        $leitors = DB::select('select id from leitors where nome = :leitor', [$request->leitor]);

        if(!$leitors) {
            return response()->json([
                "save" => false,
                "leitor_message" => "leitor inválido"
            ], 201);
        }
        else {

            $emprestimos = DB::select('select (
                case when data_devolucao is not null then "fechado"
                when data_prevista_devolucao < now() then "atrasado"
                else "aberto"
                end
                ) as situacao
                from emprestimos 
                where leitor_id = :codigo
                order by id desc limit 1', [$leitors[0]->id]
            );

            foreach ($emprestimos as $emprest) {

                if($emprest->situacao != "fechado") {
                    return response()->json([
                        "save" => false,
                        "leitor_message" => "leitor com empréstimo em aberto"
                    ], 201);
                }

            }

        }

        $livros_forms = $request->livros;

        $id_emprestimoss = DB::select('SELECT MAX(id) as id_emprestimo FROM emprestimos');

        foreach ($id_emprestimoss as $id_emprestimo) {

            foreach($livros_forms as $livro) {

                $id_livros = DB::select('select id, quantidade as qtd_disponivel from livros where titulo = :livro', [$livro]);

                if(!$id_livros) {

                    if(sizeof($livros_forms) > 1) {
                        return response()->json([
                            "save" => false,
                            "livro_message" => "um dos livros é inválido"
                        ], 201);
                    }else {
                        return response()->json([
                            "save" => false,
                            "livro_message" => "livro inválido"
                        ], 201);
                    }
                }
                else {
        
                    foreach($id_livros as $livro) {
            
                        $qtd_emprestada = DB::select('select count(*) as qtd_emprestada from livros lv
                            inner join empretimo__livros el on el.livro_id = lv.id
                            inner join emprestimos emp on emp.id = el.emprestimo_id
                            where lv.id = :codigo and emp.data_devolucao is null
                            group by lv.id', [$livro->id]
                        );
            
                        foreach($qtd_emprestada as $qtd) {
            
                            $livro->qtd_disponivel =  $livro->qtd_disponivel - $qtd->qtd_emprestada;
                        }

                        if($livro->qtd_disponivel == 0) {

                            if(sizeof($livros_forms) > 1) {
                                return response()->json([
                                    "save" => false,
                                    "livro_message" => "um dos livros está indisponivel"
                                ], 201);
                            }else {
                                return response()->json([
                                    "save" => false,
                                    "livro_message" => "livro indisponivel"
                                ], 201);
                            }
                        }
            
                    }
                }
            }

        }

        $emprestimo_save;

        foreach($leitors as $leitor ) {
            $emprestimo = new Emprestimo;
            $emprestimo->leitor_id = $leitor->id;
            $emprestimo->data_emprestimo = date('Y-m-d H:i:s');
            $emprestimo->data_prevista_devolucao = $request->data_devolucao;
            $emprestimo->save();
            $emprestimo_save = $emprestimo;
        }

        $livros_form = $request->livros;

        $id_emprestimos = DB::select('SELECT MAX(id) as id_emprestimo FROM emprestimos');

        foreach ($id_emprestimos as $id_emprestimo) {

            foreach($livros_form as $livro) {

                $id_livros = DB::select('select id from livros where titulo = :livro', [$livro]);

                foreach($id_livros as $id_livro) {
                    $emprestimo_livro = new Empretimo_Livro;
                    $emprestimo_livro->emprestimo_id = $id_emprestimo->id_emprestimo;
                    $emprestimo_livro->livro_id = $id_livro->id;
                    $emprestimo_livro->save();
                }

            }

        }

        return response()->json([
            "save" => true,
            "infos" => $emprestimo_save
        ], 201);

    }

    public function getAllEmprestimos() {
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
            inner join leitors l on l.id = emp.leitor_id order by emp.id desc'
        );

        return response(json_encode($emprestimos), 201);
    }

    public function getEmprestimo(Request $request) {
        $infos = DB::select('select emp.*, l.nome as leitor_nome, l.email as leitor_email,   
            (case 
                when emp.data_devolucao is not null then "fechado"
                when emp.data_prevista_devolucao < now() then "atrasado"
                else "aberto"
                end
            ) as situacao from emprestimos emp
            inner join leitors l on l.id = emp.leitor_id
            where emp.id = :codigo', [$request->codigo]
        );
        $livros= DB::select('select l.titulo as nome from empretimo__livros ep
            inner join livros l on l.id = ep.livro_id
            where ep.emprestimo_id = :codigo', [$request->codigo]
        );
        $infos[0]->livros = $livros;
        return response(json_encode($infos), 201);
    }

    public function editEmprestimo(Request $request) {

        $leitors = DB::select('select id from leitors where nome = :leitor', [$request->leitor]);

        $livros_form = $request->livros;

        $livros_forms = $request->livros;

        $id_emprestimoss = DB::select('SELECT MAX(id) as id_emprestimo FROM emprestimos');

        foreach ($id_emprestimoss as $id_emprestimo) {

            foreach($livros_forms as $livro) {

                $id_livros = DB::select('select id, quantidade as qtd_disponivel from livros where titulo = :livro', [$livro]);

                if(!$id_livros) {

                    if(sizeof($livros_forms) > 1) {
                        return response()->json([
                            "save" => false,
                            "livro_message" => "um dos livros é inválido"
                        ], 201);
                    }else {
                        return response()->json([
                            "save" => false,
                            "livro_message" => "livro inválido"
                        ], 201);
                    }
                }
                else {
        
                    foreach($id_livros as $livro) {
            
                        $qtd_emprestada = DB::select('select count(*) as qtd_emprestada from livros lv
                            inner join empretimo__livros el on el.livro_id = lv.id
                            inner join emprestimos emp on emp.id = el.emprestimo_id
                            where lv.id = :codigo and emp.data_devolucao is null
                            group by lv.id', [$livro->id]
                        );
            
                        foreach($qtd_emprestada as $qtd) {
            
                            $livro->qtd_disponivel =  $livro->qtd_disponivel - $qtd->qtd_emprestada;
                        }

                        if($livro->qtd_disponivel == 0) {

                            if(sizeof($livros_forms) > 1) {
                                return response()->json([
                                    "save" => false,
                                    "livro_message" => "um dos livros está indisponivel"
                                ], 201);
                            }else {
                                return response()->json([
                                    "save" => false,
                                    "livro_message" => "livro indisponivel"
                                ], 201);
                            }
                        }
            
                    }
                }
            }

        }

        foreach($leitors as $leitor ) {

            $livro = DB::table('emprestimos')
            ->where('id', $request->codigo)
            ->update(['data_prevista_devolucao' => $request->data_devolucao, 
                    'leitor_id' => $leitor->id
            ]);

            $deleted = DB::delete('delete from empretimo__livros where emprestimo_id = :codigo', [$request->codigo]);

            foreach($livros_form as $livro) {

                $id_livros = DB::select('select id from livros where titulo = :livro', [$livro]);

                foreach($id_livros as $id_livro) {

                    $emprestimo_livro = new Empretimo_Livro;
                    $emprestimo_livro->emprestimo_id = $request->codigo;
                    $emprestimo_livro->livro_id = $id_livro->id;
                    $emprestimo_livro->save();
                }

            }

        }
    }

    public function devolver(Request $request) {
        $emprestimo = DB::table('emprestimos')
        ->where('id', $request->codigo)
        ->update(['data_devolucao' => date('Y-m-d H:i:s') ]);
        return response(json_encode($emprestimo));
    }

    public function renovar (Request $request) {
        $emprestimo = DB::table('emprestimos')
        ->where('id', $request->codigo)
        ->update(['data_prevista_devolucao' => date('Y-m-d H:i:s', strtotime('+ 28 days')) ]);
        return response(json_encode($emprestimo));
    }

}
