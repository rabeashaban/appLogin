// configuration of Project
const firebaseConfig = {
  apiKey: "AIzaSyDup4cpkmh66mExVzz5hQ3qPmkvaf9RQqI",
  authDomain: "techno-22.firebaseapp.com",
  databaseURL: "https://techno-22-default-rtdb.firebaseio.com",
  projectId: "techno-22",
  storageBucket: "techno-22.appspot.com",
  messagingSenderId: "962908798984",
  appId: "1:962908798984:web:525b1ad7dcab93a96151bd"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to  RealTime Database service
const database = firebase.database();

let signUp = document.querySelector(".signUp");
let regester = document.querySelector(".regester");


regester.addEventListener("click", (e) => {
  e.preventDefault();

  let Name = signUp.name.value;
  let email = signUp.email.value;
  let password = signUp.password.value;
  let confirmPassword = signUp.confirm.value;
  let usernamewifi = signUp.usernamewifi.value;
  let passwordwifi = signUp.passwordwifi.value;
  let confirmpasswordwifi = signUp.confirmpasswordwifi.value;

  // تم إنشاء المستخدم بنجاح

  if (password === confirmPassword && passwordwifi === confirmpasswordwifi) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // تحديث بيانات المستخدم في قاعدة البيانات
        database.ref("users/" + user.uid).set({
          Name: Name,
          email: email,
          password: password,
          usernamewifi: usernamewifi,
          passwordwifi: passwordwifi,
        });

        signUp.email.value = "";
        signUp.password.value = "";
        signUp.name.value = "";
        signUp.confirm.value = "";
        signUp.usernamewifi.value = "";
        signUp.passwordwifi.value = "";
        signUp.confirmpasswordwifi.value = "";
        console.log("User created successfully");

      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  } else {
    console.log("Password does not match");
  }
});
