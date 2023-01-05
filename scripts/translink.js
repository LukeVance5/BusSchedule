let busStop = 00000;
let RouteNo= 000;
async function busList(stop) {
  busStop = stop.trim();
  let test =document.getElementById("test");
  try {
    if (isNaN(parseInt(busStop)) || busStop.length != 5) {
      throw "Stop must be a 5 digit number, example: 55612"
    }
    const response = await fetch("https://api.translink.ca/rttiapi/v1/stops/"+busStop+"?apikey=JvXiknT52GzqD8PpJnRp", {method: "GET",headers: {
    'accept': 'application/json',},});
    const text = await response.text(); 
    const obj = JSON.parse(text);
    const routes = obj.Routes.split(", ");
    createBusList(routes);
  } catch(err) {
    let error = document.createElement("p1");
    error.innerHTML= err;
    error.id= "error";
    let output = document.getElementById("output");
    output.appendChild(error);
  }
  
  return;
}

function createBusList(routes) {
  let previousDropDown = document.getElementById("busSelect");
  let error = document.getElementById("error");
  if (previousDropDown) {
    previousDropDown.remove();
  }
  if (error) {
    error.remove();
  }
  let busSelect = document.createElement("div");
  busSelect.className = "dropdown"; 
  busSelect.id= "busSelect";
  let select = document.createElement("div");
  select.className = "select";
  let selected = document.createElement("span");
  selected.className = "selected";
  selected.innerHTML="Select Bus";
  selected.id= "selectedBus"
  select.appendChild(selected);
  busSelect.appendChild(select);
  let buses= document.createElement("ul");
  buses.id= "busList";
  buses.className= "selection";
  for (let route of routes) {
    let li = document.createElement("li");
    let bus = document.createElement("div");
    bus.innerText = route;
    bus.id = route;
    bus.setAttribute("onclick", "selectBus(this)");
    bus.value= route;
    li.appendChild(bus);
    buses.appendChild(li);
  } 
  busSelect.appendChild(buses);
  let action = document.getElementById("action");
  action.appendChild(busSelect);
  return;
}

function selectBus(bus) {
  console.log(bus.value);
  selectedRoute = bus.value;
  let selected = document.getElementById("selectedBus");
  let routes = document.getElementById("busList"); 
  if (selected.innerHTML=="Select Bus") {
    selected.innerHTML= selectedRoute;
    document.getElementById(selectedRoute).parentNode.remove();
  } else {
    console.log(selected.innerHTML);
    let oldroute = selected.innerHTML;
    selected.innerHTML= selectedRoute;
    document.getElementById(selectedRoute).parentNode.remove();
    let buses = document.getElementById("busList");
    let li = document.createElement("li");
    let bus = document.createElement("div");
    bus.innerText = oldroute;
    bus.id = oldroute;
    bus.setAttribute("onclick", "selectBus(this)");
    bus.value= oldroute;
    li.appendChild(bus);
    buses.appendChild(li);
  }
  return;
}
