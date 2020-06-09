/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/
  
 
import Route from '@ioc:Adonis/Core/Route'
Route.group(()=>{

    Route.post('/loginAdim', 'AdimsController.login')
Route.post('/adim', 'AdimsController.store')
Route.get('/listAdim', 'AdimsController.index')
Route.post('/user', 'UsersController.store')
Route.get('/listUser','UsersController.index')
Route.post('/upload', 'UsersController.storeFile')
Route.get('/listUpload','UsersController.listFile') 
Route.post('/login','UsersController.login')

 Route.post('/product','ProductsController.store')
 Route.get('/listProduct', 'ProductsController.index')

    Route.get('/listCategory', 'CategoriesController.index')
    Route.post('/cadCategory', 'CategoriesController.store')
    
}).prefix('/home')

 