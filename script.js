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
        hours[i][j].innerHTML = schedule[i][j]
    
    }

}
