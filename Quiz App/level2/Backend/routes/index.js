const userRoutes = require("./user_routes");
let questionRoutes = require("./question-routes")

module.exports = function (app) {
    app.use("/v1/user", userRoutes);
    app.use("/v1/questions", questionRoutes)
};


