// src/components/Budget.js
import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { supabase } from '../supabaseClient';
import io from 'socket.io-client';



const GET_BUDGETS = gql`
  {
    budgets {
      id
      user_id
      start_date
      end_date
      total_budget
      savings_per_day
      expenses_per_day
      purse
    }
  }
`;

const UPDATE_BUDGET = gql`
  mutation UpdateBudget($budgetId: String!, $savings: JSON, $expenses: JSON) {
    updateBudget(budgetId: $budgetId, savings: $savings, expenses: $expenses) {
      id
      savings_per_day
      expenses_per_day
    }
  }
`;

const Budget = () => {
    const [userId, setUserId] = useState('');
    const { loading, error, data } = useQuery(GET_BUDGETS);
    const [updateBudget] = useMutation(UPDATE_BUDGET);

    useEffect(() => {
        const user = supabase.auth.user();
        if (user) {
            setUserId(user.id);
        }
    }, []);


    const handleUpdateExpenses = async (budgetId, date, label, amount) => {
        const budget = data.budgets.find(b => b.id === budgetId);
        const expenses = budget.expenses_per_day.map(expense => {
            if (expense.date === date) {
                return { ...expense, [label]: expense[label] + amount };
            }
            return expense;
        });

        await updateBudget({ variables: { budgetId, expenses } });
    };

    const handleCreateBudget = async () => {
        const { startDate, endDate, totalBudget } = this.state;
        const user = supabase.auth.user();

        if (user) {
            await supabase
                .from('budget')
                .insert([
                    {
                        user_id: user.id,
                        start_date: startDate,
                        end_date: endDate,
                        total_budget: totalBudget,
                        savings_per_day: [],
                        expenses_per_day: [],
                        purse: 0
                    }
                ]);
        }
    };

    useEffect(() => {
        const socket = io('http://localhost:5000');
        socket.on('dailySummary', (summary) => {
            // Update the state or show notifications in the frontend
            console.log('Daily Summary:', summary);
        });

        return () => {
            socket.off('dailySummary');
        };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Budget Management</h1>
            <div className="my-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border rounded mx-2"
                />
                <input
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(parseFloat(e.target.value))}
                    placeholder="Total Budget"
                    className="p-2 border rounded mx-2"
                />
                <button onClick={handleCreateBudget} className="p-2 bg-blue-500 text-white rounded">
                    Create Budget
                </button>
            </div>
            <div>
                {data.budgets.map((budget) => (
                    <div key={budget.id} className="my-4 p-4 border rounded">
                        <h2 className="text-xl font-bold">Budget Period: {budget.start_date} to {budget.end_date}</h2>
                        <p>Total Budget: {budget.total_budget}</p>
                        <p>Purse: {budget.purse}</p>
                        <div>
                            <h3 className="font-bold">Savings Per Day</h3>
                            {budget.savings_per_day.map((savings, index) => (
                                <div key={index}>
                                    <p>Date: {savings.date}</p>
                                    <p>Education: {savings.education}</p>
                                    <p>Food: {savings.food}</p>
                                    <p>Travel: {savings.travel}</p>
                                    <p>Other: {savings.other}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="font-bold">Expenses Per Day</h3>
                            {budget.expenses_per_day.map((expense, index) => (
                                <div key={index}>
                                    <p>Date: {expense.date}</p>
                                    <p>Education: {expense.education}</p>
                                    <p>Food: {expense.food}</p>
                                    <p>Travel: {expense.travel}</p>
                                    <p>Other: {expense.other}</p>
                                    <button onClick={() => handleUpdateExpenses(budget.id, expense.date, 'food', 10)} className="bg-blue-500 text-white p-2 rounded">Add Food Expense</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Budget;

