<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('created_by', 255);
            $table->string('modified_by', 255);
            $table->string('name', 50);
            $table->string('brand', 30);
            $table->string('code', 30);
            $table->integer('vendor_id');
            $table->integer('location_id');
            $table->integer('inventory_type_id');
            $table->integer('shelf_life_in_days');
            $table->integer('recorder_level');
            $table->integer('stocks_on_hand');
            $table->integer('average_weekly_consumption');
            $table->integer('delivery_eta_in_days');
            $table->integer('order_frequency');
            $table->double('minimum_purchase_price', 10, 2);
            $table->double('minimum_purchase_price_vat_inc', 10, 2);
            $table->integer('minimum_purchase_qty');
            $table->integer('minimum_purchase_multiples');
            $table->double('selling_price', 10, 2);
            $table->double('selling_price_vat_inc', 10, 2);
            $table->integer('selling_qty');
            $table->double('selling_fixed_price', 10, 2);
            $table->string('local_dir', 255);
            $table->string('cloud_dir', 255);
            $table->string('description', 255);
            $table->boolean('active');
            $table->integer('branch_id');
            $table->integer('company_owned_price_id');
            $table->integer('franchise_price_id');
            $table->integer('joint_venture_price_id');
            $table->integer('minimum_purchase_uom_id');
            $table->integer('selling_uom_id');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
