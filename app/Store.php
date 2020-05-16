<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Store extends Model
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
        'code',
        'description',
        'status',
        'store_type_id',
        'contact_person',
        'contact_number',
        'email',
        'manager_id'
    ];
}