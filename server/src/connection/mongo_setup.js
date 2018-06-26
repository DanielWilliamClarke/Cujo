const mongoose = require("mongoose");

const ConstructURI = config => `mongodb://${config.user}:${config.pass}@${config.host}/${config.collection}`

module.exports = class MongoSetup {

  constructor(mongoConfig) {
    this.config = mongoConfig;
    this.uri = ConstructURI(this.config);
    this.connect = this.connect.bind(this);
    this.setupHandlers.apply(this);
  }

  connect() {
    console.log(`attempting connection on to mongo on ${this.config.host}`);
    mongoose.connect(this.uri).catch(() => {
      console.log(`Failed to connect to mongo on ${this.config.host}`)
    })
  }

  setupHandlers () {
    mongoose.connection.on("connected", () => {
      console.log(`Successfully Connected to Mongo on ${this.config.host}`);
    });

    mongoose.connection.on('disconnected', () => {  
      console.log(`Disconnecting from ${this.config.host}`); 
    });

    mongoose.connection.on("error", (error) => {
      if (error) {
        console.error('retrying in 5 sec');
        setTimeout(this.connect, 5000);
      }
    });
  }
}
