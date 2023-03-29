

  async function addCategory() {

    var categoryNameTag = document.getElementById("category_name");
    categoryNameTag.innerHTML = "";

    if (categoryNameTag.value.trim().length == 0) {

      alert('The field must be filled');
      return false;
      document.getElementById("add_category_btn").disabled = true;
    }

    const url = `/category/addCategory/?category=${categoryNameTag.value.toUpperCase()}`;


    const categoryRequest = await fetch(url);

    disabledModal()

    location.reload();

  }

  async function checkCategory() {

    var categoryName = document.getElementById("category_name").value;
    var modal_category_name = document.getElementById("category_name").value;

    // for comman categories
    const data = await fetch(`/category/verifyCategory/?category=${categoryName.toUpperCase()}`)

    const isAvailableCategory = await data.json();

    const status = isAvailableCategory.status;

    const modal_data = await fetch(`/category/verifyCategory/?category=${modal_category_name.toUpperCase()}`)

    const modalisAvailableCategory = await modal_data.json();

    const modal_status = modalisAvailableCategory.status;

    if (status == 1) {
      document.getElementById('category_name').style.borderColor = "red";
      document.getElementById('error_message').innerHTML = "This Category Already Exist!";
      document.getElementById('error_message').style.color = "red";
      document.getElementById("add_category_btn").disabled = true;
    } else {
      document.getElementById('error_message').innerHTML = " ";
      document.getElementById("add_category_btn").disabled = false;
      document.getElementById('category_name').style.borderColor = "white";
    }

    if (modal_status == 1) {
      document.getElementById('modal_category_name').style.borderColor = "red";
      document.getElementById('error_message2').innerHTML = "This Category Already Exist!";
      document.getElementById('error_message2').style.color = "red";
      document.getElementById("saveChanges").disabled = true;
    } else {
      document.getElementById('error_message2').innerHTML = " ";
      document.getElementById("saveChanges").disabled = false;
      document.getElementById('modal_category_name').style.borderColor = "white";
    }

  }

  async function deleteCategory(id) {
    const deleteReq = fetch(`/category/deleteCategory/?id=${id}`);

    location.reload()
  }

  function showModal() {
    var questionModal = document.getElementById("category-modal");
    questionModal.classList.add("show");
    questionModal.style.display = "block";
    questionModal.classList.add("modal-open");
  }

  function disabledModal() {
    var questionModal = document.getElementById("category-modal");
    questionModal.classList.remove("show");
    questionModal.style.display = "none";
    questionModal.classList.remove("modal-open");
  }
  function showEditModal(name, id) {
    document.getElementById("category_id").value = id;
    var category = document.getElementById("modal_category_name");
    var category_name = category.value = name;

    var questionModal = document.getElementById("editModal");
    questionModal.classList.add("show");
    questionModal.style.display = "block";
    questionModal.classList.add("modal-open");
  }

  function disabledEditModal() {
    var questionModal = document.getElementById("editModal");
    questionModal.classList.remove("show");
    questionModal.style.display = "none";
    questionModal.classList.remove("modal-open");
  }

  function showDeleteModal(id) {
    document.getElementById("delete-category").setAttribute('onclick', `deleteCategory('${id}')`);
    var questionModal = document.getElementById("delete-modal");
    questionModal.classList.add("show");
    questionModal.style.display = "block";
    questionModal.classList.add("modal-open");


  }

  function disabledDeleteModal() {
    var questionModal = document.getElementById("delete-modal");
    questionModal.classList.remove("show");
    questionModal.style.display = "none";
    questionModal.classList.remove("modal-open");
  }


