<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(function () {
    Route::post('login', 'UserController@login');
    Route::post('forgot', 'ForgotPasswordController@forgot');
    Route::post('reset/{token}', 'ForgotPasswordController@reset');

    Route::group(['middleware' => ['jwt.verify']], function () {
        Route::get('companies', 'CompanyController@index');
        Route::post('company', 'CompanyController@store');
        Route::delete('company/{id}', 'CompanyController@destroy');
        Route::put('company/{id}', 'CompanyController@update');

        Route::get('items', 'ItemController@index');
        Route::post('item', 'ItemController@store');
        Route::delete('item/{id}', 'ItemController@destroy');
        Route::put('item/{id}', 'ItemController@update');

        Route::get('stores', 'StoreController@index');
        Route::post('store', 'StoreController@store');
        Route::delete('store/{id}', 'StoreController@destroy');
        Route::put('store/{id}', 'StoreController@update');

        Route::get('users', 'UserController@users');
        Route::post('user', 'UserController@store');
        Route::delete('user/{id}', 'UserController@destroy');
        Route::put('user/{id}', 'UserController@update');

        Route::get('costings', 'CostingController@index');

        Route::delete('costing/{id}', 'CostingController@destroy');
        Route::put('costing/{id}', 'CostingController@update');

        Route::get('cycles', 'CycleController@index');
        Route::put('cycle/{id}', 'CycleController@update');

        Route::get('records', 'RecordController@index');
        Route::get('records/{id}', 'RecordController@record');
        Route::post('record', 'RecordController@store');

        Route::get('orders/active', 'OrderController@active');
        Route::get('orders/pending', 'OrderController@pending');
        Route::get('orders/all', 'OrderController@orders');
        Route::get('orders/{id}', 'OrderController@detail');
        Route::post('orders/approve', 'OrderController@approve');
        Route::put('order/check/{id}', 'OrderController@check');
        Route::put('order/done/{id}', 'OrderController@done');
        Route::delete('order/delete/{id}', 'OrderController@delete');

        Route::get('roles', 'GeneralController@roles');
        Route::get('inventory-types', 'GeneralController@inventory_types');
        Route::get('store-types', 'GeneralController@store_types');
    });
});