<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('levels', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class, 'student_id');
            $table->foreignIdFor(\App\Models\Course::class, 'course_id');
            $table->string('level_1',255);
            $table->string('level_2',255);
            $table->string('level_3',255);
            $table->string('level_4',255);
            $table->timestamps();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('levels');
    }
};
