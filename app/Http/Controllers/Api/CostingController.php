<?php
namespace App\Http\Controllers\Api;
use App\User;
use App\Item;
use App\Costing;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class CostingController extends Controller
{
    public function index()
    {
      $costings = Costing::get();
      foreach ($costings as $costing) {
        $item = Item::where('id', $costing->item_id)->first();
        $costing['item'] = $item;
      }
      return response()->json([
          'status' => 200,
          'costings' => $costings,
      ]);
    }

    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (isset($user)) {
          Costing::where('id', $id)->delete();
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

      $data['modified_by'] = $user->first_name.' '.$user->last_name;
      Costing::where('id', $id)->update($data);

      return response()->json([
          'status' => 'success'
      ], 200); 
    }
}