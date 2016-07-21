var user1 = {
	name: "John Smith",
	history: [{
		lessonNumber: 0,
		date: "",
		completed: false,
		tasks: []
	}],
	//history: [{lessonNumber, date, completed, [{tasks}, ...]}, ...],
	/*tasks:
	{
		taskNumber: "x"
		date: moment() //all dates are moments and refer to completion date
		result: [2, 5]//[] if this task has no assessment
	}*/
	courses: [
		{startDate: moment(), currentLessonNumber: 2, rating: 3,currentTaskNumber: "", lessonChoices: [1, 0]}
	],
	/*
	lessonChoices: list of the choice of each lesson from the course
	Ex: [1, 0] => "Case Studies 1 - Video" and "Case Studies 2 - Video" from Course2.*/
};


module.exports = user1;