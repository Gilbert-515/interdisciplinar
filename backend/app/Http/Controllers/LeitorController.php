<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\Models\Leitor;


class LeitorController extends Controller
{
    public function getAllLeitores() {
        $leitores = DB::select('select id as codigo, nome, telefone from leitors order by id desc;');
        
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

    
        return response(json_encode($leitores), 200);
    }

    public function getLeitor(Request $resquest) {
        $leitor = DB::table('leitors')->find($resquest->codigo);

        $emprestimos = DB::select('select id as codigo, data_emprestimo, (
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
            order by id desc limit 1', [$resquest->codigo]
        );

        $qtd_emprestimos = DB::select('select count(*) as qtd_emprestimos from emprestimos where leitor_id = :codigo', [$resquest->codigo]);

        if($emprestimos){

            $leitor->ultimo_emprestimo = $emprestimos;

            foreach($qtd_emprestimos as $qtd_emprestimo) {

                $leitor->qtd_emprestimo = $qtd_emprestimo->qtd_emprestimos;
            }
        }

        return response(json_encode($leitor), 200);
    }

    public function editLeitor(Request $resquest) {
        $leitor = DB::table('leitors')
        ->where('id', $resquest->codigo)
        ->update(['nome' => $resquest->nome, 
                'email' => $resquest->email, 
                'telefone' => $resquest->telefone
        ]);

        return response()->json([
            "message" => "leitor salvo com sucesso"
        ], 201);
    }

    public function createLeitor(Request $resquest) {

        $leitor_exist = DB::select("select id from leitors where nome = :nome", [$resquest->nome]);

        if($leitor_exist) {
            return response()->json([
                "save" => false,
                "message" => "leitor já existente"
            ], 201);
        }
       
        $leitor = new Leitor;
        $leitor->nome = $resquest->nome;
        $leitor->email = $resquest->email;
        $leitor->telefone = $resquest->telefone;
        $leitor->save();
    
        

        return response()->json([
            "save" => true,
            "message" => "leitor salvo com sucesso"
        ], 201);
    }
}
