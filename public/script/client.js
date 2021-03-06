console.log('js loaded');
$(document).ready(onReady);


function onReady() {
    console.log('jquery loaded');
    $('.addButton').on('click', addTask);
    $('.containerList').on('click', 'label', completeTask);
    $('.items').on('click', '.fa', delTask);
    getTasks();
}

function completeTask() { // swap tasks complete:true/false
    updateID = {
        id: $(this).data('id')
    };
    $.ajax({
        method: 'PUT',
        url: '/task/',
        data: updateID,
        success: function () {
            getTasks();
        }
    });
}

function delTask() { // open modal to delete task
    delID = {
        id: $(this).prev('label ').data('id'),
    };
    $.confirm({ // jquery-confirm modal
        title: 'Delete Task?',
        content: false,
        type: 'red',
        backgroundDismiss: true,
        theme: 'supervan',
        smoothContent: true,
        animation: 'none',
        buttons: {
            tryAgain: {
                text: 'Confirm',
                btnClass: 'btn-red',
                action: function () {
                    $.ajax({ // ajax call
                        method: 'DELETE',
                        url: '/task/' + delID.id,
                        success: function (resp) {
                            getTasks();
                        }
                    });
                }
            },
            cancel: function () {
            }
        }
    });
}

function getTasks() { // grab tasks from DB, re-render onto page
    $.ajax({
        method: 'GET',
        url: '/task',
        success: function (res) {
            console.log('get response:', res);
            displayTasks(res);
        }
    });
}

function addTask() { // send task to db
    taskIn = {
        name: $('.taskIn').val()
    };
    $.ajax({
        method: 'POST',
        url: '/task',
        data: taskIn,
        success: function (res) {
            console.log('add /POST', res);
            $('.taskIn').val('');
            getTasks();
        }
    });
}

function displayTasks(array) { // re-render tasks from db, onto dom, sort into done/not-done
    $('.items').html('');
    $('.items').append($(('<h2>'), {
        text: 'Not Done',
        class: 'undone'
    }));
    $('.items').append($(('<h2>'), {
        text: 'Done',
        class: 'done'
    }));
    

    for (var index = 0; index < array.length; index++) {
        console.log(array[index].complete);

        if (array[index].complete) { // check if tasks are done/not done, and append them accordingly
            $('.done').append($(('<input>'), {
                id: 'item' + index,
                type: 'checkbox',
                class: 'taskRow'
            }).prop('checked', true));

            $('.done').append($(('<label>'), {
                text: array[index].name
            }).prop('for', 'item' + index).data('id', array[index].id).css('display', 'none').fadeIn('slow'));

            $('.done').append($(('<i>'), {
                class: 'fa fa-trash-o fa-2'
            }));


        } else {
            $('.undone').append($(('<input>'), {
                id: 'item' + index,
                type: 'checkbox',
                class: 'taskRow'
            }).prop('checked', false));

            $('.undone').append($(('<label>'), {
                text: array[index].name
            }).prop('for', 'item' + index).data('id', array[index].id).css('display', 'none').fadeIn('slow'));
            $('.undone').append($(('<i>'), {
                class: 'fa fa-trash-o fa-2'
            }));
        }
    }
    $('.done > label:first').css('margin-top', '5px');
    $('.undone > label:first').css('margin-top', '5px');
    
}