<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request) {
        $user = $request->usuario;
        $password = $request->senha;

        $auth = DB::select('select * from users where name = :user and password = :password', [$user, $password]);

        if($auth) {
            $auth[0]->session = rand(1000,100000000000000);
        }

        return response($auth, 200);
    }

}
