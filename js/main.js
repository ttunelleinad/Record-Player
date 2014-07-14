var recordPlayerModel = {
    
    brand: "Crosley",
    model: "Revolution",
    color: "Black and yellow",
    speedsAvailable: 2,
    powerOn: false,
    isRecordOn: false,
    isSpinning: false,
    isUSBCapable: true,
    currentVolume: 0
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

    RecordOn: function(element) {
        if (recordPlayerModel.powerOn == false) {
            view.displayMessage("You need to turn your record player on before you can play music!");
        }
        else {
            recordPlayerModel.isRecordOn = true;
            var target = event.currentTarget;
            var id = target.id;
            var currentRecord = recordsModel.getRecord(id);
        }
    },

    startSpin: function() {
        if (recordPlayerModel.powerOn == false) {
            view.displayMessage("Turn on your record player first!");
        }
        if (recordPlayerModel.isRecordOn == false) {
            view.displayMessage("You didn't choose a record yet!");
        }
        else if (recordPlayerModel.powerOn == true && recordPlayerModel.isRecordOn == true) {
            view.displayMessage("Your turntable is now playing " + currentRecord + ".");
            recordPlayerModel.isSpinning = true;
            this.playMp3();
        }
    },

    playMp3: function() {
        audioId.play();
    },

    stopSpin: function() {
        if (recordPlayerModel.powerOn == false) {
            view.displayMessage("Your record player is not on!");
        }
        if (recordPlayerModel.isSpinning == true) {
            recordPlayerModel.isSpinning = false;
            view.displayMessage("Your turntable stopped spinning.");
        }
        else if (recordPlayerModel.isSpinning == false && recordPlayerModel.powerOn == true) {
            view.displayMessage("Your turntable is not spinning.");
        }
        pauseMp3();
    },

    pauseMp3: function() {
        //something with .pause();
    },

    computerConnect: function() {
        if (recordPlayerModel.isUSBCapable == false) {
            view.displayMessage("Sorry, your record player is not USB compatible.")
        }
        if (recordPlayerModel.powerOn == false) {
            view.displayMessage("Turn your record player on first!")
        }
        else if (recordPlayerModel.isUSBCapable == true && recordPlayerModel.powerOn == true) {
            view.displayMessage("You are now connected to your computer to digitize music.");
        }
    },

    volumeUp: function() {
        recordPlayerModel.currentVolume = ++recordPlayerModel.currentVolume;
        view.displayMessage("Volume is set to " + recordPlayerModel.currentVolume); 
    },

    volumeDown: function() {
        recordPlayerModel.currentVolume = --recordPlayerModel.currentVolume;
        view.displayMessage("Volume is set to " + recordPlayerModel.currentVolume);
        if (recordPlayerModel.currentVolume <= 0) {
            view.displayMessage("The volume is turned down all the way...turn it up!");
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
                    var record = this.records[i].title + " by " + this.records[i].artist;
            } view.displayMessage("You are ready to play " + record + ". Start spinning that record!")
        }
    }

};


//CLICKING UI BUTTONS
var onButton = document.getElementById("on");
var offButton = document.getElementById("off");
var startSpinButton = document.getElementById("start");
var stopSpinButton = document.getElementById("stop");
var usbButton = document.getElementById("usb");
recordPlayerControls.onClickListeners(onButton, recordPlayerControls.turnOn);
recordPlayerControls.onClickListeners(offButton, recordPlayerControls.turnOff);
recordPlayerControls.onClickListeners(startSpinButton, recordPlayerControls.startSpin);
recordPlayerControls.onClickListeners(stopSpinButton, recordPlayerControls.stopSpin);
recordPlayerControls.onClickListeners(usbButton, recordPlayerControls.computerConnect);

//CHOOSING A RECORD (CLICKING ALBUM ART & LOADING TRACK)
var chooseEagulls = document.getElementById("eagulls");
var chooseBlur = document.getElementById("blur");
var choosePixies = document.getElementById("pixies");
var chooseTheClash = document.getElementById("theClash");
var chooseDrowners = document.getElementById("drowners");
recordPlayerControls.onClickListeners(chooseEagulls, recordPlayerControls.RecordOn);
recordPlayerControls.onClickListeners(chooseBlur, recordPlayerControls.RecordOn);
recordPlayerControls.onClickListeners(choosePixies, recordPlayerControls.RecordOn);
recordPlayerControls.onClickListeners(chooseTheClash, recordPlayerControls.RecordOn);
recordPlayerControls.onClickListeners(chooseDrowners, recordPlayerControls.RecordOn);

//PLAYING OR PAUSING RECORD
var eagullsMp3 = document.getElementById("eagullsMp3");
var blurMp3 = document.getElementById("blurMp3");
var pixiesMp3 = document.getElementById("pixiesMp3");
var theClashMp3 = document.getElementById("theClashMp3");