const getAll = document.getElementById('get-all');
getAll.innerHTML = "";
// load all types
async function loadAll() {
  const res = await 
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await res.json();
  displayAll(data.data);
}

// display
function displayAll(allTabs){
allTabs.forEach((allTab) => {
const allCard = document.createElement('div');
allCard.innerHTML = `

            <div id="get-all" class="card bg-base-100 rounded-none shadow-sm">
                <div class="card-body border border-gray-200 rounded-lg">
                    <div class="flex justify-between items-center">
                        <img src="assets/Open-Status.png" alt="" />
                        <div class="badge badge-secondary text-[#EF4444] font-medium bg-[#FEECEC]">
                            HIGH
                        </div>
                    </div>
                    <h2 class="card-title font-semibold text-lg my-2">
                        Fix navigation menu on mobile devices
                    </h2>
                    <p class="text-[#64748B]">
                        The navigation menu doesn't collapse properly on mobile devices...
                    </p>
                    <div class="card-actions justify-start my-2">
                        <div class="badge badge-secondary rounded-full text-[#EF4444] font-medium bg-[#FEECEC]">
                            <img src="assets/incect.png" alt="" /> BUG
                        </div>
                        <div class="badge badge-secondary rounded-full text-[#D97706] font-medium bg-[#FFF8DB]">
                            <img src="assets/dot.png" alt="" /> HELP WANTED
                        </div>
                    </div>
                    <div class="border-t border-gray-200 p-0 space-y-2 mt-2 pt-3">
                        <p class="text-[#64748B]">#1
                            by john_doe</p>
                        <p class="text-[#64748B]">1/15/2024</p>
                    </div>
                </div>
            </div>
`
getAll.appendChild(allCard);
}) 
}

loadAll();


// get login button

document.getElementById('login-btn').addEventListener("click" , function(){
  const inputUser = document.getElementById('input-user')
  const inputPassword = document.getElementById('input-password')
  inputPassword.innerText = ""

  if (inputUser.value == "admin" && inputPassword.value == "admin123"){
    alert('login successful');
    window.location.assign("./home.html");
  }
  else{
    alert('Login Failed');
    return;
  }
  
  inputUser.innerText = ""

})

