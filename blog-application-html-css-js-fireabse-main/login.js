import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  update,
  onValue,
  get,
  push,
  orderByChild,
  
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const auth = getAuth();
const database = getDatabase();


// login function
const logInFunc = () => {
  signInWithEmailAndPassword(
    auth,
    userEmailLogin.value,
    userPasswordLogin.value
  )
    .then((resolve) => {
      let loading = document.querySelector(".loading");
      loading && (loading.style.display = "flex")
      let uniqueId = auth.currentUser.uid;
      console.log(uniqueId);
      localStorage.setItem("uid", uniqueId);
      console.log("login successfully", resolve);
      window.location.href = "./personalBloggingApp.html";
      loading.style.display = "none";
      Swal.fire("you are logged in")
    })
    .catch((error) => {
      console.log(error);
      const errorSignup = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      let errorText = errorMessage;
      switch (errorMessage) {
        case "Firebase: Error (auth/invalid-email).":
          errorText = "invalid email";
          break;
        case "Firebase: Error (auth/wrong-password).":
          errorText = "wrong password";
          break;
      }
      console.log(errorText);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorText,
      });
    });
};

// infos
let userEmailLogin = document.querySelector(".userEmailLogin");
let userPasswordLogin = document.querySelector(".userPasswordLogin");
let login = document.querySelector(".logInButton");
login.addEventListener("click", logInFunc);
