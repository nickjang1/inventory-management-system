<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PasswordReset extends Model
{
    //
    protected $fillable = [
        'email', 'token'
    ];

    protected $primaryKey = 'email';
    public $incrementing = false;

    public $timestamps = false;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->created_at = $model->freshTimestamp();
        });
    }

    public function isExpired()
    {
        return false;
        // $now = new Carbon();
        // $created_at = Carbon::createFromFormat($this->created_at, 'Y-m-d H:i:s');
        // $now->sub($created_at)
    }

    public function user()
    {
        return $this->hasOne('\App\User', 'email', 'email');
    }
}
