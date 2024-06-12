req = new XMLHttpRequest();

tasks1 = document.getElementById("tasks1");
tasks2 = document.getElementById("tasks2");

tokenTodoist = localStorage.getItem("tokenTodoist");

let today = new Date();

let dd = today.getDate();

if (dd < 10) {
    dd = "0" + dd;
}

let mm = today.getMonth() + 1;
if (mm < 10) {
    mm = "0" + mm;
}

let yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
console.log("Сегодня: " + today);

var tomorrowD = new Date();
tomorrowD.setDate(tomorrowD.getDate()+1);

dd = tomorrowD.getDate();

if (dd < 10) {
    dd = "0" + dd;
}

mm = tomorrowD.getMonth() + 1;
if (mm < 10) {
    mm = "0" + mm;
}

yyyy = tomorrowD.getFullYear();

let tomorrow = yyyy + "-" + mm + "-" + dd;
console.log("Завтра: " + tomorrow);

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

    let answer = req.responseText;
    
    answer = JSON.parse(answer)

    console.log("---------------------- задачи ----------------------");
    console.log(answer);

    console.log(" --- Задачи на сегодня: --- ");
    todayTasks = [];

    answer.forEach(element => {
        if (element.due != null) {
            if (element.due.date != null) {
                if (element.due.date == today) {
                    todayTasks.push(element.content);
                }
            }
        }  
    });

    for (let i = 0; i < todayTasks.length; i++) { 
        if (i != todayTasks.length - 1)
            tasks1.innerHTML += '<span class="task">' + todayTasks[i] + '</span><hr align="center" width="100%" size="1" color="#fff">';
        else
            tasks1.innerHTML += '<span class="task">' + todayTasks[i] + '</span>';
    }

    console.log(todayTasks);

    console.log(" --- Задачи на завтра: --- ");
    tomorrowTasks = [];

    answer.forEach(element => {
        if (element.due != null) {
            if (element.due.date != null) {
                if (element.due.date == tomorrow) {
                    tomorrowTasks.push(element.content);
                }
            }
        }  
    });

    for (let i = 0; i < tomorrowTasks.length; i++) { 
        if (i != todayTasks.length - 1)
            tasks2.innerHTML += '<span class="task">' + tomorrowTasks[i] + '</span><hr align="center" width="100%" size="1" color="#fff">';
        else
        tasks2.innerHTML += '<span class="task">' + tomorrowTasks[i] + '</span>';
    }

    console.log(todayTasks);

    console.log("---------------- задачи  кончились ----------------------");
}