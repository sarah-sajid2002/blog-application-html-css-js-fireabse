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
      alert("login successfully", resolve);
      let uniqueId = auth.currentUser.uid;
      let userReference = ref(database, "users/" + uniqueId);
      onValue(userReference, (snapshot) => {
        // let output = document.querySelector(".output");
        // output.innerHTML = snapshot.val().firstName;
        alert(snapshot.val().firstName);
        alert(snapshot.val().imageUrl);
      });
    })
    .catch((error) => {
      alert("error in login", error);
    });
};
// infos

let userEmailLogin = document.querySelector(".userEmailLogin");
let userPasswordLogin = document.querySelector(".userPasswordLogin");
let login = document.querySelector(".logInButton");
login.addEventListener("click", logInFunc);
