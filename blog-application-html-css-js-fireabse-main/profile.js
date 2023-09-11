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
  update,
  remove,
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
//refresh page function
window.addEventListener("load", (event) => {
  if (!localStorage.getItem("uid")) {
    window.location.href = "./login.html";
  }
  let uniqueId = localStorage.getItem("uid");
  let userReference = ref(database, "users/" + "userInfo/" + uniqueId);
  onValue(userReference, (snapshot) => {
    let oldPassword = snapshot.val().password;
    console.log(oldPassword);
  });
  showLoader();
  callValue();
});
//edit info function

const editFunction = async () => {
  let changeFirstName = document.querySelector(".changeFirstName");
  let changeLastName = document.querySelector(".changeLastName");
  let changeProfileImage = document.querySelector(".changeProfileImage");
  let uniqueId = localStorage.getItem("uid");
  let userReference = ref(database, "users/" + "userInfo/" + uniqueId);
  let oldPasswordUser = document.querySelector(".oldPassword");
  let oldPassword;
  onValue(userReference, (snapshot) => {
    oldPassword = snapshot.val().password;
    console.log(oldPassword);
  });
  if (
    !changeFirstName.value ||
    !changeLastName 
    // changeProfileImage.files.length <= 0
  ){
    console.log("fill all fields");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "kindly fill all fields",
    });
  } else if (oldPassword !== oldPasswordUser.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "old password is incorrect",
    });
  } else if (changeFirstName.value.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "user name should exceed three characters",
    });
  } 
   else {
    const imageFile = changeProfileImage.files[0];
    let mediaRef = storageRef(storage, "images/" + imageFile.name);

    uploadBytes(mediaRef, imageFile)
      .then((response) => {
        console.log("successfully added image in storage", response.ref);
        getDownloadURL(response.ref).then((url) => {
          console.log(url);
          const newData = {
            firstName: changeFirstName.value,
            lastName: changeLastName.value,
            imageUrl: url,
            uniqueId,
          };

          update(userReference, newData).then((resolve) => {
            console.log("data updated");
            Swal.fire("data updated successfully")
            showLoader();
            callValue();
            hideUpdateDiv();
          });
        });
      })
      .catch((error) => {
        console.log("error in updating data", error);
      });
  }
};

let fa_edit = document.querySelector(".fa-edit");
let confirm = document.querySelector(".confirm");
let cancel = document.querySelector(".cancel");
let userImage = document.querySelector(".userImage");
let FirstNameDiv = document.querySelector(".FirstNameDiv");
let lastNameDiv = document.querySelector(".lastNameDiv");
let emailArea = document.querySelector(".emailArea");
let passwordArea = document.querySelector(".passwordArea");
let accCreationDate = document.querySelector(".accCreationDate");
let dashboard = document.querySelector(".dashboard");
let changeProfileImage = document.querySelector(".changeProfileImage");
let signOut = document.querySelector(".signOut");
let deleteAccountBtn = document.querySelector(".deleteAccountBtn");
let homePage = document.querySelector(".homePage");
//click on homepage
homePage &&
  homePage.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
//click on edit
fa_edit && fa_edit.addEventListener("click", () => {
  showEditDiv();
});
//click on cancel
cancel && cancel.addEventListener("click", () => {
  hideUpdateDiv();
});
//click on dashboard
dashboard && dashboard.addEventListener("click", () => {
  window.location.href = "./personalBloggingApp.html";
});
confirm && confirm.addEventListener("click", editFunction);
//click on sign out
signOut && signOut.addEventListener("click", () => {
  Swal.fire("loggged out!");
  console.log("logged out!");
  localStorage.removeItem("uid");
  window.location.href = "./index.html";
});
//click on deactivate account
function deleteAccount() {
  const user = auth.currentUser;
  user
    .delete()
    .then(() => {
      console.log("User account deleted from authentication");
    })
    .catch((error) => {
      console.log("Account deletion error from authentication:", error);
    });
}
deleteAccountBtn && deleteAccountBtn.addEventListener("click", () => {
  deleteAccount();
  let uniqueId = localStorage.getItem("uid");
  let userReference = ref(database, "users/" + "userInfo/" + uniqueId);
  remove(userReference)
    .then((resolve) => {
      Swal.fire("deactivated the account!");
      console.log("account has been deleted from realtime database");
      window.location.href = "./login.html";
    })
    .catch((error) => {
      console.log("error in removing account from realtime database");
    });

  localStorage.removeItem("uid");
});
//function to call values
const callValue = () => {
  let uniqueId = localStorage.getItem("uid");
  let userReference = ref(database, "users/" + "userInfo/" + uniqueId);
  onValue(userReference, (snapshot) => {
    userImage.src = snapshot.val().imageUrl;
    FirstNameDiv.innerText = snapshot.val().firstName;
    lastNameDiv.innerText = snapshot.val().lastName;
    emailArea.innerText = snapshot.val().email;
    accCreationDate.innerText = snapshot.val().signUpDate;
    let loading = document.querySelector(".loading");
    hideLoader();
  });
};
//show loader
const showLoader = () => {
  let loading = document.querySelector(".loading");
  (loading.style.display = "flex")
};
//hide loader
const hideLoader = () => {
  let loading = document.querySelector(".loading");
  loading.style.display = "none";
};
//hide update duv
const hideUpdateDiv = () => {
  let updateDiv = document.querySelector(".updateDiv");
  updateDiv.style.display = "none";
};
// show edit div
const showEditDiv = () => {
  let updateDiv = document.querySelector(".updateDiv");
  updateDiv.style.display = "block";
};
//old password match function
const matchOldPassword = () => {
  let uniqueId = localStorage.getItem("uid");
  let userReference = ref(database, "users/" + "userInfo/" + uniqueId);
  let oldPasswordUser = document.querySelector(".oldPassword");
  onValue(userReference, (snapshot) => {
    let oldPassword = snapshot.val().password;
    if (oldPasswordUser != oldPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "old password is incorrect",
      });
    }
  });
};
