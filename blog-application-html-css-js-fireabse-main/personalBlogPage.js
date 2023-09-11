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
// let logout
let blogTitleInput = document.querySelector(".blogTitleInput");
let blogDescriptionInput = document.querySelector(".blogDescriptionInput");
let publishBlogBtn = document.querySelector(".publishBlogBtn");
let showPersonalBlogs = document.querySelector(".showPersonalBlogs");
let cancelEditing = document.querySelector(".cancelEditing");
let keepTrack = document.querySelector(".keepTrack");
let keepKey = document.querySelector(".keepKey");
let doneEditing = document.querySelector(".doneEditing");
let tileEdit = document.querySelector(".tileEdit");
let descriptionEdit = document.querySelector(".descriptionEdit");
let timeStampOfBlog = new Date().getTime();
let dontDelete = document.querySelector(".dontDelete");
let yesDelete = document.querySelector(".yesDelete");
let deleteCoverDiv = document.querySelector(".deleteCoverDiv");
let logout = document.querySelector(".logout");
let homePage = document.querySelector(".homePage");
//========================================================logout and home page================
logout && logout.addEventListener("click", () => {
  localStorage.removeItem("uid");
  window.location.href = "./login.html"
})
homePage && homePage.addEventListener("click", () => {
  window.location.href = "./index.html";
})
// ========================================================loader work=========================================
function showLoader() {
  let loading = document.querySelector(".loading");
  loading.style.display = "flex";
}
function hideLoader() {
  let loading = document.querySelector(".loading");
  loading.style.display = "none";
}
// ========================================================showEditBlogDiv=========================================
const showEditBlogDiv = () => {
  let editBlogDiv = document.querySelector(".editBlogDiv");
  editBlogDiv.style.display = "block";
};
const hideEditBlogDiv = () => {
  let editBlogDiv = document.querySelector(".editBlogDiv");
  editBlogDiv.style.display = "none";
};
const showConfirmationBox = () => {
  deleteCoverDiv.style.display = "flex";
};
const hideConfirmationBox = () => {
  deleteCoverDiv.style.display = "none";
};
// ========================================================header work=========================================
//function for reference to userInfo
const userReference = () => {
  let uniqueId = localStorage.getItem("uid");
  const reference = ref(database, "users/" + "userInfo/" + uniqueId);
  return reference, uniqueId;
};

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
//header work when page refreshes
window.addEventListener("load", () => {
  showLoader();
  if (!localStorage.getItem("uid")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "you are not logged in",
    });
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1500);
  } else {
    showLoader();
    //header variables creation
    let right = document.querySelector(".right");
    let arrowUp = document.querySelector(".fa-caret-up");
    let displayUserName = document.querySelector(".displayUserName");
    let displayUserProfileImg = document.createElement("img");
    let uniqueId = localStorage.getItem("uid");
    const userReference = ref(database, "users/" + "userInfo/" + uniqueId);
    onValue(userReference, (snapshot) => {
      displayUserName.innerText =
        snapshot.val().firstName.toUpperCase() +
        " " +
        snapshot.val().lastName.toUpperCase();
      console.log(displayUserName);
      displayUserProfileImg.src = snapshot.val().imageUrl;
      right.appendChild(displayUserProfileImg);
      hideLoader();
    });
    userNameClick(displayUserName);
    profilePhotoClick(displayUserProfileImg);
    clickOnArrowUp(arrowUp);
  }
});

// ========================================================create blog=========================================
let createBlogBtnFlag = true;
const createBlogFunc = () => {
  let textAreaBorder = document.querySelector(".textAreaBorder");
  if (createBlogBtnFlag) {
    textAreaBorder.style.display = "flex";
    createBlogBtnFlag = false;
  } else {
    textAreaBorder.style.display = "none";
    createBlogBtnFlag = true;
  }
};
document.querySelector(".writeBlog").addEventListener("click", createBlogFunc);
// ========================================================publish blog=========================================
const publishFunc = () => {
  let uniqueId = localStorage.getItem("uid");
  let blogReference = ref(database, "users/" + "userBlogs/" + uniqueId);
  console.log(blogReference);
  onValue(blogReference, (snapshot) => {
    console.log(snapshot.val());
  });
  const blogInfo = {
    blogTitle: blogTitleInput.value,
    blogDescription: blogDescriptionInput.value,
    timeStampOfBlog,
    publishDAte: `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`,
    publishTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    uniqueId,
    // blogUniqueId,
  };

  // Now, push the data to the database inside the callback
  push(blogReference, blogInfo)
    .then((resolve) => {
      Swal.fire("Blog has been added successfully!");
    })
    .catch((error) => {
      console.error("Error adding blog:", error);
      Swal.fire("Error in adding blog");
    });

  // });
};

// ===publishBlogBtn===
publishBlogBtn.addEventListener("click", () => {
  if (
    blogTitleInput.value.length < 10 ||
    blogDescriptionInput.value.length < 100
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "blog title should exceed 15 characters && blog description should exceed 100 characters",
    });
  } else {
    publishFunc();
    Swal.fire("Blog has been added successfully!");
  }
});
// ========================================================display user's all blogs=========================================
window.addEventListener("load", function () {
  if (!this.localStorage.getItem("uid")) {
    this.window.location.href = "./login.html";
  }
  showLoader();
  setTimeout(() => {
    hideLoader();
  }, 3000);

  let myBlogsShow = this.document.createElement("h1");
  showPersonalBlogs.appendChild(myBlogsShow);
  // Initialize a reference to the previous blogsDivShow
  let previousBlogsDivShow = null;
  let uniqueId = localStorage.getItem("uid");
  let blogReference = ref(database, "users/" + "userBlogs/" + uniqueId);
  console.log(blogReference);
  onValue(blogReference, (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      // console.log(childSnapShot.key);
      // console.log(childSnapShot.val().uniqueId);
      let childUniqueId = childSnapShot.val().uniqueId;
      if (childUniqueId === uniqueId) {
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
        let deleteBlogShow = document.createElement("i");
        let editBlogShow = document.createElement("i");
        let parentUniqueId = this.document.createElement("p");
        let childUniqueId = this.document.createElement("p");

        //giving values
        myBlogsShow.innerText = "my blogs";
        titleDivShow.innerHTML = `<strong> Title :  ${blogTitleFromDatabase} </strong>`;
        descriptionDivShow.innerHTML = ` Description :  ${blogDescriptionFromDatabase} `;
        displayDateShow.innerText = `   ${dateFromDataBase}`;
        displayTimeShow.innerText = `  ${timeFromDataBase}`;
        parentUniqueId.innerHTML = ` ${childSnapShot.val().uniqueId}`;
        childUniqueId.innerHTML = `${childSnapShot.key}`;
        //appending
        showPersonalBlogs.insertBefore(blogsDivShow, myBlogsShow.nextSibling);
        blogsDivShow.appendChild(titleDivShow);
        blogsDivShow.appendChild(descriptionDivShow);
        blogsDivShow.appendChild(iconsOnPersonalBlogShow);
        iconsOnPersonalBlogShow.appendChild(displayDateShow);
        iconsOnPersonalBlogShow.appendChild(displayTimeShow);
        iconsOnPersonalBlogShow.appendChild(editBlogShow);
        iconsOnPersonalBlogShow.appendChild(deleteBlogShow);
        descriptionDivShow.appendChild(parentUniqueId);
        descriptionDivShow.appendChild(childUniqueId);
        parentUniqueId.style.display = "none";
        childUniqueId.style.display = "none";
        previousBlogsDivShow = blogsDivShow;
        //giving classes
        myBlogsShow.classList.add("myBlogs");
        blogsDivShow.classList.add("blogsDiv");
        titleDivShow.classList.add("titleDiv");
        descriptionDivShow.classList.add("descriptionDiv");
        iconsOnPersonalBlogShow.classList.add("iconsOnPersonalBlog");
        displayDateShow.classList.add("fas", "fa-calendar");
        displayTimeShow.classList.add("fas", "fa-clock");
        deleteBlogShow.classList.add("fas", "fa-trash");
        editBlogShow.classList.add("fas", "fa-pencil");
        //clicking on edit blog shoow
        editBlogShow.addEventListener("click", () => {
          showEditBlogDiv();
          tileEdit.value = titleDivShow.innerText;
          keepTrack.value = childUniqueId.innerText;
          console.log(childUniqueId.innerText);
        });
        //click on cancelEditing
        cancelEditing.addEventListener("click", () => {
          this.document.querySelector(".editBlogDiv").style.display = "none";
          console.log(keepTrack.innerText);
        });

        deleteBlogShow.addEventListener("click", () => {
          keepKey.value = childUniqueId.innerText;
          showConfirmationBox();
        });
      }
    });
  });
});
//done editing work
const editingBlog = () => {
  let uniqueId = localStorage.getItem("uid");
  const blogReference = ref(
    database,
    "users/" + "userBlogs/" + uniqueId + "/" + keepTrack.value
  );
  onValue(blogReference, (snapshot) => {
    const blogInfo = {
      blogTitle: tileEdit.value,
      blogDescription: descriptionEdit.value,
      timeStampOfBlog,
      publishDAte: `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
      publishTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    };

    update(blogReference, blogInfo)
      .then((resolve) => {
        Swal.fire("Blog has been updated successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
        Swal.fire("Error in adding blog");
      });
  });
};
doneEditing.addEventListener("click", () => {
  if (tileEdit.value.length < 10 || descriptionEdit.value.length < 100) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "blog title should exceed 15 characters && blog description should exceed 100 characters",
    });
  } else {
    editingBlog();
    hideEditBlogDiv();
  }
});
//delete work
const deleteBlogFunc = () => {
  let uniqueId = localStorage.getItem("uid");
  const blogReference = ref(
    database,
    "users/" + "userBlogs/" + uniqueId + "/" + keepKey.value
  );
  console.log(keepKey.value);
  remove(blogReference)
    .then((resolve) => {
      hideConfirmationBox();
      Swal.fire("blog has been deleted");
      window.location.reload();
    })
    .catch((error) => {
      Swal.fire("error in deleting blog");
    });
};
dontDelete.addEventListener("click", () => {
  hideConfirmationBox();
});
yesDelete.addEventListener("click", deleteBlogFunc);
