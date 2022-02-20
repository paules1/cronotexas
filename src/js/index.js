import "../style/app.css"
(() => {
    const myCron = new Chronometer();
    setInterval(() => {
        myCron.tick()
    }, 1000);


    document.querySelector('#btn_run').addEventListener('click', function () {
        if (!myCron.active) {
            myCron.start()
            document.querySelector(myCron.rcronContainer).classList.remove('stop');
        } else {
            myCron.stop()
            document.querySelector(myCron.rcronContainer).classList.add('stop');
        }
    });

    document.querySelector('#btn_ff').addEventListener('click', function () {
        myCron.ff()
    });

    document.querySelector('#btn_rw').addEventListener('click', function () {
        myCron.rw()
    });

    document.querySelector('#btn_jumpforward').addEventListener('click', function () {
        myCron.jumpforward()
        document.querySelector(myCron.rcronContainer).classList.remove('stop');
    });

    document.querySelector('#btn_jumpback').addEventListener('click', function () {
        myCron.jumpback()
        document.querySelector(myCron.rcronContainer).classList.remove('stop');
    });


    function Chronometer() {
        this.active = false;
        this.clockContainer = "";
        this.cronContainer = "";
        this.rcronContainer = "";
        this.stageContainer = "";
        this.shortContainer = "";
        this.dShortContainer = "";
        this.time = new Date();
        this.rectime = new Date();
        this.cron = new Date(0, 0, 0, 0);
        this.offsetTime = new Date(0, 0, 0, 0);
        this.currentStage = 1;
        this.currentStageName = "";
        this.currentShortAmount = 0;
        this.currentTimeLeft = 0;
        this.stages = [];
        this.stages[0] = {number: 1, from: 0, to: 12, name: "1", short: 25}
        this.stages[1] = {number: 2, from: 12, to: 24, name: "2", short: 50}
        this.stages[2] = {number: 3, from: 24, to: 36, name: "3", short: 75}
        this.stages[3] = {number: 4, from: 36, to: 48, name: "4", short: 100}
        this.stages[4] = {number: 5, from: 48, to: 60, name: "5", short: 150}
        this.stages[5] = {number: 6, from: 60, to: 72, name: "6", short: 200}
        this.stages[6] = {number: 7, from: 72, to: 84, name: "7", short: 300}
        this.stages[7] = {number: 8, from: 84, to: 96, name: "8", short: 400}
        this.stages[8] = {number: 9, from: 96, to: 108, name: "9", short: 500}
        this.stages[9] = {number: 10, from: 108, to: 120, name: "10", short: 600}
        this.stages[10] = {number: 11, from: 120, to: 132, name: "11", short: 800}
        this.stages[11] = {number: 12, from: 132, to: 144, name: "12", short: 1000}
        this.stages[12] = {number: 13, from: 144, to: 156, name: "13", short: 1500}
        this.stages[13] = {number: 14, from: 156, to: 168, name: "14", short: 2000}
        this.stages[14] = {number: 15, from: 168, to: 180, name: "15", short: 2500}
        this.maxStages = 15;
        this.clockContainer = "#time";
        this.cronContainer = "#cron";
        this.rcronContainer = "#rcron";
        this.stageContainer = "#stage";
        this.shortContainer = "#short";
        this.dShortContainer = "#dshort";
        this.active = false;

    }

    Chronometer.prototype.stop = function () {
        if (this.active) {
            this.active = false;
            this.offsetTime.setHours(this.cron.getHours());
            this.offsetTime.setMinutes(this.cron.getMinutes());
            this.offsetTime.setSeconds(this.cron.getSeconds());
        }
    }

    Chronometer.prototype.start = function () {
        if (this.active === false) {
            this.rectime = new Date();
            this.active = true;
        }
    }

    Chronometer.prototype.ff = function () {
        if (this.active) {
            this.offsetTime.setMinutes(this.offsetTime.getMinutes() + 1);
        }
    }

    Chronometer.prototype.rw = function () {
        if (this.active) {
            this.offsetTime.setMinutes(this.offsetTime.getMinutes() - 1);
        }
    }

    Chronometer.prototype.jumpforward = function (stage) {
        if (this.currentStage < this.maxStages) {
            this.stop();
            this.offsetTime.setHours(0, 0, 0, 0);
            this.currentStage += 1;
            this.offsetTime.setMinutes(this.stages[this.currentStage - 1].from);
            this.start();
        }
    }

    Chronometer.prototype.jumpback = function (stage) {
        if (this.currentStage > 0) {
            this.stop();
            this.offsetTime.setHours(0, 0, 0, 0);
            if (this.currentStage !== 1) {
                this.currentStage -= 1;
            } else {
                this.currentStage = 1;
            }
            this.offsetTime.setMinutes(this.stages[this.currentStage - 1].from);
            this.start();
        }
    }

    Chronometer.prototype.timeToText = function (tim) {
        let th = tim.getHours();
        let tm = tim.getMinutes();
        let ts = tim.getSeconds();
        if (th < 10) th = "0" + th;
        if (tm < 10) tm = "0" + tm;
        if (ts < 10) ts = "0" + ts;
        return th + ":" + tm + ":" + ts;
    }

    Chronometer.prototype.secondsToText = function (sec) {
        let mm = Math.floor(sec / 60);
        let ss = sec % 60;
        if (mm < 10) mm = "0" + mm;
        if (ss < 10) ss = "0" + ss;
        return mm + ":" + ss;
    }

    Chronometer.prototype.tick = function () {
        this.time = new Date();
        //paint time
        document.querySelector(this.clockContainer).innerHTML = this.timeToText(this.time);
        //paint cron
        document.querySelector(this.cronContainer).innerHTML = this.timeToText(this.cron);
        //paint stage
        document.querySelector(this.stageContainer).innerHTML = this.currentStageName;
        document.querySelector(this.shortContainer).innerHTML = this.currentShortAmount.toLocaleString();
        document.querySelector(this.dShortContainer).innerHTML = (this.currentShortAmount * 2).toLocaleString();
        document.querySelector(this.rcronContainer).innerHTML = this.secondsToText(this.currentTimeLeft);
        //cronometer if active
        if (this.active) {
            let ch = this.time.getHours() - this.rectime.getHours() + this.offsetTime.getHours();
            let cm = this.time.getMinutes() - this.rectime.getMinutes() + this.offsetTime.getMinutes();
            let cs = this.time.getSeconds() - this.rectime.getSeconds() + this.offsetTime.getSeconds();
            this.cron.setHours(ch);
            this.cron.setMinutes(cm);
            this.cron.setSeconds(cs);
            let th = this.cron.getHours();
            let tm = this.cron.getMinutes();
            let ts = this.cron.getSeconds();
            tm = tm + (th * 60);
            ts = ts + (tm * 60);
            for (let i = 0; i < this.stages.length; i++) {
                if (tm >= this.stages[i].from && tm < this.stages[i].to) {
                    this.currentStage = this.stages[i].number;
                    this.currentStageName = this.stages[i].name;
                    this.currentShortAmount = this.stages[i].short;
                    this.currentTimeLeft = (this.stages[i].to * 60) - ts;
                }
            }
            //desactiva cuando haya alcanzado la ultima fase
            if (tm >= this.stages[this.maxStages - 1].to) {
                this.active = false;
                this.offsetTime.setHours(0, 0, 0, 0);
                this.currentStage = 1;
                this.currentStageName = '1';
                this.currentShortAmount = 0;
            }
        }
    }

})();