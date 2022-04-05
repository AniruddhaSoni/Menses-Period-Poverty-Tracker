// let popup = document.getElementById("popup");

//   function openPopup() {
//     popup.classList.add(".open-popup");
//   }

//   function closePopup() {
//     popup.classList.remove(".open-popup");
//   }

function sendMail() {
  var tempParams = {
    name: document.getElementById("name").value,
    message: document.getElementById("msg").value,
  };

  emailjs
    .send("service_jcp4fes", "template_9fsryvz", tempParams)
    .then(function (response) {
      console.log("sucsess", response.status);
      function myPopup() {
        alert("Your message has been sent successfully!");
      }
      
    });
}

document.getElementById("emailBtn").addEventListener("click", (e) => {
  e.preventDefault();
  sendMail();
});


