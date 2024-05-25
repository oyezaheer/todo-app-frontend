let tasks = [];
let idCounter = 1;

class Task {
  constructor(title, description, category, dueDate) {
    if (category !== "active" && category !== "completed") {
        throw new Error("Invalid category. Must be 'active' or 'completed'.");
    }
    this.id = idCounter++;
    this.title = title;
    this.description = description;
    this.category = category;
    this.dueDate = dueDate;
  }
}

module.exports = { tasks, Task };
