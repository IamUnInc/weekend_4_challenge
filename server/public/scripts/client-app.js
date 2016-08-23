$(document).ready(function () {
  console.log("i totally work")
  getTasks();
$('#form-submit').on('click', postTask);
$('#task-list').on('click', '.delete', deleteTask);

});

function postTask() {
  event.preventDefault();
  var task = {};

  $.each($('#todo-list').serializeArray(), function (i, field) {
    task[field.name] = field.value
  });
  console.log(task);
  $.ajax({
    type: 'POST',
    url: '/todo',
    data: task,
    success: function () {
      console.log('POST /todo works!');
      getTasks();
    },
    error: function (response) {
      console.log('POST /todo does not work...');
    }
  });
}

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: function (tasks) {
      $('#task-list').empty();
      console.log('GET /todo returns:', tasks);
      // appendTasks(tasks);
      tasks.forEach(function (task) {
        var $el = $('<div id="thingTodo"></div>');
        $el.append(task.task_content);
        $el.data('taskId', task.id);
        $el.append('<button class="complete">Complete</button>');
        $el.append('<button class="delete">Delete</button>');

        $('#task-list').append($el);

      });
    },

    error: function (response) {
      console.log('GET /tasks fail');
    },
  });
}

function deleteTask() {
  event.preventDefault();
  console.log('click');
    var taskId = $(this).parent().data('taskId');
    console.log(taskId);
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + taskId,
      success: function () {
        console.log('DELETE success');
        $('#task-list').empty();
        getTasks();
      },
      error: function () {
        console.log('DELETE faliled');
      }
    });
}
