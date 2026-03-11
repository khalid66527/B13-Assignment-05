const createElements = (arr) =>{
    const htmlElements = arr.map((el) => `<button class="btn btn-outline rounded-2xl bg-red-100 text-red-600"> <i class="fa-solid fa-shield-cat"></i>${el}</button >`);
    return (htmlElements.join(" "));
};

const loadLessons = () =>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>displayLesson(data.data))
}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }
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
           
        `;

        levelContainer.append(cardDiv)
    }

)}
loadLessons();