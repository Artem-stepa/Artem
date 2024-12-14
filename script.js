//тестовий розклад
// + це є,
// - це нема,
// +- це може бути,
// 0 це не встановлено
document.cookie =
  "schedule=+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[+,-,+-,0,+,-,+-,0,+,-,+-,0[;max-age=1000000000";
  let cookies = document.cookie.split(";")
  console.log (cookies)
// розділяємо кукі по ; отримуємо дні,
// потім кожен день ділимо по ,
let scheduleCookies = document.cookie.split(";")
console.log (cookies)
for(let i = 0;i < cookies.length;i++){
  if(cookies[i].split("=")[0] == "schedule"){
    scheduleCookies = cookies[i].split("=")[1]
    break
  }
}
const schedule = scheduleCookies
  .split("[")
  .map((day) => day.split(",").filter((day) => day != ""))
  .filter((day) => day.length != 0);

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
        } else if(schedule[i][j] === "-"){
          hours[i][j].style.backgroundImage = "url(https://www.dtek-oem.com.ua/media/page/no-electricity.png)"
          hours[i][j].style.backgroundColor = " rgba(204, 206, 207, .33)"
        } 
        if(schedule[i][j] === "+") {
          hours[i][j].style.backgroundColor = "yellow"
          hours[i][j].style.backgroundImage = "url(https://media.istockphoto.com/id/1415431745/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B8%D0%BA%D0%BE%D0%BD%D0%B0-%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B5%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9-%D0%BC%D0%BE%D0%BB%D0%BD%D0%B8%D0%B8-%D0%BC%D0%BE%D0%BB%D0%BD%D0%B8%D1%8F-%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=OIqzhGi_kQP1l_mQVCkeuY54iQ8Y34ngJJITDTlHE00=)"

        }
        if(schedule[i][j] === "+-") {
          hours[i][j].style.backgroundImage = "url(https://www.dtek-oem.com.ua/media/page/maybe-electricity.png)"
        }
        if(schedule[i][j] === "0") {
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
  document.cookie = `schedule=${scheduleCookies};max-age=1000000000`;
  console.log("asdfsa",scheduleCookies)
}
function onAdd(dayNumber, hour, value) {
  schedule[dayNumber][hour] = value;
  saveToCookie()
}

let dayNameToNumber = {
  "Понеділок":0,
  "Вівторок":1,
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
  console.log(dayNumber,hourNumber +3,electricityValue,schedule);
  // onAdd()
})