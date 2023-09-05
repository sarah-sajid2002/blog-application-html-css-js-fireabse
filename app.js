import { userNAmeInSTorage } from "./signup.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// import {
//   getDatabase,
//   set,
//   ref,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
// const auth = getAuth();
// const database = getDatabase();

// // signup function
// const signUpFunc = () => {
//   createUserWithEmailAndPassword(
//     auth,
//     userEmail.value,
//     userPassword.value,
//     userName.value,
//     userLastName.value,
//     repeatPassword.value
//   )
//     .then((resolve) => {
//       alert("signup successfully");
//       let uniqueId = auth.currentUser.uid;
//       let userReference = ref(database, "users/" + uniqueId);
//       let userObj = {
//         firstName: userName.value,
//         lastName: userLastName.value,
//         email: userEmail.value,
//         password: userPassword.value,
//         signUpDate: `${date}-${month}-${year}`,
//         signUpTime: `${hours}:${minutes}:${seconds}`,
//       };
//       set(userReference, userObj)
//         .then((response) => {
//           alert("Successfully added data in database");
//           console.log("Successfully added data in database");
//         })
//         .catch((reject) => {
//           alert("did not add data in firebase");
//           console.log("did not add data in firebase", reject);
//         });
//     })
//     .catch((error) => {
//       alert("error in signup");
//       console.error("Error in signup:", error);
//     });
// };

// // login function
// const logInFunc = () => {
//   signInWithEmailAndPassword(
//     auth,
//     userEmailLogin.value,
//     userPasswordLogin.value
//   )
//     .then((resolve) => {
//       alert("login successfully", resolve);
//       let uniqueId = auth.currentUser.uid;
//       let userReference = ref(database, "users/" + uniqueId);
//       onValue(userReference, (snapshot) => {
//         // let output = document.querySelector(".output");
//         // output.innerHTML = snapshot.val().firstName;
//         alert(snapshot.val().firstName);
//       });
//     })
//     .catch((error) => {
//       alert("error in login", error);
//     });
// };

// // buttons
// let signup = document.querySelector(".signUpButton");
// let login = document.querySelector(".logInButton");
// // divs
// let signUpDiv = document.querySelector(".signup");
// let logInDiv = document.querySelector(".login");
// // infos
// let userName = document.querySelector(".userName");
// let userLastName = document.querySelector(".userLastName");
// let userEmail = document.querySelector(".userEmail");
// let userPassword = document.querySelector(".userPassword");
// let userEmailLogin = document.querySelector(".userEmailLogin");
// let userPasswordLogin = document.querySelector(".userPasswordLogin");
// let repeatPassword = document.querySelector(".repeatPassword");
// //time
// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// let date = new Date().getDate();
// let month = new Date().getMonth();
// month = monthNames[month];
// let year = new Date().getFullYear();
// let hours = new Date().getHours();
// let minutes = new Date().getMinutes();
// let seconds = new Date().getSeconds();

// signup.addEventListener("click", signUpFunc);
// login.addEventListener("click", logInFunc);

// document.onload(() => {
//   if(localStorage)
// })
window.onload(() => {
  window.location.href = "login.html";
});
