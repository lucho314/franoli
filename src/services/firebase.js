import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from './config';
import { collection, getDocs, query, where,addDoc } from 'firebase/firestore';

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
          ventas.push({
            id: doc.id,
            ...doc.data(),
            Producto: products.find((poduct) => poduct.id === doc.data().ProductoId.id).Producto
          });
        });
        const total = ventas.length
        console.log(products)
        resolve({ ventas, total });
      })()

    })
  }

  setProduct = (data) => {
    const venta={
      Tipo: "Salida",
      ...data,
      ProductoId: this.db.collection("Productos").doc(data.ProductoId)
    }

    return new Promise((resolve) => {
      (async () => {
       await addDoc(collection(this.db, "Eventos"), venta)
      
      resolve({ resp:"Ok" });
      })()
     
    })
    
    
  }

}



const firebaseInstance = new Firebase();

export default firebaseInstance;