var recordPlayerModel = {
    
    brand: "Crosley",
    model: "Revolution",
    color: "Black and yellow",
    speedsAvailable: 2,
    powerOn: false,
    isRecordOn: false,
    isSpinning: false
};

var recordPlayerControls = {
    turnOn: function() {
        recordPlayerModel.powerOn = true;
        view.displayMessage("Your record player is on. Choose a record to play!");
    },

    turnOff: function() {
        if (recordPlayerModel.isSpinning == true) {
            view.displayMessage("Stop your turntable from spinning first!");
        }
        else {
            recordPlayerModel.powerOn = false;
            view.displayMessage("Your record player is off.");
        }
    },

    RecordOn: function() {
        var self = this;
        return function(event) {
            event.preventDefault();
            if (recordPlayerModel.powerOn == false) {
                view.displayMessage("You need to turn your record player on before you can play music!");
            } else if (recordPlayerModel.isSpinning == true) {
                view.displayMessage("Stop spinning your tuntable before you choose a new record.");
            } else {
                recordPlayerModel.isRecordOn = true;
                var target = event.currentTarget;
                var id = target.id;
                self.currentRecord = recordsModel.getRecord(id);
                view.displayMessage("You are ready to play ''" + self.currentRecord.title + "'' by " + self.currentRecord.artist + ". Start spinning your turntable!");
            }
        } 
    },

    startSpin: function() {
        var self = this;
            return function() {
                if (recordPlayerModel.powerOn == false && recordPlayerModel.isRecordOn == false) {
                    view.displayMessage("Turn on your record player on first!");
                }
                if (recordPlayerModel.powerOn == true && recordPlayerModel.isRecordOn == false) {
                    view.displayMessage("You didn't choose a record yet!");
                }
                else if (recordPlayerModel.powerOn == true && recordPlayerModel.isRecordOn == true) {
                    view.displayMessage("Your turntable is now playing ''" + self.currentRecord.title + "'' by " + self.currentRecord.artist + ".");
                    recordPlayerModel.isSpinning = true;
                    var audioElement = document.getElementById(self.currentRecord.audioId);
                    self.playMp3(audioElement);
                }
            }
    },

    playMp3: function(element) {
        element.play();
    },

    stopSpin: function() {
        var self = this;
            return function() {
                if (recordPlayerModel.powerOn == false) {
                    view.displayMessage("Your record player is not on!");
                }
                if (recordPlayerModel.isSpinning == true) {
                    recordPlayerModel.isSpinning = false;
                    view.displayMessage("Your turntable stopped spinning.");
                    audioElement = document.getElementById(self.currentRecord.audioId);
                    self.pauseMp3(audioElement);
                }
                else if (recordPlayerModel.isSpinning == false && recordPlayerModel.powerOn == true) {
                    view.displayMessage("Your turntable is not spinning.");
                }
            }
    },

    pauseMp3: function(element) {
        element.pause();
    },

    changeVolume: function() {
        var self = this;
        return function(event) {
            var currentVolume = event.target.value;
            var newVolume = volumeslider.value;
            
        }
    },

    onClickListeners: function(element, listener) {
        element.onclick = listener;
    }

};


var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg; 
    }  
};

var recordsModel = {
    records: [ 
                { artist: "Eagulls", title: "Possessed", id: "eagulls", audioId: "eagullsMp3" },
                { artist: "Blur", title: "There's No Other Way", id: "blur", audioId: "blurMp3" },
                { artist: "Pixies", title: "Here Comes Your Man", id: "pixies", audioId: "pixiesMp3" },
                { artist: "The Clash", title: "Train in Vain", id: "theClash", audioId: "theClashMp3" },
                { artist: "Drowners", title: "Luv, Hold Me Down", id: "drowners", audioId: "drownersMp3" }
    ],

    getRecord: function(id) {
        for (var i = 0; i < this.records.length; i++) {
            if (id == this.records[i].id) {
                return this.records[i];
            } 
        }
    }

};


//CLICKING UI BUTTONS
var onButton = document.getElementById("on");
var offButton = document.getElementById("off");
var startSpinButton = document.getElementById("start");
var stopSpinButton = document.getElementById("stop");
recordPlayerControls.onClickListeners(onButton, recordPlayerControls.turnOn);
recordPlayerControls.onClickListeners(offButton, recordPlayerControls.turnOff);
recordPlayerControls.onClickListeners(startSpinButton, recordPlayerControls.startSpin());
recordPlayerControls.onClickListeners(stopSpinButton, recordPlayerControls.stopSpin());

//SLIDING UI (VOLUME)
var volumeslider = document.getElementById("volume");
volumeslider.addEventListener("change", recordPlayerControls.changeVolume());

//CHOOSING A RECORD (CLICKING ALBUM ART & LOADING TRACK)
var chooseEagulls = document.getElementById("eagulls");
var chooseBlur = document.getElementById("blur");
var choosePixies = document.getElementById("pixies");
var chooseTheClash = document.getElementById("theClash");
var chooseDrowners = document.getElementById("drowners");
recordPlayerControls.onClickListeners(chooseEagulls, recordPlayerControls.RecordOn());
recordPlayerControls.onClickListeners(chooseBlur, recordPlayerControls.RecordOn());
recordPlayerControls.onClickListeners(choosePixies, recordPlayerControls.RecordOn());
recordPlayerControls.onClickListeners(chooseTheClash, recordPlayerControls.RecordOn());
recordPlayerControls.onClickListeners(chooseDrowners, recordPlayerControls.RecordOn());


//JQUERY FOR STICKY MESSAGE AREA
$(function(){
        var stickyMessage = $('#messageArea').offset().top;
          
        $(window).scroll(function(){
                if( $(window).scrollTop() > stickyMessage ) {
                        $('#messageArea').css({position: 'fixed', top: '0px'});
                }
                if( $(window).scrollTop() < stickyMessage ) {
                        $('#messageArea').css({position: '', top: '0px'});
                }
        });
});





