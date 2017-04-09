# Starting with nodepop

# How to start

# Download Repo of the project

    * https://github.com/ymdx/Practica_Mean_NodeJS

# Clone the Repo of the project on your local machine

    * git clone https://github.com/ymdx/Practica_Mean_NodeJS.git

# Enter to the folder of the project

    * cd /Practica_Mean_NodeJS

# Install Dependencies

    * npm install

# Run Scripts

    * npm run installBD

# Start with the project

    * npm start

# API de anuncios

Listado de anuncios

Petición GET http://localhost:3000/apiv1/anuncios

Parámetros :

    * nombre: el nombre del artículo empieza por los caracteres que indica este parámetro http://localhost:3000/apiv1/anuncios?nombre=ip
    * precio: filtro precio
    * ---> Igual a un valor: http://localhost:3000/apiv1/anuncios?precio=50
    * ---> Menor o igual a un valor: http://localhost:3000/apiv1/anuncios?precio=-50
    * ---> Mayor o igual a un valor: http://localhost:3000/apiv1/anuncios?precio=10-
    * ---> Entre dos valores: http://localhost:3000/apiv1/anuncios?precio=10-50
    * venta: filtro venta o busqueda http://localhost:3000/apiv1/anuncios?venta=false
    * tag: filtro por categoria http://localhost:3000/apiv1/anuncios?tag=mobile
    * sort: ordena los anuncios
    * ---> Orden ascendente: http://localhost:3000/apiv1/anuncios?sort=precio
    * ---> Orden descendente: http://localhost:3000/apiv1/anuncios?sort=-precio
    * skip: Se salta el número de anuncios que se indique.
    * ---> http://localhost:3000/apiv1/adverts?skip=2
    * limit: Devuelve como máximo el número de registros que se indican en este parámetro
    * ---> http://localhost:3000/apiv1/anuncios?limit=2
    fields: Devuelve los campos que se indiquen en este parámetro.
    * ---> http://localhost:3000/apiv1/anuncios?fields=nombre%20precio

Devuelve :

    * ---> {
	* --->    "success": true,
	* --->    "anuncios": [{
	* --->	    "_id": ObjectId("58e9354204995cbd711efb58"),
	* --->	    "nombre": "Bicicleta",
	* --->	    "venta": true,
	* --->	    "precio": 230.15,
	* --->	    "foto": "bici.jpg",
	* --->	    "tags": ["lifestyle", "motor"]
	* --->    }]
    * ---> }

# API de usuarios

Crear un nuevo usuario

Petición POST http://localhost:3000/apiv1/usuarios/registro

Parámetros :

    * nombre: campo de texto
    * clave: campo de texto
    * email: campo de texto

Devuelve :

    * ---> {
	* --->   "success": true,
	* --->      "usuarios": {
	* --->	         "_id": ObjectId("58e9354204995cbd711efb5b"),
	* --->	         "nombre": "Yoel Macia Delgado",
	* --->	         "email": "yoel@gmail.com",
	* --->	         "clave": "12345"
	* --->      }
	* ---> }

Autenticar un usuario

Petición POST http://localhost:3000/apiv1/usuario/authenticate

Parámetros:

    * clave: campo de texto
    * email: campo de texto

Devuelve:

Un token válido por 1 hora
