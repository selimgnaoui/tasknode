var koa = require('koa');
var router = require('koa-router');
var Koa = new koa();
var Router = new router();
var mongoose = require('mongoose');


const  restoSchema = require('./Schema/Resto')
const json = require('koa-json')
// response should be in JSON
Koa.use(json())

// create database connection
// I would save the pass the the username is a GLOB EnV and not commit them , but as it is a test database it doesnt matter
mongoose.connect("mongodb://salimo:testtest1@ds143070.mlab.com:43070/restaurants");

var Resto = mongoose.model("Resto", restoSchema);


// get all restaurants
Router.get("/getall",getall);

// get By Name ex URL . getbyName/BurgerKing
Router.get("/getbyName/:name",getByname);

//getbyLongAndLati/23/44
Router.get("/getbyLongAndLati/:long/:latiude",getbyLongAndLati);




async function getall (ctx){

    var result = await  Resto.find(function(err, response){
        if (err)
        {
            // handle error here
        }
        return response;
    });
    ctx.body=result
}

async function getByname (ctx){

    var result = await  Resto.find({"name":ctx.params.name},function(err, response){
        if (err)
        {
            return err;
        }
        return response;
    });

    ctx.body= result

}
async function getbyLongAndLati (ctx){

    var result = await  Resto.find({"long":ctx.params.long,"latiude" : ctx.params.latiude},function(err, response){
        if (err)
        {
            return err;
        }
        return response;
    });

    ctx.body= result

}


Koa.use(Router.routes()).use(Router.allowedMethods()).use(require('koa-body')())

Koa.listen(3000)