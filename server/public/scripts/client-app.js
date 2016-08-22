$(document).ready(function () {
  console.log("i totally work")


});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: function (tasks) {
      console.log('GET /todo returns:', tasks);
      appendTasks(tasks);
    },

    error: function (response) {
      console.log('GET /tasks fail');
    },
  });
}

function appendTasks(tasks) {
  tasks.forEach(function (task) {
    var $el = $('<div></div>');
    $el.append('<td>' + + '</td>');
    var taskProperties = ['id', 'task', 'entry_date'];
    petProperties.forEach(function (property) {
      console.log("property: ", property)
      var $input = $('<input type = "text" id="' + property + '" name="' + property + '" />');
      $input.val(task[property]);
      $el.append($input);
    });


    console.log(task);
    $el.data('TaskId', task.id);
    $el.append('<td><button class="update">Update</button></td>');
    $el.append('<td><button class="delete">Delete</button></td>');

    $('#task-table').children().last().append($el);
  });
}
