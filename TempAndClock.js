token = "123";

      if (localStorage.getItem("token") && localStorage.getItem("tokenTodoist") && localStorage.getItem("tokenCoord")) {
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("tokenTodoist"));
        console.log(localStorage.getItem("tokenCoord"));
        elem = document.getElementById("fc");
        elem.parentNode.removeChild(elem);
      } else {
        elem = document.getElementById("content");
        elem.parentNode.removeChild(elem);
        document
          .getElementById("submitB")
          .addEventListener("click", function (e) {
            console.log(document.getElementById("token").value);
            console.log(document.getElementById("tokenTodoist").value);
            localStorage.setItem(
              "token",
              document.getElementById("token").value
            );
            localStorage.setItem(
              "tokenTodoist",
              document.getElementById("tokenTodoist").value
            );
            localStorage.setItem(
              "tokenCoord",
              document.getElementById("tokenCoord").value
            );
          });
      }

      token = localStorage.getItem("token");
      tokenCoord = localStorage.getItem("tokenCoord");

      req = new XMLHttpRequest();
      req2 = new XMLHttpRequest();
      req3 = new XMLHttpRequest();

      cl1 = document.getElementById("clock");
      cl2 = document.getElementById("clock2");
      rassvet = document.getElementById("rassvet");
      zakat = document.getElementById("zakat");

      now = new Date();
      day = now.getDate();
      Hour = 0;
      Minutes = 0;
      month = 0;

      dvoet = false;

      if (day % 3 == 0) document.getElementById("body").classList.add("b2");
      else if (day % 2 == 0)
        document.getElementById("body").classList.add("b3");
      else document.getElementById("body").classList.add("b1");

      UpdateF();
      UpdateF2();

      setInterval(UpdateF, 990);
      setInterval(UpdateF2, 1000 * 60 * 240);

      function UpdateF2() {

        req3.open(
          "GET",
          "https://api.sunrise-sunset.org/json?" + tokenCoord,
          false
        );
        req3.send(null);

        raszak = req3.responseText;
        raszak = JSON.parse(raszak);

        var day_length = raszak.results.day_length.split(":");
        var current2 = raszak.results.sunset.split(":");

        var zakH = parseInt(current2[0], 10) + 15;
        var zakM = parseInt(current2[1], 10);

        var zakInMinutes = zakH * 60 + zakM;
        var rasInMinutes = zakInMinutes - ((parseInt(day_length[0], 10)) * 60 + parseInt(day_length[1], 10)) + 3;

        var rasH = Math.floor(rasInMinutes / 60);
        var rasM = rasInMinutes % 60;

        if (rasM < 10)
          rasM0 = "0" + rasM;
        else 
          rasM0 = rasM;
        
        if (zakM < 10)
          zakM0 = "0" + zakM;
        else 
          zakM0 = zakM;  
        

        console.log("Рассвет: " + rasH + ":" + rasM0);
        console.log("Закат: " + zakH + ":" + zakM0);

        rassvet.innerHTML = rasH + ":" + rasM0;
        zakat.innerHTML = zakH + ":" + zakM0;
      }

      function UpdateF() {
        now = new Date();
        day = now.getDate();
        Hour = now.getHours();
        Minutes = now.getMinutes();
        month = now.getMonth() + 1;

        if (day < 10) day = "0" + day;

        if (month < 10) month = "0" + month;

        if (Minutes < 10) Minutes = "0" + Minutes;

        if (dvoet) {
          dvoet = false;
          cl1.innerHTML = Hour + '<span style="opacity: 0">:</span>' + Minutes;
        }
        else {
          dvoet = true;
          cl1.innerHTML = Hour + ":" + Minutes;
        }

        cl2.innerHTML = day + "." + month + "." + now.getFullYear();
        
      }