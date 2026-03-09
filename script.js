const getAll = document.getElementById("get-all");
getAll.innerHTML = "";
// count
const count = document.getElementById("count");
// loading spinner
const loadingSpinner = document.getElementById("load-spinner");

//   get count
function getCount() {
  count.innerText = getAll.children.length;
}

// load all types
async function loadAll() {

  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  
  const data = await res.json();
  loadingSpinner.classList.add("hidden");

  displayAll(data.data);
}

// display
function displayAll(allTabs) {
  allTabs.forEach((allTab) => {
    const allCard = document.createElement("div");
    allCard.innerHTML = `
            <div class="h-full py-6 px-5 border w-full border-gray-200 rounded-lg">
                <div class="flex justify-between items-center">
                <div>
                ${
                  allTab.status == "open"
                    ? ` <img src="./assets/Open-Status.png" alt="" /> `
                    : ` <img src="./assets/Closed- Status .png" alt="" /> `
                }
                </div>
                    <div class="badge badge-secondary text-[#EF4444] font-medium bg-[#FEECEC]">
                        ${allTab.priority}
                    </div>
                </div>
                <h2 class="card-title font-semibold text-lg my-3">
                     ${allTab.title}
                </h2>
                <p class="text-[#64748B] line-clamp-2 mb-4">
                     ${allTab.description}
                </p>
                <div class="flex  justify-start gap-2 my-2">
                    <div class="badge badge-secondary rounded-full text-[#EF4444] font-medium bg-[#FEECEC]">
                        <img src="assets/incect.png" alt="" /> BUG
                    </div>
                    <div class="badge badge-secondary rounded-full text-[#D97706] font-medium bg-[#FFF8DB]">
                        <img src="assets/dot.png" alt="" /> HELP WANTED
                    </div>
                </div>
                <div class="border-t border-gray-200 p-0 space-y-2 mt-5 pt-3">
                    <p class="text-[#64748B]">#1
                        by ${allTab.author}</p>
                    <p class="text-[#64748B]">${allTab.createdAt}</p>
                </div>
            </div>
`;
    getAll.appendChild(allCard);
    getCount();
  });
}

loadAll();

// get login button

document.getElementById("login-btn").addEventListener("click", function () {
  const inputUser = document.getElementById("input-user");
  const inputPassword = document.getElementById("input-password");
  inputPassword.innerText = "";

  if (inputUser.value == "admin" && inputPassword.value == "admin123") {
    window.location.assign("./home.html");
  } else {
    alert("Login Failed");
    return;
  }

  inputUser.innerText = "";
});
