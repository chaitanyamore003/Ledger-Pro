const dns = require("node:dns").promises;

dns
  .resolveSrv("_mongodb._tcp.cluster0.gre6skg.mongodb.net")
  .then((records) => {
    console.log(records);
  })
  .catch((err) => {
    console.error(err);
  });
