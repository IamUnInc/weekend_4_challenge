var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.post('/', function (req, res) {
  var task = req.body;

  console.log(task);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO tasks (task_content)'
                      + 'VALUES ($1)',
                      [task.task_entry],
                    function (err, result){
                      done();
                      console.log('i work');
                      if(err) {
                        res.sendStatus(500);
                      }
                      res.sendStatus(201);
                    });

  });
});

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM tasks', function(err, result) {
      done(); //closes connection

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.delete('/:id', function (req, res) {
  console.log("i work");
  var id = req.params.id;
console.log(id);
  pg.connect(connectionString, function (err, client, done) {
    console.log("connect");
    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM tasks ' +
                  'WHERE id = $1',
                  [id],
                  function (err, result) {
                    console.log('result', result);
                    done();

                    if (err) {
                      console.log("err", err);

                      res.sendStatus(500);
                      return;
                    }

                    res.sendStatus(200);
                  }
                )
  });
});

module.exports = router
