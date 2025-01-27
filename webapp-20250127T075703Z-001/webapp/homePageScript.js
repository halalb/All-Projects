// Wait for the DOM to be fully loaded before executing the script, to make sure the HTML elements exist
document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements, and store them in variables
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    // Initialize the current month (January is 0), and store it in a variable, so we can keep track of the current month, and update the calendar when the user clicks the next or previous month buttons
    let currentMonth = 0;
    // Function to update the calendar based on the current month
    function updateCalendar() {
        // Clear the calendar body before updating
        calendarBody.innerHTML = '';
        // Get the current date and the first day of the month
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
        // Calculate the number of days in the month and the starting day of the week
        const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
        const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)
        // Initialize a counter for day numbering
        let dayCount = 1;
        // Loop through 6 rows (weeks) and 7 columns (days)
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                // Check if the cell is before the start of the month (empty cells)
                if (i === 0 && j < startingDayOfWeek) {
                    cell.textContent = '';
                } else if (dayCount <= daysInMonth) {
                    // Fill the cell with the day number and increment the counter
                    cell.textContent = dayCount++;
                }
                // Append the cell to the row
                row.appendChild(cell);
            }
            // Append the row to the calendar body
            calendarBody.appendChild(row);
        }
        // Update the displayed month and year in the header
        currentMonthElement.textContent = getMonthName(currentMonth) + ' ' + currentDate.getFullYear();
    }
    // Function to get the name of a month based on its index
    function getMonthName(monthIndex) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }
    // Initial update of the calendar when the page loads
    updateCalendar();
    // Event listener for the previous month button
    prevMonthButton.addEventListener('click', function () {
        if (currentMonth > 0) {
            // Move to the previous month and update the calendar
            currentMonth--;
            updateCalendar();
        }
    });
    // Event listener for the next month button
    nextMonthButton.addEventListener('click', function () {
        if (currentMonth < 11) {
            // Move to the next month and update the calendar
            currentMonth++;
            updateCalendar();
        }
    });
});