var form = document.getElementById("myFrom");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(document.getElementById('address').value)
  const address = document.getElementById("address").value;
  let fun = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/weatherpage?address=" + address
      );
      const data = await res.json();
      console.log(data);
      if (data.error) {
        console.log("Error has occurred");
        document.getElementById("error").textContent = data.error;
      } else {
        document.getElementById("error").textContent = "";
        console.log(data.location);
        console.log(data.forecast);
        document.getElementById("country").textContent = data.location;
        document.getElementById("forecast").textContent = data.forecast;
      }
    } catch (e) {}
  };
  fun();
});
