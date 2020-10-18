module.exports = {
    executeEvent: function (message) {
        try {
            events = [];
            //whoPingedMe
            if(message.mentions.users.filter(u => u.id == "193950601271443456" && u.presence.status == "dnd").size > 0) {
                events.push("whoPingedMe");
            }
            if(message.content.includes("based")) {
                events.push("based");
            }
            if(message.content.includes("✨")) {
                events.push("acirsparkle");
            }
            events.forEach(e => {
                var eventFile = require("./" + e + ".js");
                eventFile.execute(message);
            });

        } catch(err) {
            console.log(err);
        }
        
    },
    
    probability: function(prob) {
        return Math.ceil(Math.random() * 100) <= prob;
    }
}


