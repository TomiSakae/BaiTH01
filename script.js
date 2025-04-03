// Keep the exact same JavaScript code from the previous GSAP example.
document.addEventListener('DOMContentLoaded', () => {
    // --- GSAP Animations ---
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Animate Central Content
    tl.fromTo(".central-content",
        { y: 30, autoAlpha: 0 },
        { duration: 0.8, y: 0, autoAlpha: 1, delay: 0.2 }
    );

    // 2. Animate Cards Staggered (GSAP animates based on DOM order by default)
    // Tom, Jerry, Spike will likely animate in sequence
    tl.fromTo(".member-card",
        { y: 40, autoAlpha: 0, scale: 0.95 },
        {
            duration: 0.6,
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.2,
            ease: "back.out(1.4)"
        },
        "-=0.4" // Overlap slightly with central content animation
    );

    // --- Button Click Logic ---
    const actionButton = document.getElementById('actionButton');
    const teamMembersDiv = document.getElementById('teamMembers');

    if (actionButton && teamMembersDiv) {
        actionButton.addEventListener('click', () => {
            const team = ['Nguyễn Huỳnh Phú Vinh', 'Nguyễn Phú Vinh', 'Nguyễn Thanh Thiên'];
            if (gsap.getProperty(teamMembersDiv, "opacity") < 1) {
                teamMembersDiv.innerHTML = `<strong>Thành viên nhóm:</strong> ${team.join(', ')}`;
                gsap.fromTo(teamMembersDiv,
                    { y: 15, scale: 0.9, autoAlpha: 0 },
                    { duration: 0.5, y: 0, scale: 1, autoAlpha: 1, ease: "back.out(1.7)" }
                );
            } else {
                 gsap.fromTo(teamMembersDiv, {x:0}, {duration: 0.5, x:10, ease:"elastic.out(1, 0.3)", clearProps:"x"});
            }
        });
    } else {
        console.error('Button or team members div not found!');
    }
});