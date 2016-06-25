import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './src/Calendar';
import Week from './src/Week';
import Month from './src/Month';
require('./less/bootstrap-theme.less');

/*
const TestComponent = React.createClass({
  getInitialState: function() {
      return {value: 'Hello!'};
  },
});*/

//Build guide list output
function outputGuides (A) {
  var guideList = "<b>#</b> | <b>Title</b><br>";
  for (var i = 0; i < A.length; i++) {
    guideList = guideList.concat(`${i + 1} : ` + A[i][0] + "<br>");
  }
  return guideList;
}

//Build task list output
function outputTasks (A) {
  var taskList = "";
  for (var i = 0; i < A.length; i++) {
    taskList = taskList.concat(`Task ${i + 1}: ` + A[i][0] + "<br>" + A[i][1] + "<br><br>");
  }
  return taskList;
}

//Build daily task list output
function outputTasksDay (A) {
  var taskList = "";
  for (var i = 0; i < A.length; i++) {
    taskList = taskList.concat(`Task: ` + A[i][0] + "<br>" + A[i][1] + "<br><br>");
  }
  return taskList;
}

const PagingCalendar = React.createClass({
  getInitialState: function () {
    return {
      date: moment().startOf('month'),
      task_title: '',
      task_details: '',
      guide_title: '',
      guide_number: '',
      title_submit: '',
      details_submit: '',
      guide_submit: '',
      number_submit: '',
      guide_tasks: '',
      guides: [],
      tasks: [],
      added_guides: new Array(107), //********
      mods: [
        {
            date: moment(),
            classNames: [ 'current' ],
            component: [ 'week' ]
          },
        /* Template for adding events
        {
          date: moment().add(10, 'days'),
          classNames: [ 'event', 'warning' ],
          component: [ 'day' ],
          events: {
            onClick: (date, e) => alert(`${date.format('dddd')}'s event!`)
          }
        },*/
        {
          component: 'day',
          events: {
            onClick: (date, e) => alert("Empty")
          }
        }
      ]
    };
  },

  handleTitleChange: function(e) {
    this.setState({task_title: e.target.value});
  },

  handleDetailsChange: function(e) {
    this.setState({
      task_details: e.target.value});
  },

  handleGuideChange: function(e) {
    this.setState({guide_title: e.target.value});
  },

  handleNumberChange: function(e) {
    this.setState({guide_number: e.target.value});
  },

  handlePrevMonth: function (e) {
    e.preventDefault();
    this.setState({
      date: this.state.date.clone().subtract(1, 'month')
    });
  },

  handleNextMonth: function (e) {
    e.preventDefault();
    this.setState({
      date: this.state.date.clone().add(1, 'month')
    });
  },

  handleTaskSubmit: function(e) {
    e.preventDefault();
    var task_title = this.state.task_title.trim();
    var task_details = this.state.task_details.trim();
    if (!task_details && !task_title) {
      return;
    }

    this.setState({title_submit: task_title, details_submit: task_details});
    this.setState({task_title: '', task_details: ''});
    this.state.tasks.push([task_title, task_details]);
    alert("Task Added!");
  },

  handleGuideSubmit: function(e) {
    e.preventDefault();
    var guide_title = this.state.guide_title.trim();
    if (!guide_title) {
      return;
    }
    this.setState({guide_submit: guide_title});
    this.setState({guide_title: ''});
    this.state.guides.push([guide_title, this.state.tasks]);
    this.setState({tasks: []});
    alert("Guide Submitted!");
  },

  handleViewTasks: function(e) {
    e.preventDefault();
    var num = parseInt(this.state.guide_number.trim());
    if (!(num > 0 && num <= this.state.guides.length 
      && Number.isInteger(num))) {
      return;
    }
    var tasks = outputTasks(this.state.guides[num - 1][1])
    tasks = tasks.replace(/<br>/g, '\n');
    alert(tasks);
  },

  handleAddGuide: function(e) {
    e.preventDefault();
    var num = parseInt(this.state.guide_number.trim());
    if (!(num > 0 && num <= this.state.guides.length 
      && Number.isInteger(num))) {
      return;
    }
    var guides = this.state.guides;
    var newGuides = this.state.added_guides;
    var size = 107; //***FIX HARDCODE****
    //var size = guides[num - 1][1].length
    //********
    /*
    for (var i = 0; i < size; i++) {
      if(newGuides[i]) {
        newGuides[i].push(guides[num - 1][1][i]);
      }
      else {
        newGuides[i] = [guides[num - 1][1][i]]
      }
    }*///*******
    var dayNum = 0;
    for (var i = 0; i < size; i++) {
      if(!(newGuides[i])){
        newGuides[i] = [guides[num - 1][1], guides[num - 1][1]]
        dayNum = i;
        i = size;
      }
    }
    var newMods = this.state.mods;
    this.setState({added_guides: newGuides});

    //Apply new guide to calendar
    var tasks1 = outputTasks(newGuides[dayNum][1]);
    tasks1 = tasks1.replace(/<br>/g, '\n');
    console.log(tasks1);
    newMods.push(
      {
        date: moment().add(dayNum, 'days'),
        classNames: [ 'event', 'warning' ],
        component: [ 'day' ],
        events: {
          onClick: () => alert(tasks1)
          //(guide_tasks) => alert(`${guide_tasks}`)
        }
    });

    /*
    for (var i = 0; i < size; i++) {
      var tasks1 = outputTasks(newGuides[i])
      tasks1 = tasks1.replace(/<br>/g, '\n');
      this.setState({guide_tasks: tasks1});
      console.log(tasks1);
      console.log(this.state.guide_tasks);
      newMods.push(
      {
        date: moment().add(i, 'days'),
        classNames: [ 'event', 'warning' ],
        component: [ 'day' ],
        events: {
          onClick: () => alert(tasks1)
          //(guide_tasks) => alert(`${guide_tasks}`)
        }
      });
    }*/
    this.setState({mods: newMods, added_guides: newGuides});
    alert("Guide Added!");
  },


  render: function () {
    return (
      <div>
        {/*----- Guide Entry -----*/}
        <br></br>
        <b>Guide Input</b>
        <hr></hr>

        {/*----- Task Submission -----*/}
        <form onSubmit={this.handleTaskSubmit}>
          <div>Task Title: </div>
          <input
            className="clear1"
            type="text"
            task_title={this.state.task_title}
            onChange={this.handleTitleChange}
          />
          <br></br><br></br>
          <div>Task Details: </div> 
          <textarea
            className="clear2"
            task_details={this.state.task_details}
            onChange={this.handleDetailsChange} 
            rows="3"
            cols="50"
            style={{overflow: 'auto', resize: 'none'}}
          /><br></br><br></br>
          <input type="submit" value="Add Task"/>
        </form><br></br>

        {/*----- Guide Submission -----*/}
        <p>Current Guide:</p>
        <p className="box"
          dangerouslySetInnerHTML={{__html: outputTasks(this.state.tasks)}} />
        <form onSubmit={this.handleGuideSubmit}> 
          <div>Guide Title: </div>
          <input
            type="text"
            guide_title={this.state.guide_title}
            onChange={this.handleGuideChange}
          /><br></br><br></br>
          <input type="submit" value="Submit Guide"/>
        </form><br></br><br></br>

        {/*----- Schedule -----*/}
        <b>Schedule</b>
        <hr></hr>
        <a href="#" className="prevMonth" onClick={this.handlePrevMonth} >
          Prev Month
        </a>
        <a href="#" className="nextMonth" onClick={this.handleNextMonth} >
          Next Month
        </a>
        <Calendar 
            weekNumbers={ true }
            startDate={ this.state.date }
            date={ this.state.date }
            endDate={ this.state.date.clone().add(3, 'month') }
            mods={ this.state.mods
            /*
            [
              {
                date: moment(),
                classNames: [ 'current' ],
                component: [ 'week' ]
              },
              {
                startDate: moment().add(3, 'days'),
                endDate: moment().add(7, 'days'),
                classNames: [ 'longEvent' ],
                component: [ 'day' ]
              },
              {
                date: moment().add(3, 'days'),
                classNames: [ 'appointment' ],
                component: [ 'day' ]
              },
              {
                date: moment().add(10, 'days'),
                classNames: [ 'event', 'warning' ],
                component: [ 'day' ],
                events: {
                  onClick: (date, e) => alert(`${date.format('dddd')}'s event!`)
                }
              },
              {
                date: moment().add(5, 'days'),
                classNames: [ 'event' ],
                component: [ 'day' ]
              },
              {
                component: 'day',
                events: {
                  onClick: (date, e) => alert("Task: \n" + this.state.title_submit + "\n\nDetails:\n" + this.state.details_submit)
                }
              }
            ]*/
          } /><br></br>
        {/*Guide List*/}
        <p><b>Available Guides:</b></p>
        <p className="box1"
          dangerouslySetInnerHTML={{__html: outputGuides(this.state.guides)}} />

        {/*Guide Options*/}
        Guide #:&nbsp;
        <input
          style={{width: '50px'}}
          type="text"
          guide_number={this.state.guide_number}
          onChange={this.handleNumberChange}
        /> 
        <form onSubmit={this.handleViewTasks}>
          <input
              type="submit"
              value="View Tasks"/>
        </form>
        <form onSubmit={this.handleAddGuide}>
          <input
              type="submit"
              value="Add Guide "/>
        </form>

        {/*Reset Button*/}
        <br></br><form onSubmit={this.clear}>
          <input 
            type="submit"
            value="Reset"/>
        </form><br></br>

      </div>
    );
  }
});

ReactDOM.render(
  <PagingCalendar />,
  document.getElementById('app')
);
