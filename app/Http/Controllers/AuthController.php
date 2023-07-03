<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(SignupRequest $request){

        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'mat_no' => $data['mat_no'],
            'password' =>  bcrypt($data['password']),
            'entry_year' => $data['entry_year'],
        ]);

        $token = $user->createToken('main')->plainTextToken;

        // return response([
        //     'user' => $user,
        //     'token' => $token
        // ]);

        return response(compact('user','token'));

    }

     public function login(LoginRequest $request){

        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remember)){
            return response([
                'message' => 'The Provided credentials are not correct'
            ], 422);
        }

        /** @var User $user */

        $user = Auth::user();
         $token = $user->createToken('main')->plainTextToken;
        //    return response([
        //     'user' => $user,
        //     'token' => $token
        // ]);
        return response(compact('user','token'));

    }

     public function logout(Request $request){

        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            'success' => true
        ]);
    }
}
