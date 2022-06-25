<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\Models\session;

class AuthController extends Controller
{
    public function login(Request $request) {
        $user = $request->usuario;
        $password = $request->senha;

        $auth = DB::select('select * from users where name = :user and password = :password', [$user, $password]);

        if($auth) {
            $token = rand(1000,10000000000000000);
            $auth[0]->session = $token;

            $session = new session;
            $session->session = $token;
            $session->save();
        }

        return response($auth, 201);
    }

    public function verifySession(Request $request) {
        $token = $request->token;

        $exist = DB::select('select * from sessions where session = :token', [$token]);

        if ($exist) {
            return response(json_encode($exist), 201);
        }

        return response()->json([
            "session" => false,
            "message" => "sessão não axiste"
        ], 201);
    }

    public function logout(Request $request) {
        
        $delete = DB::delete('delete from sessions');

        return response(json_encode($delete), 201);
    }

}
