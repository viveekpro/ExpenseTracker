
import ExpenseForm from "../components/ExpenseForm";


function Home(){

    return(

        <div className="container">
            <h1>Expense Tracker</h1>
            <div className="summary">
                <h2>Total Expense: </h2>
            </div>
            <ExpenseForm />
        </div>

    );
}

export default Home;