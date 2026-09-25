import axios from 'axios';

const API_URL = "http://localhost:5000/api/expenses";

// Get all expenses
export const getExpress = async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
}

// create expense 
export const createExpense = async(expenseData)=>{
    const response = await axios.post(API_URL,
    expenseData);
    return response.data;
}

// update expense
export const updateExpense = async(id, expenseData)=>{
    const response = await axios.put(`${API_URL}/${id}`,
    expenseData);
    return response.data;
}

// delete expense
export const deleteExpense = async(id)=>{
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}