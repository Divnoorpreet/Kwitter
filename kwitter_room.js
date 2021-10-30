
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyDyVT9jHkXLAYMZXwbUaoA9BwrP--LVJms",
      authDomain: "kwitter-5af98.firebaseapp.com",
      databaseURL: "https://kwitter-5af98-default-rtdb.firebaseio.com",
      projectId: "kwitter-5af98",
      storageBucket: "kwitter-5af98.appspot.com",
      messagingSenderId: "1019956295376",
      appId: "1:1019956295376:web:e120f423a8ade810fa10d5"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    var user_name=localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML="Welcome " + user_name +"!";

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("room_name"+Room_names);
      var row="<div class='room_name' id="+Room_names +" onclick='redirecttoroom(this.id)'>" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();

function redirecttoroom(name){
      localStorage.setItem("room_name",name);
      console.log("HI");
      console.log(name);
      window.location="kwitter_page.html";
} 
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}

function addroom(){
      var room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({purpose:"adding room"});
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}
