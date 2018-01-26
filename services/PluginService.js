"use strict" ;

const fs = require('fs') ;
import EventEmitter from "events" ;

class PluginService {

    constructor(){
        console.log("\t PluginService : creating the plugin's Service.")
        this.plugins = [] ;
        this.clientsSockets = [];
        this.pluginsEvents = new EventEmitter();
    }

    addClientSocket(client){

        console.log("new client connected");

        for(var i in this.plugins){
            this.plugins[i].subscribeEvent(client) ;
        }

        this.clientsSockets.push(client) ;
    }

    emitEvent(name, data){
        for(var i in this.clientsSockets){
            this.clientsSockets[i].emit(name,data) ;
        }
    }


    loadPlugins() {

        var pluginsFolder = "./plugins";
        this.plugins = [];
        fs.readdir(pluginsFolder, (err, files) => {

            files.forEach(file => {

                if(file !== '.DS_Store'){
                    console.log("\t -- Loading the plugin ... " + file) ;
                    var tmpPlugin = require('../' + pluginsFolder + "/" + file + "/index.js").default ;
                    tmpPlugin.setService(this);
                    this.plugins.push(tmpPlugin) ;
                }

            }) ;

        });

    }

    getPluginsRequests(){
        var allRequests = {} ;
        for (var i in this.plugins){
            for(var j in this.plugins[i].getRequests()){
                allRequests[j] = this.plugins[i].getRequests()[j] ;
            }
        }
        return allRequests ;
    }

    getPluginsViews(){
        var allViews = [] ;
        for (var i in this.plugins){
            if(this.plugins[i].getView()){
                allViews.push(this.plugins[i].getView());
            }
        }
        return allViews ;
    }

    doPluginRequest(requestId, data){
        var tmpPlugin = this.getPluginByRequestId(requestId) ;
        if(tmpPlugin !== null){
            return tmpPlugin.doRequest(requestId,data) ;
        }
        else{
            return "Je ne comprend pas."
        }
    }

    getPluginByRequestId(requestId){
        for(var i in this.plugins){
            for(var j in this.plugins[i].getRequests()){
                if(requestId == j)
                    return this.plugins[i] ;
            }
        }
        return null ;
    }



}

export default new PluginService() ;