
const createElements = (arr) => {
    const htmlElements = arr.map((el) => {
        let color = "";
        let icon = "";
        if(el === "bug"){
            icon = '<i class="fa-solid fa-shield-cat"></i>';
            color = "bg-red-100 text-red-600";
        }
        else if(el === "help wanted"){
            icon = '<i class="fa-solid fa-circle-radiation"></i>';
            color = "bg-yellow-100 text-yellow-600";
        }
        else if(el === "enhancement"){
            icon = '<i class="fa-solid fa-seedling"></i>';
            color = "bg-green-100 text-green-600";
        }
        else if(el === "good first issue"){
            icon = '<i class="fa-solid fa-seedling"></i>';
            color = "bg-blue-100 text-blue-600";
        }
        else if(el === "documentation"){
            icon = '<i class="fa-solid fa-book"></i>';
            color = "bg-purple-100 text-purple-600";
        }
        else{
            icon = '<i class="fa-solid fa-tag"></i>';
            color = "bg-gray-100 text-gray-600";
        }
        return `
        <button class="btn btn-outline rounded-2xl ${color} flex items-center gap-1">
            ${icon} ${el}
        </button>
        `;
    });
    return htmlElements.join(" ");
};



const loadDetail= async(id) => {
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res .json();
    displayDetails(details.data)
}

const displayDetails = (word) =>{
    console.log(word);
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML  = `

            <div class=" p-5 space-y-5">
                <div class="">
                    <h2 class="font-bold text-2xl">${word.title}</h2>
                    <div class=" flex gap-2 items-center">
                        <span class="bg-green-700 p-2 rounded-2xl text-white">${word.status}</span>
                        <span>Opened by </span>
                        <span class="font-bold">#${word.author}</span>
                        <span>${new Date(word.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="flex gap-3 flex-wrap">
                    <div class="flex gap-3 flex-wrap">${createElements(word.labels)}</div>

                </div>
                <p class="text-gray-500">${word.description}</p>
                <div class=" bg-gray-100 flex justify-between">
                    <div class="">
                        <p class="text-gray-500">Assignee:</p>
                        <p class="fint-bold"># ${word.author}</p>
                    </div>
                    <div class="">
                        <p class="text-gray-500">Priority:</p>
                        <button class="btn bg-red-600 text-white rounded-2xl border px-4 py-1">
                        ${word.priority}
                        </button>
                    </div>
                </div>
            
            </div>
    
    
    `;
     document.getElementById("my_modal").showModal();

}
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"



const filterIssues = (status) => {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('btn-primary'));
    
    const activeBtn = document.getElementById(`btn-${status}`);
    if (activeBtn) {
        activeBtn.classList.add('btn-primary');
    }
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
        const allIssues = data.data;
        let filterwords;
        if (status === "all") {
            filterwords = allIssues;
        } 
        else if (status === "open") {
            filterwords = allIssues.filter(word => word.status.toLowerCase() === "open");
        } 
        else if (status === "closed") {
            filterwords = allIssues.filter(word => word.status.toLowerCase() === "closed");
        } 
        else {
            filterwords = allIssues;
        }
        displayLesson(filterwords);
    })
}


const loadLessons = () =>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>displayLesson(data.data))
}



const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
     
        let dynamicBorder = ""; 
        let dynamicColor = ""; 
        
        if (lesson.status === "open") {
            dynamicBorder = "border-green-500";
        } else {
            dynamicBorder = "border-purple-500";
        }
        //  Priority onujayi Button Color
        if (lesson.priority === "high") {
            dynamicColor = "border-red-500 text-red-600 bg-red-100";
        } else if (lesson.priority === "medium") {
            dynamicColor = "border-yellow-500 text-yellow-600 bg-yellow-100";
        } else {
            dynamicColor = "border-gray-500 text-gra-600 bg-gray-200";
        }


        const cardDiv = document.createElement("div");
        
        //  Ekhane dynamic class gulo bosiye dao
        cardDiv.innerHTML = `
            <div onclick="loadDetail(${lesson.id})" class="bg-white space-y-7 p-5 rounded-xl shadow-lg border-t-[5px] ${dynamicBorder} h-full">
                <div class="flex justify-between">
                    <img class="w-8 h-8" src="./assets/Open-Status.png" alt="">
                    <button class="btn rounded-2xl border ${dynamicColor} px-4 py-1">
                        ${lesson.priority}
                    </button>
                </div>
                <div>
                    <h2 class="font-bold text-xl">${lesson.title}</h2>
                    <p class="text-gray-500">${lesson.description}</p>
                </div>
                <div class="flex gap-3 flex-wrap">${createElements(lesson.labels)}</div>
                <hr class="opacity-[30%]">
                <div class="flex justify-between items-center">
                    <span class="font-bold"># ${lesson.author}</span>
                    <span class="text-gray-500 text-sm">${new Date(lesson.updatedAt).toLocaleDateString()}</span>
                </div>
            </div>
        `;

        levelContainer.append(cardDiv);
    });
};
loadLessons();

document.getElementById("search-btn").addEventListener("click",() =>{
    const input = document.getElementById("search-input");
    const searchValue = input.value.trim().toLowerCase() ;
    console.log(searchValue);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>{
        const allwords  = data.data;
        console.log(allwords);
        const filterwords = allwords.filter((word) => word.title.toLowerCase().includes(searchValue)


        )
        displayLesson(filterwords)

    })
})

