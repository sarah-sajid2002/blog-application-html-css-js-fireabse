import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  update,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

const publishFunc = () => {
  //   alert("clicked");
  let uniqueId = auth.currentUser.uid;
  console.log(uniqueId);
  let userReference = ref(database, "users/" + uniqueId);
  const blogInfo = {
    blogTitle: blogTitleInput.value,
    blogDescription: blogDescriptionInput.value,
  };
  push(userReference, blogInfo)
    .then((resolve) => {
      alert("blog has added");
    })
    .catch((error) => {
      console.error("Error adding blog:", error);
      alert("Error in adding blog. Check the console for details.");
    });
};

let blogTitleInput = document.querySelector(".blogTitleInput");
let blogDescriptionInput = document.querySelector(".blogDescriptionInput");
let publishBlogBtn = document.querySelector(".publishBlogBtn");
let writeBlog = document.querySelector(".writeBlog");
let textAreaBorder = document.querySelector(".textAreaBorder");
let moreOptionsDiv = document.querySelector(".moreOptionsDiv");
let fa_caret_up = document.querySelector(".fa-caret-up"); //arrow down
let fa_calender = document.querySelectorAll(".fa-calendar");
let fa_clock = document.querySelectorAll(".fa-clock");
let addingDAte = document.querySelectorAll(".addingDAte");
let addingTime = document.querySelectorAll(".addingTime");

for (let i = 0; i < fa_calender.length; i++) {
  addingDAte[i].innerText = `${new Date().getDate()}-${
    new Date().getMonth() + 1
  }-${new Date().getFullYear()}`;

  addingTime[
    i
  ].innerText = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
}
// ===publishBlogBtn===
publishBlogBtn.addEventListener("click", () => {
  setTimeout(() => {
    publishFunc();
    textAreaBorder.style.display = "none";
    writeBlog.style.display = "block";
  }, 10);
  setTimeout(() => {
    blogTitleInput.value = "";
    blogDescriptionInput.value = "";
  }, 1000);
});

// ====create new blog====
writeBlog.addEventListener("click", () => {
  textAreaBorder.style.display = "block";
  writeBlog.style.display = "none";
});
// ===moreOptionsDivFlag=-==
let moreOptionsDivFlag = true;
fa_caret_up.addEventListener("click", () => {
  if (moreOptionsDivFlag) {
    moreOptionsDiv.style.display = "block";
    fa_caret_up.classList.add("fa-caret-down");
    fa_caret_up.classList.remove("fa-caret-up");
    moreOptionsDivFlag = false;
  } else {
    moreOptionsDiv.style.display = "none";
    fa_caret_up.classList.remove("fa-caret-down");
    fa_caret_up.classList.add("fa-caret-up");
    moreOptionsDivFlag = true;
  }
});
