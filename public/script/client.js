console.log('js loaded');
$(document).ready(onReady);

function onReady() {
    console.log('jquery loaded');
    $('.addButton').on('click', addTask( $('.taskIn').val()) );
    getTasks();
}

function getTasks() {
    $.ajax ({
        method: 'GET',
        url: '/task',
        success: function(res){
            console.log('got stuff',res);
        }
    });
    // add task to db
}

function addTask(taskIn) {
    taskIn = { name: task };
    $.ajax ({
        method: 'POST',
        url: '/task',
        data: task,
        success: function(){
            $('.taskIn').val('');
            displayTasks();
        }
    });
}

function displayTasks() {
    
}