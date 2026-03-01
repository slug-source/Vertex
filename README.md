# Vertex

Vertex is a full-stack coding practice platform that allows users to solve programming problems, execute code, submit solutions for automated evaluation, and receive AI-based 

The system is designed with role-based access control, secure execution handling, and a structured problem management workflow.

---
## Project Overview

Vertex provides three main capabilities:
1. Problem Management
2. Code Execution & Judging
3. Submission Tracking

The platform separates responsibilities between frontend UI, backend APIs, and execution services.

---
## Core Features
1. Authentication & Roles
The system uses JWT-based authentication and supports three roles:
    * Guest
        *  View problems
        * code
    * User
        * Run code
        * Submit solutions
        * View submission history
        * Request AI review
    * Creator
        * Create new problems
        * Add visible and hidden test cases
        * Delete problems
- Role-based restrictions are enforced on both frontend and backend.

2. Problem System
Creators can define problems with:
    * Title
    * Problem statement
    * Constraints
    * Visible test cases
    * Hidden test cases
- Visible test cases are shown to users.
- Hidden test cases are used only during submission evaluation.
- Problems are stored in MongoDB and retrieved dynamically by the frontend.

3. Code Execution
    * Users can:
        * Select language (JavaScript, Python, C++)
        * Write code in an editor
        * Run with custom input

    * Execution flow:
        * Code is sent to backend
        * Backend writes code to a temporary file
        * Code is executed using controlled child processes
        * Output is captured and returned

4. Submission System
    * When a user submits:
        * Code is executed against hidden test cases
        * Output is compared with expected output
        * Verdict is generated:
            * Accepted
            * Failed
        * Passed / Total test case count is calculated
        * Submission is stored in database
        * Users can view all their submissions.
(Current version does not include individual submission detail view.)

5. AI Code Review
    * Users can request an AI review of their solution.
    * The backend sends user code to Google's Large Language Models (LLMs), the AI response is returned and displayed in the results panel.
    * This feature is restricted to authenticated users.
---
## Architecture
### Frontend
    * React
    * React Router
    * Tailwind CSS


#### Responsibilities:
    * UI rendering
    * Role-based rendering logic
    * Code editor state management
    * API communication

### Backend
    * Node.js
    * Express
    * MongoDB

#### Responsibilities:
    * Authentication & authorization
    * CRUD operations
    * Code execution handling
    * Submission evaluation
    * AI review integration
    * Child process spawning
    * Time limits
    * Error capture
    * Hidden test cases not exposed to users
    * Submission actions restricted to authenticated users
