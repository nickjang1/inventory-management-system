<?php
namespace App\Http\Controllers\Api;
use App\User;
use App\Record;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class RecordController extends Controller
{
    public function index()
    {
      $records = Record::get();
      return response()->json([
          'status' => 200,
          'records' => $records,
      ]);
    }
    public function record($id) {
      $record = Record::where('id', $id)->first();
      return response()->json([
        'status' => 200,
        'record' => $record
      ]);
    }
    public function store(Request $request) {
      $user = JWTAuth::parseToken()->authenticate();
      $data = $request->all();
      $last = Record::orderby('id', 'desc')->first();
      $lastNumber = 0;
      if ($last) {
        $lastNumber = $last->reference_number + 1;
      } else {
        $lastNumber = 1000001;
      }
      $record = Record::create(array(
        'created_by' => $user->first_name.' '.$user->last_name,
        'modified_by' => $user->first_name.' '.$user->last_name,
        'reference_number' => $lastNumber,
        'total_cost' => $data['total_cost']
      ));
      return response()->json([
        'status' => 200,
        'number' => $record->reference_number
      ]);
    }
}