<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $course = $this->route('course');
        
        if($this->user()->id !== $course->student_id){
            return false;
        }

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
            'student_id' => 'exists:users,id',
            'level_id' => 'exists:users,id',
            'course_name' => 'required',
            'course_code' => 'required'
        ];
    }
}
