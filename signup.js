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
  createUserWithEmailAndPassword(
    auth,
    userEmail.value,
    userPassword.value,
    userName.value,
    userLastName.value,
    repeatPassword.value
  )
    .then((resolve) => {
      alert("signup successfully");
      userNAmeInSTorage = localStorage.setItem("userName", userName.value);
      const imageFile = userFileInput.files[0];
      let mediaRef = storageRef(storage, "images/" + imageFile.name);
      uploadBytes(mediaRef, imageFile)
        .then((response) => {
          alert("successfully added image in storage");
          console.log("successfully added image in storage", response.ref);
          getDownloadURL(response.ref).then((url) => {
            let uniqueId = auth.currentUser.uid;
            let userReference = ref(database, "users/" + uniqueId);
            let userObj = {
              firstName: userName.value,
              lastName: userLastName,
              email: userEmail.value,
              password: userPassword.value,
              imageUrl: url,
              signUpDate: `${date}-${month}-${year}`,
              signUpTime: `${hours}:${minutes}:${seconds}`,
            };
            set(userReference, userObj)
              .then((response) => {
                alert("Successfully added data in database");
                console.log("Successfully added data in database", response);
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
      alert("error in signup");
      console.error("Error in signup:", error);
    });
};

let signup = document.querySelector(".signUpButton");

// infos
let userName = document.querySelector(".userName");
let userLastName = document.querySelector(".userLastName");
let userEmail = document.querySelector(".userEmail");
let userPassword = document.querySelector(".userPassword");
let repeatPassword = document.querySelector(".repeatPassword");
let userFileInput = document.querySelector(".userFileInput");
let userNAmeInSTorage;
export { userNAmeInSTorage };
//time
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date().getDate();
let month = monthNames[new Date().getMonth()]; //0 11
let year = new Date().getFullYear();
let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let seconds = new Date().getSeconds();

signup.addEventListener("click", signUpFunc);
export { date, month, year, hours, minutes, seconds };
