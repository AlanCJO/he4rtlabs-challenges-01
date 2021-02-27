// pegar input do usuário
const Form = {
    
    totalValue: document.getElementById('total-value'),
    hourValue: document.getElementById('worked-hours'),
    workedDays: document.getElementById('worked-days'),
    vacationDays: document.getElementById('vacation-days'),

    getValues() {
        return {
            totalValue:     Form.totalValue.value,
            hourValue:      Form.hourValue.value,
            workedDays:     Form.workedDays.value,
            vacationDays:   Form.vacationDays.value
        } 
    },

    clearFields() {
        Obj.values().forEach(e => e.value = '');
    },

    submit(event) {
        event.preventDefault();

        // validação do Formulário
        try {
            Form.validateFields();
            if(Form.isNumber())
                Calc.init();
        } catch (error) {
            alert(error.message);
        }

    }, 

    validateFields() {
        const { totalValue, hourValue,workedDays, vacationDays} = Form.getValues();

        if (totalValue.trim() === "" || 
            hourValue.trim() === "" || 
            workedDays.trim() === "" || 
            vacationDays.trim() === "") {
                throw new Error("Por favor, preencha todos os campos");
            }
    }, 

    isNumber() {
        // é número?
        const numbers = /^[0-9.,]+$/;
        let isnumber = true;
        Obj.values().forEach(e => {
            if (!e.value.match(numbers)) {
                e.classList.add('error')
                e.value = `digite somente números`;
                isnumber = false;
            }
        })

        return isnumber;
    },

    clearError(event) {
        const element = event.path[0];
        if (element.value === "digite somente números")
            element.value = '';
            element.classList.remove('error');
    },

    formatValues(value) {
        value = String(value).replace(',', '.');
        value = parseFloat(value, 2)

        return value;
    }
}

const Obj = {
    values() {
        return Object.values(Form).slice(0, 4);
    },

    keys() {
        return Object.keys(Form).slice(0, 4);
    }
}

// valorHora = (valorProjeto / (diasEfetivos * 4 * horasDiarias) ) + ( ( diasFerias * diasEfetivos * horasDiarias ) )
const Calc = {
    init() {
        let { totalValue, hourValue, workedDays, vacationDays } = Form.getValues();
        hourValue = parseInt(hourValue);
        workedDays = parseInt(workedDays);
        vacationDays = parseInt(vacationDays);
        totalValue = Form.formatValues(totalValue);

        const valueHour = (totalValue / (workedDays * 4 * hourValue)) + ((vacationDays * workedDays * hourValue));
        DOM.showCalc(valueHour);
    }
}

const DOM = {
    showCalc(value) {
        Form.clearFields();
        value = value.toFixed(2);
        setTimeout(() => {
            document.getElementById('result-value').value = `R$ ${value}`;
        }, 500);
    }
}