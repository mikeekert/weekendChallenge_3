console.log('js loaded');
$(document).ready(onReady);

function onReady() {
    console.log('jquery loaded');
    $('.addButton').on('click', addTask);
    $('.container').on('click', 'label', completeTask);
    $('.items').on('click', '.fa', delTask);
    getTasks();
}

function completeTask() {
    updateID = {
        id: $(this).data('id')
    };

    console.log(updateID);
    $.ajax({
        method: 'PUT',
        url: '/task/',
        data: updateID,
        success: function () {
            getTasks();
        }
    });
}

function delTask() {
    var answer = confirm('Are you sure?');
    if (answer) {
        delID = {
            id: $(this).prev('label ').data('id'),
        };
        console.log('Client deleting ID:', delID.id);
        $.ajax({
            method: 'DELETE',
            url: '/task/' + delID.id,
            success: function (resp) {
                console.log('deleted ok', resp);
                getTasks();
            }
        });
    }
}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/task',
        success: function (res) {
            console.log('get response:', res);
            displayTasks(res);
        }
    });
}

function addTask() {
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

function displayTasks(array) {
    $('.items').html('');

    $('.items').append($(('<h2>'), {
        text: 'Done',
        class: 'done'
    }));
    $('.items').append($(('<h2>'), {
        text: 'Not Done',
        class: 'undone'
    }));

    for (var index = 0; index < array.length; index++) {
        console.log(array[index].complete);

        if (array[index].complete) {
            $('.done').append($(('<input>'), {
                id: 'item' + index,
                type: 'checkbox',
                class: 'taskRow'
            }).prop('checked', true));

            $('.done').append($(('<label>'), {
                text: array[index].name
            }).prop('for', 'item' + index).data('id', array[index].id).css('display','none').fadeIn('slow'));

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
            }).prop('for', 'item' + index).data('id', array[index].id).css('display','none').fadeIn('slow'));
            $('.undone').append($(('<i>'), {
                class: 'fa fa-trash-o fa-2'
            }));
        }
    }
}