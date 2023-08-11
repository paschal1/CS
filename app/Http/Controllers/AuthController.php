<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;



class AuthController extends Controller
{
    public function register(SignupRequest $request){

        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'mat_no' => $data['mat_no'],
            'entry_year' => $data['entry_year'],
            'password' =>  bcrypt($data['password'])

        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'status'=> 200,
            'user' => $user,
            'token' => $token,
            'message' => 'Registration Successful'
        ]);

        // return response(compact('user','token'));

    }



     public function login(LoginRequest $request){

        //laravel method

      //   $input = $request->all();

      // $this->validate($request,[
      //   'email' =>'required|email',
      //   'password' => 'required'

      // ]);
      // if(Auth()->attempt(['email'=>$input["email"], 'password'=>$input["password"]])){

      //   if(Auth::user()->role_as == 1)
      // {
      //   return response('/dashboard')->with('status', 'Welcome To Your Dashboard');
      // }elseif(Auth::user()->role_as == 0){
      //   return response('/home')->with('status', 'Logged in successfully');
      // }
      // }else{
      //   return redirect()->route("login")->with("status", "Incorrect Email and Password");
      // }

      // js method
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remember)){
            return response()->json([
                'message' => 'The Provided credentials are not correct'
            ], 422);
        }

        /** @var User $user */

        $user = Auth::user();
         $token = $user->createToken('main')->plainTextToken;
           return response()->json([
            'user' => $user,
            'token' => $token
        ]);
        //return response(compact('user','token'));

    }

    public function check(CheckRequest $request){

    $email = $request->input('email');
    $mat_no = $request->input('mat_no');

    $result = User::where('email', $email)
        ->where('mat_no', $mat_no)
        ->first();

    if ($result) {
        return response()->json($result);
    } else {
        return response()->json(['error' => 'Result not found'], 404);
    }


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
