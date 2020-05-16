<?php
namespace App\Http\Controllers\Api;
use App\Item;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class ItemController extends Controller
{
    public function index()
    {
      $items = Item::get();
      return response()->json([
          'status' => 200,
          'items' => $items,
      ]);
    }
    public function store(Request $request)
    {
      $user = JWTAuth::parseToken()->authenticate();
      $data = $request->all();

      $validator = Validator::make($data, [
          'code' => 'required|string|max:255|unique:items',
          'brand' => 'required|string|max:255'
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
        Item::create(array(
            'created_by' => $user->first_name.' '.$user->last_name,
            'modified_by' => $user->first_name.' '.$user->last_name,
            'name' => '',
            'brand' => $data['brand'],
            'code' => $data['code'],
            'vendor_id' => 0,
            'location_id' => 0,
            'inventory_type_id' => $data['inventory_type'],
            'shelf_life_in_days' => 0,
            'recorder_level' => 0,
            'stocks_on_hand' => 0,
            'average_weekly_consumption' => 0,
            'delivery_eta_in_days' => 0,
            'order_frequency' => 0,
            'minimum_purchase_price' => 0.00,
            'minimum_purchase_price_vat_inc' => 0.00,
            'minimum_purchase_qty' => 0,
            'minimum_purchase_multiples' => 0,
            'selling_price' => 0.00,
            'selling_price_vat_inc' => 0.00,
            'selling_qty' => 0,
            'selling_fixed_price' => 0.00,
            'local_dir' => '',
            'cloud_dir' => '',
            'description' => $data['description'],
            'active' => $data['active'],
            'branch_id' => 0,
            'company_owned_price_id' => 0,
            'franchise_price_id' => 0,
            'joint_venture_price_id' => 0,
            'minimum_purchase_uom_id' => 0,
            'selling_uom_id' => 0
        ));
        $items = Item::get();
        return response()->json([
            'status' => 'success',
            'data' => $items
        ], 200);
      }
    }
    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (isset($user)) {
          Item::where('id', $id)->delete();
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
        'brand' => 'required|string|max:255',
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
        Item::where('id', $id)->update($data);

        return response()->json([
            'status' => 'success'
        ], 200); 
      }
    }
}