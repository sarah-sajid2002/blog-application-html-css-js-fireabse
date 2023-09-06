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

let blogTitleInput = document.querySelector(".blogTitleInput");
let blogDescriptionInput = document.querySelector(".blogDescriptionInput");
let publishBlogBtn = document.querySelector(".publishBlogBtn");
let writeBlog = document.querySelector(".writeBlog");
let textAreaBorder = document.querySelector(".textAreaBorder");
let moreOptionsDiv = document.querySelector(".moreOptionsDiv");
let fa_caret_up = document.querySelector(".fa-caret-up"); //arrow down
// let addingDAte = document.querySelector(".addingDAte");
// let addingTime = document.querySelector(".addingTime");
let timeStampOfBlog = new Date().getTime();

// ==display variables
let showPersonalBlogs = document.querySelector(".showPersonalBlogs");

// ========================header work==============
const headerWorkPersonalBlog = () => {
  let displayUserName = document.querySelector(".displayUserName");
  let right = document.querySelector(".right");
  let displayUserProfileImg = document.createElement("img");
  let uniqueId = localStorage.getItem("uid");
  console.log(uniqueId);
  let userReference = ref(database, "users/" + "userInfo/" + uniqueId);
  console.log(userReference);
  onValue(userReference, (snapshot) => {
    console.log(snapshot.val().firstName);
    console.log(snapshot.val().imageUrl);
    displayUserName.innerText =
      snapshot.val().firstName.toUpperCase() +
      " " +
      snapshot.val().lastName.toUpperCase();
    displayUserProfileImg.src = snapshot.val().imageUrl;
    right.appendChild(displayUserProfileImg);
  });
};
headerWorkPersonalBlog();
//=========================publish function================
const publishFunc = () => {
  //   alert("clicked");
  let uniqueId = auth.currentUser.uid;
  // console.log(uniqueId);
  let parentUserReference = ref(database, "users/" + uniqueId);
  let blogReference = ref(database, "users/" + "userBlogs/" + uniqueId);
  let infoReference = ref(database, "users/" + "userInfo" + uniqueId);
  // console.log(checkUidRef);
  // console.log(userReference);
  const blogInfo = {
    blogTitle: blogTitleInput.value,
    blogDescription: blogDescriptionInput.value,
    timeStampOfBlog,
    publishDAte: `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`,
    publishTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    uniqueId,
  };
  if (
    (blogTitleInput.length > 8 && blogDescriptionInput.length > 100) ||
    (blogTitleInput.length < 15 && blogDescriptionInput.length < 3000)
  ) {
    push(blogReference, blogInfo)
      .then((resolve) => {
        alert("blog has added");
        onValue(blogReference, (snapshot) => {
          let data = snapshot.val();
          snapshot.forEach((childSnapshot) => {
            let childUid = childSnapshot.val().uniqueId;
            console.log("childuid", childUid);

            if (childUid === uniqueId) {
              let blogsDiv = document.createElement("div");
              let titleDiv = document.createElement("h3");
              let iconsOnPersonalBlog = document.createElement("div");
              titleDiv.innerText = childSnapshot.val().blogTitle;
              iconsOnPersonalBlog.appendChild("blogsDiv");
              blogsDiv.appendChild("titleDiv");
              // addingDAte.innerText = childSnapshot.val().publishDAte;
              // addingTime.innerText = childSnapshot.val().publishTime;
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
        alert("error in adding blo");
      });
  } else {
    alert(
      "min title length: 8\nmaximum title length:15\n minimum description length:100\nmaximum description length:3000"
    );
  }
};

// for (let i = 0; i < fa_calender.length; i++) {
//   addingDAte[i].innerText = `${new Date().getDate()}-${
//     new Date().getMonth() + 1
//   }-${new Date().getFullYear()}`;

//   addingTime[
//     i
//   ].innerText = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
// }
// ===publishBlogBtn===
publishBlogBtn.addEventListener("click", () => {
  setTimeout(() => {
    publishFunc();
    textAreaBorder.style.display = "none";
    writeBlog.style.display = "block";
  }, 10);
  // setTimeout(() => {
  //   blogTitleInput.value = "";
  //   blogDescriptionInput.value = "";
  // }, 1000);
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
