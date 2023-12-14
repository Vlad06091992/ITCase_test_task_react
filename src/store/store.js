import {action, makeObservable, observable} from "mobx";

import {getProduct, getProductColor, getProducts, getSizes} from "../services/api";

class DataStore {
    products = []
    sizes = []
    productsInBasket = []
    currentProduct = null
    currentColorProduct = null
    currentSize = null
    isBasket = false

    constructor() {
        makeObservable(this, {
            products: observable,
            productsInBasket: observable,
            currentProduct: observable,
            currentColorProduct: observable,
            sizes: observable,
            currentSize: observable,
            isBasket:observable,
            getProducts: action,
            getProductById: action,
            getProductColor: action,
            getSizes: action,
            setCurrentSize: action,
            setProductInbasket: action,
            setCurrentColorProduct:action,
            deleteProductFromBasket: action,
            toggleIsBasketState:action,
        });
    }

    toggleIsBasketState(){
        this.isBasket = false
    }

    deleteProductFromBasket(id) {
        this.productsInBasket = this.productsInBasket.filter(el => el.productIdUnical !== id)
    }

    setProductInbasket(product) {

         const existingProductIndex = this.productsInBasket.findIndex(
            (el) =>
                el.productId === product.productId &&
                el.color.id === product.color.id &&
                el.size.id === product.size.id
        );

        if (existingProductIndex !== -1) {
       this.isBasket = true
        } else {
            this.productsInBasket.push(product)
        }
    }

    setCurrentColorProduct(product) {
        this.currentColorProduct = product
    }



    setCurrentSize(size) {
        this.currentSize = size
    }

    async getProductColor(productId, colorId) {
        this.currentColorProduct = await getProductColor(productId, colorId)
    }

    async getProductById(productId) {
        this.currentProduct = await getProduct(productId)
    }

    async getProducts() {
        this.products = await getProducts()
    }

    async getSizes() {
        this.sizes = await getSizes()
    }
}

export const store = new DataStore();

