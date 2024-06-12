req = new XMLHttpRequest();

tokenTodoist = localStorage.getItem("tokenTodoist");

UpdateF();

setInterval(UpdateF, 1000 * 60 * 5);

function UpdateF() {
    req.open(
        "GET",
        "https://api.todoist.com/rest/v2/tasks",
        false
      );
    req.setRequestHeader('Authorization', 'Bearer ' + tokenTodoist);
    req.send(null);

    var answer = req.responseText;
    console.log(answer);
}