const addBtn = document.getElementById("addTask");
const saveBtn = document.getElementById("saveTask");
const cancelBtn = document.getElementById("cancelTask");
let tasks = [];
let counterTasks = 0;
let numberEdit = null;

addBtn.addEventListener("click", () => {
    document.getElementById("alert").style.display = "flex";
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
});

cancelBtn.addEventListener("click", () => {
    document.getElementById("alert").style.display = "none";
    
});

saveBtn.addEventListener("click", () => {
    const title = document.getElementById("taskTitle").value.trim();
    const desc = document.getElementById("taskDesc").value.trim();
    if (!title) return;

    if(numberEdit !== null){
        let editTask = tasks.find(it => it.id === numberEdit);
        editTask.title = title;
        editTask.description = desc;

        let div = document.querySelector(`[data-id='${editTask.id}']`);
        div.querySelector("strong").innerText = editTask.title;
        numberEdit = null;
    }
    else{
        let newTask = {
        id: counterTasks++,
        title: title,
        description: desc,
        done: false
        };
        tasks.push(newTask);
        addTaskInList(newTask);
    }
    
    document.getElementById("alert").style.display = "none";
});

function addTaskInList(task){
    let div = document.createElement("div");
    div.className = "taskItem";
    div.dataset.id = task.id;
    div.innerHTML = `
        <input type="checkbox" ${task.done ? "checked" : ""}>
        <strong>${task.title}</strong>
        <button class="editBtn btn">Open</button>
        <button class="deleteBtn btn">Delete</button>
    `;
    
    div.querySelector("input").addEventListener("change", e => {
        task.done = e.target.checked;
    });



    div.querySelector(".editBtn").addEventListener("click", () => {
        numberEdit = task.id;
        document.getElementById("nameAlert").textContent = "Edit";
        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskDesc").value = task.description;
        document.getElementById("alert").style.display = "flex";
    });

    div.querySelector(".deleteBtn").addEventListener("click", () => {
        tasks = tasks.filter(it => it.id !== task.id);
        div.remove();
    });



    document.getElementById("listDoing").appendChild(div);
}