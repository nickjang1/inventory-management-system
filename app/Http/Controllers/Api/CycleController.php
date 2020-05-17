<?php
namespace App\Http\Controllers\Api;
use App\User;
use App\Item;
use App\Cycle;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class CycleController extends Controller
{
    public function index()
    {
      $cycles = Cycle::get();
      foreach ($cycles as $cycle) {
        $item = Item::where('id', $cycle->item_id)->first();
        $cycle['item'] = $item;
      }
      return response()->json([
          'status' => 200,
          'cycles' => $cycles,
      ]);
    }
    public function update(Request $request, $id) {
      $user = JWTAuth::parseToken()->authenticate();
      $data = $request->all();
      $data['modified_by'] = $user->first_name.' '.$user->last_name;
      Cycle::where('id', $id)->update($data);
    }
}