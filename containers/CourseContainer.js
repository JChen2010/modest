// At this stage, guide entering functionality 
// will be broken due to structural changes. 
// Just work with data files for now.
// Ignore anything to do with creation creation.

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

//this course file should be selected and passed in as a prop from course selector, working with this for now
var testData = require('../data/data.js');
var userData = require('../data/user1.js');


//Build guide list output
function outputGuides (A) {
  var guideList = "<b>#</b> | <b>Title</b><br>";
  for (var i = 0; i < A.length; i++) {
    guideList = guideList.concat(`${i + 1} : ` + A[i][0][0] + "<br>");
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
  var taskList = "<b>Lesson: </b> + A[0]<br><br>";
  for (var i = 0; i < A[1].length; i++) {
    var task = A[1][i][1];
    task = task.replace(/\n/g, '<br>');
    taskList = taskList.concat(`<b>Task ${i + 1}:</b>` + "<br>Expected time: <b>" + A[1][i][2] + "</b><br>" +
                                "  Task: <b>" + A[1][i][0] + "</b><br>" +
                                "  Instructions: <br>" + task + "<br><br>");
  }
  return taskList;
}

const CourseContainer = React.createClass({
  getInitialState: function () {
    return {
      date: moment().startOf('month'),
      courseNumber: 0,  //take from props
      guide_number: parseInt(userData.courses[0].currentLessonNumber), //0 - courseNumber - take from props
      number_submit: "",
      guide_tasks: "",

      task_title: "",
      task_details: "",
      tasks: [],

      title_submit: "",
      details_submit: "",

      guide_title: "",
      guide_submit: "",

      //In this version, treat as an immutable set of lessons in the course.
      guides: testData,

      user: userData,


      //Deprecated - alternate lessons instead stored in data
      //available_tasks: "",

      //Deprecated - all guides (lessons) in a course will be
      //automatically added => guides = added_guides.
      //added_guides: [],

      isPoppedup: false,
      currentPopup: <div></div>,
      altLessonsIndex: [],
      first: true, //for initialization purposes

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
        /* Template for adding events*/
        {
          date: moment().add(0, 'days'),
          classNames: [ 'event', 'warning' ],
          component: [ 'day' ],
        },
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
    //this.state.available_tasks.push([task_title, task_details]);
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
    var tasks = outputTasks(this.state.guides[num - 1][0][1])
    tasks = tasks.replace(/<br>/g, '\n');
    alert(tasks);
  },

  //***written to work with new structure***
  //when you click on the guide you want to swap, have that button trigger this function
  //i is the index of the lesson you wish to make the swap in, and j is the index of the alternate lesson
  //I am expecting this to work by passing in the appropriate indices when an alternate lesson is selected
  /*
    For example, for the data in Course2, calling handleLessonSwap(0, 1) will change the default lesson from
    "Case Studies 1 - Reading" to "Case Studies 1 - Video".
  */
  //change the function prototype to whatever you need, but need to have i, j refer to the appropriate indices.
  handleLessonSwap: function() {
    var i = this.state.guide_number;
    var j = this.state.altLessonsIndex[i]
    var newGuides = this.state.guides;
    var tempLesson = this.state.guides[i][0];
    newGuides[i][0] = newGuides[i][j];
    newGuides[i][j] = tempLesson;
    var tempIndex = this.state.altLessonsIndex;
    tempIndex[i] = 0;

    var newUser = this.state.user;
    var temp_rec = newUser.courses[this.state.courseNumber].recs[i][0];
    newUser.courses[this.state.courseNumber].recs[i][0] = newUser.courses[this.state.courseNumber].recs[i][j];
    newUser.courses[this.state.courseNumber].recs[i][j] = temp_rec;

    this.setState({guides: newGuides, altLessonsIndex: tempIndex, user: newUser});
  },

  //
  handleTopRec: function() {
    var temp = this.state.altLessonsIndex;
    var rec_array = this.state.user.courses[this.state.courseNumber].recs[this.state.guide_number];
    var max_index = 0;
    for (var i = 0; i < rec_array.length; i++) {
      if(rec_array[i] > rec_array[max_index]){
        max_index = i;
      }
    }
    temp[this.state.guide_number] = max_index;
    this.setState({altLessonsIndex: temp});
    this.handleLessonSwap;
  },


  //Deprecated function - do not use (new edit functionality will be for lessons overall)
  handleEditGuide: function(guide_number) {
    this.setState({currentPopup: 
      (<Popup url='popup.html' 
              title='Lesson Edit'
              onClosing={this.popupClosed}
              id="container">
              {/*options={{height: '800px', width: '600px'}}*/}
        <div>
          <p>Current Lesson: { this.state.guides[guide_number - 1][0][0] }</p>
          <p className="box"
            dangerouslySetInnerHTML={{__html: 
              outputTasks(this.state.guides[guide_number - 1][0][1])}} />
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

  // Add every guide in the course to the calendar. Call at every render for demo to account for Lesson swaps.
  // This local version of guides will 
  addCourse: function() {
      for (var i = 0; i < guides.length; i++) {
          this.addGuide(i);
      }
  },

  addGuide: function(guide_number) {
    var guides = this.state.guides;
    var newGuides = this.state.added_guides;
    var size = guides.length;
    var dayNum = 0;
    for (var i = 0; i < size; i++) {
      if(!(newGuides[i])){
        newGuides[i] = [guides[num - 1]]
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
    this.setState({mods: newMods, added_guides: newGuides});
    alert("Guide Added!");
  },

  //Deprecated - since we are going with one lesson per day instead
  /*
  handleAddGuide: function(guide_number) {

    var num = parseInt(guide_number.trim());
    if (!(num > 0 && num <= this.state.guides.length 
      && Number.isInteger(num))) {
      return;
    }
    var guides = this.state.guides;
    var newGuides = this.state.added_guides;

    var size = this.state.guides[num - 1][0][1].length
    for (var i = 0; i < size; i++) {
      if (newGuides[i]){
      //Fix later: newGuides[parseInt(moment().format('D')) + i].push(
      //  [guides[num - 1][0] ,guides[num - 1][1][i]]);
      newGuides[i].push([this.state.guides[num - 1][0][0] , this.state.guides[num - 1][0][1][i]]);
      }
      else{
        newGuides[i] = [[this.state.guides[num - 1][0][0] , this.state.guides[num - 1][0][1][i]]];
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
    var modOutput = outputTasksDay(newGuides[i][0]);
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
  },*/

  //Task incomplete button should call this function
  /*
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
  },*/

  //Task complete button should call this function
  //i = task number, result = [score, total] (pass in [] if no assessment)
  //When course added, automatically add all lessons to user data history
  //History updating broken, need to fix
  handleTaskComplete: function(i, result, e) {
    var newUser = this.state.user;
    var guides = this.state.guides;
    var cn = this.state.courseNumber;
    var currentLessonNumber = newUser.courses[cn].currentLessonNumber;
    if (newUser.courses[cn].currentTaskNumber == guides[currentLessonNumber][0][1].length){

      //Modify user history
      newUser.history[currentLessonNumber].completed = true;
      newUser.history[currentLessonNumber].date = moment();
      newUser.history[currentLessonNumber].tasks.push({
          taskNumber: i,
          date: moment(),
          result: result
      });

      //Go to next lesson
      newUser.courses[cn].currentTaskNumber = 0;
      newUser.courses[cn].currentLessonNumber++;
    }
    else
    {
      //Modify user history
      newUser.history[cn].tasks.push({
        taskNumber: i,
        date: moment(),
        result: result
      });

      //Go to next task
      newUser.courses[cn].currentTaskNumber++;
    }

    //Update local state
    this.setState({user: newUser});

    //IN FINAL VERSION, UPDATE DATABASE HERE
  },

  //Task complete button should call this function
  /*
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
  },*/

  viewSchedule: function(e) {
    this.setState({view: 1});
  },

  viewGuideInput: function(e) {
    this.setState({view: 0});
  },

  handleChangeLesson: function(e) {
    var index = e.target.getAttribute('data-index'); 
    this.setState({
      guide_number: parseInt(index)
    });
    var temp = this.state.altLessonsIndex;
    for (var i = 0; i < temp.length; i++) {
      temp[i] = 0;
    }
    this.setState({altLessonsIndex: temp});
  },

  handleNextLesson: function(e) {
    e.preventDefault();
    var index = e.target.getAttribute('data-index'); 
    //alert(index);
    var altLessonsIndexTemp = this.state.altLessonsIndex;
    if (altLessonsIndexTemp[index] < this.state.guides[index].length - 1) {
      altLessonsIndexTemp[index] += 1;
    };   
    this.setState({
      altLessonsIndex: altLessonsIndexTemp
    });
  },
  
  render: function () {

    var altLessonsIndex = this.state.altLessonsIndex;
    if(this.state.first){
      //Sorting code goes here
      for (var i = 0; i < this.state.guides.length; i++) {
        altLessonsIndex.push(0);
      }
      this.setState({first: false, altLessonsIndex: altLessonsIndex});
    }

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
            current_lesson={this.state.guide_number}
            handleChangeLesson={this.handleChangeLesson}
            handleNextLesson={this.handleNextLesson}
            handleTaskComplete={this.handleTaskComplete}
            handleLessonSwap={this.handleLessonSwap}
            course={this.state.guides}
            courseNum={this.state.courseNumber}
            user={this.state.user}
            altLessonsIndex={this.state.altLessonsIndex}
            handleTopRec={this.handleTopRec}
          />
        </div>
      );
    }
  }
});

module.exports = CourseContainer;