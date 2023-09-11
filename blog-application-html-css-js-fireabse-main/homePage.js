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
  remove,
  get,
  push,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const auth = getAuth();
const database = getDatabase();
//declaring global variables
let showAllBlogs = document.querySelector(".showAllBlogs");
// ========================================================loader work=========================================
function showLoader() {
  let loading = document.querySelector(".loading");
  loading.style.display = "flex";
}
function hideLoader() {
  let loading = document.querySelector(".loading");
  loading.style.display = "none";
}
// ========================================================header work=========================================
//click on user name
const userNameClick = (displayUserName) => {
  displayUserName.addEventListener("click", () => {
    window.location.href = "./profile.html";
  });
};
//click on user image
const profilePhotoClick = (displayUserProfileImg) => {
  displayUserProfileImg.addEventListener("click", () => {
    window.location.href = "./profile.html";
  });
};
//click on arrow up
let arrowFlag = true;
const clickOnArrowUp = (arrowUp) => {
  arrowUp.addEventListener("click", () => {
    let moreOptionsDiv = document.querySelector(".moreOptionsDiv");
    if (arrowFlag) {
      moreOptionsDiv.style.display = "block";
      arrowUp.classList.add("fa-caret-down");
      arrowUp.classList.remove("fa-caret-up");
      arrowFlag = false;
    } else {
      moreOptionsDiv.style.display = "none";
      arrowUp.classList.remove("fa-caret-down");
      arrowUp.classList.add("fa-caret-up");
      arrowFlag = true;
    }
  });
};
//click on login or signup
let loginButton = document.querySelector(".logIn");
loginButton.addEventListener("click", () => {
  window.location.href = "./login.html";
});
let signupButton = document.querySelector(".signUp");
signupButton.addEventListener("click", () => {
  window.location.href = "./signup.html";
});

// ========================================================show all blogs work=========================================

let arr = [];
window.addEventListener("load", () => {
  showLoader();
  setTimeout(() => {
    hideLoader();
  }, 3000);
  let blogReference = ref(database, "users/" + "userBlogs/");
  console.log(blogReference);
  onValue(blogReference, (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      // console.log(childSnapShot.val());
      arr.push(childSnapShot.key);
    });
    for (let i = 0; i < arr.length; i++) {
      let newRef = ref(database, "users/" + "userBlogs/" + arr[i]);
      onValue(newRef, (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          //calling values
          let blogTitleFromDatabase = childSnapShot.val().blogTitle;
          let blogDescriptionFromDatabase = childSnapShot.val().blogDescription;
          let dateFromDataBase = childSnapShot.val().publishDAte;
          let timeFromDataBase = childSnapShot.val().publishTime;

          //creating div
          let titleDivShow = document.createElement("div");
          let blogsDivShow = document.createElement("div");
          let descriptionDivShow = document.createElement("h5");
          let iconsOnPersonalBlogShow = document.createElement("div");
          let displayDateShow = document.createElement("i");
          let displayTimeShow = document.createElement("i");

          //giving values
          titleDivShow.innerHTML = `<strong> Title :  ${blogTitleFromDatabase} </strong>`;
          descriptionDivShow.innerHTML = ` Description :  ${blogDescriptionFromDatabase} `;
          displayDateShow.innerText = `   ${dateFromDataBase}`;
          displayTimeShow.innerText = `  ${timeFromDataBase}`;
          //giving classes
          blogsDivShow.classList.add("blogsDiv");
          titleDivShow.classList.add("titleDiv");
          descriptionDivShow.classList.add("descriptionDiv");
          iconsOnPersonalBlogShow.classList.add("iconsOnPersonalBlog");
          displayDateShow.classList.add("fas", "fa-calendar");
          displayTimeShow.classList.add("fas", "fa-clock");
          //appending
          blogsDivShow.appendChild(titleDivShow);
          blogsDivShow.appendChild(descriptionDivShow);
          blogsDivShow.appendChild(iconsOnPersonalBlogShow);
          iconsOnPersonalBlogShow.appendChild(displayDateShow);
          iconsOnPersonalBlogShow.appendChild(displayTimeShow);
          showAllBlogs.appendChild(blogsDivShow);
          let parentId = childSnapShot.val().uniqueId;
          let parentRef = ref(database, "users/" + "userInfo/" + parentId);
          console.log(parentId);
          onValue(parentRef, (snapshot) => {
            //creating
            let publishedBy = document.createElement("h1");
            let publishersImg = document.createElement("img");
            let publishDiv = document.createElement("div")
            //giving values
            publishedBy.innerHTML = `published by:  <strong> "${
               snapshot.val().firstName
            } ${snapshot.val().lastName}"`;
            publishersImg.src = snapshot.val().imageUrl;

            //giving classes
            publishedBy.classList.add("name");
            publishersImg.classList.add("image");
            publishDiv.classList.add("publishDiv");
            //appending
            publishDiv.appendChild(publishedBy);
            publishDiv.appendChild(publishersImg);
            titleDivShow.appendChild(publishDiv)
          });
        });
      });
    }
  });
});

//printing blogs
// console.log("hi", blogsArr);
