<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderSummaryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_summary', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('created_by', 255);
            $table->string('modified_by', 255);
            $table->integer('order_id');
            $table->dateTime('order_date');
            $table->dateTime('expiration_date');
            $table->double('total_cost', 10, 2);
            $table->double('total_payment', 10, 2);
            $table->string('status', 30);
            $table->boolean('active');
            $table->integer('branch_id');
            $table->integer('customer_id');
            $table->integer('customer_company_id');
            $table->integer('salesperson_id');
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
        Schema::dropIfExists('order_summary');
    }
}
