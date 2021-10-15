import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from './config';
import { collection, getDocs, query, where, getDoc, writeBatch, doc } from 'firebase/firestore';

class Firebase {
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = this.app.firestore();
  }

  getSingleProduct = (id) => this.db.collection("Productos").doc(id).get();

  getProducts = (lastRefKey) => {
    const didTimeout = false;
    return new Promise((resolve) => {
      (async () => {
        const products = []
        const q = query(collection(this.db, 'Productos'));
        const querySnapshotEv = await getDocs(q);
        querySnapshotEv.forEach((doc) => {
          products.push({
            id: doc.id,
            ...doc.data(),
            Producto: doc.data().Producto.toUpperCase()
          });
        });
        const total = products.length

        resolve({ products, total });

      })();
    });
  };

  getStock = () => {
    const stock = []
    return new Promise((resolve) => {
      (async () => {
        const q = query(collection(this.db, 'Productos'), where("Stock", ">", 0));
        const querySnapshotEv = await getDocs(q);
        querySnapshotEv.forEach((doc) => {
          stock.push({
            value: doc.id,
            label: doc.data().Producto,
            precio: doc.data().Precio
          });

          resolve({ stock });
        });
      })()
    })
  }


  getVentas = () => {
    const ventas = []

    return new Promise((resolve) => {
      (async () => {
        const { products } = (await this.getProducts())
        const qEv = query(collection(this.db, 'Eventos'), where('Tipo', '==', 'Salida'));
        const querySnapshotEv = await getDocs(qEv);
        querySnapshotEv.forEach((doc) => {
          const data=doc.data()
          delete data.ProductoId
          ventas.push({
            id: doc.id,
            ...data,
            Producto: products.find((poduct) => poduct.id === doc.data().ProductoId.id).Producto
          });
        });
        const total = ventas.length
        resolve({ ventas, total });
      })()

    })
  }

  setProduct = (data) => {

    const venta = {
      Tipo: "Salida",
      ...data,
      ProductoId: doc(this.db, "Productos", data.ProductoId)
    }

    return new Promise((resolve, reject) => {
      (async () => {
        const producto = await (await getDoc(venta.ProductoId)).data() //obtenemos el producto a editar
        const Stock = parseInt(producto.Stock, 10) - parseInt(venta.Cantidad, 10) //calculamos el nuevo stock
        if (Stock<0) {
          reject(new Error(`La cantidad vendida no puede superar el stock. Stock actual ${producto.Stock}`));

        }
        else {

          // Get a new write batch
          const batch = writeBatch(this.db);

          // Set the value of 'NYC'
          const nycRef = doc(collection(this.db, "Eventos"));
          batch.set(nycRef, venta);

          // Update the population of 'SF'
          


          const sfRef = venta.ProductoId;
          batch.update(sfRef, { Stock });  //editamos el producto

          // Commit the batch
          await batch.commit();

          resolve("Ok");
        }
      })()

    })


  }

}



const firebaseInstance = new Firebase();

export default firebaseInstance;