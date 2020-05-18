<?php
namespace App\Http\Controllers\Api;
use App\User;
use App\Order;
use App\Item;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class OrderController extends Controller
{
    public function orders()
    {
      $orders = Order::where('status', '!=', 0)->get();
      foreach ($orders as $order) {
        $order['item'] = Item::where('id', $order->item_id)->first();
      }
      return response()->json([
          'status' => 200,
          'orders' => $orders,
      ]);
    }
    public function detail($id) {
      $order = Order::where('id', $id)->first();
      $order['item'] = Item::where('id', $order->item_id)->first();
      return response()->json([
        'status' => 200,
        'order' => $order
      ]);
    }

    public function active() {
      $orders = Order::where('status', 0)->get();
      foreach ($orders as $order) {
        $order['item'] = Item::where('id', $order->item_id)->first();
      }
      return response()->json([
          'status' => 200,
          'orders' => $orders,
      ]);
    }
    public function pending() {
      $orders = Order::where('status', 1)->get();
      foreach ($orders as $order) {
        $order['item'] = Item::where('id', $order->item_id)->first();
      }
      return response()->json([
          'status' => 200,
          'orders' => $orders,
      ]);
    }

    public function approve(Request $request) {
      $data = $request->all();
      $orders = $data;
      if (sizeof($orders)) {
        foreach ($orders as $order) {
          $status['status'] = 1;
          Order::where('id', $order['id'])->update($status);
        }
      }
      return response()->json([
        'status' => 200,
        'orders' => $orders
      ]);
    }

    public function check($id) {
      $order = Order::where('id', $id)->first();
      if ($order->final_order) {
        $data['final_order'] = 0;
      } else {
        $data['final_order'] = 1;
      }
      $updated = Order::where('id', $id)->update($data);
      return response()->json([
        'status' => 200
      ]);
    }

    public function delete($id) {
      $data['status'] = 0;
      Order::where('id', $id)->update($data);
      return response()->json([
        'status' => 200
      ]);
    }

    public function done($id) {
      $data['status'] = 2;
      Order::where('id', $id)->update($data);
      $order = Order::where('id', $id)->first();
      return response()->json([
        'status' => 200,
        'order' => $order
      ]);
    }
}