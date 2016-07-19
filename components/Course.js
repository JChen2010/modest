var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

import Calendar from '../src/Calendar';
import Week from '../src/Week';
import Month from '../src/Month';

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
                    Copleted: <strong>60%</strong>
                </div>
            </div>
            {/*Lessons list*/}
            <div className="list-group">
                <a className="list-group-item">
                    Lesson 1
                </a>
                <a className="list-group-item">Lesson 2</a>
                <a className="list-group-item active">Lesson 3</a>
                <a className="list-group-item">Lesson 4</a>
                <a className="list-group-item">Lesson 5</a>
            </div>
            {/*Calendar*/}
            <div className="panel panel-default bg-info">
                <Calendar 
                    weekNumbers={ true }
                    startDate={ props.date }
                    date={ props.date }
                    endDate={ props.date.clone().add(0, 'month') }
                    mods={props.start_mods.concat(props.task_mods)} 
                />
            </div>
        </div>

        {/*Current task*/}
        <div className="tasks-list">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h2 className="panel-title">Task 1</h2>
                    <h6>Time: 30 min</h6>
                </div>
                <div className="panel-body">
                    <p>Please, read everything here.</p>
                    <p>Please</p>
                </div>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h2 className="panel-title">Task 2</h2>
                    <h6>Time: 40 min</h6>
                </div>
                <div className="panel-body">
                    <p>Please, answer these questions:</p>
                    <p>Who?</p>
                    <p>What?</p>
                    <p>When?</p>
                    <p>Why?</p>
                </div>
            </div>
        </div>

    		
    </div>
  )
}

module.exports = Course;