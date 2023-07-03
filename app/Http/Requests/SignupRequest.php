<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

// use Illuminate\Support\Facades\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'mat_no' => 'required|unique:users,mat_no|max:13',
            'entry_year' => 'required',
            'password' => 'required','confirmed',
            Password::min(size:8)->letters()->symbols()

        ];
    }
}
