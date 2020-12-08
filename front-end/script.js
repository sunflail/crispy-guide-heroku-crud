const url = "https://sunflail-crud-demo.herokuapp.com/employees";
const herokuUrl = "/employees";

// get the input information when the button is clicked
const myForm = document.querySelector("#myForm");
myForm.onsubmit = (event) => {
  event.preventDefault();

  let fName = event.target.firstName.value;
  let lName = event.target.lastName.value;
  let email = event.target.email.value;
  let role = event.target.role.value;

  console.log({ fName, lName, email, role });
  let userObj = { fName, lName, email, role };

  // pass the info via CRUD to the back end server
  // send this object via POST to https://sunflail-crud-demo.herokuapp.com/employees

  axios.post(herokuUrl, userObj).then((res) => {
    console.log(res.data);
  });

  event.target.reset();
};

const showAllBtn = document.querySelector("#showAllBtn");
showAllBtn.onclick = (event) => {
  showAllEmpInfo();
};

function showAllEmpInfo(event) {
  let allEmpsInfo;
  axios.get(herokuUrl).then((res) => {
    allEmpsInfo = res.data;
    let dataP = document.createElement("p");
    dataP.innerHTML = JSON.stringify(allEmpsInfo);
    document.querySelector("#dataContainer").appendChild(dataP);
  });
}
