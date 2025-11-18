const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

console.log(itemsArray);

document.querySelector("#enter").addEventListener("click", function () {
  const item = document.querySelector("#item");
  createItem(item);
});

function createItem(item) {
  if (item.value.trim() === "") return;

  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  item.value = "";
  displayItems();
}

function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item">
                <div class="input-controller">
                  <textarea name="" id="" disabled>${itemsArray[i]}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`;
  }
  document.querySelector(".to-do-list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const editController = document.querySelectorAll(".edit-controller");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
      editController[i].style.display = "none";
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  displayItems();
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const editController = document.querySelectorAll(".edit-controller");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      inputs[i].value = itemsArray[i];
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      editController[i].style.display = "block";
    });
  });
}
function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  displayItems();
}
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  let day = date[1];
  let month = date[2];
  let year = date[3];
  document.getElementById("date").innerHTML = `${day} ${month} ${year}`;
}

window.onload = () => {
  displayDate();
  displayItems();
};
