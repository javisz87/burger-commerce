# ReactProject

Proyecto de ReactJs creado para el curso de CoderHouse

## Instalación

---

Clonar el repositorio y dentro de él, ejecutar en la terminal:

$ npm install

y luego:

$ npm start

## Navegación

'/' En esta ruta tenemos el listado completo de los productos, es lo que se muestra por defecto, corresponde al ItemlistContainer y sus componentes, también se puede volver a acceder haciendo click en el botón "Todos los productos" del Nabvar.

'/category/:categoryId' En esta ruta se muestran los productos filtrados por tipo, para acceder se tiene que clickear en los botones del navbar "Pizzas" y "Hamburguesas", ahí tomará el "categoryId" correspondiente y mostrará el ItemListContainer con solamente los datos del tipo seleccionado.

'/detail/:productId' A esta ruta se accede clickeando en el botón "ver detalle" que hay en cada Item de las listas de productos, este botón le proporcionará al ItemDetailContainer el "ID" del producto seleccionado, así este mostrará la información detallada del producto y nos permitirá agregar, si lo deseamos, este producto al carrito.
Luego de agregar el producto, nos permite dirigirnos al carrito.

'/cart' esta ruta, como su nombre lo indica, nos da acceso al carrito. Podemos llegar a esta de dos formas y la condición común que tienen estas es que necesitamos haber agregado un producto al carrito. La primera forma de llegar es clickeando el cartWidget que se encuentra en el Navbar, la segunda opción es entrar al clickear en el link "Ir al carrito" que aparece al agregar un producto a este.
El carrito nos despliega una lista detallada de todos los productos que hemos agregado al carrito y el precio total de este. A su vez nos permite tanto borrar un producto, como vaciar el carrito.
Al tener al menos un producto en el carrito nos muestra el botón "Ir al Checkout", el cuál nos lleva al último componente.

'/checkout' esta ruta nos lleva al Checkout, en éste se nos piden nuestros datos, antes de confirmar el pedido.
Cuando usamos el botón "Generar Orden" se validan las existencias, y si estas están correctas, se envía la orden de compra a nuestra base de datos.

### Aclaración

El comportamiento del componente ItemListContainer depende de la existencia o no de el parámetro de la URL "categoryId", de este existir, muestra solamente la categoría seleccionada, si no, muestra el listado completo de productos.
