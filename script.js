document.addEventListener('DOMContentLoaded', () => {
    // --- GSAP Animations ---
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Animate Central Content
    tl.fromTo(".central-content",
        { y: 30, autoAlpha: 0 }, // autoAlpha handles opacity and visibility
        { duration: 0.8, y: 0, autoAlpha: 1, delay: 0.2 }
    );

    // 2. Animate Cards Staggered
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
        "-=0.4" // Overlap slightly
    );

    // --- Button Click Logic ---
    const actionButton = document.getElementById('actionButton');
    const teamMembersDiv = document.getElementById('teamMembers');

    if (actionButton && teamMembersDiv) {
        actionButton.addEventListener('click', () => {
            const team = ['Nguyễn Huỳnh Phú Vinh', 'Nguyễn Phú Vinh', 'Nguyễn Thanh Thiên'];

            // Check if the team members div is currently hidden
            if (gsap.getProperty(teamMembersDiv, "autoAlpha") < 1) {
                // If hidden, set the content and animate it in
                teamMembersDiv.innerHTML = `<strong>Thành viên nhóm:</strong> ${team.join(', ')}`;
                gsap.fromTo(teamMembersDiv,
                    { y: 15, scale: 0.9, autoAlpha: 0 }, // Start state
                    { duration: 0.5, y: 0, scale: 1, autoAlpha: 1, ease: "back.out(1.7)" } // End state
                );
            } else {
                // If already visible, do a quick "shake"
                 gsap.fromTo(teamMembersDiv,
                    { x: 0 }, // Start at current position
                    { duration: 0.5, x: 10, ease: "elastic.out(1, 0.3)", clearProps: "x" } // Move right elastically, then reset x
                 );
            }
        });
    } else {
        console.error('Button or team members div not found!');
    }


    // --- Custom Cursor Logic ---
    const customCursor = document.getElementById('custom-cursor');
    const cursorText = customCursor ? customCursor.querySelector('.cursor-text') : null; // Get the text span

    if (customCursor && cursorText) { // Check if both elements exist
        gsap.set(customCursor, { xPercent: -50, yPercent: -50 }); // Center the cursor element on the point

        // Use GSAP quickTo for smoother, more performant cursor following
        let xTo = gsap.quickTo(customCursor, "x", { duration: 0.4, ease: "power3" }),
            yTo = gsap.quickTo(customCursor, "y", { duration: 0.4, ease: "power3" });

        window.addEventListener('mousemove', (e) => {
            xTo(e.clientX);
            yTo(e.clientY);

            // Make cursor visible only if it was hidden AND mouse is inside body
            if (gsap.getProperty(customCursor, "opacity") === 0 && !document.body.classList.contains('cursor-hidden')) {
                 gsap.to(customCursor, { duration: 0.2, opacity: 1 });
            }
        });

        // Hide the cursor when the mouse leaves the window
        document.body.addEventListener('mouseleave', () => {
             document.body.classList.add('cursor-hidden'); // Add class for CSS to hide
             // Ensure button hover state is also removed if mouse leaves window while hovering button
             customCursor.classList.remove('cursor-hover-button');
             cursorText.textContent = '';
        });

         // Show the cursor when the mouse re-enters the window
        document.body.addEventListener('mouseenter', () => {
             document.body.classList.remove('cursor-hidden'); // Remove class for CSS to show
             // Check opacity again; if hidden by mouseleave, fade it back in
             if (gsap.getProperty(customCursor, "opacity") === 0) {
                 gsap.to(customCursor, { duration: 0.2, opacity: 1 });
             }
        });

        // --- Button Hover Interaction for Cursor ---
        if (actionButton) { // Check if button exists
            actionButton.addEventListener('mouseenter', () => {
                if (!document.body.classList.contains('cursor-hidden')) { // Only activate if cursor is supposed to be visible
                    cursorText.textContent = 'NHẤN ĐỂ XEM'; // Set text
                    customCursor.classList.add('cursor-hover-button'); // Add class to trigger CSS changes
                }
            });

            actionButton.addEventListener('mouseleave', () => {
                cursorText.textContent = ''; // Clear text
                customCursor.classList.remove('cursor-hover-button'); // Remove class
            });
        }
        // --- End Button Hover Interaction ---

    } else {
        console.warn('Custom cursor or cursor text element not found!');
    }
    // --- End of Custom Cursor Logic ---

}); // End of DOMContentLoaded