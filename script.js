//hide table until click on load button
function hideTable() {
   document.getElementById('table').style.visibility = "hidden";
}

//on clicking load data populated from json file in UI and also stored in array for further use
var arrItems=[];
function load() {
   document.getElementById('load').innerText = "Refresh Data";
   document.getElementById("table").style.visibility = "visible";
   fetch("data.json")
      .then(function (response) {
         return response.json();
      })
      .then(function (products) {
         let placeholder = document.querySelector("#data-output");
         let out = "";
         let i = 0;
         var arrItemsNew;
         for (let product of products) {
            arrItemsNew=[];
            arrItemsNew.push(product.firstName);
            arrItemsNew.push(product.middleName);
            arrItemsNew.push(product.lastName);
            arrItemsNew.push(product.email);
            arrItemsNew.push(product.phoneNumber);
            arrItemsNew.push(product.Role);
            arrItemsNew.push(product.Address);
            out += `
             <tr id="t${i}">
                <td>${product.firstName} </td>
                <td>${product.middleName}</td>
                <td>${product.lastName}</td>
                <td>${product.email}</td>
                <td>${product.phoneNumber}</td>
                <td>${product.Role}</td>
                <td>${product.Address}</td>
                <td id="buttons"><button onclick="buttons(this)">Edit</button> <button onclick="removeTr(this)">Delete</button></button></td>
               
             </tr>
          `;
            i++;
            arrItems.push(arrItemsNew)
         }
         // console.log(arrItems);

         placeholder.innerHTML = out;
         // console.log("loaded");
      });


}
// console.log(arrItems);

//This function remove Table Row from the table when user Clicks
function removeTr(e) {
   var ide = e.parentNode.parentNode;
   console.log(ide)
   var p = ide.parentNode;
   p.removeChild(ide);

}
//This function cancel Editing process of row and load previous data 

function cancelTr(p, e, btn, sbtn) {

   var index=p.rowIndex;
   // console.log(arrItems[index]);
   // // console.log(p.cells);
   // console.log(arrItems);

   for(let i =0;i<arrItems[index].length;i++){
      p.cells[i].innerHTML=arrItems[index][i];
   }

   document.getElementById("btn").removeChild(sbtn);
   document.getElementById("btn").removeChild(btn);

}

//This function load save and cancel buttons in end of table when user Click on edit button

function buttons(e) {

   var ide = e.parentNode.parentNode;
   var prevData = ide;
   console.log(ide)
   ide.contentEditable = "true";
   ide.id = "edit";
   // console.log("edit");

   document.getElementById("buttons").contentEditable = "false";

   var saveBtn = document.getElementById("saveid");
   if (!saveBtn) {
      var savebutton = document.createElement("button");
      savebutton.innerHTML = "Save";
      savebutton.className = "save";
      savebutton.id = "saveid"

      document.getElementById("btn").appendChild(savebutton);
      savebutton.onclick = function () {
         saveEdits()
      }

   }

   var cancelBtn = document.getElementById("cancelid");
   if (!cancelBtn) {
      var cancelButton = document.createElement("button");
      cancelButton.innerHTML = "Cancel";
      cancelButton.class = "cancel";
      cancelButton.id = "cancelid";
      document.getElementById("btn").appendChild(cancelButton);


      cancelButton.onclick = function () {
         cancelTr(prevData, this, cancelButton, savebutton);
      }
   }


   //This functions save data which is entered by user in editing process

   function saveEdits() {
      // console.log("saveEdits")

      //get the editable element
      var editElem = document.getElementById("edit");

      //get the edited element content
      var userVersion = editElem.innerHTML;

      //save the content to local storage
      localStorage.userEdits = userVersion;

      //write a confirmation to the user
      //   document.getElementById("update").innerHTML="Edits saved!";
      document.getElementById("btn").removeChild(savebutton);

      document.getElementById("btn").removeChild(cancelButton);

      savebutton.addEventListener('click', saveEdits);

   }

};
