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
  get,
  push,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

let blogTitleInput = document.querySelector(".blogTitleInput");
let blogDescriptionInput = document.querySelector(".blogDescriptionInput");
let publishBlogBtn = document.querySelector(".publishBlogBtn");
let writeBlog = document.querySelector(".writeBlog");
let textAreaBorder = document.querySelector(".textAreaBorder");
let moreOptionsDiv = document.querySelector(".moreOptionsDiv");
let fa_caret_up = document.querySelector(".fa-caret-up");
let editBlogShow;
let doneEditing = document.querySelector(".doneEditing");
let timeStampOfBlog = new Date().getTime();

// ==display variables
let showPersonalBlogs = document.querySelector(".showPersonalBlogs");

// ========================header work==============
let displayUserName = document.querySelector(".displayUserName");
let displayUserProfileImg = document.createElement("img");
const headerWorkPersonalBlog = () => {
  let right = document.querySelector(".right");
  let uniqueId = localStorage.getItem("uid");
  let userReference = ref(database, "users/" + "userInfo/" + uniqueId);
  onValue(userReference, (snapshot) => {
    displayUserName.innerText =
      snapshot.val().firstName.toUpperCase() +
      " " +
      snapshot.val().lastName.toUpperCase();
    displayUserProfileImg.src = snapshot.val().imageUrl;
    right.appendChild(displayUserProfileImg);
  });
};
headerWorkPersonalBlog();
//redirecting to profile page
displayUserName.addEventListener("click", () => {
  window.location.href = "./profile.html";
});
displayUserProfileImg.addEventListener("click", () => {
  window.location.href = "./profile.html";
});

// ===========refresh work
window.addEventListener("load", function () {
  if (!this.localStorage.getItem("uid")) {
    this.window.location.href = "./login.html";
  }
  let loading = document.querySelector(".loading");
  loading.style.display = "block";
  setTimeout(() => {
    loading.style.display = "none";
  }, 3000);

  let myBlogsShow = this.document.createElement("h1");
  showPersonalBlogs.appendChild(myBlogsShow);
  let uniqueId = localStorage.getItem("uid");
  console.log(uniqueId);
  let blogReference = ref(database, "users/" + "userBlogs/" + uniqueId);
  console.log(blogReference);
  onValue(blogReference, (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      let blogUniqueId = childSnapShot.key;
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
        editBlogShow = document.createElement("i");
        editBlogShow.setAttribute("data-blog-key", blogUniqueId);
        doneEditing.setAttribute("data-blog-key", blogUniqueId);
        //giving values
        myBlogsShow.innerText = "my blogs";
        titleDivShow.innerHTML = `<strong> Title :  ${blogTitleFromDatabase} </strong>`;
        descriptionDivShow.innerHTML = ` Description :  ${blogDescriptionFromDatabase} `;
        displayDateShow.innerText = `   ${dateFromDataBase}`;
        displayTimeShow.innerText = `  ${timeFromDataBase}`;
        editBlogShow.innerText = " edit";

        //appending
        showPersonalBlogs.appendChild(blogsDivShow);

        blogsDivShow.appendChild(titleDivShow);
        blogsDivShow.appendChild(descriptionDivShow);
        blogsDivShow.appendChild(iconsOnPersonalBlogShow);

        iconsOnPersonalBlogShow.appendChild(displayDateShow);
        iconsOnPersonalBlogShow.appendChild(displayTimeShow);
        iconsOnPersonalBlogShow.appendChild(editBlogShow);
        iconsOnPersonalBlogShow.appendChild(deleteBlogShow);

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

        //editBlogShow
        // editBlogShow.addEventListener("click", (event) => {
        //   let editBlogDiv = this.document.querySelector(".editBlogDiv");
        //   editBlogDiv.style.display = "block";
        //   const clickedEditBlogShow = event.currentTarget;
        //   const blogKey = clickedEditBlogShow.getAttribute("data-blog-key");
        //   console.log("Clicked on edit for blog with key:", blogKey);
        //   const blogReference = ref(
        //     database,
        //     "users/" + "userBlogs/" + uniqueId + "/" + blogKey
        //   );

        //   onValue(
        //     blogReference,
        //     (snapshot) => {
        //       if (snapshot.exists()) {
        //         const blogTitleFromDatabase = snapshot.val().blogTitle;
        //         const blogDescriptionFromDatabase =
        //           snapshot.val().blogDescription;

        //         document.querySelector(".tileEdit").value =
        //           blogTitleFromDatabase;
        //         document.querySelector(".descriptionEdit").value =
        //           blogDescriptionFromDatabase;
        //       } else {
        //         console.log("Blog data does not exist");
        //       }
        //     },
        //     (error) => {
        //       console.error("Error reading blog data:", error);
        //     }
        //   );
        // });
        // cancelEditing
        // this.document
        //   .querySelector(".cancelEditing")
        //   .addEventListener("click", () => {
        //     let editBlogDiv = this.document.querySelector(".editBlogDiv");
        //     editBlogDiv.style.display = "none";
        //   });
        //done editing
        // const createDoneEditingHandler = (blogKey) => {
        //   doneEditing.addEventListener("click", (event) => {
        //     const clickedDoneEditing = event.currentTarget;
        //     const blogKey = clickedDoneEditing.getAttribute("data-blog-key");
        //     console.log("Clicked on Done Editing for blog with key:", blogKey);
        //     const blogReference = ref(
        //       database,
        //       "users/" + "userBlogs/" + uniqueId + "/" + blogKey
        //     );
        //     // console.log("blogKey", blogKey, "blogUniqueId", blogUniqueId);
        //     // alert("blogKey", blogKey, "blogUniqueId", blogUniqueId);
        //     onValue(blogReference, (snapshot) => {
        //       console.log(snapshot.val().blogUniqueId);
        //     });

        //     const blogInfo = {
        //       blogTitle: this.document.querySelector(".tileEdit").value,
        //       blogDescription:
        //         this.document.querySelector(".descriptionEdit").value,
        //       timeStampOfBlog,
        //       publishDAte: `${new Date().getDate()}-${
        //         new Date().getMonth() + 1
        //       }-${new Date().getFullYear()}`,
        //       publishTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        //     };
        //     console.log(blogTitleInput.value);
        //     console.log(blogDescriptionInput.value);

        //     if (
        //       this.document.querySelector(".tileEdit").value.length < 10 ||
        //       this.document.querySelector(".descriptionEdit").value.length < 100
        //     ) {
        //       Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "blog title should exceed 15 characters && blog description should exceed 100 characters",
        //       });
        //     } else {
        //       if (childSnapShot.key === blogUniqueId) {
        //         this.alert("true")
        //         update(blogReference, blogInfo)
        //           .then((resolve) => {
        //             Swal.fire("updated your blog successfully");
        //             this.location.reload();
        //           })
        //           .catch((error) => {
        //             Swal.fire("error in updating blog ");
        //           });
        //       }
        //     }
        //   });
        // };
        // createDoneEditingHandler(blogUniqueId);
      }
    });
  });
});
//=========================publish function================

// const publishFunc = () => {
//   let uniqueId = localStorage.getItem("uid");
//   let blogReference = ref(database, "users/" + "userBlogs/" + uniqueId);
//   let blogUniqueId;
//   alert("hi 1");
//   onValue(blogReference, (snapshot) => {
//     snapshot.forEach((childSnapShot) => {
//        blogUniqueId = childSnapShot.key;
//       console.log(blogUniqueId);
//     });
//   });
//   alert("hi 2")
//   const blogInfo = {
//     blogTitle: blogTitleInput.value,
//     blogDescription: blogDescriptionInput.value,
//     timeStampOfBlog,
//     publishDAte: `${new Date().getDate()}-${
//       new Date().getMonth() + 1
//     }-${new Date().getFullYear()}`,
//     publishTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
//     uniqueId,
//     blogUniqueId,
//   };
//   alert("hi 3");
//   push(blogReference, blogInfo)
//     .then((resolve) => {
//         alert("hi 4");
//       Swal.fire("blog has been added successfully!");
//     })
//     .catch((error) => {
//         alert("hi 5");
//       Swal.fire("error in adding blog");
//       console.error("Error adding blog:", error);
//       alert("error in adding blo");
//     });
// };
const publishFunc = () => {
  let uniqueId = localStorage.getItem("uid");
  let blogReference = ref(database, "users/" + "userBlogs/" + uniqueId);
  let blogChildReference = ref(
    database,
    "users/" + "userBlogs/" + uniqueId + "/" + "-Ndq4Hu_2yqvbmU02jGG"
  );
  onValue(blogChildReference, (snapshot) => {
    console.log(snapshot.val());
    alert("hi")
  })
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
  }
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
export { displayUserName, displayUserProfileImg };
//logout function
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("uid");
  window.location.href = "./login.html";
});
