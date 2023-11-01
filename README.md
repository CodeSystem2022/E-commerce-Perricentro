
![Ecommerce](https://github.com/Perricornios/E-commerce-Perricentro/assets/92758405/2456c498-cddd-4ba1-b38b-b1f0c869d178)


## Instrucciones de Uso Para lanzar el sistema 
1 - Crear una base de datos en postgresSQL .

2 - Restaurar la copia de la base de datos o bien inicializarla con el script
```
- Backup con productos precargados /servidor_pern/database/backups/PERRICENTRO.sql
- Script para inicializar la base desde cero /servidor_pern/database/init.sql
```

3 - Configurar el acceso de la api a la base de datos en /servidor_pern/db.js
```
import pg from "pg";

export const pool = new pg.Pool({
    port: 5432, -- El puerto de postgres
    host: "localhost",
    user: "postgres", -- El usuario de tu base de datos
    password: "admin", -- La contraseña de tu base de datos
    database: "PERRICENTRO", -- El nombre de tu base de datos
});

pool.on("connect", () => {
    console.log("conectado a la base de datos");
});
```
4 - Abrir dos consolas dentro de la carpeta principal del proyecto

En la primera consola nos diriguimos a /server/ y ejecutamos 
```
npm install
npm start

```
En la segunda consola nos diriguimos a servidor_pern/ y ejecutamos
```
npm install
npm start
```

## API de Productos
La api utiliza node, expres y postgresql para realizar altas, bajas, modificaciones y consultas de productos almacenados en una base de datos
El acceso se realiza en la direccion http://localhost:3000/api/productos/

### Rutas de Productos 
Cargar un producto
```
POST: http://localhost:3000/api/productos/
# Cuerpo de consulta en formato Json
{
 "product_name": "Aceite de algas", 
 "price": 45000,
 "quanty": 1,
 "img": "./media/img/Nails_care_3.PNG"
}
```
Obtener todos los productos
```
GET: http://localhost:3000/api/productos/todos
```
Remplazar id_producto por el id del producto a obtener
```
GET: http://localhost:3000/api/productos/?id=id_producto
```
Remplazar id_producto por el id del producto a eliminar
```
DELETE: http://localhost:3000/api/productos/?id=id_producto
```
Remplazar id_producto por el id del producto a modificar + los artibutos en formato json a modificar
```
PUT: http://localhost:3000/api/productos/?id=id_producto
```
### Estructura producto json
```
{
 "product_name": "Aceite de algas",
 "price": 45000,
 "quanty": 1,
 "img": "./media/img/Nails_care_3.PNG"
}
```


