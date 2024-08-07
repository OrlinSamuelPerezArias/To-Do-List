const toolsTask  = document.getElementById("tools_task")
const Data = localStorage

class task{
    constructor(nameTask,dateTask, relevanceOption){
        this.nameTask = nameTask
        this.dateTask = dateTask
        this.relevanceOption = relevanceOption
    }
}

const boxTaskUi=(ID, dataTask)=>{
    const boxTask = document.createElement("div")
    boxTask.classList.add("task-box")
    boxTask.setAttribute("id", ID)
    boxTask.innerHTML = `       
        <header class="task-header">
            <h3 id="${ID}-name-task">${dataTask.nameTask}</h3>
        </header>
        <div class="task-details">
            <div >
                <p > ${dataTask.relevanceOption}  ${dataTask.dateTask}</p>
            </div>
            <div>
                <button onclick="deleteTask(${ID})" ><img src="/assets/borrar.png"></button>
                <button onclick="update(${ID})" ><img src="/assets/lapiz.png"></button>
            </div>
        </div>
    `
    return boxTask
}
class taskUI{
    addTask(newTask){
        if (Data.length === 0){
            const h2Element = toolsTask.querySelector('h2');
            toolsTask.remove(h2Element)
        }
        const ID = Data.length + 1
        const box = boxTaskUi(ID, newTask)
        toolsTask.appendChild(box)
        Data.setItem(ID, JSON.stringify({...newTask}))
    }
    deleteTask(ID){
        const element = document.getElementById(ID)
        toolsTask.removeChild(element)
        Data.removeItem(ID)
    }
    readTask(){
        if (Data.length != 0) {
            for (let i = 1; i <= Data.length; i+=1 ){
                const taskClave = Data.key(i)
                const task = Data.getItem(taskClave)
                const taskData = JSON.parse(task)
                const box = boxTaskUi(taskClave,taskData)
                toolsTask.appendChild(box)

            }
        } else {
            const elementH2 = document.createElement("h2")
            elementH2.textContent = "A un no existen tarea"
            toolsTask.appendChild(elementH2)
        }
    }
    updateTask(ID, setTask){
        const elementNameTask = document.getElementById(ID+"-name-task")
        const elementRelevanceTask = document.getElementById(ID+"-relevance-task")
        const elementDateTask = document.getElementById(ID+"-date-task")
        elementNameTask.textContent = setTask.nameTask
        elementRelevanceTask.textContent = setTask.relevanceOption
        elementDateTask.textContent = setTask.dateTask

        const updateNewTask = document.getElementById("update_new_task")
        const newTask = document.getElementById("add_new_task")
        updateNewTask.setAttribute("class", "none_task")
        newTask.setAttribute("class", "block_task")

        Data.setItem(ID, JSON.stringify({...setTask}))


    }
    deleteTaskAll(){
        Data.clear()
    }
}
const UI = new taskUI()
const deleteTask=(ID)=>{
    UI.deleteTask(ID)
}

const update=(ID)=>{
    const nameTask = document.getElementById("name_task") 
    const dateTask = document.getElementById("date_task")
    const relevanceOption = document.getElementById("relevance-option")
    const getTask = Data.getItem(ID)
    const taskData = JSON.parse(getTask)

    nameTask.value = taskData.nameTask
    dateTask.value = taskData.dateTask
    relevanceOption.value = taskData.relevanceOption

    const updateNewTask = document.getElementById("update_new_task")
    const newTask = document.getElementById("add_new_task")
    updateNewTask.setAttribute("class", "block_task")
    newTask.setAttribute("class", "none_task")

    updateNewTask.addEventListener("click", (e)=>{
        e.preventDefault()
        const setTask = new task(nameTask.value, dateTask.value, relevanceOption.value)
        UI.updateTask(ID, setTask)

    })


}

document.getElementById("add_new_task").addEventListener("click", (e)=>{
    e.preventDefault()
    const nameTask = document.getElementById("name_task").value
    const dateTask = document.getElementById("date_task").value
    const relevanceOption = document.getElementById("relevance-option").value

    const newTask = new task(nameTask,dateTask, relevanceOption)
    UI.addTask(newTask)
})

const main = ()=>{
    UI.readTask()
}
main()