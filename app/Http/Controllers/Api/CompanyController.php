<?php
namespace App\Http\Controllers\Api;
use App\Company;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use DB;

class CompanyController extends Controller
{
    public function index()
    {
      $companies = Company::get();
      return response()->json([
          'status' => 200,
          'companies' => $companies,
      ]);
    }
    public function store(Request $request)
    {
      $user = JWTAuth::parseToken()->authenticate();
      $data = $request->all();

      $validator = Validator::make($data, [
          'company_code' => 'required|string|max:255|unique:companies',
          'name' => 'required|string|max:255',
          'contact_number' => 'required|string|max:255',
          'contact_person' => 'required|integer'
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
        Company::create(array(
            'company_code' => $data['company_code'],
            'name' => $data['name'],
            'contact_number_1' => $data['contact_number'],
            'contact_number_2' => '',
            'email_1' => '',
            'email_2' => '',
            'status' => $data['status'],
            'vat_status' => $data['vat_status'],
            'contact_person_id' => $data['contact_person'],
            'created_by' => $user->first_name.' '.$user->last_name,
            'modified_by' => $user->first_name.' '.$user->last_name,
            'address' => '',
            'role_id' => 0
        ));
        $companies = Company::get();
        return response()->json([
            'status' => 'success',
            'data' => $companies
        ], 200);
      }
    }
    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (isset($user)) {
          Company::where('id', $id)->delete();
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
        'company_code' => 'required|string|max:255',
        'name' => 'required|string|max:255',
        'contact_number_1' => 'required|string|max:255',
        'contact_person_id' => 'required|integer',
        'address' => 'required|string|max:255',
        'email_1' => 'required|email'
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
        Company::where('id', $id)->update($data);

        return response()->json([
            'status' => 'success'
        ], 200); 
      }
    }
}