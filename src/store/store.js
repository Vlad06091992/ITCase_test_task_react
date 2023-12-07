import {action, makeObservable, observable} from "mobx";

import {getProduct, getProductColor, getProducts, getSizes} from "../services/api";

class DataStore {
    products = []
    sizes = []
    productsInBasket = []
    currentProduct = null
    currentColorProduct = null
    currentSize = null

    constructor() {
        makeObservable(this, {
            products: observable,
            productsInBasket: observable,
            currentProduct: observable,
            currentColorProduct: observable,
            sizes: observable,
            currentSize: observable,
            getProducts: action,
            getProductById: action,
            getProductColor: action,
            getSizes: action,
            setCurrentSize: action,
            setProductInbasket: action,
            deleteProductFromBasket: action,
        });
    }

    deleteProductFromBasket(id) {
        this.productsInBasket = this.productsInBasket.filter(el => el.productIdUnical !== id)
    }

    setProductInbasket(product) {
        this.productsInBasket.push(product)
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

