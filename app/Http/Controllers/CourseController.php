<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\Course as ResourcesCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Str;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return ResourcesCourse::collection(
            Course::where('student_id', $user->id)->orderBy('created_at', 'desc')->paginate(10)
        // return Course::all();
        );
    }

    // /**
    //  * Show the form for creating a new resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCourseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->validated();
//check if image was given and save to the local storage
        // if(isset($data['image'])){
        //     $relativePath = $this->saveImage($data['image']);
        //     $data['image'] = $relativePath;
        // }

        $course = Course::create($data);

        // foreach ($data['exams'] as $exams){
        //     $exams['course_id'] = $course->id;
        //     $this->createExam($exams);
        // }

        return new ResourcesCourse($course);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course, Request $request)
    {
         $user = $request->user();
         if($user->id !== $course->student_id){
            return abort(403, 'Unauthorized action');
         }

         return new ResourcesCourse($course);
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  \App\Models\Course  $course
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit(Course $course)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCourseRequest  $request
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCourseRequest $request, Course $course, $data)
    {

        //check if image was given and save to the local storage
        // if(isset($data['image'])){
        //     $relativePath = $this->saveImage($data['image']);
        //     $data['image'] = $relativePath;
        // }
        // if($course->image){
        //     $absolutePath = public_path($course->image);
        //     File::delete($absolutePath);
        // }
//update course in the database
        // $course->update($data);

        //get ids as plan array of existing course
        $existingIds = $course->courses()->pluck('id')->toArray();
        // get ids as plan array of new courses
        $newIds = Arr::pluck($data['courses'], 'id');
        //find courses to delete
        $toDelete = array_diff($existingIds, $newIds);

        // find courses to add
        $toAdd = array_diff($newIds, $existingIds);
            // Delete courses by $toDelete array
        Course::destroy($toDelete);

            foreach($data['courses'] as $course){
                if(in_array($course['id'], $toAdd)){
                    $course['course_id'] = $course->id;
                    $this->createCourse($course);
                }
            }

            // update existing course
            $courseMap = collect($data['courses'])->keyBy('id');
            foreach($course->courses as $course){
                if(isset($courseMap[$course->id])){
                    $this->updateCourse($course, $courseMap[$course->id]);
                }
            }

            return new ResourcesCourse($course);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course, Request $request)
    {

        // use this code in case where a user must be authorized to be able to delete a course
        // $user = $request->user();
        // if($user->id !== $course->user_id){
        //     return abort(403, 'Unauthorized action.');
        // }

        $course->delete();

        // if image is avaliable uncomment and use this code below

        // if($course->image){
        //     $absolutePath = public_path($course->image);
        //     File::delete($absolutePath);
        // }

        return response('', 204);
    }

    /**
     * Save image in local file system and return saved image path
     *
     * @param $image
     * @throws \Exception
     * @author Paschal Nwokeocha CSC project
     */

     // use this function to save an image to the database call on your store function when an image is avaliable

    //  private function saveImage($image){
    //     // check if image is valid based 64 .string
    //     if(preg_match('/^data:image\/(\w+);base64,/',$image,$type)){
    //         $image = substr($image, strpos($image, ',')+ 1);
    //         $type = strtolower($type[1]); //jpg, gif, png
    //         //check if file is an image
    //         if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])){
    //             throw new \Exception('invalid image type');
    //         }
    //         $image = str_replace(' ', '+', $image);
    //         $image  = base64_decode(
    //             $image
    //         );
    //         if($image === false){
    //             throw new \Exception('base64_decode failed');
    //         }else{
    //             throw new \Exception('did not match data URL with image data');
    //         }
    //     }

    //     $dir = 'images/';
    //     $file = Str::random(). '.' . $type;
    //     $absolutePath = public_path($dir);
    //     $relativePath = $dir . $file;
    //     if(!File::exists($absolutePath)){
    //         File::makeDirectory($absolutePath, 0755, true);
    //     }
    //     file_put_contents($relativePath, $image);
    //     return $relativePath;
    //  }

     private function createCourse($data){
        if(is_array($data['data'])){
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'data' => 'present',
            'course_name' => 'required',
            'course_id' => 'required',
            'course_code' => 'required'
        ]);
        return Course::create($validator->validated());
     }

     private function updateCourse(Course $course, $data){
        if(is_array($data['data'])){
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\Course,id',
             'course_name' => 'required',
            'course_code' => 'required'

        ]);
        return $course->update($validator->validated());
     }
}
