<?php
namespace App\Http\Controllers\Api;

use App\User;
use App\Person;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:6',
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => 'fail',
                    'data' => $validator->errors(),
                ],
                422
            );
        }
        $user = User::where('email', $request->email)->first();
        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(
                    [
                        'status' => 'error',
                        'message'=> 'Invalid credentials.'
                    ],
                    406
                );
            }
        } catch (JWTException $e) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Invalid credentials.'
                ],
                406
            );
        }
        return response()->json([
            'status' => 'success',
            'data' => [
                'token' => $token,
                'user_info' => $user
            ]
        ], 200);
    }
    public function users() {
        $users = User::get();
        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }
}