var user1 = {
	name: "John Smith",
	history: [
		{
			lessonNumber: 0,
			date: "",
			completed: false,
			tasks: []
		}, 
		{
			lessonNumber: 1,
			date: "",
			completed: false,
			tasks: []
		},
		{
			lessonNumber: 2,
			date: "",
			completed: false,
			tasks: []
		},
		{
			lessonNumber: 3,
			date: "",
			completed: false,
			tasks: []
		},
	],
	courses: [
		{courseName: "Reading", startDate: moment(), currentLessonNumber: 2, currentTaskNumber: 0, recs: [[0, 0], [0], [4.3, 1.7, 1.6], [4.2], [2.2, 3.3]], ratings: [[2, 5], [2], [0, 0, 0], [0]], lessonChoices: [0, 0]}
	],
	/*
	lessonChoices: list of the choice of each lesson from the course
	Ex: [0, 0] => "Case Studies 1 - Reading" and "Case Studies 2 - Video" from Course2.

	preferences: 
	[
		{
			lessonNumber: "x";
			taskNumber: "y";
			rating: "z"; //{-1, 0, 1}
			assessmentResult: [2, 5] //[# of correct answers, # of total questions], or "" if no result or not an assessment task
		},
		{
			...
		},
		...
	]*/
};

module.exports = user1;