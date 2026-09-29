

function ExpenseItem({expense, onDelete}){
    return(
        <div className="expense-item">
            <div>
                <h3>{expense.title}</h3>
                <p>
                    Category: {expense.category}
                </p>
                <p>
                    Date:{
                        new Date(expense.date).toLocaleDateString()
                    }
                </p>
                {expense.description && (
                    <p>
                        {expense.description}
                    </p>
                )}
            </div>
            <div>
                <h3>₹{expense.amount}</h3>
                <button
                onClick={()=>onDelete(expense._id)}>
                    Delete
                </button>
            </div>

        </div>
        
 );
};
export default ExpenseItem;