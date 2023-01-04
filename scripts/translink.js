let busStop = 00000;
let RouteNo= 000;
async function busList(stop) {
  busStop = stop.trim();
  let test =document.getElementById("test");
  try {
    if (isNaN(parseInt(busStop)) || busStop.length != 5) {
      throw "Stop must be a 5 digit number, example: 55612"
    }
  } catch(err) {
    test.innerHTML= err;
  }
  const response = await fetch("https://api.translink.ca/rttiapi/v1/stops/"+busStop+"?apikey=JvXiknT52GzqD8PpJnRp", {method: "GET",headers: {
    'accept': 'application/json',},});
  const text = await response.text(); 
  const obj = JSON.parse(text);
  const routes = obj.Routes.split(", ");
  let ul= document.createElement("ul");
  ul.id= "Bus List";
  for (let route of routes) {
    let li = document.createElement("li");
    li.innerText = route;
    ul.appendChild(li);
  } 
  let action = document.getElementById("action");
  action.appendChild(ul);
  /*
  let time = obj.Schedules[0].ExpectedCountdown;
  if (time <=0) {
    document.getElementById("test").innerHTML=  `<p>
  The next 99 will arrive now
  </p>`;
  } else {
    document.getElementById("test").innerHTML=  `<p>
  The next 99 will arrive in ${time} minutes
  </p>`;
  }
  */
  return;
}
