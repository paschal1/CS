import{ useState } from'react'
import './style/courses.css'
import axiosClient from 'axios'

const AddCourses = () => {

  const [selected, setSelected] = useState('')
  const [course, setCourse] = useState({
    course_name: "",
    course_code: "",
    level_id: "",
  });


  const HandleCourse = (event) => {
    event.preventDefault();

    axiosClient.post('/course', {
      course_title: 'Enterpreneuer',
      course_name: 'GES 400',
      selected: 'level 100',
    })

  }

  const selectedOption = (e) => {
    setSelected(e.target.value)
  }
  return (
    <div className="courseMain">
      <div className="courseCard">
        <h2 className="description">Add Courses</h2>
        <hr/>
        <form className="courseform" action='#' method='POST' onSubmit={HandleCourse}>
          <label className="levelLabel">
            <div  className="courseStyle">
              Select level:
            </div >
          </label>
          <select id="Drop-Down" value={selected} className="courseLevel" name="course-level" onChange={selectedOption}>
            <option value="default">Choose a Level</option>
            <option value="option1">Level 1</option>
            <option value="option2">Level 2</option>
            <option value="option3">Level 3</option>
            <option value="option4">Level 4</option>
          </select>

          <label>
            <div className="courseStyle">
              Course:
            </div>
          </label>
          <div className="courseInputTab">
            <input className="courseInput" type='text' placeholder="Enter course name" name="course-input"/>
          </div>
          <button className="btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddCourses
