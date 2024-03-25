import express from "express"  //IMPORTO EL MODULO DE EXPRESS
import productManager from "./fs/ProductManager.js";
import userManager from "./fs/UserManager.js";

const server = express()
//CREO EL SERVIDOR 
const port = 8080 
//DEFINO EL PUERTO A DONDE SE VA A LEVANTAR EL SERVIDOR

const ready = () => console.log("server ready on port" + port);

server.listen(port, ready) 
//SE LEVANTA EL SERVIDOR   


//MIDDLEWARES
server.use(express.urlencoded({ extended: true }))  
//OBLIGO a mi servidor que use la funcion de leer parametros/consultas (req.params/req.querys) 


// RUTAS

server.get("/", async(requirements , response)=> {
    try {
        return response.status(200).json({
            response: "CODER API",
            success: true,
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            response: "CODER API ERROR",
            success: false,
        })
    }
})



server.get("/app/products", async (req, res)=> {
    try {
        const { category } = req.query
        const all = await productManager.read(category)
        if(all.length !== 0) {
            return res.status(200).json({
                response: all,
                category,
                success: true,
            })
        } else {
            const error = new Error ("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false,
            message: "No se encontraron productos de esa categoria",
        })
    }
})


// get con un parametro 

server.get("/app/products/:pid", async(req, res)=>{
    try {
        const { pid } = req.params
        const one = await productManager.readOne(pid)
        if(one){
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error ("NOT FOUND")
            error.statusCode = 404
            throw error 
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false,
            message: "No se encontraron productos con ese ID"
        })
    }
})


//get con dos parametros

server.get("/app/products/:title/:category", async (req, res)=>{
    try {
        const {title, category} = req.params
        const data = { title, category }
        const one = await productManager.create(data)
        return res.status(201).json({
            response: one,
            success: true,
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            response: "CODER API ERROR",
            success: false,
        })
    }
})


// PETICIONES DE USERS

server.get("/app/users", async (req, res)=> {
    try {
        const { role } = req.query
        const all = await userManager.read(role)
        if(all.length !== 0) {
            return res.status(200).json({
                response: all,
                role,
                success: true,
            })
        } else {
            const error = new Error ("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false,
            message: "No se encontraron usuarios con ese rol",
        })
    }
})

 

server.get("/app/users/:uid", async(req, res)=>{
    try {
        const { uid } = req.params
        const one = await userManager.readOne(uid)
        if(one){
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error ("NOT FOUND")
            error.statusCode = 404
            throw error 
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false,
            message: "No se encontraron usuarios con ese ID"
        })
    }
})