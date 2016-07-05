import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './src/Calendar';
import Week from './src/Week';
import Month from './src/Month';

import Guides from './src/Guides';

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

const Prototype = React.createClass({
  getInitialState: function () {
    return {
      date: moment().startOf('month'),
      guide_number: "",
      number_submit: "",
      guide_tasks: "",
      added_guides: new Array(107), //********

      task_title: "",
      task_details: "",
      tasks: [],

      title_submit: "",
      details_submit: "",

      guide_title: "",
      guide_submit: "",
      guides: [],

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

  handleTitleChange: function(value) {
    this.setState({task_title: value});
  },

  handleDetailsChange: function(value) {
    this.setState({task_details: value});
  },

  handleGuideChange: function(value) {
    this.setState({guide_title: value});
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

  handleTaskSubmit: function(task_title, task_details) {

    if (!task_details && !task_title) {
      return;
    }

    this.setState({title_submit: task_title, details_submit: task_details});
    this.setState({task_title: '', task_details: ''});
    this.state.tasks.push([task_title, task_details]);
    alert("Task Added!");
  },

  handleGuideSubmit: function(guide_title, tasks) {

    if (!guide_title) {
      return;
    }

    this.setState({guide_submit: guide_title});
    this.setState({guide_title: ''});
    this.state.guides.push([guide_title, tasks]);
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
        <Guides 
          task_title={ this.state.task_title }
          task_details={ this.state.task_details }
          tasks={ this.state.tasks }

          title_submit={ this.state.title_submit }
          details_submit={ this.state.details_submit }

          guide_title={ this.state.guide_title }
          guide_submit={ this.state.guide_submit }
          guides={ this.state.guides }

          handleTS={ this.handleTaskSubmit } //task submit
          handleGS={ this.handleGuideSubmit } //guide submit

          handleTC={ this.handleTitleChange } //task title change
          handleDC={ this.handleDetailsChange } //task change
          handleGC={ this.handleGuideChange } //guide title change
        />

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
  <Prototype />,
  document.getElementById('app')
);
