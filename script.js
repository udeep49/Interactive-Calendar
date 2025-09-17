const datePicker = document.querySelector(".datepicker");
const dateInput = document.querySelector(".date-input");
//================================================================================================
// A. Datepicker Header:

// 1. Previous Button:
const prevBtn = document.createElement("button");
prevBtn.className = "prev-btn"
prevBtn.textContent = "prev"

// 2. Month:
const monthsRange = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const months = document.createElement("select");
months.className = "months";

monthsRange.forEach((monthsRange) => {
    let option = document.createElement("option");
    option.textContent = monthsRange;
    months.append(option);
})

// 3. Year:
const years = document.createElement("input");
years.className = "years";
years.type = "number";
years.value = 2025;
years.min = "1970";
years.max = "2100";

// 4. Next Button:
const nextBtn = document.createElement("button");
nextBtn.className = "next-btn"
nextBtn.textContent = "next"

const datePickerHeader = document.createElement("div");
datePickerHeader.className = "datepicker-header"
datePickerHeader.append(prevBtn);
datePickerHeader.append(months);
datePickerHeader.append(years);
datePickerHeader.append(nextBtn);

// B. Days:

const daysRange = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const days = document.createElement("div");
days.className = "days";

daysRange.forEach((daysRange) => {
    let span = document.createElement("span");
    span.textContent = daysRange;
    days.append(span);
})

// C. Dates:

const datesRange = [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

const dates = document.createElement("div");
dates.className = "dates";

datesRange.forEach((datesRange) => {
    let button = document.createElement("button");
    button.textContent = datesRange;

    // * disable dates from 1 to 5:
    if (datesRange >= 1 && datesRange <= 5) {
    button.disabled = true;
    }

    // *add "today" class to 13:
    if (datesRange === 13) {
        button.className = "today";
    }

    // *add "selected" class to 13:
    if (datesRange === 23) {
        button.className = "selected";
    }

    dates.append(button);
})

// create "calendar" div class itself inside datepicker:
const calendar = document.createElement("div");
calendar.className = "calendar";
calendar.append(datePickerHeader);
calendar.append(days);
calendar.append(dates);

// =================================================================================

// Click Function to Open Calendar

dateInput.addEventListener("click", () => {
    datePicker.append(calendar);
    datePicker.style.display = "flex";
})

// Click Function to Hide Calendar
document.addEventListener("click", (e) => {
    if (!datePicker.contains(e.target) && !dateInput.contains(e.target)) {
        datePicker.style.display = "none";
    }
})

//=====================================================================================

let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

// handle next month nav
nextBtn.addEventListener("click", () => {
    if (month === 11) year++;
    month = (month + 1) % 12;
    displayDates();
});

// handle previous month nav
prevBtn.addEventListener("click", () => {
    if (month === 0) year--;
    month = (month - 1 + 12 ) % 12;
    displayDates();
});

// handle month change event
months.addEventListener("change", () => {
    month = months.selectedIndex;
    displayDates();
})

// handle year change event
years.addEventListener("change", () => {
    year = years.value;
    displayDates();
})

// update month and year
const updateYearMonth = () => {
    months.selectedIndex = month;
    years.value = year;
}
// Dateclick Function

const handleDateClick = (e) => {
    const button = e.target;

    // remove the "selected" class from other buttons
    const selected = document.querySelector(".selected");
    selected && selected.classList.remove("selected");

    // add "selected" class to the button
    button.classList.add("selected");

    // set the selected date
    selectedDate = new Date(year, month, parseInt(button.textContent));

    // display the selected date on dateinput:
    dateInput.value = selectedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

// Render the dates in calendar interface:

const displayDates = () => {

    // updates year and months whenever dates are changed
    updateYearMonth();

    // * Clear the dates
    dates.innerHTML = "";

    // * Display the las week of previous month
    const firstOfPrevMonth = new Date(year, month, 0);

    for (i = 0; i <= firstOfPrevMonth.getDay(); i++) {
        const text = firstOfPrevMonth.getDate() - firstOfPrevMonth.getDay() + i;
        const button = createButton(text, true, false);
        dates.appendChild(button);
    }

    // * Display the current month

    // get the last date of the month
    const lastOfMonth = new Date(year, month +1, 0);

    for (let i = 1; i <= lastOfMonth.getDate(); i++) {

        const isToday = selectedDate.getDate() === i &&
                        selectedDate.getMonth() === month &&
                        selectedDate.getFullYear() === year;

        const button = createButton(i, false, isToday);
        button.addEventListener("click", handleDateClick);
        dates.appendChild(button);
    }

    // * Display the first week of next month
    const firstOfNextMonth = new Date(year, month +1, 1);

    for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
        const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;
        const button = createButton(text, true);
        dates.appendChild(button);
    }
};

// Function to generate buttons

const createButton = (text, isDisabled = false, isToday = false) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.disabled = isDisabled;
    button.classList.toggle("today", isToday);
    return button;
};

displayDates();