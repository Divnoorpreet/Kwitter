//YOUR FIREBASE LINKS
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

var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                uname = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                uname_tag = "<h4>" + uname + "<img class='user_tick' scr='tick.png'></h4>";
                message_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>";
                span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like:" + like + "</span> </button> <hr>";
                row = uname_tag + message_tag + like_button + span_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updatelike(message_id) {
    console.log("user_clicked_on_like_button" + message_id);
    var button_id = message_id;
    likes = document.getElementById(button_id).value;
    upadated_likes = Number(likes) + 1;
    console.log(upadated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like: upadated_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function send() {
    var msg = document.getElementById("message").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("message").value = "";
}
