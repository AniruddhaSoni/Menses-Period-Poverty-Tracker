function sendMail() {
  var tempParams = {
    name: document.getElementById("name").value,
    message: document.getElementById("msg").value,
  };

  emailjs
    .send("service_jcp4fes", "template_9fsryvz", tempParams)
    .then(function (response) {
      console.log("sucsess", response.status);
    });
}

document.getElementById("emailBtn").addEventListener("click", (e) => {
  e.preventDefault();
  sendMail();
});
