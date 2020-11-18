//dot2apcmini v 1.0.6 require easymidi & websocket

var text = "";
var session = 0;
var wings = 4;
var wing = 4;
var pageIndex = 0;
var shift = 0;
var request = 0;
var matrix = [221, 220, 219, 218, 217, 216, 215, 214, 121, 120, 119, 118, 117, 116, 115, 114, 815, 814, 813, 812, 811, 810, 809, 808, 715, 714, 713, 712, 711, 710, 709, 708, 615, 614, 613, 612, 611, 610, 609, 608, 515, 514, 513, 512, 511, 510, 509, 508, 415, 414, 413, 412, 411, 410, 409, 408, 315, 314, 313, 312, 311, 310, 309, 308];
var exec = JSON.parse('{"index":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,4,3,2,1,0,66,66,66,66,66],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,12,11,10,9,8,7,6,66],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,20,19,18,17,16,15,14,66]]}');
var faderv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.201, 0.201, 0.201, 0.201, 0.201, 0.201, 0.201, 0.201, 0.403, 0.403, 0.403, 0.403, 0.403, 0.403, 0.403, 0.403, 0.604, 0.604, 0.604, 0.604, 0.604, 0.604, 0.604, 0.604, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1, 1, 1, 1, 1, 1, 1, 1];
var faderValue = [0, 0, 0, 0, 0.002, 0.006, 0.01, 0.014, 0.018, 0.022, 0.026, 0.03, 0.034, 0.038, 0.042, 0.046, 0.05, 0.053, 0.057, 0.061, 0.065, 0.069, 0.073, 0.077, 0.081, 0.085, 0.089, 0.093, 0.097, 0.1, 0.104, 0.108, 0.112, 0.116, 0.12, 0.124, 0.128, 0.132, 0.136, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.4, 0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.5, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59, 0.6, 0.61, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.7, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.78, 0.79, 0.8, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1, 1, 1];

const NS_PER_SEC = 1e9;
var faderTime = [0,0,0,0,0,0,0,0,0,0];


for (i = 48; i <= 56; i++){ //wpisuje czas do tablicy, nr kolejny to nr msg midi cc (suwaka)
  faderTime[i] = process.hrtime();
}

var pad = [57, 58, 59, 49, 50, 51, 41, 42, 33, 34, 25, 26, 27, 17, 18, 19, 60, 63, 20, 22];
var padname = ["set", "pause", "goback", "go", "on", "off", "goto", "delete", "copy", "edit", "update", "page", "exec", "cue", "group", "preset", "time", "fixture", "clear", "store", "high"
];
function interval() {
    if (session > 0) {
        if (wing == 6) {
            client.send('{"requestType":"presetTypes","type":"update","session":' + session + ',"maxRequests":1}');
        }       
        if (wing == 5) {
            client.send('{"requestType":"getdata","data":"set,pause,goback,go,on,off,goto,delete,copy,edit,update,page,exec,cue,group,preset,time,fixture,clear,store,high","session":' + session + ',"maxRequests":1}');
        }
        if (wing == 4) {
            client.send('{"requestType":"playbacks","startIndex":[308,408,508,608,708,808],"itemsCount":[8,8,8,8,8,8],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3,3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
        if (wing == 3) {
            client.send('{"requestType":"playbacks","startIndex":[300,400,500,600,700,800],"itemsCount":[8,8,8,8,8,8],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3,3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
        if (wing == 2) {
            client.send('{"requestType":"playbacks","startIndex":[14,114,214],"itemsCount":[8,8,8],"pageIndex":' + pageIndex + ',"itemsType":[2,3,3],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
        if (wing == 1) {
            client.send('{"requestType":"playbacks","startIndex":[6,106,206],"itemsCount":[8,8,8],"pageIndex":' + pageIndex + ',"itemsType":[2,3,3],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
        if (wing == 0) {
            client.send('{"requestType":"playbacks","startIndex":[0,100,200],"itemsCount":[6,6,6],"pageIndex":' + pageIndex + ',"itemsType":[2,3,3],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
    }
}


function sleep(time, callback) {
    var stop = new Date()
        .getTime();
    while (new Date()
        .getTime() < stop + time) {;
    }
    callback();
}

var easymidi = require('easymidi');
console.log("Midi IN");
console.log(easymidi.getInputs());
console.log("Midi OUT");
console.log(easymidi.getOutputs());
console.log("Connecting to dot2 ...");
var input = new easymidi.Input('APC MINI 0');
var output = new easymidi.Output('APC MINI 1');



sleep(1000, function() {
    // executes after one second, and blocks the thread
});

for (i = 0; i < 128; i++) {
    output.send('noteon', {note: i, velocity: 0, channel: 0});
    sleep(10, function() {
        // executes after one second, and blocks the thread
    });
}
output.send('noteon', {note: 82, velocity: 2, channel: 0});
output.send('noteon', {note: 83, velocity: 1, channel: 0});
output.send('noteon', {note: 84, velocity: 1, channel: 0});
output.send('noteon', {note: 85, velocity: 1, channel: 0});
output.send('noteon', {note: 86, velocity: 1, channel: 0});
//output.send('noteon', {note: 89, velocity: 1, channel: 0});

input.on('noteon', function(msg) {


    if (msg.note == 98) { //SHIFT ON
        shift = 1;
        for (i = 0; i < 72; i++) {
            output.send('noteon', {note: i, velocity: 0, channel: 0});
        }
        output.send('noteon', {note: (pageIndex), velocity: 3, channel: 0});
    }


    if (shift == 1) {
        if (msg.note < 64) {
            output.send('noteon', {note: (pageIndex), velocity: 0, channel: 0});
            pageIndex = msg.note;
            output.send('noteon', {note: (pageIndex), velocity: 3, channel: 0});
        }
    }



    if (shift == 0) {
        if (msg.note == 82) { //wing4
            wings = 4;
            output.send('noteon', {note: 82, velocity: 2, channel: 0});
            output.send('noteon', {note: 83, velocity: 1, channel: 0});
            output.send('noteon', {note: 84, velocity: 1, channel: 0});
            output.send('noteon', {note: 85, velocity: 1, channel: 0});
            output.send('noteon', {note: 86, velocity: 1, channel: 0});
            //output.send('noteon', {note: 89, velocity: 1, channel: 0});
            matrix = [221, 220, 219, 218, 217, 216, 215, 214, 121, 120, 119, 118, 117, 116, 115, 114, 815, 814, 813, 812, 811, 810, 809, 808, 715, 714, 713, 712, 711, 710, 709, 708, 615, 614, 613, 612, 611, 610, 609, 608, 515, 514, 513, 512, 511, 510, 509, 508, 415, 414, 413, 412, 411, 410, 409, 408, 315, 314, 313, 312, 311, 310, 309, 308];
        }

        if (msg.note == 83) { //wing3
            wings = 3;
            output.send('noteon', {note: 82, velocity: 1, channel: 0});
            output.send('noteon', {note: 83, velocity: 2, channel: 0});
            output.send('noteon', {note: 84, velocity: 1, channel: 0});
            output.send('noteon', {note: 85, velocity: 1, channel: 0});
            output.send('noteon', {note: 86, velocity: 1, channel: 0});
            //output.send('noteon', {note: 89, velocity: 1, channel: 0});
            matrix = [213, 212, 211, 210, 209, 208, 207, 206, 113, 112, 111, 110, 109, 108, 107, 106, 807, 806, 805, 804, 803, 802, 801, 800, 707, 706, 705, 704, 703, 702, 701, 700, 607, 606, 605, 604, 603, 602, 601, 600, 507, 506, 505, 504, 503, 502, 501, 500, 407, 406, 405, 404, 403, 402, 401, 400, 307, 306, 305, 304, 303, 302, 301, 300];
        }

        if (msg.note == 84) { //wing2
            wings = 2;
            output.send('noteon', {note: 82, velocity: 1, channel: 0});
            output.send('noteon', {note: 83, velocity: 1, channel: 0});
            output.send('noteon', {note: 84, velocity: 2, channel: 0});
            output.send('noteon', {note: 85, velocity: 1, channel: 0});
            output.send('noteon', {note: 86, velocity: 1, channel: 0});
            //output.send('noteon', {note: 89, velocity: 1, channel: 0});
            matrix = [221, 220, 219, 218, 217, 216, 215, 214, 121, 120, 119, 118, 117, 116, 115, 114, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14, 21, 20, 19, 18, 17, 16, 15, 14];
        }

        if (msg.note == 85) { //wing1
            wings = 1;
            output.send('noteon', {note: 82, velocity: 1, channel: 0});
            output.send('noteon', {note: 83, velocity: 1, channel: 0});
            output.send('noteon', {note: 84, velocity: 1, channel: 0});
            output.send('noteon', {note: 85, velocity: 2, channel: 0});
            output.send('noteon', {note: 86, velocity: 1, channel: 0});
            //output.send('noteon', {note: 89, velocity: 1, channel: 0});
            matrix = [213, 212, 211, 210, 209, 208, 207, 206, 113, 112, 111, 110, 109, 108, 107, 106, 13, 12, 11, 10, 9, 8, 7, 6, 13, 12, 11, 10, 9, 8, 7, 6, 13, 12, 11, 10, 9, 8, 7, 6, 13, 12, 11, 10, 9, 8, 7, 6, 13, 12, 11, 10, 9, 8, 7, 6, 13, 12, 11, 10, 9, 8, 7, 6, 13, 12, 11, 10, 9, 8, 7, 6];

        }

        if (msg.note == 86){//wing0
            wings = 0;
            output.send('noteon', {note: 82, velocity: 1, channel: 0});
            output.send('noteon', {note: 83, velocity: 1, channel: 0});
            output.send('noteon', {note: 84, velocity: 1, channel: 0});
            output.send('noteon', {note: 85, velocity: 1, channel: 0});
            output.send('noteon', {note: 86, velocity: 2, channel: 0});
            //output.send('noteon', {note: 89, velocity: 1, channel: 0});
            for(i = 0; i<82; i++) {
                output.send('noteon', {note: i, velocity: 0, channel: 0});
              }
            matrix = [205, 204, 203, 202, 201, 200, 666, 666, 105, 104, 103, 102, 101, 100, 666, 666, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66];
            }

            /*if (msg.note == 89){//programmer
                wings = 5;
                output.send('noteon', {note: 82, velocity: 1, channel: 0});
                output.send('noteon', {note: 83, velocity: 1, channel: 0});
                output.send('noteon', {note: 84, velocity: 1, channel: 0});
                output.send('noteon', {note: 85, velocity: 1, channel: 0});
                output.send('noteon', {note: 86, velocity: 1, channel: 0});
                output.send('noteon', {note: 89, velocity: 2, channel: 0});
                for(i = 0; i<82; i++) {
                    output.send('noteon', {note: i, velocity: 0, channel: 0});
                  }
                matrix = [205, 204, 203, 202, 201, 200, 666, 666, 105, 104, 103, 102, 101, 100, 666, 666, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66, 5, 4, 3, 2, 1, 0, 66, 66];
            }*/





            if (msg.note < 72) {
                if (wing == 5){
			        if (msg.note == 57) { client.send('{"keyname":"PAUSE","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 58) { client.send('{"keyname":"GO_MINUS","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 59) { client.send('{"keyname":"GO_PLUS","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 60) { client.send('{"keyname":"FIXTURE","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 61) { client.send('{"keyname":"OOPS","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 62) { client.send('{"keyname":"ESC","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 63) { client.send('{"keyname":"CLEAR","value":1,"cmdlineText":"","session":'+ session +',"requestType":"keyname","maxRequests":0}'); text = "";}
                    if (msg.note == 49) { client.send('{"keyname":"ON","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 50) { client.send('{"keyname":"OFF","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 51) { client.send('{"keyname":"GOTO","value":1,"cmdlineText": "'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 52) { client.send('{"keyname":"7","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 53) { client.send('{"keyname":"8","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 54) { client.send('{"keyname":"9","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 55) { client.send('{"keyname":"PLUS","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 41) { client.send('{"keyname":"DELETE","value":1,"cmdlineText": "'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 42) { client.send('{"keyname":"COPY","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 44) { client.send('{"keyname":"4","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 45) { client.send('{"keyname":"5","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 46) { client.send('{"keyname":"6","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 47) { client.send('{"keyname":"THRU","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 33) { client.send('{"keyname":"EDIT","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 34) { client.send('{"keyname":"UPDATE","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 36) { client.send('{"keyname":"1","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 37) { client.send('{"keyname":"2","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 38) { client.send('{"keyname":"3","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 39) { client.send('{"keyname":"MINUS","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 25) { client.send('{"keyname":"PAGE","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 26) { client.send('{"keyname":"EXEC","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
                    if (msg.note == 27) { client.send('{"keyname":"CUE","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 28) { client.send('{"keyname":"0","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 29) { client.send('{"keyname":"PUNKT","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 30) { client.send('{"keyname":"IF","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 31) { client.send('{"keyname":"AT","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 17) { client.send('{"keyname":"GROUP","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 18) { client.send('{"keyname":"PRESET","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 19) { client.send('{"keyname":"TIME","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 20) { client.send('{"keyname":"STORE","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 21) { client.send('{"keyname":"FULL","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 22) { client.send('{"keyname":"HIGH","value":1,"autoSubmit":"true","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			        if (msg.note == 23) { client.send('{"keyname":"ENTER","value":1,"cmdlineText":"'+text+'","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
            }



            if (wing == 4 || wing == 3) {
                if (msg.note < 64) {
                    if (msg.note > 15) {
                        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + matrix[msg.note] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
                    } else {
                        output.send('noteon', {note: (pageIndex), velocity: 0, channel: 0});
                        pageIndex = msg.note;
                        output.send('noteon', {note: (pageIndex), velocity: 3, channel: 0});
                    }
                }
            }



            if (wing == 2 || wing == 1 || wing == 0) {
                if (msg.note < 16) {
                    client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + matrix[msg.note] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
                } else if (msg.note > 63) {
                    client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + matrix[msg.note] + ',"pageIndex":' + pageIndex + ',"buttonId":1,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
                } else {
                    client.send('{"requestType":"playbacks_userInput","execIndex":' + matrix[msg.note] + ',"pageIndex":' + pageIndex + ',"faderValue":' + faderv[msg.note] + ',"type":1,"session":' + session + ',"maxRequests":0}');
                }
            }
        }
    }
});




input.on('noteoff', function(msg) {


    if (msg.note == 98) {
        shift = 0;
    }

    if (shift == 0) {
        if (msg.note < 72) {

            if (wing == 5){
			if (msg.note == 57) { client.send('{"keyname":"PAUSE","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 58) { client.send('{"keyname":"GO_MINUS","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 59) { client.send('{"keyname":"GO_PLUS","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 60) { client.send('{"keyname":"FIXTURE","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 61) { client.send('{"keyname":"OOPS","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 62) { client.send('{"keyname":"ESC","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 63) { client.send('{"keyname":"CLEAR","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 49) { client.send('{"keyname":"ON","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 50) { client.send('{"keyname":"OFF","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 51) { client.send('{"keyname":"GOTO","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 52) { client.send('{"keyname":"7","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 53) { client.send('{"keyname":"8","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 54) { client.send('{"keyname":"9","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 55) { client.send('{"keyname":"PLUS","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 41) { client.send('{"keyname":"DELETE","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 42) { client.send('{"keyname":"COPY","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 44) { client.send('{"keyname":"4","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 45) { client.send('{"keyname":"5","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 46) { client.send('{"keyname":"6","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 47) { client.send('{"keyname":"THRU","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 33) { client.send('{"keyname":"EDIT","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 34) { client.send('{"keyname":"UPDATE","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 36) { client.send('{"keyname":"1","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 37) { client.send('{"keyname":"2","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 38) { client.send('{"keyname":"3","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 39) { client.send('{"keyname":"MINUS","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 25) { client.send('{"keyname":"PAGE","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 26) { client.send('{"keyname":"EXEC","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 27) { client.send('{"keyname":"CUE","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 28) { client.send('{"keyname":"0","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 29) { client.send('{"keyname":"PUNKT","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 30) { client.send('{"keyname":"IF","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 31) { client.send('{"keyname":"AT","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 17) { client.send('{"keyname":"GROUP","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 18) { client.send('{"keyname":"PRESET","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 19) { client.send('{"keyname":"TIME","value":0,,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 20) { client.send('{"keyname":"STORE","value":0,,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 21) { client.send('{"keyname":"FULL","value":0,,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 22) { client.send('{"keyname":"HIGH","value":0,"autoSubmit":"true","session":'+ session +',"requestType":"keyname","maxRequests":0}');}
			if (msg.note == 23) { client.send('{"keyname":"ENTER","value":0,"session":'+ session +',"requestType":"keyname","maxRequests":0}');}
            }


            if (wing == 4 || wing == 3) {
                if (msg.note < 64) {
                    if (msg.note > 15 && msg.note < 64) {
                        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + matrix[msg.note] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
                    }
                }
            }


            if (wing == 2 || wing == 1 || wing == 0) {
                if (msg.note < 16) {
                    client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + matrix[msg.note] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
                } else if (msg.note > 63) {
                    client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + matrix[msg.note] + ',"pageIndex":' + pageIndex + ',"buttonId":1,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
                } else {
                    client.send('{"requestType":"playbacks_userInput","execIndex":' + matrix[msg.note] + ',"pageIndex":' + pageIndex + ',"faderValue":' + faderv[msg.note] + ',"type":1,"session":' + session + ',"maxRequests":0}');
                }
            }
        }
    }
});




input.on('cc', function (msg) {
    diff = process.hrtime(faderTime[msg.controller]);
    if ((diff[0] * NS_PER_SEC + diff[1]) >= 50000000 | msg.value == 0 | msg.value == 127) {
        //console.log('cc', msg.controller, msg.value, msg.channel);
        faderTime[msg.controller] = process.hrtime();

        if (shift == 0) {
            if (msg.controller == 56) {
                client.send('{"command":"SpecialMaster 2.1 At ' + (faderValue[msg.value] * 100) + '","session":' + session + ',"requestType":"command","maxRequests":0}');
            }
            else {
                if (wing == 1 || wing == 2) {
                    client.send('{"requestType":"playbacks_userInput","execIndex":' + exec.index[wing][msg.controller] + ',"pageIndex":' + pageIndex + ',"faderValue":' + faderValue[msg.value] + ',"type":1,"session":' + session + ',"maxRequests":0}');

                } /*else if (wing == 3) {
                    client.send('{"requestType":"playbacks_userInput","execIndex":' + exec.index[1][msg.controller] + ',"pageIndex":' + pageIndex + ',"faderValue":' + faderValue[msg.value] + ',"type":1,"session":' + session + ',"maxRequests":0}');

                } else if (wing == 4) {
                    client.send('{"requestType":"playbacks_userInput","execIndex":' + exec.index[2][msg.controller] + ',"pageIndex":' + pageIndex + ',"faderValue":' + faderValue[msg.value] + ',"type":1,"session":' + session + ',"maxRequests":0}');

                } */else if (wing == 0) {

                    if (msg.controller < 54) {
                        client.send('{"requestType":"playbacks_userInput","execIndex":' + exec.index[wing][msg.controller] + ',"pageIndex":' + pageIndex + ',"faderValue":' + faderValue[msg.value] + ',"type":1,"session":' + session + ',"maxRequests":0}');
                    }
                    if (msg.controller == 54) {
                        client.send('{"command":"SpecialMaster 1.1 At ' + (faderValue[msg.value] * 100) + '","session":' + session + ',"requestType":"command","maxRequests":0}');
                    }
                    if (msg.controller == 55) {
                        client.send('{"command":"SpecialMaster 1.2 At ' + (faderValue[msg.value] * 100) + '","session":' + session + ',"requestType":"command","maxRequests":0}');
                    }

                }
            }
        }
    }
});





//WEBSOCKET-------------------
var W3CWebSocket = require('websocket')
    .w3cwebsocket;

var client = new W3CWebSocket('ws://localhost:80/');

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');

    function sendNumber() {
        if (client.readyState === client.OPEN) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            client.send(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {



    request = request + 1;
	console.log(request);
    if (request >= 9) {
	if (wing === 5){
        
        client.send('{"session":' + session + '}');
        
	}else{
        
        client.send('{"session":' + session + '}');
        
        client.send('{"requestType":"getdata","data":"set","session":' + session + ',"maxRequests":1}');}
        
        request = 0;
        
    }


    if (typeof e.data === 'string') {
        //console.log("Received: '" + e.data + "'");
        //console.log(e.data);


        obj = JSON.parse(e.data);


        if (obj.status == "server ready") {
            client.send('{"session":0}')
        }
        if (obj.forceLogin == true) {
            session = (obj.session);
            client.send('{"requestType":"login","username":"remote","password":"2c18e486683a3db1e645ad8523223b72","session":' + obj.session + ',"maxRequests":10}')
        }

        if (obj.session) {
            session = (obj.session);
        }

        if (obj.text) {
            console.log(obj.text);
            text = obj.text;
            //console.log(text);
        }


        if (obj.responseType == "login" && obj.result == true) {
            setInterval(interval, 80);
        }


        if (obj.responseType == "getdata") {
		
            if (obj.data.length > 1){
            //console.log(obj);
	var data = obj.data;
		//console.log("data");
		
            output.send('noteon', { note: 56, velocity: 3, channel: 0 });
            output.send('noteon', { note: 48, velocity: 1, channel: 0 });
            output.send('noteon', { note: 40, velocity: 1, channel: 0 });
            output.send('noteon', { note: 32, velocity: 1, channel: 0 });
            output.send('noteon', { note: 24, velocity: 1, channel: 0 });
            output.send('noteon', { note: 16, velocity: 1, channel: 0 });
            output.send('noteon', { note: 8, velocity: 1, channel: 0 });
            output.send('noteon', { note: 0, velocity: 1, channel: 0 });
            
            
		if (data[1].pause == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 57, velocity: v, channel: 0 });

		if (data[2].goback == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 58, velocity: v, channel: 0 });
            
		if (data[3].go == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 59, velocity: v, channel: 0 });

		if (data[4].on == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 49, velocity: v, channel: 0 });

		if (data[5].off == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 50, velocity: v, channel: 0 });

		if (data[6].goto == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 51, velocity: v, channel: 0 });

		if (data[7].delete == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 41, velocity: v, channel: 0 });

		if (data[8].copy == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 42, velocity: v, channel: 0 });

		if (data[9].edit == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 33, velocity: v, channel: 0 });

		if (data[10].update == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 34, velocity: v, channel: 0 });

		if (data[11].page == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 25, velocity: v, channel: 0 });

		if (data[12].exec == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 26, velocity: v, channel: 0 });

		if (data[13].cue == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 27, velocity: v, channel: 0 });

		if (data[14].group == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 17, velocity: v, channel: 0 });

		if (data[15].preset == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 18, velocity: v, channel: 0 });

		if (data[16].time == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 19, velocity: v, channel: 0 });

		if (data[17].fixture == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 60, velocity: v, channel: 0 });

		if (data[18].clear == 1){ var v = 1;}
		else if (data[18].clear == "b"){ var v = 2;}
		else { var v = 5;}
		output.send('noteon', { note: 63, velocity: v, channel: 0 });

		if (data[19].store == 1){ var v = 1;}
		else { var v = 5;}
		output.send('noteon', { note: 20, velocity: v, channel: 0 });

		if (data[20].high == 0){ var v = 5;}
		else if (obj.data[20].high == "1"){ var v = 1;}
		output.send('noteon', { note: 22, velocity: v, channel: 0 });


		output.send('noteon', { note: 61, velocity: 5, channel: 0 });
		output.send('noteon', { note: 62, velocity: 5, channel: 0 });

		output.send('noteon', { note: 52, velocity: 3, channel: 0 });
		output.send('noteon', { note: 53, velocity: 3, channel: 0 });
		output.send('noteon', { note: 54, velocity: 3, channel: 0 });
		output.send('noteon', { note: 55, velocity: 5, channel: 0 });

		output.send('noteon', { note: 43, velocity: 0, channel: 0 });
		output.send('noteon', { note: 44, velocity: 3, channel: 0 });
		output.send('noteon', { note: 45, velocity: 3, channel: 0 });
		output.send('noteon', { note: 46, velocity: 3, channel: 0 });
		output.send('noteon', { note: 47, velocity: 5, channel: 0 });

		output.send('noteon', { note: 35, velocity: 0, channel: 0 });
		output.send('noteon', { note: 36, velocity: 3, channel: 0 });
		output.send('noteon', { note: 37, velocity: 3, channel: 0 });
		output.send('noteon', { note: 38, velocity: 3, channel: 0 });
		output.send('noteon', { note: 39, velocity: 5, channel: 0 });

		output.send('noteon', { note: 28, velocity: 3, channel: 0 });
		output.send('noteon', { note: 29, velocity: 5, channel: 0 });
		output.send('noteon', { note: 30, velocity: 5, channel: 0 });
		output.send('noteon', { note: 31, velocity: 5, channel: 0 });

		output.send('noteon', { note: 21, velocity: 5, channel: 0 });
        output.send('noteon', { note: 23, velocity: 5, channel: 0 });

        if (wing != wings) {
            wing = (wings);


            for (i = 0; i < 73; i++) {
                output.send('noteon', {note: i, velocity: 0, channel: 0});
            }
        }   
    }
}


    

        if (obj.responseType == "presetTypeList") {
            console.log("Preset Type List");
		}


        if (obj.responseType == "presetTypes") {
            console.log("Preset Types");
		//console.log("Received: '" + e.data + "'");
        }        


        if (obj.responseType == "playbacks") {

            if (shift == 0) {

                if (obj.responseSubType == 3) {

                    var j = 63;

                    for (k = 0; k < 6; k++) {
                        for (i = 0; i < 8; i++) {
                            var m = 3;
                            if (obj.itemGroups[k].items[i][0].isRun == 1) {
                                m = 1;
                            } else if ((obj.itemGroups[k].items[i][0].i.c) == "#000000") {
                                m = 0
                            } else
                                m = 5;
                            output.send('noteon', {note: j, velocity: m, channel: 0});
                            j = j - 1;
                        }
                    }

                    for (i = 0; i < 16; i++) {
                        if (i == (pageIndex)) {
                            output.send('noteon', {note: (pageIndex), velocity: 3, channel: 0});
                        } else {
                            output.send('noteon', {note: i, velocity: 0, channel: 0});
                            
                        }
                    }
                    for (i = 64; i < 72; i++) {
                        output.send('noteon', {note: i, velocity: 0, channel: 0});
                        
                    }
                }


                if (obj.responseSubType == 2) {
                    if (wing == 2 || wing == 1) {
                        j = 71;
                        /*for (i = 0; i < 8; i++) {

                            if (obj.itemGroups[0].items[i][0].isRun == 1) {
                                m = 1;
                            } else
                                m = 0;
                            output.send('noteon', {note: j, velocity: m, channel: 0});
                            j = j - 1;
                        }*/
                        for (i = 0; i < 8; i++) {
                            //console.log(i);
                            if (wing != 0){// proba obejscia bledu - zmienna niedostepna z wing0
                            if (obj.itemGroups[0].items[i][0].isRun == 1) {
                                m = 2;
                            } else if ((obj.itemGroups[0].items[i][0].i.c) == "#000000") {
                                m = 0
                            } else
                                m = 1;
                            output.send('noteon', {note: j, velocity: m, channel: 0});
                            j = j - 1;
                        }
                        }
                        k = 1;

                        for (l = 0; l < 6; l++) {
                            for (i = 0; i < 8; i++) {
                                var m = 0;
                                if (obj.itemGroups[0].items[i][0].executorBlocks[0].fader.v >= k) {
                                    m = 3;
                                }
                                output.send('noteon', {note: j, velocity: m, channel: 0});
                                j = j - 1;
                            }
                            k = k - 0.2;
                        }



                        j = 15;
                        for (i = 0; i < 8; i++) {

                            if (obj.itemGroups[1].items[i][0].isRun == 1) {
                                m = 1;
                            } else if ((obj.itemGroups[1].items[i][0].i.c) == "#000000") {
                                m = 0
                            } else
                                m = 5;
                            output.send('noteon', {note: j, velocity: m, channel: 0});
                            j = j - 1;
                        }
                        for (i = 0; i < 8; i++) {
                            if (obj.itemGroups[2].items[i][0].isRun == 1) {
                                m = 1;
                            } else if ((obj.itemGroups[2].items[i][0].i.c) == "#000000") {
                                m = 0
                            } else
                                m = 5;
                            output.send('noteon', {note: j, velocity: m, channel: 0});
                            j = j - 1;
                        }
                    }



                    if (wing == 0) {
                        j = 69;
                        for (i = 0; i < 6; i++) {

                            if (obj.itemGroups[0].items[i][0].isRun == 1) {
                                m = 2;
                            } else if ((obj.itemGroups[0].items[i][0].i.c) == "#000000") {
                                m = 0
                            } else
                                m = 1;
                            output.send('noteon', {note: j, velocity: m, channel: 0});
                            j = j - 1;
                        }


                        k = 1;
                        for (l = 0; l < 6; l++) {
                            j = j - 2;
                            for (i = 0; i < 6; i++) {
                                var m = 0;
                                if (obj.itemGroups[0].items[i][0].executorBlocks[0].fader.v >= k) {
                                    m = 3;
                                }
                                output.send('noteon', {note: j, velocity: m, channel: 0});
                                j = j - 1;
                            }
                            k = k - 0.2;
                        }




                        j = 13;
                        for (i = 0; i < 6; i++) {

                            if (obj.itemGroups[1].items[i][0].isRun == 1) {
                                m = 1;
                            } else if ((obj.itemGroups[1].items[i][0].i.c) == "#000000") {
                                m = 0
                            } else
                                m = 5;

                            output.send('noteon', {note: j, velocity: m, channel: 0});
                            j = j - 1;
                        }
                        j = 5;
                        for (i = 0; i < 6; i++) {

                            if (obj.itemGroups[2].items[i][0].isRun == 1) {
                                m = 1;
                            } else if ((obj.itemGroups[2].items[i][0].i.c) == "#000000") {
                                m = 0
                            } else
                                m = 5;

                            output.send('noteon', {note: j, velocity: m, channel: 0});
                            j = j - 1;
                        }

                    }
                }
            }

            if (wing != wings) {
                wing = (wings);


                for (i = 0; i < 73; i++) {
                    output.send('noteon', {note: i, velocity: 0, channel: 0});
                }
            }
        }
    }
};
