const mongoose = require("mongoose");

module.exports = class MongoSetup {

  constructor(mongoUrl) {
    this.url = mongoUrl;
    this.connect = this.connect.bind(this);
    this.setupHandlers.apply(this);
  }

  connect() {
    console.log(`attempting connection on to mongo on ${this.url}`);
    mongoose.connect(this.url).catch(() => {
      console.log(`Failed to connect to mongo on ${this.url}`)
    })
  }

  setupHandlers () {
    mongoose.connection.on("connected", () => {
      console.log(`Successfully Connected to Mongo on ${this.url}`);
    });

    mongoose.connection.on('disconnected', () => {  
      console.log(`Disconnecting from ${this.url}`); 
    });

    mongoose.connection.on("error", (error) => {
      if (error) {
        console.error('retrying in 5 sec');
        setTimeout(this.connect, 5000);
      }
    });
  }
}
