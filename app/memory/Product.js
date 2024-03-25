const crypto = require("crypto");

class ProductManager {
   static quantity = 0;

   static #product = [];

   create(data) {
      try {
         const product = {
            id: crypto.randomBytes(12).toString("hex"),
            title: data.title,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock,
         };
         ProductManager.#product.push(product);
      } catch (error) {
         throw error;
      }
   }
   read() {
      try {
         return ProductManager.#product;
      } catch (error) {
         throw error;
      }
   }
   readOne(id) {
      try {
         let one = ProductManager.#product.find((each) => each.id === id);
         if (!one) {
            throw new Error("no existe el id del producto");
         } else {
            console.log(one);
            return one;
         }
      } catch (error) {
         throw error;
      }
   }
   destroy(id) {
      try {
         let one = ProductManager.#product.find((each) => each.id === id);
         if (!one) {
            throw new Error("el producto no existe!");
         } else {
            let filtered = product.filter((each) => each.id !== id);
            product.push(filtered);
            console.log(one);
            return one;
         }
      } catch (error) {
         throw error;
      }
   }
}
function crearProducto() {
   try {
      const product = new ProductManager();
      product.create({
         title: "Samsung",
         photo: "foto",
         category: "Celular",
         price: 200,
         stock: 100,
      });
      product.create({
         title: "Apple",
         photo: "foto",
         category: "Ipad",
         price: 350,
         stock: 50,
      });
      product.create({
         title: "Motorola",
         photo: "foto",
         category: "Celular",
         price: 180,
         stock: 150,
      });
      product.create({
         title: "LG",
         photo: "foto",
         category: "Televisores",
         price: 250,
         stock: 70,
      });
      product.create({
         title: "Samsung",
         photo: "foto",
         category: "Smartwatch",
         price: 150,
         stock: 40,
      });
      product.create({
         title: "Redmi",
         photo: "foto",
         category: "Auriculares",
         price: 50,
         stock: 100,
      });
      product.create({
         title: "Thonet & Vander",
         photo: "foto",
         category: "Parlantes",
         price: 200,
         stock: 25,
      });
      product.create({
         title: "Lenovo",
         photo: "foto",
         category: "Notebook",
         price: 400,
         stock: 20,
      });
      product.create({
         title: "Iphone",
         photo: "foto",
         category: "Celular",
         price: 300,
         stock: 45,
      });
      product.create({
         title: "Kingstone",
         photo: "foto",
         category: "Disco SSD",
         price: 100,
         stock: 55,
      });
      console.log(product.read());
      // console.log(product.readOne(producto1.id)); estuve intentando declarando constantes a los productos pero no funciono y lo borre
      // console.log(product.destroy(producto10.id));
   } catch (error) {
      throw error;
   }
}

crearProducto();
