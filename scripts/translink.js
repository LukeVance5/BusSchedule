async function next99() {
  const response = await fetch("https://api.translink.ca/rttiapi/v1/stops/58023/estimates?apikey=JvXiknT52GzqD8PpJnRp&routeNo=099", {method: "GET",headers: {
    'accept': 'application/json',},});
  const text = await response.text();
  const obj = JSON.parse(text)[0];
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
  return;
}

