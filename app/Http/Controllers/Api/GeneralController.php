<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class GeneralController extends Controller
{
    public function roles() {
        $data = DB::table('roles')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }
    public function inventory_types() {
        $inventory = DB::table('inventory_types')->get();
        return response()->json([
            'status' => 200,
            'data' => $inventory,
        ]);
    }
    public function store_types() {
        $store_types = DB::table('store_types')->get();
        return response()->json([
            'status' => 200,
            'data' => $store_types,
        ]);
    }
}