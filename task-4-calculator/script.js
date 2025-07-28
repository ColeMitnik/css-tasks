document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('.btn');
    const slider = document.querySelector('.slider');
    const toggleSwitch = document.querySelector('.toggle-switch');

    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let equalsPressed = false;

    function updateDisplay() {
        const formattedInput = parseFloat(currentInput).toLocaleString('en-US', { maximumFractionDigits: 10 });
        display.textContent = formattedInput;
    }

    function appendNumber(number) {
        if (equalsPressed) {
            currentInput = number;
            equalsPressed = false;
        } else {
            if (currentInput === '0' && number !== '.') {
                currentInput = number;
            } else if (number === '.' && currentInput.includes('.')) {
                return; 
            } else {
                currentInput += number;
            }
        }
        updateDisplay();
    }

    function chooseOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
        equalsPressed = false;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        equalsPressed = true;
        updateDisplay();
    }

    function clearAll() {
        currentInput = '0';
        previousInput = '';
        operator = null;
        equalsPressed = false;
        updateDisplay();
    }

    function deleteLast() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (['+', '-', 'x', '/'].includes(value)) {
                chooseOperator(value);
            } else if (value === '=') {
                calculate();
            } else if (value === 'RESET') {
                clearAll();
            } else if (value === 'DEL') {
                deleteLast();
            } else {
                appendNumber(value);
            }
        });
    });

    updateDisplay(); 

    const themes = {
        1: {
            '--main-background-1': 'hsl(222, 26%, 31%)',
            '--toggle-background-keypad-background-1': 'hsl(223, 31%, 20%)',
            '--screen-background-1': 'hsl(224, 36%, 15%)',
            '--key-background-1': 'hsl(225, 21%, 49%)',
            '--key-shadow-1': 'hsl(224, 28%, 35%)',
            '--red-key-background-1': 'hsl(6, 63%, 50%)',
            '--red-key-shadow-1': 'hsl(6, 70%, 34%)',
            '--text-color-dark-blue-1': 'hsl(221, 14%, 31%)',
            '--text-color-white-1': 'hsl(0, 0%, 100%)',
        },
        2: {
            '--main-background-1': 'hsl(0, 0%, 90%)',
            '--toggle-background-keypad-background-1': 'hsl(0, 5%, 81%)',
            '--screen-background-1': 'hsl(0, 0%, 93%)',
            '--key-background-1': 'hsl(185, 42%, 37%)',
            '--key-shadow-1': 'hsl(185, 58%, 25%)',
            '--red-key-background-1': 'hsl(25, 98%, 40%)',
            '--red-key-shadow-1': 'hsl(25, 99%, 27%)',
            '--text-color-dark-blue-1': 'hsl(60, 10%, 19%)',
            '--text-color-white-1': 'hsl(0, 0%, 100%)',
        },
        3: {
            '--main-background-1': 'hsl(268, 75%, 9%)',
            '--toggle-background-keypad-background-1': 'hsl(268, 71%, 12%)',
            '--screen-background-1': 'hsl(268, 71%, 12%)',
            '--key-background-1': 'hsl(281, 89%, 26%)',
            '--key-shadow-1': 'hsl(285, 91%, 52%)',
            '--red-key-background-1': 'hsl(176, 100%, 44%)',
            '--red-key-shadow-1': 'hsl(177, 92%, 70%)',
            '--text-color-dark-blue-1': 'hsl(52, 100%, 62%)',
            '--text-color-white-1': 'hsl(0, 0%, 100%)',
        }
    };

    function applyTheme(themeNumber) {
        const theme = themes[themeNumber];
        for (const [property, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(property, value);
        }
        slider.dataset.theme = themeNumber;
    }

    toggleSwitch.addEventListener('click', (event) => {
        let currentTheme = parseInt(slider.dataset.theme);
        let nextTheme = (currentTheme % 3) + 1;

        if (event.target.classList.contains('toggle-number')) {
            nextTheme = parseInt(event.target.textContent);
        }

        applyTheme(nextTheme);
    });

    applyTheme(1);
});