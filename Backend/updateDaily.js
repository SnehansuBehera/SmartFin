import schedule from 'node-schedule';
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://vanpjobbtvaczauvarai.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnBqb2JidHZhY3phdXZhcmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MTUwODQsImV4cCI6MjAzNjE5MTA4NH0.EFi9HYThWoyJacbtupWUJB7MugccBXsKu9Ni9Qcac8k');

// Function to update budget with default values for a new day
const updateDailyBudgets = async () => {
    const { data: budgets, error } = await supabase.from('budget').select('*');
    if (error) throw new Error(error.message);

    const today = new Date().toISOString().split('T')[0];

    for (const budget of budgets) {
        const newSavingsEntry = {
            date: today,
            education: budget.total_budget / 4, // Assuming equal split for simplicity
            food: budget.total_budget / 4,
            travel: budget.total_budget / 4,
            other: budget.total_budget / 4
        };
        const newExpensesEntry = {
            date: today,
            education: 0,
            food: 0,
            travel: 0,
            other: 0
        };

        const updatedSavings = [...budget.savings_per_day, newSavingsEntry];
        const updatedExpenses = [...budget.expenses_per_day, newExpensesEntry];

        const { data, error } = await supabase.from('budget')
            .update({ savings_per_day: updatedSavings, expenses_per_day: updatedExpenses })
            .eq('id', budget.id);

        if (error) console.error('Error updating budget:', error.message);
    }
};

const sendDailyNotifications = async () => {
    const { data: users, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);

    for (const user of users) {
        const { data: budgets, error: budgetError } = await supabase.from('budget').select('*').eq('user_id', user.id);
        if (budgetError) throw new Error(budgetError.message);

        for (const budget of budgets) {
            const todaySavings = budget.savings_per_day.find(saving => saving.date === new Date().toISOString().split('T')[0]);
            if (todaySavings) {
                sendEmailNotification(user.email, todaySavings);
            }
        }
    }
};

// Schedule the function to run every day at 11:59 PM
schedule.scheduleJob('59 23 * * *', updateDailyBudgets, sendDailyNotifications);
