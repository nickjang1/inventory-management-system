<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use Illuminate\Support\Facades\Hash;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('password', 100);
            $table->boolean('is_superuser');
            $table->string('username')->unique();
            $table->string('first_name', 30);
            $table->string('last_name', 150);
            $table->string('email')->unique();
            $table->boolean('is_staff');
            $table->boolean('is_active');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::table('users')->insert(
            array(
                'password' => Hash::make('123456'),
                'email' => 'superadmin@gmail.com',
                'username' => 'admin',
                'first_name' => 'super',
                'last_name' => 'admin',
                'is_superuser' => 1,
                'is_staff' => 1,
                'is_active' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
