var sylvester = require('sylvester');
var Recommender = require('./recs/likely.js');

var inputMatrix = [ [ 2,5,1,4,1,2,5 ],
                    [ 1,4,2,5,2,1,4 ],
                    [ 4,2,5,1,5,4,2 ],
                    [ 3,1,4,2,4,5,3 ],
                    [ 1,4,2,5,1,1,4 ],
                    [ 2,5,2,0,0,0,0 ]
                  ];

//var rowLabels = ['Jeff', 'Kishan', 'Levon'];
//var colLabels = ['Lesson 1 - Reading', 'Lesson 1 - Video', 'Lesson 2 - Reading', 'Lesson 3 - Video'];

//var model = Recommender.buildModel(inputMatrix, rowLabels, colLabels);

var model = Recommender.buildModel(inputMatrix);

var recommendations = model.estimated;

//var recommendations = model.recommendations(0);

console.log(recommendations);