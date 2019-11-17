var mosca = require('mosca');
var logController = require('./api/controllers/Log')
var moduleController = require('./api/controllers/Module')
var lodash = require('lodash')
var settings = {
    port:1883,
    http: {
        port: 1884,
        bundle: true,
        static: './'
      }
    }

var broker = new mosca.Server(settings);

broker.on('ready', function(){
    console.log("Broker is ready");
    });

broker.on('published', function async (packet, client) {
    console.log(packet.payload.toString());
    let parsed;
    try{
        parsed = JSON.parse(packet.payload.toString());
        if(parsed["clientId"]){
            parsed=undefined;
        }
    }
catch{}
if(parsed!==undefined){
    //console.log("PARSED", parsed)
    // lodash.forEach(parsed.data, function(value) {Now
    //     if(value.lastID>tate){
    //         deviceController.getByExtID(value.lastID, function(result){
    //             if(result[0].allowed){
    //                 console.log("Allowed");
    //                 var message = {
    //                             topic: 'melnyk/rfid/in',
    //                             payload: JSON.stringify({relay:value.port, state:true}), // or a Buffer
    //                             qos: 0, // 0, 1, or 2
    //                             retain: false // or true
    //                           };
                              
    //                           broker.publish(message, function() {
    //                             console.log('Published done!');
    //                           });
    //             }
    //             else{
    //                 console.log("NOT Allowed");
    //                 var message = {
    //                             topic: 'melnyk/rfid/in',
    //                             payload: JSON.stringify({relay:value.port, state:false}), // or a Buffer
    //                             qos: 0, // 0, 1, or 2
    //                             retain: false // or true
    //                           };
                              
    //                           broker.publish(message, function() {
    //                             console.log('Published done!');
    //                           });
    //             }
    //         });
    //     }
        
        // if(value.lastID>0&&!deviceController.getByExtID(value.lastID)["allowed"]){
        //     console.log("NOT ALLOWED");
        //     // var message = {
        //     //     topic: 'melnyk/rfid/in',
        //     //     payload: JSON.stringify({relay:value.port, state:false}), // or a Buffer
        //     //     qos: 0, // 0, 1, or 2
        //     //     retain: false // or true
        //     //   };
              
        //     //   broker.publish(message, function() {
        //     //     console.log('Published done!');
        //     //   });
        // }
        // else if (value.lastID>0&&deviceController.getByExtID(value.lastID)["allowed"]){
        //     console.log("ALLOWED");
        //     // var message = {
        //     //     topic: 'melnyk/rfid/in',
        //     //     payload: JSON.stringify({relay:value.port, state:true}), // or a Buffer
        //     //     qos: 0, // 0, 1, or 2
        //     //     retain: false // or true
        //     //   };
              
        //     //   broker.publish(message, function() {
        //     //     console.log('Published done!');
        //     //   });
        // }
        // else{
        //     console.log("Undefined");
        // }
    //   });
    //console.log(client);
    
    if(client){logController.NewFromMQTT(client.id, JSON.stringify(parsed.data))}
    //console.log('Published',packet.topic, parsed.sensor);
    

}});

broker.on('clientConnected', function(client) {
    console.log('Client Connected:', client.id);
    moduleController.getID(client.id, function(module){
        if(module){
            logController.getLastLogforConfig(module._id, function(log){
                let config = [];
                lodash.forEach(log,function(value){
                    config.push({relay:value.port, state:value.relay});
                });
                
                var message = {
                            topic: 'melnyk/rfid/'+client.id+'/in',
                            payload: JSON.stringify(config), // or a Buffer
                            qos: 0, // 0, 1, or 2
                            retain: false // or true
                          };
                          console.log(message);
                          broker.publish(message, function() {
                            console.log('Published done!');
                          });
            });
            
        }
    });

    });
    
    // fired when a client disconnects
    broker.on('clientDisconnected', function(client) {
    console.log('Client Disconnected:', client.id);
    });

module.exports = broker;








    
