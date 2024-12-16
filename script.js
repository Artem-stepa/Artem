//тестовий розклад
// + це є,
// - це нема,
// +- це може бути,
// 0 це не встановлено
// розділяємо кукі по ; отримуємо дні,
// потім кожен день ділимо по ,
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name){
  const cookies = document.cookie.split("; ")
  let cookieValue;
  cookies.forEach(_cookie => {
    const [_name,value] = _cookie.split("=");
    if(name === _name) cookieValue = value;
  })
  return cookieValue;
}

function convertCookie(){
  let schedule = [];
  const scheduleCookie = getCookie("schedule")
  if(!scheduleCookie){
    for(let i = 0;i < 7;i++){
      schedule.push([]);
      for(let j = 0;j < 24;j++){
        schedule[i].push("0,")
      }
      schedule[i].push("[")
    }
    printSchedule();
    return schedule;
  }
  schedule = getCookie("schedule")
  .split("[")
  .map((day) => day.split(",").filter((day) => day != ""))
  .filter((day) => day.length != 0);

  return schedule;
}

const schedule = convertCookie();
console.log("schedu",schedule)

console.log("schedule", schedule);
let select = document.querySelector(".select-day")

let days = document.querySelectorAll(".day-row")
console.log(days)
let hours = []

for(let i = 0; i < days.length; i++){
    hours.push(days[i].querySelectorAll("td"))
}

console.log(hours)
function printSchedule(){
  for(let i = 0; i < days.length; i++){
    for(let j = 1; j < hours[i].length; j++){
        if(schedule[i][j] === undefined) {
          hours[i][j].innerHTML = "-"
          hours[i][j].style.backgroundImage = "none"
          hours[i][j].style.backgroundColor = "none"
        } else if(schedule[i][j] === "-"){
          hours[i][j].innerHTML = ""
          hours[i][j].style.backgroundImage = "url(https://www.dtek-oem.com.ua/media/page/no-electricity.png)"
          hours[i][j].style.backgroundColor = " rgba(204, 206, 207, .33)"
        } 
        if(schedule[i][j] === "+") {
          hours[i][j].innerHTML = ""
          hours[i][j].style.backgroundColor = "yellow"
          hours[i][j].style.backgroundImage = "url(https://media.istockphoto.com/id/1415431745/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B8%D0%BA%D0%BE%D0%BD%D0%B0-%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B5%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9-%D0%BC%D0%BE%D0%BB%D0%BD%D0%B8%D0%B8-%D0%BC%D0%BE%D0%BB%D0%BD%D0%B8%D1%8F-%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=OIqzhGi_kQP1l_mQVCkeuY54iQ8Y34ngJJITDTlHE00=)"
        }
        if(schedule[i][j] === "+-") {
          hours[i][j].innerHTML = ""
          hours[i][j].style.backgroundImage = "url(https://www.dtek-oem.com.ua/media/page/maybe-electricity.png)"
        }
        if(schedule[i][j] === "0") {
          hours[i][j].innerHTML = ""
          hours[i][j].innerHTML = "-"
        }
    }
  }
}
printSchedule();

let day = document.querySelector(".select-day");
let hour = document.querySelector(".select-hour");
let electricity = document.querySelector(".select-electricity");
let button = document.querySelector("button")

function saveToCookie(){
  let scheduleCookies = ""
  for(let i=0; i<schedule.length;i++){
    for(let j=0;j<schedule.length;j++){
      scheduleCookies += (schedule[i][j] || "0") + ","
    }
    scheduleCookies += "["
  }
  setCookie("schedule",scheduleCookies,365)
}
function onAdd(dayNumber, hour, value) {
  schedule[dayNumber][hour] = value;
  saveToCookie()
}

let dayNameToNumber = {
  "Понеділок":0,
  "Вівторок":1,
  "Середа":2,
  "Четвер":3,
  "П`ятниця":4,
  "Субота":5,
  "Неділя":6,
}

let electricityValues = {
  "Є":"+",
  "Нема":"-",
  "Може бути":"+-",
  "Невідомо":"0",
}
button.addEventListener("click",() => {
  let dayNumber = dayNameToNumber[day.value]
  let hourNumber = +hour.value.split(":")[0] + 1
  let electricityValue = electricityValues[electricity.value]
  onAdd(dayNumber,hourNumber,electricityValue);
  printSchedule();
  console.log(dayNumber,hourNumber,electricityValue,schedule);
  // onAdd()
})