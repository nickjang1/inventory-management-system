<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('created_by', 255);
            $table->string('modified_by', 255);
            $table->integer('order_id');
            $table->string('payment_type', 30);
            $table->dateTime('transaction_date');
            $table->dateTime('target_posting_date');
            $table->dateTime('actual_posting_date');
            $table->boolean('cheque_no');
            $table->string('bank_name', 50);
            $table->double('paid_amount', 10, 2);
            $table->string('payment_status', 50);
            $table->boolean('active');
            $table->integer('branch_id');
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
        Schema::dropIfExists('order_payments');
    }
}
