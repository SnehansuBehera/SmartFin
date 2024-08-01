export default saveToLocalStorage = (budgetInfo) => {
    const storedInfo = JSON.parse(localStorage.getItem('budgetInfo')) || [];
    storedInfo.push(budgetInfo);
    localStorage.setItem('budgetInfo', JSON.stringify(storedInfo));
};

// Call saveToLocalStorage whenever you update expenses or savings
useEffect(() => {
    if (data) {
        saveToLocalStorage(data.budgets);
    }
}, [data]);
