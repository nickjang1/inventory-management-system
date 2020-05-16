<?php
namespace App\Http\Controllers\Api;

use App\User;
use App\Member;
use App\Store;

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

        foreach ($users as $user) {
            $person = Member::where('user_id', $user->id)->first();
            $store = Store::where('manager_id', $user->id)->first();
            if ($person) {
                $user['contact_number'] = $person->contact_number_1;
                $user['address'] = $person->address;
                $user['role_id'] = $person->role_id;
                $user['created_by'] = $person->created_by;
                $user['modified_by'] = $person->modified_by;
            } else {
                $user['contact_number'] = '';
                $user['address'] = '';
                $user['role_id'] = 0;
                $user['created_by'] = '';
                $user['modified_by'] = '';
            }
            if ($store) {
                $user['store_id'] = $store->id;
                $user['store_code'] = $store->code;
                $user['description'] = $store->description;
            } else {
                $user['store_id'] = 0;
                $user['store_code'] = '';
                $user['description'] = '';
            }
        }
        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }
    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (isset($user)) {
          User::where('id', $id)->delete();
          Member::where('user_id', $id)->delete();
          $updateStore['manager_id'] = 0;
          Store::where('manager_id', $id)->update($updateStore);
          return response()->json([
            'status' => 'success',
            'message' => 'Deleted Successfully'
          ], 200);
      } else {
          return response()->json(
              [
                  'status' => 'error',
                  'message' => 'Invalid credentials.'
              ],
              406
          );
      }
    }
    public function store(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();
        $data = $request->all();

        $validator = Validator::make($data, [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => 'fail',
                    'data' => $validator->errors(),
                ],
                422
            );
        } else {
            $newUser = User::create(array(
                'is_superuser' => 0,
                'is_staff' => 1,
                'is_active' => 1,
                'remember_token' => '',
                'username' => $data['username'],
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'contact_number' => $data['contact_number'],
                'email' => $data['email'],
                'password' => Hash::make($data['password'])
            ));
            $member = Member::create(array(
                'created_by' => $user->first_name.' '.$user->last_name,
                'modified_by' => $user->first_name.' '.$user->last_name,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'address' => '',
                'contact_number_1' => $data['contact_number'],
                'contact_number_2' => '',
                'email_1' => $data['email'],
                'email_2' => '',
                'role_id' => $data['role_id'],
                'user_id' => $newUser->id
            ));
            $updateStore['manager_id'] = $newUser->id;
            Store::where('id', $data['store_id'])->update($updateStore);
            $users = User::get();

            foreach ($users as $user) {
                $person = Member::where('user_id', $user->id)->first();
                $store = Store::where('manager_id', $user->id)->first();
                if ($person) {
                    $user['contact_number'] = $person->contact_number_1;
                    $user['address'] = $person->address;
                    $user['role_id'] = $person->role_id;
                    $user['created_by'] = $person->created_by;
                    $user['modified_by'] = $person->modified_by;
                } else {
                    $user['contact_number'] = '';
                    $user['address'] = '';
                    $user['role_id'] = 0;
                    $user['created_by'] = '';
                    $user['modified_by'] = '';
                }
                if ($store) {
                    $user['store_id'] = $store->id;
                    $user['store_code'] = $store->code;
                    $user['description'] = $store->description;
                } else {
                    $user['store_id'] = 0;
                    $user['store_code'] = '';
                    $user['description'] = '';
                }
            }
            return response()->json([
                'status' => 200,
                'users' => $users,
            ]);
        }
    }
    public function update(Request $request, $id)
    {
      $user = JWTAuth::parseToken()->authenticate();
      $data = $request->all();
      $validator = Validator::make($data, [
        'username' => 'required|string|max:255',
      ]);
      $data['modified_by'] = $user->first_name.' '.$user->last_name;
      if ($validator->fails()) {
        return response()->json(
            [
                'status' => 'fail',
                'data' => $validator->errors(),
            ],
            422
        );
      } else {
        $newUser['first_name'] = $data['first_name'];
        $newUser['last_name'] = $data['last_name'];
        $newUser['username'] = $data['username'];
        $newUser['email'] = $data['email'];
        $newMember['first_name'] = $data['first_name'];
        $newMember['last_name'] = $data['last_name'];
        $newMember['contact_number_1'] = $data['contact_number'];
        $newMember['email_1'] = $data['email'];
        $newMember['role_id'] = $data['role_id'];
        $newMember['modified_by'] = $user->first_name.' '.$user->last_name;
        $newStore['manager_id'] = $id;
        $oldStore['manager_id'] = 0;
        User::where('id', $id)->update($newUser);
        Member::where('user_id', $id)->update($newMember);
        Store::where('manager_id', $id)->update($oldStore);
        Store::where('id', $data['store_id'])->update($newStore);
        return response()->json([
            'status' => 'success'
        ], 200); 
      }
    }
}