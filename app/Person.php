<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Person extends Model
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
        'first_name',
        'last_name',
        'address',
        'contact_number_1',
        'contact_number_2',
        'email_1',
        'email_2',
        'role_id',
        'user_id'
    ];
}