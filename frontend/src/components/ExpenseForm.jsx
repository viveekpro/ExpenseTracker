import { useState } from "react";
import { createExpense } from "../services/expenseApi";

function ExpenseForm({ onExpenseAdded }) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "Food",
        description: " ",
        expense_mode: "Cash",
        date: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createExpense({ ...formData, amount: Number(formData.amount) });
            setFormData({
                title: "",
                amount: "",
                category: "Food",
                description: " ",
                expense_mode: "Cash",
                date: ""
            });
            onExpenseAdded();
        }
        catch (error){
            console.error(error);
            alert("Failed to add expense");
        }
    }

    return (
        <div className="expense-form">
            <h2>Add Expense</h2>
            <form onSubmit = {handleSubmit}>
                <imput type="text" name = "title" placeholder ="Expense Title" value = {formData.title} onChange={handleChange}required/>
                <imput type="number" name = "amount" placeholder ="Amount" value = {formData.amount} onChange={handleChange} required />

                <select name = "Categoty"
                value = {formData.category} onChange = {handleChange}>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Rent">Rend</option>
                    <option value="Entertaiment">Entertaiment</option>
                    <option value="Health">health</option>
                    <option value="Education">Eductyation</option>
                    <option value="Other">Other</option>
                </select>

                <input type="date" name= "date" value = {formData.date}  onChange = {handleChange}/>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <button type="submit">Add Expense</button>
            </form>

        </div>
    );
}

export default ExpenseForm;