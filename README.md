# **BE Developer Take-home Assignment**

## **Task \- Balance Module Challenge**

## Note

* AI is **not** allowed.  
* The project does not need to be fully runnable. We will focus on reviewing the correctness of the logic and design, rather than execution details.

## To do

1. Initialize a new Nest.js project, using Prisma to connect to the RMDB.  
2. Create a Balance module.  
3. In BalanceService, create a function to issue transactions.  
   1. Ensure the function is concurrency-safe.  
   2. Support an option called checkBalance. if it’s true, negative balances are not allowed.  
   3. Support multiple transactions to different users in a single call.  
   4. Every transaction should have a column called endingBalance to record the balance after this transaction.  
4. Provide a RESTful API to issue transactions in BalanceController.  
   1. The request body should include a list of transactions, each containing userId and amount (the amount can be positive or negative).  
5. Provide a RESTful API to get the balance of a specified user in BalanceController.

### Think about

* Is your code efficient enough?  
* Is your code readable enough?

### Submission

After completion, please upload your code to GitHub and send the repository URL to your contact person.
