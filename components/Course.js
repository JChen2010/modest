var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

import Calendar from '../src/Calendar';
import Week from '../src/Week';
import Month from '../src/Month';

var LessonsList = require('../components/LessonsList');
var TasksList = require('../components/TasksList');

function Course (props) {
 
  //Set progress assuming no tasks/lessons are completed out of order
  var progress = Math.round(props.current_lesson*100/props.course.length);
  var str = progress.toString().concat('%');

  return (
    <div className="main-container">
        <div className="nav">
            {/*Course name*/}
            <div className="panel panel-default bg-info">
                <div className="panel-body text-center nav-header">
                    Course: <strong>Reading</strong> 
                </div>
            </div>
            {/*Progress*/}
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: str}}>
                    Completed: <strong>{progress}%</strong>
                </div>
            </div>
            {/*Lessons list*/}
            <LessonsList 
                handleTopRec={props.handleTopRec}
                current_lesson={props.current_lesson}
                handleChangeLesson={props.handleChangeLesson}
                handleChangeAlternative={props.handleChangeAlternative}
                course={props.course}
                altLessonsIndex={props.altLessonsIndex}
                user={props.user}
            />
        </div>

        {/*Current tasks*/}
        <TasksList
            lesson={props.course[props.current_lesson][props.altLessonsIndex[props.current_lesson]][1]}
            lessonName={props.course[props.current_lesson][props.altLessonsIndex[props.current_lesson]][0]}
            handleTaskComplete={props.handleTaskComplete}
            currentLessonNumber={props.current_lesson}
            handleLessonSwap={props.handleLessonSwap}
            altLessonsIndex={props.altLessonsIndex}
        />
    </div>
  )
}

Course.propTypes = {
    current_lesson: PropTypes.number.isRequired,
    handleChangeLesson: PropTypes.func.isRequired,
    handleChangeAlternative: PropTypes.func.isRequired,
    course: PropTypes.array.isRequired,
    courseNum: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    handleTaskComplete: PropTypes.func.isRequired,
    handleLessonSwap: PropTypes.func.isRequired,
    altLessonsIndex: PropTypes.array.isRequired,
    handleTopRec: PropTypes.func.isRequired
}

module.exports = Course;