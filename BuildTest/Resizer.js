
//#region Resizer

let canvas = null;
let background = null;
let body = null;

document.addEventListener("DOMContentLoaded", () => {
    SetObjects();
});

function SetObjects() {
    if (canvas == null || canvas == undefined)
        canvas = document.querySelector("#unity-canvas");
    if (background == null || background == undefined)
        background = document.getElementById("background");
    if (body == null || body == undefined)
        body = document.getElementById("body");
}

window.addEventListener('resize', function (event) {
    resize();
}, true);

/*
function resize() {
    resizeBuild();

    try {
        body = document.getElementById("body");
    }
    catch (error) { return; }

    if (body == undefined || body == null || YANDEX_BUILD == undefined) {
        return;
    }

    let verySmall = false;

    if (window.innerHeight < 620)
        verySmall = true;

    let height = window.innerHeight;
    let width = window.innerWidth;
    let c = height / width;
    let aspectRatioBot = 1.4;
    let zoom = "1";

    if (verySmall) {
        if (height < 100) {
            zoom = "0.15";
            aspectRatioBot = 0.15;
        }
        else if (height < 140) {
            zoom = "0.2";
            aspectRatioBot = 0.2;
        }
        else if (height < 170) {
            zoom = "0.25";
            aspectRatioBot = 0.25;
        }
        else if (height < 200) {
            zoom = "0.3";
            aspectRatioBot = 0.3;
        }
        else if (height < 250) {
            zoom = "0.35";
            aspectRatioBot = 0.35;
        }
        else if (height < 300) {
            zoom = "0.4";
            aspectRatioBot = 0.4;
        }
        else if (height < 350) {
            zoom = "0.45";
            aspectRatioBot = 0.45;
        }
        else if (height < 400) {
            zoom = "0.5";
            aspectRatioBot = 0.5;
        }
        else if (height < 450) {
            zoom = "0.6";
            aspectRatioBot = 0.6;
        }
        else if (height < 500) {
            zoom = "0.7";
            aspectRatioBot = 0.7;
        }
        else if (height < 550) {
            zoom = "0.8";
            aspectRatioBot = 0.8;
        }
        else if (height < 600) {
            zoom = "0.85";
            aspectRatioBot = 0.9;
        }
        else if (height < 620) {
            zoom = "0.9";
            aspectRatioBot = 1;
        }

        body.style.zoom = zoom;

        if (YANDEX_BUILD) {
            let probablyWidth = height / aspectRatioBot;

            body.style.width = probablyWidth + "px";

            let widthNumber = Number(body.style.width.toString().slice(0, -2)) * parseFloat(zoom);

            if (widthNumber > window.innerWidth) {
                body.style.width = "100%";
                body.style.height = "100%";
                body.style.transform = "none";
            }
            else {

                body.style.height = "100%";
                body.style.transform = "translate(" + ((width / 2) / parseFloat(zoom) - ((widthNumber) / 2) / parseFloat(zoom) + 1) + "px, 0px)";
            }
        }
        else {
            body.style.width = "100%";
            body.style.height = "100%";
            body.style.transform = "none";
        }
    }
    else if (c < aspectRatioBot) {
        body.style.zoom = "1";
        body.style.width = height / aspectRatioBot + "px";
        body.style.height = "100%";
        body.style.transform = "translate(" + ((width / 2) - (height / aspectRatioBot / 2) + 1) + "px, 0px)";
    }
    else {
        body.style.zoom = "1";
        body.style.width = "100%";
        body.style.height = "100%";
        body.style.transform = "none";
    }
}
*/

const HorizontalUnits = "vw";
const VerticalUnits = "%";

function resize() {
    resizeBuild();

    try {
        body = document.getElementById("body");
    }
    catch (error) { return; }

    if (body == undefined || body == null) {
        return;
    }

    let verySmall = false;

    if (window.innerHeight < 620)
        verySmall = true;

    let height = window.innerHeight;
    let width = window.innerWidth;
    let c = height / width;
    let aspectRatioBot = 1.4;
    let zoom = "1";

    if (verySmall) {
        if (height < 100) {
            zoom = "0.15";
            aspectRatioBot = 0.15;
        }
        else if (height < 140) {
            zoom = "0.2";
            aspectRatioBot = 0.2;
        }
        else if (height < 170) {
            zoom = "0.25";
            aspectRatioBot = 0.25;
        }
        else if (height < 200) {
            zoom = "0.3";
            aspectRatioBot = 0.3;
        }
        else if (height < 250) {
            zoom = "0.35";
            aspectRatioBot = 0.35;
        }
        else if (height < 300) {
            zoom = "0.4";
            aspectRatioBot = 0.4;
        }
        else if (height < 350) {
            zoom = "0.45";
            aspectRatioBot = 0.45;
        }
        else if (height < 400) {
            zoom = "0.5";
            aspectRatioBot = 0.5;
        }
        else if (height < 450) {
            zoom = "0.6";
            aspectRatioBot = 0.6;
        }
        else if (height < 500) {
            zoom = "0.7";
            aspectRatioBot = 0.7;
        }
        else if (height < 550) {
            zoom = "0.8";
            aspectRatioBot = 0.8;
        }
        else if (height < 600) {
            zoom = "0.85";
            aspectRatioBot = 0.9;
        }
        else if (height < 620) {
            zoom = "0.9";
            aspectRatioBot = 1;
        }

        body.style.zoom = zoom;

        body.style.width = "100" + HorizontalUnits;
        body.style.height = "100" + VerticalUnits;
        body.style.transform = "none";
    }
    else if (c < aspectRatioBot) {
        /*
        let x = body.style.transform.toString().slice(11, -1);
        x = x.slice(0, -2);
        console.log(x);
        console.log(parseFloat(x));
        if (Math.abs(x - ((width / 2) - (height / aspectRatioBot / 2) + 1)) < 1)
            return;
        */

        body.style.zoom = "1";
        body.style.width = height / aspectRatioBot + "px";
        body.style.height = "100" + VerticalUnits;
        body.style.transform = "translate(" + ((width / 2) - (height / aspectRatioBot / 2) + 1) + "px, 0px)";
    }
    else {
        body.style.zoom = "1";
        body.style.width = "100" + HorizontalUnits;
        body.style.height = "100" + VerticalUnits;
        body.style.transform = "none";
    }
}

function resizeBuild() {
    if (canvas == undefined || background == undefined
        || canvas == null || background == null
    ) {
        return;
    }

    let height = window.innerHeight;
    let width = window.innerWidth;
    let c = height / width;
    let aspectRatio = 1.98;
    let aspectRatioQuad = 1;

    if (c >= aspectRatio) { // vertical

        background.style.top = "0";

        canvas.style.width = width + "px";
        canvas.style.height = width * aspectRatio + "px";
    }
    else if (c <= aspectRatioQuad) { // horizontal

        background.style.top = "0";

        canvas.style.height = height + "px";
        canvas.style.width = height * aspectRatioQuad + "px";
    }
    else {
        canvas.style.height = "100%";
        canvas.style.width = "100%";
    }
}

//#endregion
