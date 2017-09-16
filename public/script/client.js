console.log('js loaded');
$(document).ready(onReady);

function onReady() {
    console.log('jquery loaded');
    $('.addButton').on('click', addTask);
    $('.content').on('click', '.completeTask', completeTask);
    $('.content').on('click', '.delTask', delTask);
    
    getTasks();
}

function completeTask() {

}

function delTask() {
    delID = {
        id: $(this).parent().parent().data('id'),
    };  
    $.ajax ({
        method: 'DELETE',
        url: '/task/'+delID,
        success: function(resp){
            console.log('deleted ok');
            getTasks();
        }

    });
}

function getTasks() {
    $.ajax ({
        method: 'GET',
        url: '/task',
        success: function(res){
            console.log('get response:',res);
            displayTasks(res);
        }
    });
}

function addTask() {
    taskIn = { 
        name: $('.taskIn').val()
    };
    $.ajax ({
        method: 'POST',
        url: '/task',
        data: taskIn,
        success: function(res){
            console.log('add /POST', res);
            $('.taskIn').val('');
            getTasks();
        }
    });
}

function displayTasks(array) {    
    $('.content').empty();
    for (var index = 0; index < array.length; index++) {
        var $display = ($( ('<div>'), {class:'main'} ).data('id', array[index].id));
        $display.append( $( ('<div>'), {class: 'card'} ) ); 
        $display.append( $( ('<h3>' ), {class: 'card-header primary-color white-text', text: array[index].name} ) );
        var $body = ( $(('<div>'), {class: 'card-body'} ));
        $body.append( $( ('<button>'), {class: 'btn btn-primary completeTask', text: 'Complete Task'} ) );
        $body.append( $( ('<button>'), {class: 'btn btn-danger delTask', text: 'Delete Task'} ) );
        $display.append($body);
        $('.content').append($display);
    }
}