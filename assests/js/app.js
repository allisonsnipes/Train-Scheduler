// 1. initialize firebase

  var config = {
    apiKey: "AIzaSyBv4N-6T0mTcj-3w3gFbe89ULnsjI6be3Y",
    authDomain: "trainscheducb.firebaseapp.com",
    databaseURL: "https://trainscheducb.firebaseio.com",
    projectId: "trainscheducb",
    storageBucket: "trainscheducb.appspot.com",
    messagingSenderId: "260908491041"
  };
firebase.initializeApp(config);

//establish shortcut to write code
var database = firebase.database();

//2. place an event listener on the button to add more trains
document.querySelector("#trainBut").addEventListener("click", function(event) {
  event.preventDefault();


  //gather user's input and initilize them into variables that will populate in the firebase database as initial data
  var tName = document.querySelector("#trainName").value.trim();
  var tTime = document.querySelector("#destinationTrain").value.trim();
  var tFirstTrain = document.querySelector("#enterFT").value.trim();
  var tFreq = document.querySelector("#freq").value.trim();

  //local temporary object to hold train data
  var trainData = {
    name: tName,
    trainTime: tTime,
    firstTrain: tFirstTrain,
    frequency: tFreq
  };

  //upload train data to the database
  database.ref().push(trainData);

  //log input to the console from the train data
  console.log(trainData.name);
  console.log(trainData.trainTime);
  console.log(trainData.firstTrain);
  console.log(trainData.frequency);

  alert("Train data succesfully added");

  //clears input from text boxes
  document.querySelector("#trainName").value = "";
  document.querySelector("#destinationTrain").value = "";
  document.querySelector("#enterFT").value = "";
  document.querySelector("#freq").value = "";
});

// 3. create a firebase event for adding trains to the database plus it adds a row in the html to hold user's entry
database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());
  //store all values into variables specific to that value we need to gather
  //var
})


//how is this the different from the steps above? possible difference making a way to add more users from what we gathered?
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

    //use the same name as above from the user's input but now save the values for the firebase entry
    var tName = childSnapshot.val().name;
    var tTime = childSnapshot.val().trainTime;
    var tFirstTrain = childSnapshot.val().firstTrain;
    var tFreq = childSnapshot.val().frequency;

    //train infor
    console.log(tName);
    console.log(tTime);
    console.log(tFirstTrain);
    console.log(tFreq);

    //start working with moment with additional things calc freq needed to get new temp obj for calc
    let tempTrainData = {
      name: tName,
      trainTime: tTime,
      frequency: tFreq
    };

  //prettify the train start
  var trainStartPretty = moment.unix(tFirstTrain).format("MM/DD/YYYY");
  
  //add startDate to tempEmployeeData object
  tempTrainData.startDate =trainStartPretty;

  //calculate the minutes between times
  var trainMinutes = moment().diff(moment(tFirstTrain, "X"), "minutes");
  console.log(trainMinutes);

  tempTrainData.minutes = trainMinutes;
  tempTrainData.frequent = tFreq;

  //calc when the next train comes

  //loop through the childSnapshot object and create a new now
  var newRow = document.createElement("tr");

  //td: table data and tr:table row table elements
  for (let prop of Object.values(tempTrainData)) {
    let newTd = document.createElement("td");
    newTd.innerText = prop;
    newRow.appendChild(newTd);
  }
  
  //append
  //tbodies are important
  document.querySelector("#trains > tbody").appendChild(newRow);
});