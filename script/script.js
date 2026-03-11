
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
            icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
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

const loadLessons = () =>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>displayLesson(data.data))
}


const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
        // 1. Loop er bhetorei priority check kore color thik koro
        let dynamicColor = "";
        let dynamicBorder = "";

        if (lesson.status === "open") {
            dynamicColor = "border-red-500 text-red-600";
            dynamicBorder = "border-green-500";
        } else if (lesson.status === "Closed") {
            dynamicColor = "border-yellow-500 text-yellow-600";
            dynamicBorder = "border-purple-500";
        } else {
            dynamicColor = "border-gray-500 text-gray-600";
            dynamicBorder = "border-purple-500";
        }

        const cardDiv = document.createElement("div");
        
        // 2. Ekhane dynamic class gulo bosiye dao
        cardDiv.innerHTML = `
            <div onclick="my_modal_5.showModal()" class="bg-white space-y-7 p-5 rounded-xl shadow-lg border-t-[5px] ${dynamicBorder} h-full">
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