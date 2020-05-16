<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('created_by', 255);
            $table->string('modified_by', 255);
            $table->string('name', 50);
            $table->string('address', 200);
            $table->string('contact_number_1', 15);
            $table->string('contact_number_2', 15);
            $table->string('email_1', 30);
            $table->string('email_2', 30);
            $table->string('company_code', 30);
            $table->boolean('vat_status');
            $table->boolean('status');
            $table->integer('contact_person_id');
            $table->integer('role_id');
            
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
