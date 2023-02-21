require('../config/db.config');
const Product = require('../models/product.model');


const products = [
    { user: "Javier Gonzalez", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Ford_Escort_3_by_seaside.jpg/640px-Ford_Escort_3_by_seaside.jpg", price: " 1.000€", title: "Ford Scort", category: "vehicle" },
    { user: "Ander Zulaika", image: "https://media.cazoo.com/image/upload/c_scale,f_auto,h_405,q_auto,w_720/cazoo-imagery/car_gallery_images/WMWXM520702E54389/cf0def0c-04bd-4384-9d4d-db275b0f0f5e.jpg", price: " 2.000€", title: "Mini", category: "vehicle" }, 
    { user: "Juan Rodriguez", image: "https://www.prolaboral.com/129035-medium_default/camiseta-unisex-roly-atomic.jpg" , price: "20€", title: "White T-shirt", category: "fashion" },  
    { user: "Maria Fernandez", image: "https://img.ltwebstatic.com/images3_pi/2020/03/12/1583996103bb9a56ed8000a671e80d453fa9959546_thumbnail_900x.webp", price: "35€", title: "Floral skirt",  category: "fashion"  }, 
    { user: "David Morales", image: "https://grunkel.com/1166-large_default/televisor-40-led-de-101cm-full-hd-android-tv.jpg" , price: "300€", title: "Tv 40 inch", category: "electronic"},  
    { user: "Ana García", image: "https://cdn.mos.cms.futurecdn.net/ZNBBMFxob7C2Qmuv65CZUJ.jpg" , price: "100€", title: "speakers", category: "electronic" }
];

Product.create(products)
.then(() => console.info (`Products created ${products.length}`))
.catch((error) => console.error('error: ', error))

