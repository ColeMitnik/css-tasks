// Modal Functions
function openModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(event) {
    // Only close if clicking the overlay or close button, not the modal content
    if (event && event.target !== document.getElementById('modalOverlay') && event.target.className !== 'modal-close') {
        return;
    }
    
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Form Functions
function clearForm(event) {
    event.preventDefault();
    document.getElementById('mortgage-amount').value = '';
    document.getElementById('mortgage-term').value = '';
    document.getElementById('interest-rate').value = '';
    document.getElementById('repayment').checked = true;
    
    // Reset the results section
    resetResultsSection();
}

function resetResultsSection() {
    document.getElementById('results-section').innerHTML = `
        <div class="results-content">
            <svg class="calculator-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
                <!-- Calculator base -->
                <rect x="40" y="30" width="120" height="140" rx="8" fill="#2c5f72" stroke="#1a4a5a" stroke-width="2"/>
                
                <!-- Screen -->
                <rect x="50" y="40" width="100" height="30" rx="4" fill="#1a4a5a"/>
                <rect x="52" y="42" width="96" height="26" rx="2" fill="#0d2f3a"/>
                
                <!-- Screen text lines -->
                <rect x="58" y="46" width="40" height="2" fill="#4a9eff"/>
                <rect x="58" y="50" width="60" height="2" fill="#4a9eff"/>
                <rect x="58" y="54" width="30" height="2" fill="#4a9eff"/>
                <rect x="58" y="58" width="50" height="2" fill="#4a9eff"/>
                <rect x="58" y="62" width="35" height="2" fill="#4a9eff"/>
                
                <!-- Calculator buttons grid -->
                <rect x="55" y="80" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="75" y="80" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="95" y="80" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="115" y="80" width="15" height="15" rx="2" fill="#ffc107"/>
                
                <rect x="55" y="100" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="75" y="100" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="95" y="100" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="115" y="100" width="15" height="15" rx="2" fill="#ffc107"/>
                
                <rect x="55" y="120" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="75" y="120" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="95" y="120" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="115" y="120" width="15" height="15" rx="2" fill="#ffc107"/>
                
                <rect x="55" y="140" width="15" height="15" rx="2" fill="#4a5568"/>
                <rect x="75" y="140" width="35" height="15" rx="2" fill="#4a5568"/>
                <rect x="115" y="140" width="15" height="15" rx="2" fill="#ffc107"/>
                
                <!-- Floating money symbols -->
                <circle cx="170" cy="60" r="12" fill="#ffc107"/>
                <text x="170" y="66" text-anchor="middle" fill="#1a202c" font-size="14" font-weight="bold">£</text>
                
                <circle cx="25" cy="90" r="10" fill="#4a9eff"/>
                <text x="25" y="95" text-anchor="middle" fill="white" font-size="12" font-weight="bold">$</text>
                
                <circle cx="180" cy="130" r="8" fill="#48bb78"/>
                <text x="180" y="134" text-anchor="middle" fill="white" font-size="10" font-weight="bold">%</text>
                
                <!-- Small coins -->
                <circle cx="25" cy="130" r="6" fill="#ffc107"/>
                <circle cx="175" cy="45" r="5" fill="#4a9eff"/>
            </svg>
            <h2>Results shown here</h2>
            <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
        </div>
    `;
}

function showResults() {
    // Get form values
    const mortgageAmount = document.getElementById('mortgage-amount').value;
    const mortgageTerm = document.getElementById('mortgage-term').value;
    const interestRate = document.getElementById('interest-rate').value;
    
    // Basic validation
    if (!mortgageAmount || !mortgageTerm || !interestRate) {
        alert('Please fill in all fields before calculating.');
        return;
    }

    // Show simulated results (no actual calculation as per requirements)
    document.getElementById('results-section').innerHTML = `
        <div class="results-content">
            <svg class="calculator-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
                <!-- Calculator with checkmark -->
                <rect x="40" y="30" width="120" height="140" rx="8" fill="#2c5f72" stroke="#1a4a5a" stroke-width="2"/>
                <rect x="50" y="40" width="100" height="30" rx="4" fill="#1a4a5a"/>
                <rect x="52" y="42" width="96" height="26" rx="2" fill="#0d2f3a"/>
                
                <!-- Checkmark -->
                <circle cx="100" cy="100" r="25" fill="#48bb78"/>
                <path d="M85 100 L95 110 L115 90" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2>Your Monthly Repayments</h2>
            <p style="font-size: 28px; font-weight: bold; color: #fff; margin: 10px 0;">£1,234.56</p>
            <p style="font-size: 14px; color: #a0aec0; margin-bottom: 20px;">This is an estimated value.</p>
            <hr style="border: none; border-top: 1px solid #4a5568; margin: 20px 0;">
            <h3 style="font-size: 18px; margin-bottom: 10px;">Total you'll repay over the term</h3>
            <p style="font-size: 24px; font-weight: bold; color: #fff;">£${(1234.56 * 12 * (mortgageTerm || 25)).toLocaleString()}</p>
        </div>
    `;
}

// Add input validation and formatting
document.addEventListener('DOMContentLoaded', function() {
    // Format mortgage amount input with commas
    const mortgageAmountInput = document.getElementById('mortgage-amount');
    mortgageAmountInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/,/g, '');
        if (value && !isNaN(value)) {
            e.target.value = parseInt(value).toLocaleString();
        }
    });

    // Prevent non-numeric input (except decimal point for interest rate)
    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            // Allow: backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    });

    // Allow decimal point for interest rate input
    const interestRateInput = document.getElementById('interest-rate');
    interestRateInput.addEventListener('keydown', function(e) {
        // Allow decimal point
        if (e.keyCode === 190 || e.keyCode === 110) {
            // Only allow one decimal point
            if (e.target.value.indexOf('.') !== -1) {
                e.preventDefault();
            }
        }
    });
});