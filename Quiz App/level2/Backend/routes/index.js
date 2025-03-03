let userRoutes = require("./user_routes")

module.exports = function (app){
    app.use("/v1/user", userRoutes)
}