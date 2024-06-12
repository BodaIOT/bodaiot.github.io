token = "123";

      if (localStorage.getItem("token") && localStorage.getItem("tokenTodoist")) {
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("tokenTodoist"));
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
          });
      }

      token = localStorage.getItem("token");

      req = new XMLHttpRequest();
      req2 = new XMLHttpRequest();
      req3 = new XMLHttpRequest();

      cl1 = document.getElementById("clock");
      cl2 = document.getElementById("clock2");
      tb = document.getElementById("t");
      th = document.getElementById("h");
      tb2 = document.getElementById("t2");
      th2 = document.getElementById("h2");
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
      setInterval(UpdateF2, 15000);

      function UpdateF2() {

        req3.open(
          "GET",
          "https://api.sunrise-sunset.org/json?lat=59.83383934590533&lng=30.509177029682704",
          false
        );
        req3.send(null);

        raszak = req3.responseText;
        raszak = JSON.parse(raszak)

        var day_length = raszak.results.day_length.split(":");
        var current2 = raszak.results.sunset.split(":");

        var zakH = parseInt(current2[0], 10) + 15;
        var zakM = parseInt(current2[1], 10);

        var zakInMinutes = zakH * 60 + zakM;
        var rasInMinutes = zakInMinutes - ((parseInt(day_length[0], 10)) * 60 + parseInt(day_length[1], 10)) + 3;

        var rasH = Math.floor(rasInMinutes / 60);
        var rasM = rasInMinutes % 60;
        
        zakM = zakM - 4;

        console.log("Рассвет: " + rasH + ":" + rasM);
        console.log("Закат: " + zakH + ":" + zakM);

        rassvet.innerHTML = rasH + ":" + rasM;
        zakat.innerHTML = zakH + ":" + zakM;
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
        req.open(
          "GET",
          "https://blynk.cloud/external/api/get?token=" + token + "&v9",
          false
        );
        req.send(null);
        req2.open(
          "GET",
          "https://blynk.cloud/external/api/get?token=" + token + "&v10",
          false
        );
        req2.send(null);
        t = req.responseText;
        h = req2.responseText;

        tb.innerHTML = t;
        th.innerHTML = h;
        tb2.innerHTML = t;
        th2.innerHTML = h;

        if (t < 18) tb.style.color = "#0036ff";
        else if (t >= 18 && t <= 20) tb.style.color = "#7a96ff";
        else if (t > 20 && t <= 24) tb.style.color = "#ffffff";
        else if (t > 24 && t <= 26) tb.style.color = "#ffaf7a";
        else if (t > 26 && t <= 26.5) tb.style.color = "#ff5f45";
        else if (t > 26.5) tb.style.color = "#f71010";

        if (h <= 15) th.style.color = "#ff5f45";
        else if (h > 15 && h <= 40) th.style.color = "#ffffff";
        else if (h > 40) th.style.color = "#109ef7";

        if (t < 18) tb2.style.color = "#0036ff";
        else if (t >= 18 && t <= 20) tb2.style.color = "#7a96ff";
        else if (t > 20 && t <= 24) tb2.style.color = "#ffffff";
        else if (t > 24 && t <= 26) tb2.style.color = "#ffaf7a";
        else if (t > 26 && t <= 26.5) tb2.style.color = "#ff5f45";
        else if (t > 26.5) tb2.style.color = "#f71010";

        if (h <= 15) th2.style.color = "#ff5f45";
        else if (h > 15 && h <= 40) th2.style.color = "#ffffff";
        else if (h > 40) th2.style.color = "#109ef7";
      }