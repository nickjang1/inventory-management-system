<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('created_by', 255);
            $table->string('modified_by', 255);
            $table->string('description', 50);
            $table->string('code', 30);
            $table->boolean('status');
            $table->integer('store_type_id');
            $table->string('contact_person', 100);
            $table->string('contact_number', 100);
            $table->string('email', 50);
            $table->integer('manager_id');
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
        Schema::dropIfExists('stores');
    }
}
