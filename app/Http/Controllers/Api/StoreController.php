<?php
namespace App\Http\Controllers\Api;
use App\Store;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class StoreController extends Controller
{
    public function index()
    {
      $stores = Store::get();
      return response()->json([
          'status' => 200,
          'stores' => $stores,
      ]);
    }
    public function store(Request $request)
    {
      $user = JWTAuth::parseToken()->authenticate();
      $data = $request->all();

      $validator = Validator::make($data, [
          'code' => 'required|string|max:255|unique:stores',
          'description' => 'required|string|max:255'
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
        Store::create(array(
            'created_by' => $user->first_name.' '.$user->last_name,
            'modified_by' => $user->first_name.' '.$user->last_name,
            'code' => $data['code'],
            'description' => $data['description'],
            'status' => $data['status'],
            'store_type_id' => $data['store_type_id'],
            'contact_person' => $data['contact_person'],
            'contact_number' => $data['contact_number'],
            'email' => $data['email'],
            'manager_id' => 0
        ));
        $stores = Store::get();
        return response()->json([
            'status' => 'success',
            'data' => $stores
        ], 200);
      }
    }
    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (isset($user)) {
          Store::where('id', $id)->delete();
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
    public function update(Request $request, $id)
    {
      $user = JWTAuth::parseToken()->authenticate();
      $data = $request->all();
      $validator = Validator::make($data, [
        'code' => 'required|string|max:255',
        'description' => 'required|string|max:255'
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
        Store::where('id', $id)->update($data);

        return response()->json([
            'status' => 'success'
        ], 200); 
      }
    }
}