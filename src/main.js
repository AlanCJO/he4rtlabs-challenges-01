// pegar input do usuário
const Form = {
    
    totalValue: document.getElementById('total-value'),
    hourValue: document.getElementById('worked-hours'),
    workedDays: document.getElementById('worked-days'),
    vacationDays: document.getElementById('vacation-days'),

    getValues() {
        return {
            totalValue: parseFloat(Form.totalValue.value),
            hourValue: parseInt(Form.hourValue.value),
            workedDays: parseInt(Form.workedDays.value),
            vacationDays: parseInt(Form.vacationDays.value)
        } 
    },

    clearFields() {
        Obj.values().forEach(e => e.value = '');
    },

    submit(event) {
        event.preventDefault();
        Calc.init();
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

const Utils = {
    
}

// valorHora = (valorProjeto / (diasEfetivos * 4 * horasDiarias) ) + ( ( diasFerias * diasEfetivos * horasDiarias ) )
const Calc = {
    init() {
        const { totalValue, hourValue, workedDays, vacationDays } = Form.getValues();
        const valueHour = (totalValue / (workedDays * 4 * hourValue)) + ((vacationDays * workedDays * hourValue));
        DOM.showCalc(valueHour);
    }
}

const DOM = {
    showCalc(value) {
        value = value.toFixed(2);
        value = String(value).replace('.', ',');
        Form.clearFields();
        setTimeout(() => {
            document.getElementById('result-value').value = `R$ ${value}`;
        }, 500);
    }
}