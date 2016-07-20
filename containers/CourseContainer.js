import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from '../src/Calendar';
import Week from '../src/Week';
import Month from '../src/Month';

import Guides from '../components/GuideCreate';
import History from '../components/History';
import GuideOptions from '../components/GuideOptions';
import Popup from '../components/Popup';

var Course = require('../components/Course');

require('../less/bootstrap-theme.less');
var testData = require('../data/Course1.js');


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
  var taskList = "<b>Daily Tasks</b><br><br>";
  for (var i = 0; i < A.length; i++) {
    var tasks = A[i][1][1];
    tasks = tasks.replace(/\n/g, '<br>');
    taskList = taskList.concat(`<b>Task ${i + 1}:</b>` + "<br>Lesson: <b>" + A[i][0] + "</b><br>" +
                                "  Task: <b>" + A[i][1][0] + "</b><br>" +
                                "  Instructions: <br>" + tasks + "<br><br>");
  }
  return taskList;
}

const CourseContainer = React.createClass({
  getInitialState: function () {
    return {
      date: moment().startOf('month'),
      guide_number: "1",
      number_submit: "",
      guide_tasks: "",
      added_guides: [], //********

      task_title: "",
      task_details: "",
      tasks: [],
      available_tasks: [],

      title_submit: "",
      details_submit: "",

      guide_title: "",
      guide_submit: "",
      guides: testData,

      isPoppedup: false,
      currentPopup: <div></div>,

      history: [],
      task_number: "",

      view: 1,

      swap1: "",
      swap2: "",

      start_mods: [
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
            onClick: (date, e) => {
              var message = date.format('D');
              this.setState({currentPopup: 
                (<Popup url='popup.html' 
                        title='Daily Tasks' 
                        onClosing={this.popupClosed}>
                  <div>Empty</div>
                </Popup>),
                isPoppedup: true
              });
            }
          }
        },*/
        {
          component: 'day',
          events: {
            onClick: (date, e) => {
              var message = parseInt(date.format('D')) + 5;
              this.setState({currentPopup: 
                (<Popup url='popup.html' 
                        title='Daily Tasks' 
                        onClosing={this.popupClosed}>
                  <div>Empty</div>
                </Popup>),
                isPoppedup: true
              });
            }
          }
        }
      ],

      task_mods: []
    };
  },

  popupClosed: function() {
    this.setState({isPoppedup: false});
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

  handleNumberChange: function(value) {
    this.setState({guide_number: value});
  },

  handleTaskNumberChange: function(e) {
    this.setState({task_number: e.target.value});
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
    this.state.available_tasks.push([task_title, task_details]);
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

  handleViewTasks: function(guide_number) {

    var guides = this.state.guides;
    var num = parseInt(guide_number.trim());
    if (!(num > 0 && num <= this.state.guides.length
      && Number.isInteger(num))) {
      return;
    }
    var tasks = outputTasks(this.state.guides[num - 1][1])
    tasks = tasks.replace(/<br>/g, '\n');
    alert(tasks);
  },

  handleSwap1: function(e) {
    this.setState({swap1: e.target.value})
  },

  handleSwap2: function(e) {
    this.setState({swap2: e.target.value});
  },

  handleSwap: function(e) {
    var swappedTask = this.state.guides;
    swappedTask[this.state.guide_number - 1][1][this.state.swap1 - 1] = 
    this.state.available_tasks[this.state.swap2 - 1];
    this.setState({guides: swappedTask, isPoppedup: false});
    alert("Swap complete!");
  },

  handleEditGuide: function(guide_number) {
    this.setState({currentPopup: 
      (<Popup url='popup.html' 
              title='Lesson Edit' 
              onClosing={this.popupClosed}
              id="container">
              {/*options={{height: '800px', width: '600px'}}*/}
        <div>
          <p>Current Lesson: { this.state.guides[guide_number - 1][0] }</p>
          <p className="box"
            dangerouslySetInnerHTML={{__html: 
              outputTasks(this.state.guides[guide_number - 1][1])}} />
          <p>Available Tasks:</p>
          <p className="box"
            dangerouslySetInnerHTML={{__html: 
              outputTasks(this.state.available_tasks)}} />
          {/*Swap*/}
          <form onSubmit={this.handleSwap}> 
            <div>Replace task #: </div>
            <input
              type="text"
              swap1={this.state.swap1}
              onChange={this.handleSwap1}
            />
            <div>with:</div>
            <input
              type="text"
              swap2={this.state.swap2}
              onChange={this.handleSwap2}
            />
            <input type="submit" value="Swap"/>
          </form>
        </div>
      </Popup>),
      isPoppedup: true
    });
  },

  handleAddGuide: function(guide_number) {

    var num = parseInt(guide_number.trim());
    if (!(num > 0 && num <= this.state.guides.length 
      && Number.isInteger(num))) {
      return;
    }
    var guides = this.state.guides;
    var newGuides = this.state.added_guides;

    var size = this.state.guides[num - 1][1].length
    for (var i = 0; i < size; i++) {
      if (newGuides[i]){
      //Fix later: newGuides[parseInt(moment().format('D')) + i].push(
      //  [guides[num - 1][0] ,guides[num - 1][1][i]]);
      newGuides[i].push([this.state.guides[num - 1][0] , this.state.guides[num - 1][1][i]]);
      }
      else{
        newGuides[i] = [[this.state.guides[num - 1][0] , this.state.guides[num - 1][1][i]]];
      }
    }
    this.setState({added_guides: newGuides});

    //Apply new guide to calendar
    var newMods = [];
    for (var i = 0; i < newGuides.length; i++) {
      this.pushMods(i, newGuides, newMods);
    }
    alert("Guide Added!");
  },

  pushMods: function(i, newGuides, newMods) {
    var modOutput = outputTasksDay(newGuides[i]);
    var modIndex = newMods.slice().length + 1;
    newMods.push(
    {
      date: moment().add(i, 'days'),
      classNames: [ 'event', 'warning', modOutput, moment().add(i, 'days').format('D')],
      component: [ 'day' ],
      events: {
        onClick: () => {
            this.setState({currentPopup: 
              (<Popup url='popup.html' 
                      title='Daily Tasks' 
                      onClosing={this.popupClosed}
                      id="container">
                <div>
                  <div dangerouslySetInnerHTML={{__html: modOutput}}/>
                  <br></br>
                  Task Number:&nbsp;
                    <input
                      style={{width: '50px'}}
                      type="text"
                      task_number={this.state.task_number}
                      onChange={this.handleTaskNumberChange}
                    />
                    <form onClick={this.handleFail.bind(this, i)}>
                      <input
                          type="button"
                          value="&#10006;"/>
                    </form>
                    <form onClick={this.handleSuccess.bind(this, i)}>
                      <input
                          type="button"
                          value="&#10004;"/>
                    </form>
                </div>
              </Popup>),
              isPoppedup: true
            });
          }
        //(guide_tasks) => alert(`${guide_tasks}`)
      }
    });
    this.setState({task_mods: newMods});
  },

  handleFail: function(i, e) {
    var num = parseInt(this.state.task_number.trim());
    if (!(num > 0 && num <= this.state.added_guides[i].length 
      && Number.isInteger(num))) {
      return;
    }
    var newHistory = this.state.history;
    newHistory.push("Failed task: <b>" + 
      this.state.added_guides[i][this.state.task_number - 1][1][0] + 
      "</b> from Lesson: <b>" + this.state.added_guides[i][this.state.task_number - 1][0]
      + "</b> on " + moment().add(i, 'days').format('YYYY-MM-DD'));
    this.setState({history: newHistory});
  },

  handleSuccess: function(i, e) {
    var num = parseInt(this.state.task_number.trim());
    if (!(num > 0 && num <= this.state.added_guides[i].length 
      && Number.isInteger(num))) {
      return;
    }
    var newHistory = this.state.history;
    newHistory.push("Completed task: <b>" + 
      this.state.added_guides[i][this.state.task_number - 1][1][0] + 
      "</b> from Lesson: <b>" + this.state.added_guides[i][this.state.task_number - 1][0]
      + "</b> on " + moment().add(i, 'days').format('YYYY-MM-DD'));
    this.setState({history: newHistory});
  },

  viewSchedule: function(e) {
    this.setState({view: 1});
  },

  viewGuideInput: function(e) {
    this.setState({view: 0});
  },

  handleChangeLesson: function(e) {
    var index = e.target.getAttribute('data-index'); 
    alert(index);
    this.setState({
      guide_number: index
    });
  },

  
  render: function () {
    var popup = "";
    if (this.state.isPoppedup){
      popup = this.state.currentPopup;
    }

    if(this.state.view == 0){
      return (
        <div>
          
          <br></br>
          <form onClick={this.viewSchedule}>
            <input
                type="button"
                value="Go to schedule"/>
          </form>
          
          <Guides 
            task_title={ this.state.task_title }
            task_details={ this.state.task_details }
            tasks={ this.state.tasks }
            available_tasks= { this.state.available_tasks }

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
          
          {/*Reset Button*/}
          <br></br>
          <form onSubmit={this.clear}>
            <input 
              type="submit"
              value="Reset"/>
          </form>
          <br></br>
        
        </div>
      )
    }

    else {
      return (
        <div>
          <Course 
            date={this.state.date}
            start_mods={this.state.start_mods}
            task_mods={this.state.task_mods}
            current_lesson={parseInt(this.state.guide_number.trim())}
            handleChangeLesson={this.handleChangeLesson}

          />
          
        {/*Old UI*/}
          <br></br>
          <form onClick={this.viewGuideInput}>
            <input
                type="button"
                value="Go to lesson planning"/>
          </form>
          <br></br>
          
          {/*----- Schedule -----*/}
          <b>Schedule</b>
          <hr></hr>
          <Calendar 
              weekNumbers={ true }
              startDate={ this.state.date }
              date={ this.state.date }
              endDate={ this.state.date.clone().add(0, 'month') }
              mods={this.state.start_mods.concat(this.state.task_mods)
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
              } 
          />

          <br></br>

          {/*Guide List*/}
          <p><b>Available Lessons:</b></p>
          <p className="box1"
            dangerouslySetInnerHTML={{__html: outputGuides(this.state.guides)}} />

          {/*Guide Options*/}
          <GuideOptions
            guide_number={ this.state.guide_number }

            handleVT={ this.handleViewTasks } //task submit
            handleAG={ this.handleAddGuide } //guide submit
            handleEG={ this.handleEditGuide } //guide submit

            handleNC = { this.handleNumberChange } //task title change
          />

          {/*History*/}
          <History
            history={ this.state.history }
          />

          <div>{popup}</div>
          {/*Reset Button*/}
          <br></br><form onSubmit={this.clear}>
            <input 
              type="submit"
              value="Reset"/>
          </form><br></br>
        </div>
      );
    }
  }
});

module.exports = CourseContainer;