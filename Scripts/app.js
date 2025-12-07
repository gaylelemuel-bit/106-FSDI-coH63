const API_URL = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask() {
   
    const title = $('#txtTitle').val();
    const description = $('#txtDescription').val(); 
    const color = $('#selColor').val();
    const date = $('#selDate').val();
    const status = $('#selStatus').val();
    const budget = $('#numBudget').val();

    const data = new Task(title, description, color, date, status, budget);
    console.log(data);

    $.ajax({
        type: "POST",
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(created){
            console.log("task created:", created);
            displayTask(created);
        },
        error: function(error){
            console.log("Error:", error);
        }

    });
}
function loadTask(){
    $.ajax({
        type: "GET",
        url: API_URL,
        dataType: "json",
        success: function(tasks){
            console.log(tasks)
            for(let i= 0; i<tasks.length;i++){
            let temp =tasks[i];
            if(temp.name === "lemuel"){
            displayTask(temp);
            }
        }
        //tasks.forEach(displayTask);
        }
    });
}
function updatedTask(){
    $.ajax({
        type: "PUT",
        url:"https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/3",
     contentType: "application/json",
     success: function(response){
        console.log("Task updated", response)
     },
        error: function(Error){
            console.log(Error);
        }
     });
}
function deleteTask(taskId) {
    console.log("Attempting to delete task:", taskId);
    $.ajax({
        type: "DELETE",
        url: `${API_URL}/${taskId}`, 
        success: function(response) {
            console.log("Task deleted successfully:", response);
            $(`#task-${taskId}`).remove(); 
        },
        error: function(error) {
            console.log("Error deleting task:", error);
            alert("Could not delete the task.");
        }
    });
}
    
function displayTask(task) {
    const data =`
    <div class="task" id="task-${task.id}" style="border-color:${task.color}">
    <div class=info">
    <h4>${task.title}</h4>
    <p>${task.description}</p>
    </div>
    <label class="date">${task.date}</label>
    <label class="status">${task.status}</label>
    <label class="budget">${task.budget}</label>
    <button class="btn-delete" onclick="deleteTask('${task.id}')">Delete</button>
    </div>
    `
    $(".List").append(data)

}

// test the connecto to th API 
function testRequest(){
$.ajax({
    type : "GET",
    url : API_URL,
    success: function (response) {
        console.log("API Response", response);
    },
    error: function (error) {
        console.log("Error", error);
    }
    //data: JSON.stringify(data),
    //contentType: "application/json";
})
}

function init() {
    loadTask();
    $('#btnSave').click(saveTask);
}

window.onload = init;
