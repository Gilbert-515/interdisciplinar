<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\Models\Livro;
use App\Models\Editora;
use App\Models\Autor;

class OptionsController extends Controller
{
    public function getAutores() {
        $autores = DB::select('select nome from autors');
        return response(json_encode($autores), 201);
    }

    public function getEditoras() {
        $editoras = DB::select('select nome from editoras');
        return response(json_encode($editoras), 201);
    }

    public function getLivros() {
        $livros = DB::select('select titulo from livros');
        return response(json_encode($livros), 201); 
    }

    public function getLeitores() {
        $leitores = DB::select('select nome from leitors');
        return response(json_encode($leitores), 201); 
    }
}