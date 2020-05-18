<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'created_by',
        'modified_by',
        'item_id',
        'on_hand',
        'on_order',
        'trf_number',
        'suggested_order',
        'final_order',
        'total_cost',
        'status'
    ];
}