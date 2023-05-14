function version(options){
    return (req, res, next) => {
        const acceptedHeaders = req.headers["accept"];
        const acceptedTypes = acceptedHeaders.split(",");

       for (let format of acceptedTypes) {
           if (format === "application/json") {
               return res.json(options);
           } else if (format === "text/csv") {
               return res.csv(options);
           } else if (format === "text/plain") {
               return res.plain(options);
           } else {
                return res.json(options);
              }
        }
    }
}

module.exports = version;