// Import the Swal library
// import Swal from "sweetalert2/dist/sweetalert2.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
const auth = getAuth();
const database = getDatabase();
const storage = getStorage();

// signup function
const signUpFunc = () => {
  let pattern = "^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}$";
  if (
    !userName.value ||
    !userEmail.value ||
    !userPassword.value ||
    !repeatPassword.value ||
    userFileInput.files.length <= 0
  ) {
    console.log("fill all fields");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "kindly fill all fields",
    });
  } else if (userName.value.length < 3) {
    console.log("user name should exceed three characters");
     Swal.fire({
       icon: "error",
       title: "Oops...",
       text: "user name should exceed three characters",
     });
  } else if (userPassword.value !== repeatPassword.value) {
    console.log("repeated password does not match the actual password");
     Swal.fire({
       icon: "error",
       title: "Oops...",
       text: "repeated password does not match the actual password",
     });
  } else {
    createUserWithEmailAndPassword(
      auth,
      userEmail.value,
      userPassword.value,
      userName.value,
      userLastName.value,
      repeatPassword.value
    )
      .then((resolve) => {
        let loading = document.querySelector(".loading");
        loading.style.display = "block";
        console.log("signup successfully");
        const imageFile = userFileInput.files[0];
        let mediaRef = storageRef(storage, "images/" + imageFile.name);
        uploadBytes(mediaRef, imageFile)
          .then((response) => {
            console.log("successfully added image in storage", response.ref);
            getDownloadURL(response.ref).then((url) => {
              let uniqueId = auth.currentUser.uid;
              localStorage.setItem("uid", uniqueId);
              let userReference = ref(
                database,
                "users/" + "userInfo/" + uniqueId
              );
              let userObj = {
                firstName: userName.value,
                lastName: userLastName.value,
                email: userEmail.value,
                password: userPassword.value,
                imageUrl: url,
                signUpDate: `${date}-${month}-${year}`,
                signUpTime: `${hours}:${minutes}:${seconds}`,
                timeStamp: signUpTimeStamp,
                uniqueId,
              };
              set(userReference, userObj)
                .then((response) => {
                  console.log("Successfully added data in database", response);
                  window.location.href = "./personalBloggingApp.html";
                  loading.style.display = "none";
                })
                .catch((error) => {
                  console.log("error in sending image in storage");
                });
            });
          })
          .catch((reject) => {
            console.log("error in adding image in storage", reject);
          });
      })
      .catch((error) => {
        const errorSignup = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        let errorText = errorMessage;
        switch (errorMessage) {
          case "Firebase: Error (auth/email-already-in-use).":
            errorText = "email already in use";
            break;
          case "Firebase: Error (auth/invalid-email).":
            errorText = "invalid email";
            break;
          default:
            errorText = "an error occurred, try again";
            break;
        }
        console.log(errorText);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorText,
        });
      });
  }
};

let signup = document.querySelector(".signUpButton");

// infos
let userName = document.querySelector(".userName");
let userLastName = document.querySelector(".userLastName");
let userEmail = document.querySelector(".userEmail");
let userPassword = document.querySelector(".userPassword");
let repeatPassword = document.querySelector(".repeatPassword");
let userFileInput = document.querySelector(".userFileInput");
//time
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let date = new Date().getDate();
let month = monthNames[new Date().getMonth()]; //0 11
let year = new Date().getFullYear();
let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let seconds = new Date().getSeconds();
let signUpTimeStamp = new Date().getTime();
signup.addEventListener("click", signUpFunc);
export { date, month, year, hours, minutes, seconds };
