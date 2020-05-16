<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
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
        'brand',
        'code',
        'vendor_id',
        'location_id',
        'inventory_type_id',
        'shelf_life_in_days',
        'recorder_level',
        'stocks_on_hand',
        'average_weekly_consumption',
        'delivery_eta_in_days',
        'order_frequency',
        'minimum_purchase_price',
        'minimum_purchase_price_vat_inc',
        'minimum_purchase_qty',
        'minimum_purchase_multiples',
        'selling_price',
        'selling_price_vat_inc',
        'selling_qty',
        'selling_fixed_price',
        'local_dir',
        'cloud_dir',
        'description',
        'active',
        'branch_id',
        'company_owned_price_id',
        'franchise_price_id',
        'joint_venture_price_id',
        'minimum_purchase_uom_id',
        'selling_uom_id'
    ];
}