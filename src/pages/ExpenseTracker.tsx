import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Download, Plus, Edit2, Trash2 } from 'lucide-react';

interface Expense {
    id: number;
    amount: number;
    category: string;
    description: string;
    date: string;
}

const expenseCategories = [
    { id: 'housing', name: 'Housing' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'transportation', name: 'Transportation' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'personal', name: 'Personal Care' },
    { id: 'education', name: 'Education' },
    { id: 'other', name: 'Other' }
];

const ExpenseTracker: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [formData, setFormData] = useState({
        amount: '',
        category: 'housing',
        description: '',
        date: new Date().toISOString().substr(0, 10)
    });

    useEffect(() => {
        const savedExpenses = localStorage.getItem('expenses');
        if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    }, []);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        const newExpense: Expense = {
            id: Date.now(),
            amount: parseFloat(formData.amount),
            category: formData.category,
            description: formData.description,
            date: formData.date
        };
        setExpenses([...expenses, newExpense]);
        setFormData({ amount: '', category: 'housing', description: '', date: new Date().toISOString().substr(0, 10) });
    };

    const exportData = () => {
        const headers = ['Date', 'Category', 'Description', 'Amount'];
        const csvData = expenses.map(exp => [exp.date, exp.category, exp.description, exp.amount]);
        const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Expense</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddExpense} className="space-y-4">
                        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleInputChange} className="border p-2 w-full" required />
                        <select name="category" value={formData.category} onChange={handleInputChange} className="border p-2 w-full">
                            {expenseCategories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="border p-2 w-full" required />
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="border p-2 w-full" required />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Expense</button>
                    </form>
                </CardContent>
            </Card>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {expenses.map(exp => (
                            <li key={exp.id} className="flex justify-between border-b p-2">
                                <span>{exp.date} - {exp.category}: {exp.description} - ₹{exp.amount}</span>
                                <button onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))} className="text-red-500"><Trash2 /></button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <button onClick={exportData} className="mt-4 bg-green-500 text-white py-2 px-4 rounded flex items-center">
                <Download className="mr-2" /> Export CSV
            </button>
        </div>
    );
};

export default ExpenseTracker;
