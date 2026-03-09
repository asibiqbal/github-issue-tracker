// all calls
const getAll = document.getElementById("get-all");
const count = document.getElementById("count");
const loadingSpinner = document.getElementById("load-spinner");

const btnAll = document.getElementById('btn-all');
const btnOpen = document.getElementById('btn-open');
const btnClose = document.getElementById('btn-close');

// search elements
const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search'); 

// global variable to store all issues
let allData = []; 

// toggle and active btn 
function activeBtn(activeBtn) {
    [btnAll, btnOpen, btnClose].forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-outline', 'text-[#64748B]');
    });
    activeBtn.classList.remove('btn-outline', 'text-[#64748B]');
    activeBtn.classList.add('btn-primary', 'text-white');
}

// calling API
async function loadAll(filterStatus = 'all') {
    getAll.innerHTML = "";
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    
    // Store data globally for search
    allData = data.data; 

    let issuesToDisplay = allData;

    // filter open & closed
    if (filterStatus === 'open') {
        issuesToDisplay = allData.filter(item => item.status === 'open');
    } else if (filterStatus === 'close') {
        issuesToDisplay = allData.filter(item => item.status === 'closed');
    }

    displayAll(issuesToDisplay);
    
    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}

// display function
function displayAll(allTabs) {
    getAll.innerHTML = "";
    
    allTabs.forEach((allTab) => {
        const allCard = document.createElement("div");
        
        // border colors (3px top border)
        const borderTop = allTab.status === "open" ? "border-t-green-500" : "border-t-purple-500";

        // badge styles
        let badgeColors = "";
        const priority = allTab.priority.toLowerCase();

        if (priority === "high") {
            badgeColors = "text-[#EF4444] bg-[#FEECEC]"; 
        } else if (priority === "medium") {
            badgeColors = "text-[#D97706] bg-[#FFF8DB]"; 
        } else if (priority === "low") {
            badgeColors = "text-[#64748B] bg-[#F1F5F9]";
        }

        allCard.innerHTML = `
            <div class="h-full py-6 px-5 border-x border-b border-t-[4px] ${borderTop} w-full border-gray-200 rounded-lg">
                <div class="flex justify-between items-center">
                    <div>
                        ${allTab.status === "open"
                            ? ` <img src="./assets/Open-Status.png" alt="" /> `
                            : ` <img src="./assets/Closed- Status .png" alt="" /> `
                        }
                    </div>
                    <div class="badge border-none font-medium px-3 ${badgeColors}">
                        ${allTab.priority.toUpperCase()}
                    </div>
                </div>
                <h2 class="card-title font-semibold text-lg my-3">
                     ${allTab.title}
                </h2>
                <p class="text-[#64748B] line-clamp-2 mb-4">
                     ${allTab.description}
                </p>
                <div class="flex justify-start gap-2 my-2">
                    <div class="badge border-none rounded-full text-[#EF4444] font-medium bg-[#FEECEC]">
                        <img src="assets/insect.png" alt="" /> BUG
                    </div>
                    <div class="badge border-none rounded-full text-[#D97706] font-medium bg-[#FFF8DB]">
                        <img src="assets/dot.png" alt="" /> HELP WANTED
                    </div>
                </div>
                <div class="border-t border-gray-200 p-0 space-y-2 mt-5 pt-3">
                    <p class="text-[#64748B]">#1 by ${allTab.author || 'User'}</p>
                    <p class="text-[#64748B]">${allTab.createdAt || '1/15/2024'}</p>
                </div>
            </div>
        `;
        getAll.appendChild(allCard);
    });
    
    //counts update
    count.innerText = allTabs.length;
}

// search functions
btnSearch.addEventListener('click', () => {
    const searchText = inputSearch.value.toLowerCase();
    
// search title and description
    const searchResult = allData.filter(issue => 
        issue.title.toLowerCase().includes(searchText) || 
        issue.description.toLowerCase().includes(searchText)
    );

    displayAll(searchResult);
});

// button clicks
btnAll.addEventListener('click', () => {
    activeBtn(btnAll);
    loadAll('all');
});

btnOpen.addEventListener('click', () => {
    activeBtn(btnOpen);
    loadAll('open');
});

btnClose.addEventListener('click', () => {
    activeBtn(btnClose);
    loadAll('close');
});

// load all
loadAll();