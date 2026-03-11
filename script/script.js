
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
const loadLessons = () =>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>displayLesson(data.data))
}


const displayLesson = (lessons)=>{
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
        console.log(lesson);
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML=`
            <div class="bg-white  space-y-7 p-5 rounded-xl shadow-lg border-t-6 h-full">
                <div class=" flex justify-between">
                <img class="w-8 h-8" src="./assets/Open-Status.png" alt="">
                <button class="btn rounded-2xl">${lesson.priority}</button>
                </div>
                <div class="">
                    <h2 class="font-bold text-xl">${lesson.title}</h2>
                    <p class="text-gray-500">${lesson.description}</p>
                </div>
                <div class=" flex gap-3">${createElements(lesson.labels)}</div>
                <hr class="opacity-[30%] ">
                <div class=" flex justify-between">
                    <span class="font-bold"># ${lesson.author}</span>
                    <span class="text-gray-500">${lesson.updatedAt}</span>
                </div>
            </div>
           
        `;

        levelContainer.append(cardDiv)
    }

)}
loadLessons();