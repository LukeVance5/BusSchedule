async function next99() {
  const response = await fetch("https://api.translink.ca/rttiapi/v1/stops/58023/estimates?apikey=JvXiknT52GzqD8PpJnRp&routeNo=099", {method: "GET",headers: {
    'accept': 'application/json',},});
  const text = await response.text();
  console.log(text);
  const obj = JSON.parse(text)[0];
  console.log(obj.Schedules[0].ExpectedCountdown);
  const main = document.createElement("main");
  main.innerHTML= `<p>
  The next 99 will arrive in ${obj.Schedules[0].ExpectedCountdown} minutes
  </p>`;
  document.body.appendChild(main);
  return;
}
const main = document.createElement("main");
main.innerHTML = next99();

