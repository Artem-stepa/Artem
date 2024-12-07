//тестовий розклад
// + це є,
// - це нема,
// +- це може бути,
// 0 це не встановлено
document.cookies =
  "+,-,+-,0,+,-,+-,0,+,-,+-,0;+,-,+-,0,+,-,+-,0,+,-,+-,0;+,-,+-,0,+,-,+-,0,+,-,+-,0;+,-,+-,0,+,-,+-,0,+,-,+-,0;+,-,+-,0,+,-,+-,0,+,-,+-,0;+,-,+-,0,+,-,+-,0,+,-,+-,0;+,-,+-,0,+,-,+-,0,+,-,+-,0;";

// розділяємо кукі по ; отримуємо дні,
// потім кожен день ділимо по ,
const schedule = document.cookies
  .split(";")
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

for(let i = 0; i < days.length; i++){
    for(let j = 1; j < hours[i].length; j++){
        if(schedule[i][j] === undefined) {
          hours[i][j].innerHTML = "-"
        } else if(schedule[i][j] === "-"){
          hours[i][j].style.backgroundImage = "url(https://www.dtek-oem.com.ua/media/page/no-electricity.png)"
          hours[i][j].style.backgroundColor = " rgba(204, 206, 207, .33)"
        } 
        if(schedule[i][j] === "+") {
          hours[i][j].style.background = "yellow"
        }
        if(schedule[i][j] === "+-") {
          hours[i][j].style.backgroundImage = "url(https://www.dtek-oem.com.ua/media/page/maybe-electricity.png)"
        }
        if(schedule[i][j] === "0") {
          hours[i][j].innerHTML = "-"
        }
    }

}
