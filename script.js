function hideTable() {
   document.getElementById('table').style.visibility = "hidden";
}


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
         for (let product of products) {
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

         }

         placeholder.innerHTML = out;
         console.log("loaded");
      });


}

function removeTr(e) {
   var ide = e.parentNode.parentNode;
   console.log(ide)
   var p = ide.parentNode;
   p.removeChild(ide);

   // document.getElementById("btn").removeChild(savebutton);

}

function cancelTr(p, e, btn, sbtn) {

   // console.log(e.parentNode.parentNode)
   // console.log(p.rowIndex);
   // var a=`t${p.rowIndex-1}`
   // console.log(a);
   // console.log(document.getElementById(a).previousSibling);
   // console.log(e.parentNode);

   // table.rows[p.rowIndex].innerHTML=p.innerHTML;
   // console.log(table.rows[p.rowIndex].innerHTML);
   // var ab = p.parentNode

   // console.log(ab);
   // const val = p.innerHTML;
   

   // console.log(val);

   document.getElementById("btn").removeChild(sbtn);
   document.getElementById("btn").removeChild(btn);


}


function buttons(e) {

   var ide = e.parentNode.parentNode;
   var prevData = ide;
   console.log(ide)
   ide.contentEditable = "true";
   ide.id = "edit";
   console.log("edit");

   document.getElementById("buttons").contentEditable = "false";

   //  var editElem = document.getElementById("edit");
   var saveBtn = document.getElementById("saveid");
   if (!saveBtn) {
      //#myElementID element DOES NOT exist
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
      //#myElementID element DOES NOT exist


      var cancelButton = document.createElement("button");
      cancelButton.innerHTML = "Cancel";
      cancelButton.class = "cancel";
      cancelButton.id = "cancelid";
      document.getElementById("btn").appendChild(cancelButton);


      cancelButton.onclick = function () {
         cancelTr(prevData, this, cancelButton, savebutton);
      }
   }

   function saveEdits() {
      console.log("saveEdits")

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


function checkEdits() {
   //find out if the user has previously saved edits
   if (localStorage.userEdits != null)
      document.getElementById("edit").innerHTML = localStorage.userEdits;
}