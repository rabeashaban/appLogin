const firebaseConfig = {
  apiKey: "AIzaSyDIbP_UJzRxVj47U95JUWNB4PMCoLLRiec",
  authDomain: "dentalclinicr2002.firebaseapp.com",
  databaseURL: "https://dentalclinicr2002-default-rtdb.firebaseio.com",
  projectId: "dentalclinicr2002",
  storageBucket: "dentalclinicr2002.appspot.com",
  messagingSenderId: "551852158646",
  appId: "1:551852158646:web:059d4c600bda8453378017"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to  RealTime Database service
const database = firebase.database();

//انشاء حساب تسجيل الدخول
$("#CreateInAcc").click(function (e) {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var listtName = $("#listtName").val();
  var email = $("#email").val();
  var password = $("#password").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

      //تخزين بيانات المستخدم 
      var user = firebase.auth().currentUser;

      user
        .updateProfile({
          displayName:firstName +" "+ listtName
        })
        .then(() => {
          // Update successful
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });


      // Signed in
      var user = userCredential.user;
      database.ref("users/" + user.uid).set({
        firstName: firstName,
        listtName: listtName,
        email: email,
        password: password,
      });

      alert("User created successfully");
      $("#firstName").val("");
      $("#listtName").val("");
      $("#email").val("");
      $("#password").val("");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorMessage);
      alert(errorMessage);
      // ..
    });
});

// عمل عملية تسجيل الدخول
$("#Login").click(function (e) {
  e.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // تم تسجيل الدخول بنجاح
      var user = userCredential.user;
      alert("done");

      //فضي البيانات
      $("#email").val("");
      $("#password").val("");
      window.location.href = "Home.html"; // بعد ما تسجل دخول اذهب اللي الصفحة دي
    })
    .catch((error) => {
      // حدث خطأ أثناء تسجيل الدخول
      const errorCode = error.code;

      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// يعرف العملية التي قام بها المستخدم
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    console.log(user.displayName);
   $("#wel").text("Welcome to "+user.displayName );  // يظهر اسم المستخدم في الصفحة 
    // $("#user").hide();
    // $("#out").show();
    // ...
  } else {
    // User is signed out
    // ...
  }
});

//عملية تسجيل خروج
$("#Logout-user").click(function (e) {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      alert("Sign-out successful.");
      window.location = "index.html"; // بعد ما تعمل تسجيل خروج اذهب اللي الصفحة دي
    })
    .catch((error) => {
      // An error happened.
      alert("An error happened.");
    });
});
