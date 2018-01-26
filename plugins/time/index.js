"use strict";


import Plugin from "../../models/Plugin.js";

class TimePlugin extends Plugin {

    doRequest(id, data) {
        console.log("request : "+id);
        switch(id){
            case "time":
                var now = new Date();
                var response= "Il est "+ now.getHours() + " heure " + now.getMinutes() + "."
                console.log("response : " + response);
                this.service.emitEvent("timeEvent",response) ;
                return response;
            case "day":
                var now = new Date();
                var weekday = new Array('Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi') ;
                var curentDay = weekday[now.getDay()] ;
                var response = "On est " + curentDay + "." ;
                console.log("response : " + response) ;
                this.service.emitEvent("timeEvent",response) ;
                return response ;
        }
        return null;
    }

    subscribeEvent(socketClient){
        const obj= this;
        socketClient.on("clientTimeEvent", function(data){
            console.log("clientTimeEvent");
            console.log(data);
            obj.doRequest(data.command,null) ;
        });
    }

}

export default new TimePlugin(__dirname);

