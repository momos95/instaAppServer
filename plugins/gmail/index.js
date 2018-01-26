"use strict" ;
import Plugin from "../../models/Plugin.js" ;
import Gmail from "./Gmail" ;

var token_mail = require('../../gmail-nodejs-quickstart.json')

class GmailPlugin extends Plugin{

	doRequest(id, data) {
        console.log("request : "+id);
        var Gmail = require('node-gmail-api')
        , gmail = new Gmail(token_mail.access_token)
        , s = gmail.messages('label:inbox', {max: 100})
        var tab_req=["inbox","spam","trash","unread","starred","important","sent"];
        var rep;
        var service=this.service;
        tab_req.forEach(function(element) {
            if(id==element){

                s = gmail.messages('label:'+element)
                
                s.on('data', function (d) {
                        console.log('----'+d.snippet)
                        //console.log(service);
                        service.emitEvent(d.snippet,d.snippet)
                    })
                    
            }
        });
        return service[0];
        
   }

}

export default new GmailPlugin(__dirname);
