<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\Models\Livro;
use App\Models\Editora;
use App\Models\Autor;
use App\Models\Livro_Autor;

class LivroController extends Controller
{  
    public function createLivro(Request $request) {
        $editoras = DB::select('select count(*) as qtd from editoras where nome = :editora', [$request->editora]);

        foreach ($editoras as $edt) {
            if($edt->qtd == 0) {
                $editora = new Editora;
                $editora->nome = $request->editora;
                $editora->save();
            }
        }

        $autores_form = $request->autores;

        foreach ($autores_form as $autor) {
            $autores = DB::select('select count(*) as qtd from autors where nome = :autor', [$autor]);
            foreach ($autores as $aut) {
                if($aut->qtd == 0) {
                    $autorDB = new Autor;
                    $autorDB->nome = $autor;
                    $autorDB->save();
                }
            }
        }

        $id_editoraArray = DB::select('select id from editoras where nome = :editora', [$request->editora]);
        $id_editora;

        foreach ($id_editoraArray as $id_edit) {
            $id_editora = $id_edit->id;
        }

        $livro_exist = DB::select('select id from livros where titulo = :nome', [$request->nome]);

        if($livro_exist) {
            return response()->json([
                "save" => false,
                "message" => "livro já existente"
            ], 201);
        }

        $livro = new Livro;
        $livro->titulo = $request->nome;
        $livro->quantidade = number_format($request->quantidade);
        $livro->editora_id = $id_editora;
        $livro->save();

        $id_livroArray = DB::select('select id from livros where titulo = :nome', [$request->nome]);

        foreach($id_livroArray as $id_livro) {

            foreach ($autores_form as $autor) {

                $autores_ids = DB::select('select id from autors where nome = :autor', [$autor]);

                foreach ($autores_ids as $autor_id) {
                    $livro_autor = new Livro_Autor;
                    $livro_autor->autor_id = $autor_id->id;
                    $livro_autor->livro_id = $autor_id->id;
                    $livro_autor->livro_id = $id_livro->id;
                    $livro_autor->save();
                }
            }
        }
        return response(json_encode($livro), 201);
    }

    public function getAllLivros() {

        $livros = DB::select('select lv.id as codigo, lv.titulo, lv.quantidade  as qtd_disponivel from livros lv order by lv.id desc');
        
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

    public function getLivro(Request $request) {
        $infos = DB::select("select l.*, ed.nome as editora, ('disponivel') as situacao from livros l 
            inner join editoras ed on ed.id = l.editora_id where l.id = :codigo", [$request->codigo]
        );
        $autores= DB::select('select a.nome from autors a inner join livro__autors la on a.id = la.autor_id 
            where la.livro_id = :codigo', [$request->codigo]
        );
        $qtd_emprestadas = DB::select('select count(*) as qtd_emprestada from livros lv
            inner join empretimo__livros el on el.livro_id = lv.id
            inner join emprestimos emp on emp.id = el.emprestimo_id
            where lv.id = :codigo and emp.data_devolucao is null
            group by lv.id', [$request->codigo]
        );

        $qtd_emprestada;

        if($qtd_emprestadas){
            foreach($qtd_emprestadas as $qtd) {
                $qtd_emprestada = $infos[0]->quantidade - $qtd->qtd_emprestada;
            }
        }
        else {
            $qtd_emprestada = $infos[0]->quantidade;
        }

        $infos[0]->qtd_disponivel = $qtd_emprestada;
        $infos[0]->autores = $autores;
        return response(json_encode($infos), 201);
    }

    public function editLivro(Request $request) {

        $editoras = DB::select('select count(*) as qtd from editoras where nome = :editora', [$request->editora]);

        foreach ($editoras as $edt) {
            if($edt->qtd == 0) {
                $editora = new Editora;
                $editora->nome = $request->editora;
                $editora->save();
            }
        }

        $id_editoraArray = DB::select('select id from editoras where nome = :editora', [$request->editora]);
        $id_editora;

        foreach ($id_editoraArray as $id_edit) {
            $id_editora = $id_edit->id;
        }

        $livro = DB::table('livros')
        ->where('id', $request->codigo)
        ->update(['titulo' => $request->nome, 
                'quantidade' => number_format($request->quantidade), 
                'editora_id' => $id_editora
            ]);

        $autores_form = $request->autores;

        foreach ($autores_form as $autor) {
            $autores = DB::select('select count(*) as qtd from autors where nome = :autor', [$autor]);
            foreach ($autores as $aut) {
                if($aut->qtd == 0) {
                    $autorDB = new Autor;
                    $autorDB->nome = $autor;
                    $autorDB->save();
                }
            }
        }

        $deleted = DB::delete('delete from livro__autors where livro_id = :codigo', [$request->codigo]);

        $id_livroArray = DB::select('select id from livros where titulo = :nome', [$request->nome]);

        foreach($id_livroArray as $id_livro) {

            foreach ($autores_form as $autor) {

                $autores_ids = DB::select('select id from autors where nome = :autor', [$autor]);

                foreach ($autores_ids as $autor_id) {
                    $livro_autor = new Livro_Autor;
                    $livro_autor->autor_id = $autor_id->id;
                    $livro_autor->livro_id = $autor_id->id;
                    $livro_autor->livro_id = $id_livro->id;
                    $livro_autor->save();
                }
            }
        }
    }
}
