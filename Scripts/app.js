function saveTask() {
   
    const title = $('#txtTitle').val();
    const description = $('#txtDescription').val(); 
    const color = $('#selColor').val();
    const date = $('#selDate').val();
    const status = $('#selStatus').val();
    const budget = $('#numBudget').val();

    const data = new Task(title, description, color, date, status, budget);
    console.log(data);

    displayTask(data);
}

function displayTask(task) {
    const taskHtml = `
        <div class="card mb-3" style="border-left: 5px solid ${task.color};">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-text"><small class="text-muted">Status: ${task.status} | Date: ${task.date} | Budget: $${task.budget}</small></p>
            </div>
        </div>
    `;
    $('#getMethod').append(taskHtml);
}

function init() {
    $('#btnSave').click(saveTask);
}

window.onload = init;
