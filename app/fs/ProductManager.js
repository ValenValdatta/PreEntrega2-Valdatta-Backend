import fs from "fs";
import crypto from "crypto";

class ProductManager {
   constructor() {
      this.path = "./fs/files/products.json";
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
         if (!data.title) {
            const error = new Error("Ingrese un Producto");
            throw error;
         } else {
            const product = {
               id: crypto.randomBytes(12).toString("hex"),
               title: data.title,
               photo: data.photo,
               category: data.category,
               price: data.price,
               stock: data.stock,
            };
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            all.push(product);
            all = JSON.stringify(all, null, 2);
            await fs.promises.writeFile(this.path, all);
            console.log("Producto creado!");
            return product;
         }
      } catch (error) {
         throw error;
      }
   }
   async read(cat = null) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         //DEBAJO ES EL FILTRO PARA QUE FILTRE CATEGORIAS POR QUERY 
         if(all.length === 0){
            throw new Error("no hay productos para leer")
         }
         if(cat !== null) {
            all = all.filter(each => each.category === cat)
            return all
         } else {
            console.log(all);
            return all;
         }
      } catch (error) {
         throw error;
      }
   }
   async readOne(pid) {
      try {
         let all = await fs.promises.readFile(this.path, "utf-8");
         all = JSON.parse(all);
         let one = all.find((each) => each.id === pid);
         if (!one) {
            throw new Error("no se encontro el id");
         } else {
            console.log(one);
            console.log("Se ha leido el producto"+ pid);
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

async function crearProducto() {
   try {
      const product = new ProductManager();
      await product.create({
         title: "Samsung",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_999462-MLA54226388761_032023-F.webp",
         category: "Celular",
         price: 200,
         stock: 100,
      });
      await product.create({
         title: "Apple",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_803992-MLA52988770428_122022-F.webp",
         category: "Ipad",
         price: 350,
         stock: 50,
      });
      await product.create({
         title: "Motorola",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_648883-MLU74182500303_012024-F.webp",
         category: "Celular",
         price: 180,
         stock: 150,
      });
      await product.create({
         title: "LG",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_890387-MLU72561172985_102023-F.webp",
         category: "Televisores",
         price: 250,
         stock: 70,
      });
      await product.create({
         title: "Samsung",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_932527-MLU74941617888_032024-F.webp",
         category: "Smartwatch",
         price: 150,
         stock: 40,
      });
      await product.create({
         title: "Redmi",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_677855-MLA71570451917_092023-F.webp",
         category: "Auriculares",
         price: 50,
         stock: 100,
      });
      await product.create({
         title: "Thonet & Vander",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_983546-MLA46639054784_072021-F.webp",
         category: "Parlantes",
         price: 200,
         stock: 25,
      });
      await product.create({
         title: "Lenovo",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_955406-MLU75052357569_032024-F.webp",
         category: "Notebook",
         price: 400,
         stock: 20,
      });
      await product.create({
         title: "Iphone",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_779617-MLA71782867320_092023-F.webp",
         category: "Celular",
         price: 300,
         stock: 45,
      });
      await product.create({
         title: "Kingstone",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_633091-MLA72513712313_102023-F.webp",
         category: "Disco SSD",
         price: 100,
         stock: 55,
      });
      await product.create({
         title: "ASUS",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_952312-MLU74957524509_032024-F.webp",
         category: "Notebook",
         price: 380,
         stock: 25,
      });
      await product.create({
         title: "Gigabyte",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_877188-MLU72635661279_112023-F.webp",
         category: "Disco SSD",
         price: 95,
         stock: 60,
      });
      await product.create({
         title: "Samsung",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_722684-MLU72859230576_112023-F.webp",
         category: "Televisores",
         price: 300,
         stock: 45,
      });
      await product.create({
         title: "Noblex",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_634578-MLA51821138734_102022-F.webp",
         category: "Televisores",
         price: 200,
         stock: 66,
      });
      await product.create({
         title: "Sony",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_793501-MLA46946723649_082021-F.webp",
         category: "Parlantes",
         price: 400,
         stock: 25,
      });
      await product.create({
         title: "JBL",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_651387-MLU73885145681_012024-F.webp",
         category: "Auriculares",
         price: 50,
         stock: 75,
      });
      await product.create({
         title: "Gadnic",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_983632-MLU72564532828_112023-F.webp",
         category: "Smartwatch",
         price: 70,
         stock: 65,
      });
      await product.create({
         title: "Xiaomi",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_942099-MLA49011470720_022022-F.webp",
         category: "Smartwatch",
         price: 60,
         stock: 25,
      });
      await product.create({
         title: "DELL",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_696185-MLA54896761378_042023-F.webp",
         category: "Notebook",
         price: 420,
         stock: 37,
      });
      await product.create({
         title: "Sennheiser",
         photo: "https://http2.mlstatic.com/D_NQ_NP_2X_869047-MLU73664511884_012024-F.webp",
         category: "Auriculares",
         price: 200,
         stock: 15,
      });
      await product.read();
      // await product.readOne("cc5e11bec04c8abe6e25f401");
      // await product.destroy("e47553490765213afb192d01");
   } catch (error) {
      console.log(error);
   }
}

// crearProducto()

const productManager = new ProductManager()
export default productManager
