<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeitorController;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\OptionsController;
use App\Http\Controllers\AuthController;

// rotas leitor

Route::post('newleitor', [LeitorController::class, 'createLeitor']);

Route::get('allLeitores', [LeitorController::class, 'getAllLeitores']);

Route::post('getLeitor', [LeitorController::class, 'getLeitor']);

Route::post('editLeitor', [LeitorController::class, 'editLeitor']);

// rotas livro

Route::post('newLivro', [LivroController::class, 'createLivro']);

Route::get('getAllLivros', [LivroController::class, 'getAllLivros']);

Route::post('getlivro', [LivroController::class, 'getlivro']);

Route::post('editLivro', [LivroController::class, 'editLivro']);

// rotas emprestimo

Route::post('newEmprestimo', [EmprestimoController::class, 'newEmprestimo']);

Route::get('getAllEmprestimos', [EmprestimoController::class, 'getAllEmprestimos']);

Route::post('getEmprestimo', [EmprestimoController::class, 'getEmprestimo']);

Route::post('editEmprestimo', [EmprestimoController::class, 'editEmprestimo']);

Route::post('devolver', [EmprestimoController::class, 'devolver']);

Route::post('renovar', [EmprestimoController::class, 'renovar']);


// rotas de options

Route::get('getAutores', [OptionsController::class, 'getAutores']);

Route::get('getEditoras', [OptionsController::class, 'getEditoras']);

Route::get('getLivros', [OptionsController::class, 'getLivros']);

Route::get('getLeitores', [OptionsController::class, 'getLeitores']);

// rota de auth

Route::post('auth', [AuthController::class, 'login']);
