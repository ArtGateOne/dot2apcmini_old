# dot2apcmini
v1.0.7
This nodejs code is for control dot2 (DMX) console or software with Akai APC mini (midi controller) required installed nodejs v 14.15.0


How to run?

connect apc mini controller

Run dot2 on pc.
Turn on webremote
Set password "remote"

run this code from command line

(run cdm
cd to code destinaton folder
ex. cd c:/dot2apcmini

to run type command
node dot2acpmini

when code start - schow all available midi devices (in & out)
default open akai in 0 and out 1

var input = new easymidi.Input('APC MINI 0');
var output = new easymidi.Output('APC MINI 1');



when U want control dot2 console - find in code "localhost" ang change it to uou console IP addres
