<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
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
        'name',
        'address',
        'contact_number_1',
        'contact_number_2',
        'email_1',
        'email_2',
        'company_code',
        'vat_status',
        'status',
        'contact_person_id',
        'role_id'
    ];
}