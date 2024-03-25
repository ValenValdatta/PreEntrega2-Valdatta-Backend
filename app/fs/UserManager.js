import fs from "fs";
import crypto from "crypto";

class UserManager {
   constructor() {
      this.path = "./fs/files/users.json";
      this.init();
   }
   init() {
      const exists = fs.existsSync(this.path);
      if (!exists) {
         const stringData = JSON.stringify([], null, 2);
         fs.writeFileSync(this.path, stringData);
         console.log("Archivo creado!");
      } else {
         console.log("El archivo ya existe!!");
      }
   }
   async create(data) {
      try {
         if (!data.email) {
            const error = new Error("Ingrese un Usuario");
            throw error;
         } else {
            const user = {
               id: crypto.randomBytes(12).toString("hex"),
               photo: data.photo,
               email: data.email,
               password: data.password,
               role: data.role,
            };
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            all.push(user);
            all = JSON.stringify(all, null, 2);
            await fs.promises.writeFile(this.path, all);
            console.log("Usuario creado!");
            return user;
         }
      } catch (error) {
         throw error;
      }
   }
   async read(role = null) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         if(all.length === 0){
            throw new Error("no hay usuarios para mostrar")
         }
         if (role !== null){
            all = all.filter(each => each.role === role)
            return all
         } else {
            console.log(all);
            return all
         }        
      } catch (error) {
         throw error;
      }
   }
   async readOne(uid) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         let one = all.find((each) => each.id === uid);
         if (!one) {
            throw new Error("no se encontro el id");
         } else {
            console.log(one);
            return one;
         }
      } catch (error) {
         throw error;
      }
   }
   async destroy(id) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         let one = all.find((each) => each.id === id);
         if (!one) {
            throw new Error("no se encontro el id");
         } else {
            let filtered = all.filter((each) => each.id !== id);
            filtered = JSON.stringify(filtered, null, 2);
            await fs.promises.writeFile(this.path, filtered);
            console.log({ deleted: one.id });
            return one;
         }
      } catch (error) {
         throw error;
      }
   }
}

async function crearUsuario() {
   try {
      const user = new UserManager();
      await user.create({
         photo: "foto",
         email: "admin@gmail.com",
         password: "admin123",
         role: "admin",
      });
      await user.create({
         photo: "foto",
         email: "user1@gmail.com",
         password: "user1!",
         role: "user",
      });
      await user.create({
         photo: "foto",
         email: "user2@gmail.com",
         password: "user2!",
         role: "user",
      });
      await user.create({
         photo: "foto",
         email: "user3@gmail.com",
         password: "user3!",
         role: "user",
      });
      await user.read();
      // await user.readOne("c8e1de61c5cc8eeabcf59fa0");
      // await user.destroy("612b2aefd43e55902071a430");
   } catch (error) {
      throw error 
   }
}

// crearUsuario();

const userManager = new UserManager()
export default userManager