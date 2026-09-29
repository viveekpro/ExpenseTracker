import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import { getExpenses, deleteExpense } from "../services/expenseApi";


function Home() {
    const [expenses, setExpenses] = useState([]);
    const loadExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        loadExpenses();
    }, []);

    // const handleDelete = async (id) => {
    //     const confirmDelete = window.confirm(
    //         "Are you sure you want to delete this expense?"
    //     );
    //     if (!confirmDelete) {
    //         return;
    //     }
    //     try {
    //         await deleteExpense(id);
    //         loadExpenses();
    //     }
    //     catch (error) {
    //         console.error(error);
    //         alert("Failed to delete expense");
    //     }
    // };
    const totalExpense = expenses.reduce(
        (total, expense) => total + Number(expense.amount), 0
    );


    return (

        <div className="container">
            <h1>Expense Tracker</h1>
            <div className="summary">
                <h2>Total Expense: ₹ {totalExpense} </h2>
            </div>
            <ExpenseForm onExpenseAdded={loadExpenses} />
        </div>

    );
}

export default Home;