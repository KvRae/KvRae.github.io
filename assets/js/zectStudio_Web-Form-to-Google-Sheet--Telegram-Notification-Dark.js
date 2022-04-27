window.addEventListener("load", function () {
  const form = document.getElementById('contactForm');
  const btnLoading = document.getElementById('btnLoading')
  const btnSubmit = document.getElementById('btnSubmit')
  const alertSuccess = document.getElementById('alertSuccess')
  const alertFailed = document.getElementById('alertFailed')
  form.addEventListener("submit", function (e) {
    btnLoading.classList.toggle('d-none')
    btnSubmit.classList.toggle('d-none')
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
      .then(() => {
        console.log("Success!");
        btnLoading.classList.toggle('d-none')
        btnSubmit.classList.toggle('d-none')
        alertSuccess.classList.toggle('d-none')
		form.reset()

        setTimeout(hideElement, 3000)
        function hideElement(){
          alertSuccess.classList.toggle('d-none')
        }
      })
      .catch(error => {
        alertFailed.classList.toggle('d-none')
        setTimeout(hideElement, 3000)
        function hideElement(){
          alertFailed.classList.toggle('d-none')
        }
        btnSubmit.classList.toggle('d-none')
        console.error("Failed!")

      })
  });
});


  // var now = new Date();
  // now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  // document.getElementById('tanggal').value = now.toISOString().slice(0, 16);