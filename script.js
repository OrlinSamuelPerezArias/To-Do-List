const toolsTask  = document.getElementById("tools_task")

class task{
    constructor(nameTask,dateTask, relevanceOption){
        this.nameTask = nameTask
        this.dateTask = dateTask
        this.relevanceOption = relevanceOption
    }
}


class taskUI{
    addTask(newTask){
        const boxTask = document.createElement("div")
        const ID = localStorage.length + 1
        boxTask.setAttribute("id", ID)
        boxTask.innerHTML = `
            <strong>${newTask.nameTask}</strong>
            <strong>${newTask.dateTask}</strong>
            <strong>${newTask.relevanceOption}</strong>
        `
        toolsTask.append(boxTask)
        localStorage.setItem(ID, JSON.stringify(newTask))
    }
    deleteTask(ID){
        console.log("")
    }
    readTask(){
        console.log("")

    }
    update(ID){
        console.log("")
    }
    deleteTaskAll(){

        console.log("")


    }


}


document.getElementById("add_new_task").addEventListener("click", (e)=>{
    e.preventDefault()
    const nameTask = document.getElementById("name_task").value
    const dateTask = document.getElementById("date_task").value
    const relevanceOption = document.getElementById("relevance-option").value

    const newTask = new task(nameTask,dateTask, relevanceOption)
    const UI = new taskUI()
    UI.addTask(newTask)
})
