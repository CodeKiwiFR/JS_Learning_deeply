/*
    PROJECT JS - OOP
    codeKiwi
    21/09/2020
*/

/* Abstract class for components which need to be rendered on the DOM */
class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId;
        this.render();
    }

    render() {}

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            for (const cssClass of cssClasses) {
                rootElement.classList.add(cssClass);
            }
        }

        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

/* Manages objects which contain html info (an attribute and the associated value) */
class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

/* Manages the shopping cart */
class ShoppingCart extends Component {
    items = [];

    /*
        The constructor calls the render function.
        This function needs to "know" orderProducts method.
        For this reason, we protect the render method call in order
        to avoid calling it while orderProducts is undefined and we call
        later
    */
    constructor(hook) {
        super(hook);
        this.orderProducts = () => {
            console.log(this.items);
        };
        this.render();
    }

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `Total: \$${this.totalAmount.toFixed(2)}`;
    }

    get totalAmount() {
        const tot = this.items.reduce(
            (curTot, curElt) => curTot + curElt.price,
            0
        );
        return tot;
    }

    addItem(product) {
        const newItems = [...this.items];
        newItems.push(product);
        this.cartItems = newItems;
    }

    render() {
        if (!this.orderProducts) {
            return;
        }
        const cartEl = this.createRootElement("section", ["cart"]);
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        const orderButton = cartEl.querySelector("button");
        orderButton.addEventListener("click", this.orderProducts);
        this.totalOutput = cartEl.querySelector("h2");
    }
}

/* Manages products and the data around them */
class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

/* Manages the products DOM representation */
class ProductItem extends Component {
    constructor(hookId, product) {
        super(hookId);
        this.product = product;
        this.render();
    }

    addToCart = () => {
        App.addToCart(this.product);
    };

    render() {
        if (!this.product) {
            return;
        }
        const prodEl = this.createRootElement("li", ["product-item"]);
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;

        // Dealing with add to cart product button
        const addToCartButton = prodEl.querySelector("button");
        addToCartButton.addEventListener("click", this.addToCart);
    }
}

/* Manages a list of several products - Also manage DOM render of the list */
class ProductList extends Component {
    products = [];

    constructor(hook) {
        super(hook);
        this.products = [
            new Product(
                "A Car",
                "https://cdn2.buyacar.co.uk/sites/buyacar/files/styles/w860/public/alfa-romeo-giulia67-1_0.jpg?itok=cM6fGydG",
                19.99,
                "A car, not a real, idiot."
            ),
            new Product(
                "A lighter",
                "https://cdnp0.stackassets.com/8add97febbe0c8bcccda07830a38df254a346723/store/opt/596/447/298fe8cfee0ea65f6c7018c43e3b026a19bdfc924196823fd94828cbd1d5/product_33344_product_shots1.jpg",
                2.99,
                "Comes from WW2."
            ),
        ];
        this.render();
    }

    render() {
        if (!this.products || this.products.length <= 0) {
            return;
        }
        this.createRootElement(
            "ul",
            ["product-list"],
            [
                new ElementAttribute(
                    "id",
                    "product-list",
                    new ElementAttribute("id", "product-list")
                ),
            ]
        );
        for (const prod of this.products) {
            new ProductItem("product-list", prod);
        }
    }
}

/* Shop part of the application which contains and generates the shop content */
class Shop {
    constructor() {
        this.render();
    }

    render() {
        this.cart = new ShoppingCart("app");
        const myProductList = new ProductList("app");
    }
}

/* App manager */
class App {
    static cart;

    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addToCart(product) {
        this.cart.addItem(product);
    }
}

App.init();
