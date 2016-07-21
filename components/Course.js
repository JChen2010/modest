var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

import Calendar from '../src/Calendar';
import Week from '../src/Week';
import Month from '../src/Month';

var LessonsList = require('../components/LessonsList');
var TasksList = require('../components/TasksList');

function Course (props) {
  return (
    
    <div className="main-container">
        <div className="nav">
            {/*Corse name*/}
            <div className="panel panel-default bg-info">
                <div className="panel-body text-center nav-header">
                    Course: <strong>Reading</strong> 
                </div>
            </div>
            {/*Progress*/}
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}>
                    Completed: <strong>60%</strong>
                </div>
            </div>
            {/*Lessons list*/}
            <LessonsList 
                current_lesson={props.current_lesson}
                handleChangeLesson={props.handleChangeLesson}
                handleNextLesson={props.handleNextLesson}
                course={props.course}
                altLessonsIndex={props.altLessonsIndex}
            />
            {/*Calendar*/}
            <div className="panel panel-default bg-info">
                <Calendar 
                    weekNumbers={true}
                    startDate={props.date}
                    date={props.date}
                    endDate={props.date.clone().add(0, 'month')}
                    mods={props.start_mods.concat(props.task_mods)} 
                />
            </div>
        </div>

        {/*Current tasks*/}
        <TasksList
            lesson={props.course[props.current_lesson][props.altLessonsIndex[props.current_lesson]][1]}
            lessonName={props.course[props.current_lesson][props.altLessonsIndex[props.current_lesson]][0]}
            handleTaskComplete={props.handleTaskComplete}
<<<<<<< HEAD

=======
            currentLessonNumber={props.current_lesson}
>>>>>>> 9de6c836206e8fca376a6b21c2cd23aac887b487
        />
    </div>
  )
}

Course.propTypes = {
    current_lesson: PropTypes.number.isRequired,
    handleChangeLesson: PropTypes.func.isRequired,
    handleNextLesson: PropTypes.func.isRequired,
    course: PropTypes.array.isRequired,
    courseNum: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    handleTaskComplete: PropTypes.func.isRequired,
    altLessonsIndex: PropTypes.array.isRequired
}

module.exports = Course;