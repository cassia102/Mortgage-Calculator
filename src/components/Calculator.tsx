import { useEffect, useState } from "react";

export const Calculator = () => {
    const [values, setValues] = useState({
        purchasePrice: 50000,
        downPayment: 5000,
        repaymentTime: 5,
        interestRate: 2
    });
    const [loanAmount, setLoanAmount] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const handleMonthlyPaymentChange = () => {
        const monthlyInterestRate = values.interestRate / 12 / 100;
        const numberOfPayments = values.repaymentTime * 12;

        const pow = Math.pow((1 + monthlyInterestRate), numberOfPayments);
        const monthlyPayments = loanAmount * (monthlyInterestRate * pow) / (pow - 1);

        setMonthlyPayment(Math.round(monthlyPayments));
    };

    useEffect(() => {
        setLoanAmount(values.purchasePrice - values.downPayment);
        handleMonthlyPaymentChange();
    }, [values]);

    const handleValuesChange = (e: any) => {
        const valueAmount = Number(e.value);
        const valueName = e.name;

        setValues((prevValues) => ({ ...prevValues, [valueName]: valueAmount }));
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).replace('£', '');
    };
    

    return (
        <div className="mortgage-calculator">
            <div className="mortgage-calculator--purchase-price mortgage-calculator--slider">
                <div className="slider-title-wrapper">
                    <h4>Purchase Price:</h4>
                    <h4>£{formatCurrency(values.purchasePrice)}</h4>
                </div>
                <input
                    type="range"
                    min="50000"
                    max="1000000"
                    name="purchasePrice"
                    value={values.purchasePrice}
                    onChange={e => handleValuesChange(e.target)}
                    className="purchase-price-slider slider"
                    id="purchase-price-slider"
                />
            </div>
            <div className="mortgage-calculator--down-payment mortgage-calculator--slider">
                <div className="slider-title-wrapper">
                    <h4>Down Payment:</h4>
                    <h4>£{formatCurrency(values.downPayment)}</h4>
                </div>
                <input
                    type="range"
                    min="5000"
                    max="250000"
                    name="downPayment"
                    value={values.downPayment}
                    onChange={e => handleValuesChange(e.target)}
                    className="down-payment-slider slider"
                    id="down-payment-slider"
                />
            </div>
            <div className="mortgage-calculator--repayment-time mortgage-calculator--slider">
                <div className="slider-title-wrapper">
                    <h4>Repayment Time:</h4>
                    <h4>{values.repaymentTime} years</h4>
                </div>
                <input
                    type="range"
                    min="5"
                    max="40"
                    name="repaymentTime"
                    value={values.repaymentTime}
                    onChange={e => handleValuesChange(e.target)}
                    className="repayment-time-slider slider"
                    id="repayment-time-slider"
                />
            </div>
            <div className="mortgage-calculator--interest-rate mortgage-calculator--slider">
                <div className="slider-title-wrapper">
                    <h4>Interest Rate:</h4>
                    <h4>{values.interestRate}%</h4>
                </div>
                <input
                    type="range"
                    min="1"
                    max="15"
                    name="interestRate"
                    value={values.interestRate}
                    onChange={e => handleValuesChange(e.target)}
                    className="interest-rate-slider slider"
                    id="interest-rate-slider"
                />
            </div>
            <div className="mortgage-calculator--loan-amount mortgage-calculator--number">
                <h4>Loan Amount</h4>
                <h2>£{formatCurrency(loanAmount)}</h2>
            </div>
            <div className="mortgage-calculator--monthly-repayments mortgage-calculator--number">
                <h4>Estimated pr. month</h4>
                <h2>£{formatCurrency(monthlyPayment)}</h2>
            </div>

            <div className="mortgage-calculator--button">
                <button>Get a mortgage quote</button>
            </div>
        </div>
    );
};

