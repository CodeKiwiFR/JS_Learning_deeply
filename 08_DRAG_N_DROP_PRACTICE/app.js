class Item {
    constructor(liElement) {
        this.element = liElement;
        this.connectDrag();
    }

    connectDrag() {
        this.element.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", this.element.id);
            event.dataTransfer.effectAllowed = "move";
        });
        // this.element.addEventListener("dragend", (event) => {
        //     console.log("drag end");
        // })
    }
}

class List {
    
    // The list items will be stored inside of an array
    items = [];

    constructor(listId) {
        this.element = document.querySelector("#" + listId);

        // We get all li from the list in order to save them in our array
        let listItems = this.element.querySelectorAll("li");
        for (const item of listItems) {
            this.items.push(new Item(item));
        }
        // We add the drop management inside of our list
        this.connectDroppable();
    }

    // Adding the capacity of receiving list items by drag'n'drop system
    connectDroppable() {
        // Changing ul background when dragging on it
        this.element.addEventListener("dragenter", (event) => {
            if (event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
            }
            this.element.classList.add("droppable");
        });

        // Preventing default behavior in order to allow drop
        this.element.addEventListener("dragover", (event) => {
            if (event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
            }
        });

        // Removing the highlight class when leaving the current ul
        this.element.addEventListener("dragleave", (event) => {
            if (event.relatedTarget.closest("ul") !== this.element) {
                this.element.classList.remove("droppable");
            }
        });

        // Checking if move is necessary and then moving the item into the current ul
        this.element.addEventListener("drop", (event) => {
            const itemId = event.dataTransfer.getData("text/plain");
            const item = document.querySelector(`#${itemId}`);

            if (!(item.closest("ul") === this.element)) {
                this.element.append(item);
                this.element.classList.remove("droppable");
            } else {
                item.closest("ul").classList.remove("droppable");
            }
        });
    }
}

// Main application which manages the ul boxes
class App {
    constructor() {
        this.topBox = new List("top-box");
        this.bottomBox = new List("bottom-box");
    }
}

// Creating the app
new App();
