class Course {
    constructor(title, description, length, price, type, numberExercises) {
        this.title = title;
        this.length = length;
        this.price = price;
        this.description = description;
        this.id = Math.random();
        this.type = type;
        if (numberExercises !== -1) {
            this.numberExercises = numberExercises;
        }
        this.render();
    }

    toggleDescription() {
        const desc = this.courseEl.querySelector('#course-details-description');
        if (this.descButton.textContent.toLowerCase() === "more") {
            this.descButton.textContent = "Less";
        } else {
            this.descButton.textContent = "More";
        }
        desc.classList.toggle("course-details-description");
        desc.classList.toggle("hidden");
    }

    render() {
        // Creating html element
        this.courseEl = document.createElement('div');
        this.courseEl.classList.add('course-details');
        this.courseEl.innerHTML = `
            <div class="course-details-intro">
                <h3 class="course-details-title">${this.title}</h3>
                <div class="course-details-buttons">
                    <button class="course-details-more">More</button>
                    <button class="course-details-delete">Delete</button>
                </div>
            </div>
            <div id="course-details-description" class="hidden">
                <div class="course-details-left">
                    <p class="course-details-p">
                        ${this.description}
                    </p>
                    <p class="course-details-length">${this.length} Hours</p>
                </div>
                <div class="course-details-right">
                    <p class="course-details-price">\$${this.price}</p>
                </div>
            </div>
        `;
        // Hiding description - Adding More/Less Button interaction
        this.descButton = this.courseEl.querySelector(".course-details-more");
        this.descButton.addEventListener(
            "click",
            () => this.toggleDescription()
        );

        // Adding delete button interaction
        this.deleteButton = this.courseEl.querySelector(".course-details-delete");
        this.deleteButton.addEventListener(
            "click",
            () => {
                CourseSection.deleteCourse(this.id);
                this.courseEl.remove();
            }
        );
    }
}

class CourseSection {
    static courses = [];
    static emptyTitle = document.querySelector("#no-course-title");

    constructor() {
        this.addSection = document.getElementById("course-display");
    }

    static deleteCourse(courseId) {
        let indexToRemove = -1;
        for (let i = 0; i < CourseSection.courses.length; i++) {
            if (CourseSection.courses[i].id === courseId) {
                indexToRemove = i;
                break;
            }
        }
        CourseSection.courses.splice(indexToRemove, 1);
        if (CourseSection.courses.length === 0) {
            CourseSection.emptyTitle.classList.remove("hidden");
        } 
    }

    addCourse(title, description, length, price, type, numberExercises) {
        const newCourse = new Course(
            title,
            description,
            length,
            price,
            type,
            numberExercises
        );
        CourseSection.courses.push(newCourse);
        this.addSection.append(newCourse.courseEl);
        if (CourseSection.courses.length > 0) {
            CourseSection.emptyTitle.classList.add("hidden");
        } 
    }

    render() {
        return;
    }
}

class App {
    constructor() {
        this.submitButton = document.getElementById("submit-button");
        this.courseSection = new CourseSection();
        const typeSelection = document.getElementById("type-selection");

        // Adding the select input interaction
        typeSelection.addEventListener("click", () => {
            const selectedType = document.getElementsByTagName("select")[0]
                .value;
            const numberExercises = document.querySelector(".practical-option");

            if (selectedType.trim().toLocaleLowerCase() === "practical") {
                numberExercises.classList.add("row-visible");
            } else {
                numberExercises.classList.remove("row-visible");
            }
        });

        // Adding the submit button interaction
        this.submitButton.addEventListener("click", () =>
            this.courseAddCheck()
        );
    }

    cleanInputs(courseForm) {
        courseForm.querySelector("#course-title").value = "";
        courseForm.querySelector("#course-sumup").value = "";
        courseForm.querySelector("#course-length").value = "";
        courseForm.querySelector("#course-price").value = "";
        courseForm.querySelector("#course-type").value = "Classical";
        const numberExercises = document.querySelector(".practical-option");
        numberExercises.classList.remove("row-visible");
    }

    courseAddCheck() {
        const courseForm = document.getElementById("course-creation");
        const title = courseForm.querySelector("#course-title").value.trim();
        const description = courseForm
            .querySelector("#course-sumup")
            .value.trim();
        let length = courseForm.querySelector("#course-length").value.trim();
        let price = courseForm.querySelector("#course-price").value.trim();
        const type = courseForm.querySelector("#course-type").value.trim();
        let numberExercises;
        // If type is practical, getting number of exercices
        if (type.toLowerCase() === "practical") {
            numberExercises = parseInt(
                courseForm.querySelector("#course-exercises").value.trim()
            );
            if (isNaN(numberExercises) || numberExercises < 0) {
                console.log("ERROR - Invalid numbers");
                return;
            }
        } else {
            numberExercises = -1;
        }

        // Checking empty inputs
        if (
            title === "" ||
            description === "" ||
            length === "" ||
            price === "" ||
            type === ""
        ) {
            console.log("ERROR - Empty field");
            return;
        }

        // Checking if numbers are correct numbers
        length = parseInt(length, 10);
        price = parseInt(price, 10);
        if (isNaN(length) || isNaN(price) || length < 0 || price < 0) {
            console.log("ERROR - Invalid numbers");
            return;
        }

        // Adding the course
        this.courseSection.addCourse(
            title,
            description,
            length,
            price,
            type,
            numberExercises
        );

        // Cleaning inputs
        this.cleanInputs(courseForm);
    }
}

new App();
