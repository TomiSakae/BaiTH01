// Function to animate list items
const animateListItems = (selector) => {
    const items = document.querySelectorAll(selector);
    items.forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 0.1}s`);
        item.classList.add('fade-in-up');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');
    const teamMembersDiv = document.getElementById('teamMembers');

    // Animate instruction list items on load
    animateListItems('#instructions li');

    if (actionButton && teamMembersDiv) {
        actionButton.addEventListener('click', () => {
            // Define the team members
            const team = ['Nguyễn Huỳnh Phú Vinh', 'Nguyễn Phú Vinh', 'Nguyễn Thanh Thiên'];
            // Display the team members in the div
            teamMembersDiv.innerHTML = `<strong>Thành viên nhóm:</strong> ${team.join(', ')}`;
            // Add the 'visible' class to trigger the animation
            teamMembersDiv.classList.add('visible');
        });
    } else {
        console.error('Button or team members div not found!');
    }
});
