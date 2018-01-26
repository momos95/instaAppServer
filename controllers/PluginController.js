import pluginService from '../services/PluginService' ;

class PluginController {


    constructor(){
        console.log("--\t PluginController : Creating the Controller...") ;
        pluginService.loadPlugins() ;
    }

    addClientSocket(client){
        pluginService.addClientSocket(client);
    }

    getAllPluginsRequests(req, res){
        console.log('Getting Plugins Requests')
        res.end(JSON.stringify(pluginService.getPluginsRequests())) ;
    }


    getAllPluginsViews(req, res){
        res.end(JSON.stringify(pluginService.getPluginsViews())) ;
    }

    doRequest(req, res){
        console.log("Doing the request.") ;
        res.end(JSON.stringify(pluginService.doPluginRequest(req.params.requestId, req.body))) ;
    }
}

export default new PluginController() ;