const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const form = document.querySelector("form");

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;
  
  inputs.forEach((i) => {
    const parent = i.parentElement;
    const value = parseInt(i.value);
    if (!value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required.";
      validator = false;
    } else {
      i.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
    }
  });

  const day = parseInt(dayInp.value);
  const month = parseInt(monthInp.value);
  const year = parseInt(yearInp.value);

  if (month < 1 || month > 12) {
    monthInp.style.borderColor = "red";
    monthInp.parentElement.querySelector("small").innerText = "Must be a valid month.";
    validator = false;
  }

  let maxDays = months[month - 1];
  if (month === 2 && isLeapYear(year)) {
    maxDays = 29;
  }

  if (day < 1 || day > maxDays) {
    dayInp.style.borderColor = "red";
    dayInp.parentElement.querySelector("small").innerText = "Must be a valid day.";
    validator = false;
  }

  return validator;
}
function handleSubmit(e) {
  e.preventDefault();

  if (validate()) {
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    let day = parseInt(dayInp.value);
    let month = parseInt(monthInp.value);
    let year = parseInt(yearInp.value);
    
    if (day > currentDay) {
      currentDay += months[currentMonth - 1];
      currentMonth -= 1;
    }
    if (month > currentMonth) {
      currentMonth += 12;
      currentYear -= 1;
    }
    
    const d = currentDay - day;
    const m = currentMonth - month;
    const y = currentYear - year;

    dayOtp.innerHTML = d;
    monthOtp.innerHTML = m;
    yearOtp.innerHTML = y;
  }
  
}

form.addEventListener("submit", handleSubmit);