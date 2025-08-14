const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const Question = require("./models/Question");

// const sampleQuestions = [
//   {
//     questionText: "Which language is used to style web pages?",
//     options: ["HTML", "CSS", "JavaScript", "Python"],
//     correctAnswer: "CSS",
//     topic: "web"
//   },
//   {
//     questionText: "Which company developed React?",
//     options: ["Google", "Facebook", "Microsoft", "Apple"],
//     correctAnswer: "Facebook",
//     topic: "react"
//   },
//   {
//     questionText: "What does JSON stand for?",
//     options: ["JavaScript Object Notation", "Java Style Object Notation", "JavaScript Only Notation", "None"],
//     correctAnswer: "JavaScript Object Notation",
//     topic: "data"
//   },
//   {
//     questionText: "Which of these is a NoSQL database?",
//     options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
//     correctAnswer: "MongoDB",
//     topic: "databases"
//   },
//   {
//     questionText: "Which tag is used for a paragraph in HTML?",
//     options: ["<p>", "<div>", "<span>", "<h1>"],
//     correctAnswer: "<p>",
//     topic: "html"
//   }
// ];

const sampleQuestions = [
  {
    questionText: "What does the 'DOM' stand for in web development?",
    options: ["Document Object Model", "Data Object Model", "Display Object Management", "Digital Output Module"],
    correctAnswer: "Document Object Model",
    topic: "web"
  },
  {
    questionText: "Which of these is not a JavaScript framework?",
    options: ["React", "Angular", "Django", "Vue"],
    correctAnswer: "Django",
    topic: "javascript"
  },
  {
    questionText: "What is the correct file extension for Python files?",
    options: [".js", ".py", ".pt", ".python"],
    correctAnswer: ".py",
    topic: "python"
  },
  {
    questionText: "Which HTTP status code means 'Not Found'?",
    options: ["200", "404", "500", "302"],
    correctAnswer: "404",
    topic: "web"
  },
  {
    questionText: "What is the main purpose of CSS?",
    options: ["To structure web content", "To add interactivity", "To style web pages", "To store data"],
    correctAnswer: "To style web pages",
    topic: "css"
  },
  {
    questionText: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correctAnswer: "All of the above",
    topic: "javascript"
  },
  {
    questionText: "What does API stand for?",
    options: ["Application Programming Interface", "Automated Programming Interface", "Application Process Integration", "Automated Process Integration"],
    correctAnswer: "Application Programming Interface",
    topic: "general"
  },
  {
    questionText: "Which data structure uses FIFO (First In First Out) principle?",
    options: ["Stack", "Queue", "Array", "Tree"],
    correctAnswer: "Queue",
    topic: "data-structures"
  },
  {
    questionText: "Which command is used to install packages in Node.js?",
    options: ["node install", "npm install", "package get", "node get"],
    correctAnswer: "npm install",
    topic: "node"
  },
  {
    questionText: "What is the output of 'console.log(typeof null)' in JavaScript?",
    options: ["null", "undefined", "object", "string"],
    correctAnswer: "object",
    topic: "javascript"
  },
  {
    questionText: "Which HTML tag is used to link a JavaScript file?",
    options: ["<js>", "<script>", "<javascript>", "<link>"],
    correctAnswer: "<script>",
    topic: "html"
  },
  {
    questionText: "What is the default port number for HTTP?",
    options: ["80", "443", "8080", "21"],
    correctAnswer: "80",
    topic: "web"
  },
  {
    questionText: "Which of these is a valid way to create an array in JavaScript?",
    options: ["let arr = []", "let arr = {}", "let arr = ()", "let arr = <>"],
    correctAnswer: "let arr = []",
    topic: "javascript"
  },
  {
    questionText: "What is Git?",
    options: ["A programming language", "A version control system", "A text editor", "A database system"],
    correctAnswer: "A version control system",
    topic: "git"
  },
  {
    questionText: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/*", "#", "--"],
    correctAnswer: "//",
    topic: "javascript"
  },
  {
    questionText: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"],
    correctAnswer: "Structured Query Language",
    topic: "sql"
  },
  {
    questionText: "Which method converts a JSON string to a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
    correctAnswer: "JSON.parse()",
    topic: "javascript"
  },
  {
    questionText: "What is the purpose of the 'alt' attribute in HTML images?",
    options: ["To provide alternative text", "To align the image", "To add animation", "To specify the image source"],
    correctAnswer: "To provide alternative text",
    topic: "html"
  },
  {
    questionText: "Which CSS property is used to change the text color?",
    options: ["text-color", "font-color", "color", "text-style"],
    correctAnswer: "color",
    topic: "css"
  },
  {
    questionText: "What is the correct way to write a 'for' loop in Python?",
    options: ["for i in range(5):", "for (i=0; i<5; i++)", "for i from 1 to 5", "loop i in 5"],
    correctAnswer: "for i in range(5):",
    topic: "python"
  },
  {
    questionText: "Which operator is used for exponentiation in JavaScript?",
    options: ["^", "**", "*^", "^^"],
    correctAnswer: "**",
    topic: "javascript"
  },
  {
    questionText: "What is the correct syntax for referring to an external CSS file?",
    options: ["<style src='style.css'>", "<link rel='stylesheet' href='style.css'>", "<css>style.css</css>", "<stylesheet>style.css</stylesheet>"],
    correctAnswer: "<link rel='stylesheet' href='style.css'>",
    topic: "css"
  },
  {
    questionText: "Which of these is not a valid JavaScript variable name?",
    options: ["_myVar", "myVar", "2myVar", "$myVar"],
    correctAnswer: "2myVar",
    topic: "javascript"
  },
  {
    questionText: "What does 'NaN' stand for in JavaScript?",
    options: ["Not a Node", "Not a Number", "New a Number", "No assigned Number"],
    correctAnswer: "Not a Number",
    topic: "javascript"
  },
  {
    questionText: "Which HTML tag is used to define a table row?",
    options: ["<td>", "<tr>", "<th>", "<table-row>"],
    correctAnswer: "<tr>",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'z-index' CSS property?",
    options: ["To control element sizing", "To manage stacking order", "To set animation duration", "To create 3D effects"],
    correctAnswer: "To manage stacking order",
    topic: "css"
  },
  {
    questionText: "Which method adds a new element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
    topic: "javascript"
  },
  {
    questionText: "What is the correct way to create a function in JavaScript?",
    options: ["function myFunc()", "func myFunc()", "def myFunc()", "create myFunc()"],
    correctAnswer: "function myFunc()",
    topic: "javascript"
  },
  {
    questionText: "Which of these is a front-end framework?",
    options: ["Django", "Flask", "Laravel", "React"],
    correctAnswer: "React",
    topic: "frameworks"
  },
  {
    questionText: "What does 'CRUD' stand for in database operations?",
    options: ["Create, Read, Update, Delete", "Copy, Read, Update, Delete", "Create, Retrieve, Update, Destroy", "Copy, Retrieve, Update, Destroy"],
    correctAnswer: "Create, Read, Update, Delete",
    topic: "databases"
  },
  {
    questionText: "Which of these is not a primitive data type in JavaScript?",
    options: ["string", "number", "object", "boolean"],
    correctAnswer: "object",
    topic: "javascript"
  },
  {
    questionText: "What is the purpose of the 'viewport' meta tag in HTML?",
    options: ["To control page dimensions on mobile", "To add a view counter", "To create a visual frame", "To enable 3D viewing"],
    correctAnswer: "To control page dimensions on mobile",
    topic: "html"
  },
  {
    questionText: "Which CSS selector targets elements with a specific class?",
    options: ["#id", ".class", "*", "element"],
    correctAnswer: ".class",
    topic: "css"
  },
  {
    questionText: "What is the output of '3' + 2 in JavaScript?",
    options: ["5", "32", "NaN", "Error"],
    correctAnswer: "32",
    topic: "javascript"
  },
  {
    questionText: "Which HTML5 tag is used for drawing graphics?",
    options: ["<svg>", "<canvas>", "<draw>", "<graphic>"],
    correctAnswer: "<canvas>",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'this' keyword in JavaScript?",
    options: ["Refers to the current object", "Refers to the parent object", "Refers to the global object", "Creates a new object"],
    correctAnswer: "Refers to the current object",
    topic: "javascript"
  },
  {
    questionText: "Which method is used to handle clicks in React?",
    options: ["onClick", "onChange", "onSubmit", "onHover"],
    correctAnswer: "onClick",
    topic: "react"
  },
  {
    questionText: "What is the purpose of media queries in CSS?",
    options: ["To apply different styles based on device characteristics", "To query media files", "To create animations", "To optimize images"],
    correctAnswer: "To apply different styles based on device characteristics",
    topic: "css"
  },
  {
    questionText: "Which of these is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: "MongoDB",
    topic: "databases"
  },
  {
    questionText: "What is the purpose of the 'async' keyword in JavaScript?",
    options: ["To create synchronous functions", "To indicate asynchronous functions", "To add animation", "To declare static methods"],
    correctAnswer: "To indicate asynchronous functions",
    topic: "javascript"
  },
  {
    questionText: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyperlink>"],
    correctAnswer: "<a>",
    topic: "html"
  },
  {
    questionText: "What is the correct way to check if a variable is an array in JavaScript?",
    options: ["typeof arr === 'array'", "arr.isArray()", "Array.isArray(arr)", "arr.type() === 'array'"],
    correctAnswer: "Array.isArray(arr)",
    topic: "javascript"
  },
  {
    questionText: "Which of these is a CSS preprocessor?",
    options: ["SASS", "TypeScript", "Babel", "Webpack"],
    correctAnswer: "SASS",
    topic: "css"
  },
  {
    questionText: "What is the purpose of the 'localStorage' object in JavaScript?",
    options: ["To store data temporarily", "To store data persistently in the browser", "To access server storage", "To cache images"],
    correctAnswer: "To store data persistently in the browser",
    topic: "javascript"
  },
  {
    questionText: "Which HTML tag is used to define important text?",
    options: ["<important>", "<b>", "<strong>", "<i>"],
    correctAnswer: "<strong>",
    topic: "html"
  },
  {
    questionText: "What does 'CDN' stand for in web development?",
    options: ["Content Delivery Network", "Code Distribution Node", "Central Data Network", "Cascading Design Node"],
    correctAnswer: "Content Delivery Network",
    topic: "web"
  },
  {
    questionText: "Which method returns the first element that matches a CSS selector?",
    options: ["document.querySelector()", "document.getElementById()", "document.getElementsByClassName()", "document.find()"],
    correctAnswer: "document.querySelector()",
    topic: "javascript"
  },
  {
    questionText: "What is the purpose of the 'flexbox' layout in CSS?",
    options: ["To create flexible one-dimensional layouts", "To add 3D effects", "To create fixed layouts", "To animate elements"],
    correctAnswer: "To create flexible one-dimensional layouts",
    topic: "css"
  },
  {
    questionText: "Which of these is not a JavaScript framework or library?",
    options: ["React", "Vue", "Angular", "Django"],
    correctAnswer: "Django",
    topic: "javascript"
  },
  {
    questionText: "What is the purpose of the 'use strict' directive in JavaScript?",
    options: ["To enable strict mode", "To disable certain features", "To improve performance", "To enforce type checking"],
    correctAnswer: "To enable strict mode",
    topic: "javascript"
  },
    {
    questionText: "Which HTML tag is used to embed JavaScript code directly in an HTML file?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correctAnswer: "<script>",
    topic: "html"
  },
  {
    questionText: "What does the '=== operator' do in JavaScript?",
    options: ["Performs type conversion and comparison", "Performs strict equality comparison", "Assigns a value", "Checks for inequality"],
    correctAnswer: "Performs strict equality comparison",
    topic: "javascript"
  },
  {
    questionText: "Which CSS property controls the space between elements?",
    options: ["spacing", "margin", "gap", "padding"],
    correctAnswer: "margin",
    topic: "css"
  },
  {
    questionText: "What is the correct syntax for an arrow function in JavaScript?",
    options: ["function() => {}", "() => {}", "() -> {}", "=> {}"],
    correctAnswer: "() => {}",
    topic: "javascript"
  },
  {
    questionText: "Which method converts a JavaScript object to a JSON string?",
    options: ["JSON.parse()", "JSON.stringify()", "object.toJSON()", "JSON.encode()"],
    correctAnswer: "JSON.stringify()",
    topic: "javascript"
  },
  {
    questionText: "What is the purpose of the 'alt' attribute in an HTML <img> tag?",
    options: ["Alternative text for screen readers", "Alignment of the image", "Alternate image source", "Animation length"],
    correctAnswer: "Alternative text for screen readers",
    topic: "html"
  },
  {
    questionText: "Which of these is NOT a JavaScript data type?",
    options: ["string", "number", "character", "boolean"],
    correctAnswer: "character",
    topic: "javascript"
  },
  {
    questionText: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Syntax"],
    correctAnswer: "Cascading Style Sheets",
    topic: "css"
  },
  {
    questionText: "Which HTML tag is used to create a numbered list?",
    options: ["<ul>", "<li>", "<ol>", "<dl>"],
    correctAnswer: "<ol>",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'typeof' operator in JavaScript?",
    options: ["To check variable type", "To create new types", "To compare types", "To convert types"],
    correctAnswer: "To check variable type",
    topic: "javascript"
  },
  {
    questionText: "Which CSS property changes the font of an element?",
    options: ["text-font", "font-family", "font-style", "text-family"],
    correctAnswer: "font-family",
    topic: "css"
  },
  {
    questionText: "What is the correct way to comment out multiple lines in JavaScript?",
    options: ["/* Comment */", "// Comment", "<!-- Comment -->", "# Comment"],
    correctAnswer: "/* Comment */",
    topic: "javascript"
  },
  {
    questionText: "Which HTML element is used to display a horizontal rule?",
    options: ["<line>", "<hr>", "<br>", "<rule>"],
    correctAnswer: "<hr>",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'return' statement in a function?",
    options: ["To exit the function", "To return a value", "To print output", "Both A and B"],
    correctAnswer: "Both A and B",
    topic: "programming"
  },
  {
    questionText: "Which method removes the last element from an array in JavaScript?",
    options: ["shift()", "pop()", "remove()", "delete()"],
    correctAnswer: "pop()",
    topic: "javascript"
  },
  {
    questionText: "What does the 'box model' in CSS consist of?",
    options: ["margin, border, padding, content", "width, height, depth, color", "top, right, bottom, left", "header, body, footer, sidebar"],
    correctAnswer: "margin, border, padding, content",
    topic: "css"
  },
  {
    questionText: "Which symbol is used for the 'AND' logical operator in JavaScript?",
    options: ["&&", "||", "!", "&"],
    correctAnswer: "&&",
    topic: "javascript"
  },
  {
    questionText: "What is the correct HTML for creating a checkbox?",
    options: ["<input type='check'>", "<checkbox>", "<input type='checkbox'>", "<check>"],
    correctAnswer: "<input type='checkbox'>",
    topic: "html"
  },
  {
    questionText: "Which CSS property is used to make text bold?",
    options: ["text-weight", "font-bold", "font-weight", "text-style"],
    correctAnswer: "font-weight",
    topic: "css"
  },
  {
    questionText: "What does the '++' operator do in JavaScript?",
    options: ["Adds 1 to a variable", "Concatenates strings", "Creates a new object", "Compares two values"],
    correctAnswer: "Adds 1 to a variable",
    topic: "javascript"
  },
  {
    questionText: "Which HTML tag is used to define a table header cell?",
    options: ["<td>", "<th>", "<thead>", "<header>"],
    correctAnswer: "<th>",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'break' statement in JavaScript?",
    options: ["To exit a loop or switch", "To pause execution", "To create a line break", "To stop all JavaScript"],
    correctAnswer: "To exit a loop or switch",
    topic: "javascript"
  },
    {
    questionText: "Which data structure follows the LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack",
    topic: "data-structures"
  },
  {
    questionText: "What is the time complexity of binary search on a sorted array?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    topic: "algorithms"
  },
  {
    questionText: "Which algorithm uses the 'divide and conquer' approach?",
    options: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"],
    correctAnswer: "Merge Sort",
    topic: "algorithms"
  },
  {
    questionText: "In a binary tree, what is a node with no children called?",
    options: ["Root node", "Leaf node", "Internal node", "Parent node"],
    correctAnswer: "Leaf node",
    topic: "data-structures"
  },
  {
    questionText: "Which data structure is best for implementing a priority queue?",
    options: ["Array", "Linked List", "Heap", "Stack"],
    correctAnswer: "Heap",
    topic: "data-structures"
  },
  {
    questionText: "What is the worst-case time complexity of quicksort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: "O(n²)",
    topic: "algorithms"
  },
  {
    questionText: "Which traversal visits nodes in the order: left, root, right?",
    options: ["Pre-order", "In-order", "Post-order", "Level-order"],
    correctAnswer: "In-order",
    topic: "data-structures"
  },
  {
    questionText: "What is the space complexity of a recursive Fibonacci algorithm without memoization?",
    options: ["O(1)", "O(n)", "O(log n)", "O(2ⁿ)"],
    correctAnswer: "O(n)",
    topic: "algorithms"
  },
  {
    questionText: "Which data structure uses hashing to store elements?",
    options: ["Binary Search Tree", "Heap", "Hash Table", "Linked List"],
    correctAnswer: "Hash Table",
    topic: "data-structures"
  },
  {
    questionText: "What is the time complexity of inserting at the end of a dynamic array?",
    options: ["O(1) amortized", "O(n)", "O(log n)", "O(1) worst-case"],
    correctAnswer: "O(1) amortized",
    topic: "data-structures"
  },
  {
    questionText: "Which algorithm finds the shortest path in an unweighted graph?",
    options: ["Dijkstra's", "BFS", "DFS", "A*"],
    correctAnswer: "BFS",
    topic: "algorithms"
  },
  {
    questionText: "What is the height of a complete binary tree with n nodes?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    topic: "data-structures"
  },
  {
    questionText: "Which sorting algorithm has O(n) time complexity in its best case?",
    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Insertion Sort"],
    correctAnswer: "Insertion Sort",
    topic: "algorithms"
  },
  {
    questionText: "In graph theory, what is a path that visits every vertex exactly once called?",
    options: ["Eulerian path", "Hamiltonian path", "Cycle", "Spanning tree"],
    correctAnswer: "Hamiltonian path",
    topic: "graph-theory"
  },
  {
    questionText: "Which data structure is typically used for implementing BFS?",
    options: ["Stack", "Priority Queue", "Queue", "Heap"],
    correctAnswer: "Queue",
    topic: "data-structures"
  },
  {
    questionText: "What is the time complexity of searching in a hash table with chaining?",
    options: ["O(1) average", "O(n) worst-case", "O(log n)", "Both A and B"],
    correctAnswer: "Both A and B",
    topic: "data-structures"
  },
  {
    questionText: "Which algorithm is used to find the minimum spanning tree?",
    options: ["Dijkstra's", "Kruskal's", "Floyd-Warshall", "Bellman-Ford"],
    correctAnswer: "Kruskal's",
    topic: "algorithms"
  },
  {
    questionText: "What is the maximum number of nodes in a binary tree of height h?",
    options: ["2^h", "2^h - 1", "h^2", "2^(h+1) - 1"],
    correctAnswer: "2^(h+1) - 1",
    topic: "data-structures"
  },
  {
    questionText: "Which searching algorithm requires the data to be sorted?",
    options: ["Linear Search", "Binary Search", "Depth-First Search", "Breadth-First Search"],
    correctAnswer: "Binary Search",
    topic: "algorithms"
  },
  {
    questionText: "What is the time complexity of the Floyd-Warshall algorithm?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
    correctAnswer: "O(n³)",
    topic: "algorithms"
  },
  {
    questionText: "Which of these is NOT a primitive data type in Java?",
    options: ["int", "boolean", "String", "double"],
    correctAnswer: "String",
    topic: "data-types"
  },
  {
    questionText: "What is the default value of an int variable in Java?",
    options: ["0", "null", "1", "undefined"],
    correctAnswer: "0",
    topic: "variables"
  },
  {
    questionText: "Which keyword is used to create an instance of a class in Java?",
    options: ["new", "this", "class", "instance"],
    correctAnswer: "new",
    topic: "oop"
  },
  {
    questionText: "What is the parent class of all Java classes?",
    options: ["Object", "Parent", "Super", "Main"],
    correctAnswer: "Object",
    topic: "oop"
  },
  {
    questionText: "Which method must be implemented by all threads in Java?",
    options: ["start()", "run()", "execute()", "main()"],
    correctAnswer: "run()",
    topic: "multithreading"
  },
  {
    questionText: "What does the 'final' keyword indicate when applied to a variable?",
    options: ["The variable is constant", "The variable is static", "The variable is public", "The variable is volatile"],
    correctAnswer: "The variable is constant",
    topic: "keywords"
  },
  {
    questionText: "Which collection implements a dynamic array in Java?",
    options: ["LinkedList", "HashSet", "ArrayList", "TreeMap"],
    correctAnswer: "ArrayList",
    topic: "collections"
  },
  // {
  //   questionText: "What is the output of 'System.out.println(5 +"5")'in Java?",
  //   options: ["10", "55", "5", "Error"],
  //   correctAnswer: "55",
  //   topic: "type-conversion"
  // },
    {
    questionText: "Which of these is NOT a fundamental OOP concept?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
    correctAnswer: "Compilation",
    topic: "OOP Basics"
  },
    {
    questionText: "Which of these is NOT a valid Python data type?",
    options: ["int", "str", "char", "float"],
    correctAnswer: "char",
    topic: "data-types"
  },
  {
    questionText: "What is the output of `print(3 * 'hi')` in Python?",
    options: ["hihihi", "3hi", "Error", "hi hi hi"],
    correctAnswer: "hihihi",
    topic: "operators"
  },
  {
    questionText: "Which keyword is used to define a function in Python?",
    options: ["def", "function", "func", "define"],
    correctAnswer: "def",
    topic: "functions"
  },
  {
    questionText: "How do you start a single-line comment in Python?",
    options: ["//", "#", "--", "/*"],
    correctAnswer: "#",
    topic: "syntax"
  },
  {
    questionText: "Which method is used to add an element to the end of a list?",
    options: [".push()", ".append()", ".insert()", ".add()"],
    correctAnswer: ".append()",
    topic: "lists"
  },
  {
    questionText: "What does the `range(3)` function generate?",
    options: ["[0, 1, 2]", "[1, 2, 3]", "[0, 1, 2, 3]", "(0, 1, 2)"],
    correctAnswer: "[0, 1, 2]",
    topic: "built-in-functions"
  },
  {
    questionText: "Which of these is used to create a dictionary?",
    options: ["{}", "[]", "()", "<>"],
    correctAnswer: "{}",
    topic: "dictionaries"
  },
  {
    questionText: "What is the output of `print(2 ** 3)`?",
    options: ["8", "6", "9", "23"],
    correctAnswer: "8",
    topic: "operators"
  },
  {
    questionText: "Which module is used for working with regular expressions?",
    options: ["regex", "re", "pyre", "pattern"],
    correctAnswer: "re",
    topic: "modules"
  },
  {
    questionText: "How do you open a file for reading in Python?",
    options: ["open('file.txt', 'r')", "open('file.txt', 'read')", "open('file.txt', 'w')", "open('file.txt')"],
    correctAnswer: "open('file.txt', 'r')",
    topic: "file-handling"
  },
  {
    questionText: "What is the correct way to create a virtual environment?",
    options: ["python -m venv env", "python create env", "python virtual env", "python -m virtual env"],
    correctAnswer: "python -m venv env",
    topic: "environment"
  },
  {
    questionText: "Which of these is immutable in Python?",
    options: ["list", "dictionary", "tuple", "set"],
    correctAnswer: "tuple",
    topic: "data-types"
  },
  {
    questionText: "What does the `strip()` method do?",
    options: ["Splits a string", "Removes whitespace", "Converts to lowercase", "Replaces characters"],
    correctAnswer: "Removes whitespace",
    topic: "strings"
  },
  {
    questionText: "Which operator is used for floor division?",
    options: ["/", "//", "%", "|"],
    correctAnswer: "//",
    topic: "operators"
  },
  {
    questionText: "How do you handle exceptions in Python?",
    options: ["try-catch", "try-except", "try-handle", "try-rescue"],
    correctAnswer: "try-except",
    topic: "exceptions"
  },
  {
    questionText: "What is the output of `print('Hello'[::-1])`?",
    options: ["Hello", "olleH", "Error", "H"],
    correctAnswer: "olleH",
    topic: "strings"
  },
  {
    questionText: "Which method would you use to get all dictionary keys?",
    options: [".keys()", ".items()", ".values()", ".get()"],
    correctAnswer: ".keys()",
    topic: "dictionaries"
  },
  {
    questionText: "What does `__init__` represent in a class?",
    options: ["Destructor", "Constructor", "Iterator", "Decorator"],
    correctAnswer: "Constructor",
    topic: "OOP"
  },
  {
    questionText: "Which of these is NOT a Python built-in function?",
    options: ["print()", "input()", "console.log()", "len()"],
    correctAnswer: "console.log()",
    topic: "built-in-functions"
  },
  {
    questionText: "What does list comprehension `[x**2 for x in range(3)]` produce?",
    options: ["[0, 1, 4]", "[1, 4, 9]", "[0, 1, 2]", "[2, 4, 6]"],
    correctAnswer: "[0, 1, 4]",
    topic: "list-comprehension"
  },
    {
    questionText: "What is the correct command to create a new React app?",
    options: [
      "npm create-react-app",
      "npx create-react-app",
      "npm install react-app",
      "npx start-react-app"
    ],
    correctAnswer: "npx create-react-app",
    topic: "Setup"
  },
  {
    questionText: "Which hook is used to manage state in functional components?",
    options: [
      "useEffect",
      "useState",
      "useContext",
      "useReducer"
    ],
    correctAnswer: "useState",
    topic: "Hooks"
  },
  {
    questionText: "What is JSX?",
    options: [
      "A JavaScript library",
      "A syntax extension for JavaScript",
      "A templating language",
      "A state management tool"
    ],
    correctAnswer: "A syntax extension for JavaScript",
    topic: "JSX"
  },
  {
    questionText: "How do you pass data from parent to child component?",
    options: [
      "Using state",
      "Using props",
      "Using refs",
      "Using context"
    ],
    correctAnswer: "Using props",
    topic: "Components"
  },
  {
    questionText: "Which method is called after a component is rendered for the first time?",
    options: [
      "componentDidUpdate",
      "componentWillUnmount",
      "componentDidMount",
      "shouldComponentUpdate"
    ],
    correctAnswer: "componentDidMount",
    topic: "Lifecycle"
  },
  {
    questionText: "What is the purpose of keys in React lists?",
    options: [
      "To improve performance",
      "To make lists searchable",
      "To add styling",
      "To trigger re-renders"
    ],
    correctAnswer: "To improve performance",
    topic: "Lists"
  },
  {
    questionText: "Which hook replaces componentDidMount in functional components?",
    options: [
      "useState",
      "useEffect with empty dependency array",
      "useMemo",
      "useCallback"
    ],
    correctAnswer: "useEffect with empty dependency array",
    topic: "Hooks"
  },
  {
    questionText: "What is the virtual DOM?",
    options: [
      "A lightweight copy of the real DOM",
      "A shadow DOM implementation",
      "A browser API",
      "A React component"
    ],
    correctAnswer: "A lightweight copy of the real DOM",
    topic: "Core Concepts"
  },
  {
    questionText: "How do you conditionally render components in React?",
    options: [
      "Using if-else statements in JSX",
      "Using ternary operators in JSX",
      "Using switch statements in JSX",
      "All of the above"
    ],
    correctAnswer: "All of the above",
    topic: "Rendering"
  },
  {
    questionText: "What is the purpose of React Router?",
    options: [
      "State management",
      "Component styling",
      "Navigation between views",
      "API calls"
    ],
    correctAnswer: "Navigation between views",
    topic: "Routing"
  },
  {
    questionText: "Which tool helps inspect React components?",
    options: [
      "React Developer Tools",
      "Redux DevTools",
      "Chrome Inspector",
      "VS Code Extension"
    ],
    correctAnswer: "React Developer Tools",
    topic: "Debugging"
  },
  {
    questionText: "What does the useReducer hook do?",
    options: [
      "Manages complex state logic",
      "Reduces component size",
      "Optimizes performance",
      "Handles side effects"
    ],
    correctAnswer: "Manages complex state logic",
    topic: "Hooks"
  },
  {
    questionText: "How do you update the state correctly in React?",
    options: [
      "Directly modifying this.state",
      "Using the setState method",
      "Using the useState hook setter function",
      "Both B and C"
    ],
    correctAnswer: "Both B and C",
    topic: "State Management"
  },
  {
    questionText: "What is the purpose of PropTypes?",
    options: [
      "To validate component props",
      "To type check JavaScript",
      "To document components",
      "To optimize rendering"
    ],
    correctAnswer: "To validate component props",
    topic: "Components"
  },
  {
    questionText: "Which hook is used for performance optimization?",
    options: [
      "useMemo",
      "useEffect",
      "useState",
      "useContext"
    ],
    correctAnswer: "useMemo",
    topic: "Performance"
  },
  {
    questionText: "What is Context API used for?",
    options: [
      "Global state management",
      "Component communication",
      "Avoiding prop drilling",
      "All of the above"
    ],
    correctAnswer: "All of the above",
    topic: "Context"
  },
  {
    questionText: "Which lifecycle method is used for cleanup?",
    options: [
      "componentWillUnmount",
      "componentDidUpdate",
      "componentWillUpdate",
      "getDerivedStateFromProps"
    ],
    correctAnswer: "componentWillUnmount",
    topic: "Lifecycle"
  },
  {
    questionText: "What are Higher-Order Components (HOCs)?",
    options: [
      "Components that render other components",
      "Functions that take a component and return a new component",
      "Wrapper components",
      "Parent components"
    ],
    correctAnswer: "Functions that take a component and return a new component",
    topic: "Advanced Patterns"
  },
  {
    questionText: "What is the purpose of React.Fragment?",
    options: [
      "To group elements without adding extra nodes",
      "To create portal components",
      "To improve performance",
      "To handle errors"
    ],
    correctAnswer: "To group elements without adding extra nodes",
    topic: "JSX"
  },
  {
    questionText: "Which tool is commonly used with React for state management?",
    options: [
      "Redux",
      "Axios",
      "Lodash",
      "Jest"
    ],
    correctAnswer: "Redux",
    topic: "State Management"
  },
    {
    questionText: "What is Node.js primarily used for?",
    options: [
      "Front-end development",
      "Back-end development",
      "Mobile app development",
      "Desktop app development"
    ],
    correctAnswer: "Back-end development",
    topic: "Introduction"
  },
  {
    questionText: "Which of these is NOT a core module in Node.js?",
    options: [
      "fs",
      "http",
      "path",
      "express"
    ],
    correctAnswer: "express",
    topic: "Core Modules"
  },
  {
    questionText: "What does the 'fs' module stand for?",
    options: [
      "File Stream",
      "File System",
      "File Service",
      "File Structure"
    ],
    correctAnswer: "File System",
    topic: "File System"
  },
  {
    questionText: "Which method is used to include external modules in Node.js?",
    options: [
      "import",
      "require",
      "include",
      "use"
    ],
    correctAnswer: "require",
    topic: "Modules"
  },
  {
    questionText: "What is the default port number for a Node.js HTTP server?",
    options: [
      "3000",
      "8080",
      "80",
      "No default port"
    ],
    correctAnswer: "No default port",
    topic: "HTTP"
  },
  {
    questionText: "Which global object holds information about the current module?",
    options: [
      "global",
      "process",
      "module",
      "window"
    ],
    correctAnswer: "module",
    topic: "Globals"
  },
  {
    questionText: "What is the purpose of the 'package.json' file?",
    options: [
      "To store application source code",
      "To store database credentials",
      "To store project metadata and dependencies",
      "To store server configuration"
    ],
    correctAnswer: "To store project metadata and dependencies",
    topic: "NPM"
  },
  {
    questionText: "Which method is used to read environment variables in Node.js?",
    options: [
      "process.env",
      "os.env",
      "global.env",
      "require('env')"
    ],
    correctAnswer: "process.env",
    topic: "Environment"
  },
  {
    questionText: "What does the 'require.main === module' check do?",
    options: [
      "Checks if the module is required",
      "Checks if the module is the main module",
      "Checks if the module has a main function",
      "Checks if the module is executable"
    ],
    correctAnswer: "Checks if the module is the main module",
    topic: "Modules"
  },
  {
    questionText: "Which method is used to create a directory in Node.js?",
    options: [
      "fs.createDir()",
      "fs.mkdir()",
      "fs.newDir()",
      "fs.makeDirectory()"
    ],
    correctAnswer: "fs.mkdir()",
    topic: "File System"
  },
  {
    questionText: "What is the purpose of the 'node_modules' folder?",
    options: [
      "To store Node.js core modules",
      "To store installed dependencies",
      "To store application modules",
      "To store configuration files"
    ],
    correctAnswer: "To store installed dependencies",
    topic: "NPM"
  },
  {
    questionText: "Which of these is NOT a valid stream type in Node.js?",
    options: [
      "Readable",
      "Writable",
      "Transform",
      "Executable"
    ],
    correctAnswer: "Executable",
    topic: "Streams"
  },
  {
    questionText: "What is the purpose of the 'Buffer' class in Node.js?",
    options: [
      "To handle binary data",
      "To cache HTTP responses",
      "To store environment variables",
      "To manage file paths"
    ],
    correctAnswer: "To handle binary data",
    topic: "Buffers"
  },
  {
    questionText: "Which command installs a package as a development dependency?",
    options: [
      "npm install --dev",
      "npm install --save-dev",
      "npm install --development",
      "npm install -D"
    ],
    correctAnswer: "npm install --save-dev",
    topic: "NPM"
  },
  {
    questionText: "What does the 'EventEmitter' class do?",
    options: [
      "Handles file events",
      "Provides HTTP event handling",
      "Handles and emits custom events",
      "Manages process events"
    ],
    correctAnswer: "Handles and emits custom events",
    topic: "Events"
  },
  {
    questionText: "Which method is used to parse incoming request bodies in Express.js?",
    options: [
      "app.parse()",
      "bodyParser.json()",
      "express.json()",
      "req.parseBody()"
    ],
    correctAnswer: "express.json()",
    topic: "Express"
  },
  {
    questionText: "What is the purpose of middleware in Express.js?",
    options: [
      "To connect to databases",
      "To handle requests and responses",
      "To serve static files",
      "To define routes"
    ],
    correctAnswer: "To handle requests and responses",
    topic: "Express"
  },
  {
    questionText: "Which database is commonly used with Node.js for its non-blocking nature?",
    options: [
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "SQLite"
    ],
    correctAnswer: "MongoDB",
    topic: "Databases"
  },
  {
    questionText: "What is the purpose of the 'cluster' module?",
    options: [
      "To manage database clusters",
      "To create child processes",
      "To enable multi-threading",
      "To load balance between servers"
    ],
    correctAnswer: "To create child processes",
    topic: "Cluster"
  },
  {
    questionText: "Which method is used to handle uncaught exceptions in Node.js?",
    options: [
      "process.on('uncaughtException')",
      "try-catch blocks",
      "global.errorHandler",
      "process.handleException()"
    ],
    correctAnswer: "process.on('uncaughtException')",
    topic: "Error Handling"
  },
    {
    questionText: "What is the full form of DBMS?",
    options: [
      "Data Backup Management System",
      "Database Management System",
      "Digital Base Management System",
      "Data Binary Management System"
    ],
    correctAnswer: "Database Management System",
    topic: "Introduction"
  },
  {
    questionText: "Which of these is NOT a type of database model?",
    options: [
      "Relational",
      "Hierarchical",
      "Network",
      "Linear"
    ],
    correctAnswer: "Linear",
    topic: "Database Models"
  },
  {
    questionText: "What is the primary purpose of a primary key?",
    options: [
      "To improve query performance",
      "To uniquely identify each record in a table",
      "To establish relationships between tables",
      "To sort data automatically"
    ],
    correctAnswer: "To uniquely identify each record in a table",
    topic: "Keys"
  },
  {
    questionText: "Which SQL command is used to retrieve data from a database?",
    options: [
      "GET",
      "SELECT",
      "RETRIEVE",
      "FETCH"
    ],
    correctAnswer: "SELECT",
    topic: "SQL"
  },
  {
    questionText: "What does ACID stand for in database transactions?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Consistency, Integrity, Durability",
      "Atomicity, Concurrency, Integrity, Durability",
      "Automation, Consistency, Isolation, Durability"
    ],
    correctAnswer: "Atomicity, Consistency, Isolation, Durability",
    topic: "Transactions"
  },
  {
    questionText: "Which normal form eliminates transitive dependencies?",
    options: [
      "1NF",
      "2NF",
      "3NF",
      "BCNF"
    ],
    correctAnswer: "3NF",
    topic: "Normalization"
  },
  {
    questionText: "What is the purpose of an index in a database?",
    options: [
      "To store backup data",
      "To improve search performance",
      "To enforce data integrity",
      "To establish relationships"
    ],
    correctAnswer: "To improve search performance",
    topic: "Performance"
  },
  {
    questionText: "Which join returns all records from both tables with NULL in missing matches?",
    options: [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN"
    ],
    correctAnswer: "FULL OUTER JOIN",
    topic: "SQL Joins"
  },
  {
    questionText: "What is a foreign key?",
    options: [
      "A key that uniquely identifies a record",
      "A key used for encryption",
      "A field that references the primary key of another table",
      "A key that is automatically generated"
    ],
    correctAnswer: "A field that references the primary key of another table",
    topic: "Keys"
  },
  {
    questionText: "Which SQL clause is used to filter groups?",
    options: [
      "WHERE",
      "HAVING",
      "FILTER",
      "GROUP BY"
    ],
    correctAnswer: "HAVING",
    topic: "SQL"
  },
  {
    questionText: "What is the purpose of normalization?",
    options: [
      "To improve database performance",
      "To reduce data redundancy",
      "To increase storage space",
      "To encrypt sensitive data"
    ],
    correctAnswer: "To reduce data redundancy",
    topic: "Normalization"
  },
  {
    questionText: "Which of these is NOT a type of NoSQL database?",
    options: [
      "Document",
      "Key-Value",
      "Column-family",
      "Table-based"
    ],
    correctAnswer: "Table-based",
    topic: "NoSQL"
  },
  {
    questionText: "What does the GROUP BY clause do in SQL?",
    options: [
      "Groups rows that have the same values",
      "Filters groups of rows",
      "Sorts the result set",
      "Combines tables"
    ],
    correctAnswer: "Groups rows that have the same values",
    topic: "SQL"
  },
  {
    questionText: "Which constraint ensures all values in a column are unique?",
    options: [
      "PRIMARY KEY",
      "FOREIGN KEY",
      "UNIQUE",
      "CHECK"
    ],
    correctAnswer: "UNIQUE",
    topic: "Constraints"
  },
  {
    questionText: "What is a transaction in DBMS?",
    options: [
      "A single SQL statement",
      "A sequence of operations performed as a single unit",
      "A database backup operation",
      "A table creation operation"
    ],
    correctAnswer: "A sequence of operations performed as a single unit",
    topic: "Transactions"
  },
  {
    questionText: "Which SQL command is used to modify existing data?",
    options: [
      "CHANGE",
      "MODIFY",
      "UPDATE",
      "ALTER"
    ],
    correctAnswer: "UPDATE",
    topic: "SQL"
  },
  {
    questionText: "What is the purpose of a view in a database?",
    options: [
      "To store physical data",
      "To provide a virtual table based on a query",
      "To improve backup performance",
      "To encrypt sensitive data"
    ],
    correctAnswer: "To provide a virtual table based on a query",
    topic: "Views"
  },
  {
    questionText: "Which normal form requires that all attributes depend on the entire primary key?",
    options: [
      "1NF",
      "2NF",
      "3NF",
      "BCNF"
    ],
    correctAnswer: "2NF",
    topic: "Normalization"
  },
  {
    questionText: "What is the difference between DELETE and TRUNCATE commands?",
    options: [
      "DELETE removes specific rows, TRUNCATE removes all rows",
      "DELETE can be rolled back, TRUNCATE cannot",
      "DELETE is DML, TRUNCATE is DDL",
      "All of the above"
    ],
    correctAnswer: "All of the above",
    topic: "SQL"
  },
  {
    questionText: "Which type of database is optimized for handling relationships between entities?",
    options: [
      "Relational",
      "Document",
      "Key-Value",
      "Graph"
    ],
    correctAnswer: "Graph",
    topic: "Database Models"
  },
    {
    questionText: "What is the main purpose of an operating system?",
    options: [
      "To manage hardware resources",
      "To provide a user interface",
      "To execute and provide services for applications",
      "All of the above"
    ],
    correctAnswer: "All of the above",
    topic: "Introduction"
  },
  {
    questionText: "Which of these is NOT an operating system?",
    options: [
      "Linux",
      "Windows",
      "macOS",
      "Apache"
    ],
    correctAnswer: "Apache",
    topic: "Types"
  },
  {
    questionText: "What is a process in an operating system?",
    options: [
      "A program in execution",
      "A file stored on disk",
      "A hardware component",
      "A user interface element"
    ],
    correctAnswer: "A program in execution",
    topic: "Processes"
  },
  {
    questionText: "Which scheduling algorithm allocates CPU to the process with the shortest burst time first?",
    options: [
      "FCFS (First Come First Serve)",
      "Round Robin",
      "Shortest Job First (SJF)",
      "Priority Scheduling"
    ],
    correctAnswer: "Shortest Job First (SJF)",
    topic: "Scheduling"
  },
  {
    questionText: "What is virtual memory?",
    options: [
      "Memory that exists only conceptually",
      "A memory management technique that uses disk space as extension of RAM",
      "Memory used by virtual machines",
      "A type of cache memory"
    ],
    correctAnswer: "A memory management technique that uses disk space as extension of RAM",
    topic: "Memory Management"
  },
  {
    questionText: "What is the purpose of the fork() system call?",
    options: [
      "To create a new process",
      "To terminate a process",
      "To allocate memory",
      "To create a new file"
    ],
    correctAnswer: "To create a new process",
    topic: "System Calls"
  },
  {
    questionText: "Which of these is a CPU scheduling algorithm?",
    options: [
      "Banker's Algorithm",
      "Round Robin",
      "SCAN",
      "LRU"
    ],
    correctAnswer: "Round Robin",
    topic: "Scheduling"
  },
  {
    questionText: "What is a deadlock?",
    options: [
      "A process that runs indefinitely",
      "A situation where a set of processes are blocked waiting for each other",
      "A memory allocation error",
      "A type of interrupt"
    ],
    correctAnswer: "A situation where a set of processes are blocked waiting for each other",
    topic: "Deadlocks"
  },
  {
    questionText: "What is the main function of a file system?",
    options: [
      "To manage CPU scheduling",
      "To organize and store files on storage devices",
      "To allocate memory to processes",
      "To handle network communications"
    ],
    correctAnswer: "To organize and store files on storage devices",
    topic: "File Systems"
  },
  {
    questionText: "What is thrashing in operating systems?",
    options: [
      "A high-speed memory access technique",
      "Excessive swapping of pages between memory and disk",
      "A type of scheduling algorithm",
      "A security vulnerability"
    ],
    correctAnswer: "Excessive swapping of pages between memory and disk",
    topic: "Memory Management"
  },
  {
    questionText: "Which of these is NOT a necessary condition for deadlock?",
    options: [
      "Mutual Exclusion",
      "Hold and Wait",
      "No Preemption",
      "Priority Scheduling"
    ],
    correctAnswer: "Priority Scheduling",
    topic: "Deadlocks"
  },
  {
    questionText: "What is the purpose of the 'ls' command in Unix/Linux?",
    options: [
      "To list directory contents",
      "To load a program",
      "To list system processes",
      "To lock the screen"
    ],
    correctAnswer: "To list directory contents",
    topic: "Commands"
  },
  {
    questionText: "Which memory allocation scheme suffers from external fragmentation?",
    options: [
      "Paging",
      "Segmentation",
      "Virtual Memory",
      "Cache Memory"
    ],
    correctAnswer: "Segmentation",
    topic: "Memory Management"
  },
  {
    questionText: "What is an interrupt in an operating system?",
    options: [
      "A signal sent to the CPU to request attention",
      "A type of process",
      "A memory management technique",
      "A file system operation"
    ],
    correctAnswer: "A signal sent to the CPU to request attention",
    topic: "Interrupts"
  },
  {
    questionText: "Which page replacement algorithm replaces the page that hasn't been used for the longest time?",
    options: [
      "FIFO",
      "LRU",
      "Optimal",
      "Random"
    ],
    correctAnswer: "LRU",
    topic: "Memory Management"
  },
  {
    questionText: "What is the role of the shell in an operating system?",
    options: [
      "Memory management",
      "Command interpreter",
      "Process scheduler",
      "File storage"
    ],
    correctAnswer: "Command interpreter",
    topic: "Shell"
  },
  {
    questionText: "What is a race condition?",
    options: [
      "A situation where processes compete to access shared resources",
      "A type of CPU scheduling algorithm",
      "A memory allocation error",
      "A file system corruption"
    ],
    correctAnswer: "A situation where processes compete to access shared resources",
    topic: "Process Synchronization"
  },
  {
    questionText: "Which of these is a disk scheduling algorithm?",
    options: [
      "Shortest Job First",
      "Round Robin",
      "SCAN (Elevator Algorithm)",
      "Priority Scheduling"
    ],
    correctAnswer: "SCAN (Elevator Algorithm)",
    topic: "Scheduling"
  },
  {
    questionText: "What is the purpose of semaphores in operating systems?",
    options: [
      "Memory allocation",
      "Process synchronization",
      "File management",
      "User authentication"
    ],
    correctAnswer: "Process synchronization",
    topic: "Process Synchronization"
  },
  {
    questionText: "What is the difference between a process and a thread?",
    options: [
      "Processes share memory, threads don't",
      "Threads are lighter weight than processes",
      "Only processes can be scheduled",
      "Threads have their own address space"
    ],
    correctAnswer: "Threads are lighter weight than processes",
    topic: "Processes/Threads"
  },
    {
    questionText: "What is the purpose of the OSI model?",
    options: [
      "To standardize network communication",
      "To increase internet speeds",
      "To encrypt network traffic",
      "To reduce hardware costs"
    ],
    correctAnswer: "To standardize network communication",
    topic: "Network Models"
  },
  {
    questionText: "Which layer of the OSI model is responsible for routing?",
    options: [
      "Physical",
      "Data Link",
      "Network",
      "Transport"
    ],
    correctAnswer: "Network",
    topic: "OSI Layers"
  },
  {
    questionText: "What does TCP stand for?",
    options: [
      "Transmission Control Protocol",
      "Transfer Connection Protocol",
      "Telecommunication Control Process",
      "Traffic Control Protocol"
    ],
    correctAnswer: "Transmission Control Protocol",
    topic: "Transport Layer"
  },
  {
    questionText: "Which protocol is used to resolve IP addresses to MAC addresses?",
    options: [
      "DNS",
      "DHCP",
      "ARP",
      "RARP"
    ],
    correctAnswer: "ARP",
    topic: "Network Layer"
  },
  {
    questionText: "What is the default port number for HTTP?",
    options: [
      "80",
      "443",
      "21",
      "25"
    ],
    correctAnswer: "80",
    topic: "Application Layer"
  },
  {
    questionText: "Which network device operates at the Data Link layer?",
    options: [
      "Router",
      "Switch",
      "Hub",
      "Repeater"
    ],
    correctAnswer: "Switch",
    topic: "Network Devices"
  },
  {
    questionText: "What is the main difference between TCP and UDP?",
    options: [
      "TCP is faster than UDP",
      "TCP is connection-oriented while UDP is connectionless",
      "UDP provides error correction while TCP doesn't",
      "TCP works only on wired networks"
    ],
    correctAnswer: "TCP is connection-oriented while UDP is connectionless",
    topic: "Transport Layer"
  },
  {
    questionText: "Which protocol is used to automatically assign IP addresses?",
    options: [
      "DNS",
      "FTP",
      "DHCP",
      "HTTP"
    ],
    correctAnswer: "DHCP",
    topic: "Application Layer"
  },
  {
    questionText: "What does DNS stand for?",
    options: [
      "Domain Name System",
      "Data Network Service",
      "Dynamic Name Server",
      "Digital Network Security"
    ],
    correctAnswer: "Domain Name System",
    topic: "Application Layer"
  },
  {
    questionText: "Which type of network covers the smallest geographical area?",
    options: [
      "WAN",
      "MAN",
      "LAN",
      "PAN"
    ],
    correctAnswer: "PAN",
    topic: "Network Types"
  },
  {
    questionText: "What is the purpose of a subnet mask?",
    options: [
      "To identify the network portion of an IP address",
      "To encrypt network traffic",
      "To increase bandwidth",
      "To connect to wireless networks"
    ],
    correctAnswer: "To identify the network portion of an IP address",
    topic: "IP Addressing"
  },
  {
    questionText: "Which wireless standard operates at 5 GHz frequency?",
    options: [
      "802.11a",
      "802.11b",
      "802.11g",
      "802.11n"
    ],
    correctAnswer: "802.11a",
    topic: "Wireless Networks"
  },
  {
    questionText: "What is the main function of a router?",
    options: [
      "To connect devices within a LAN",
      "To forward packets between networks",
      "To amplify network signals",
      "To convert digital to analog signals"
    ],
    correctAnswer: "To forward packets between networks",
    topic: "Network Devices"
  },
  {
    questionText: "Which protocol is used for secure web browsing?",
    options: [
      "HTTP",
      "FTP",
      "HTTPS",
      "SMTP"
    ],
    correctAnswer: "HTTPS",
    topic: "Application Layer"
  },
  {
    questionText: "What is the purpose of NAT (Network Address Translation)?",
    options: [
      "To convert domain names to IP addresses",
      "To allow multiple devices to share a single public IP",
      "To encrypt network traffic",
      "To increase network speed"
    ],
    correctAnswer: "To allow multiple devices to share a single public IP",
    topic: "Network Layer"
  },
  {
    questionText: "Which cable type is commonly used in Ethernet networks?",
    options: [
      "Coaxial",
      "Fiber optic",
      "Twisted pair",
      "USB"
    ],
    correctAnswer: "Twisted pair",
    topic: "Physical Layer"
  },
  {
    questionText: "What does ICMP stand for?",
    options: [
      "Internet Control Message Protocol",
      "Internal Communication Management Protocol",
      "Internet Connection Management Process",
      "Integrated Cable Management Protocol"
    ],
    correctAnswer: "Internet Control Message Protocol",
    topic: "Network Layer"
  },
  {
    questionText: "Which protocol is used for sending email?",
    options: [
      "POP3",
      "IMAP",
      "SMTP",
      "FTP"
    ],
    correctAnswer: "SMTP",
    topic: "Application Layer"
  },
  {
    questionText: "What is the maximum speed of Gigabit Ethernet?",
    options: [
      "100 Mbps",
      "1 Gbps",
      "10 Gbps",
      "100 Gbps"
    ],
    correctAnswer: "1 Gbps",
    topic: "Physical Layer"
  },
  {
    questionText: "Which network topology connects all devices to a central point?",
    options: [
      "Bus",
      "Star",
      "Ring",
      "Mesh"
    ],
    correctAnswer: "Star",
    topic: "Network Topologies"
  },
  {
    questionText: "What is the process of hiding implementation details and showing only functionality called?",
    options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"],
    correctAnswer: "Encapsulation",
    topic: "OOP Basics"
  },
  {
    questionText: "Which OOP concept allows a class to derive properties from another class?",
    options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
    correctAnswer: "Inheritance",
    topic: "Inheritance"
  },
  {
    questionText: "What is runtime polymorphism commonly known as?",
    options: ["Method overloading", "Method overriding", "Operator overloading", "Function overloading"],
    correctAnswer: "Method overriding",
    topic: "Polymorphism"
  },
  {
    questionText: "Which keyword is used to prevent a class from being inherited?",
    options: ["static", "final", "private", "sealed"],
    correctAnswer: "final",
    topic: "Inheritance"
  },
  {
    questionText: "What is the relationship called when a class 'has-a' another class object as member?",
    options: ["Inheritance", "Polymorphism", "Composition", "Association"],
    correctAnswer: "Composition",
    topic: "Relationships"
  },
  {
    questionText: "Which principle states that a class should have only one reason to change?",
    options: ["DRY", "KISS", "SOLID", "SRP"],
    correctAnswer: "SRP",
    topic: "SOLID Principles"
  },
  {
    questionText: "What is the ability of an object to take many forms called?",
    options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
    correctAnswer: "Polymorphism",
    topic: "Polymorphism"
  },
  {
    questionText: "Which access modifier provides the most restricted access in OOP?",
    options: ["public", "protected", "default", "private"],
    correctAnswer: "private",
    topic: "Encapsulation"
  },
  {
    questionText: "What is a blueprint for creating objects called?",
    options: ["Method", "Class", "Interface", "Constructor"],
    correctAnswer: "Class",
    topic: "Class & Object"
  },
  {
    questionText: "Which OOP concept allows different classes to be treated as instances of the same class through inheritance?",
    options: ["Encapsulation", "Polymorphism", "Abstraction", "Composition"],
    correctAnswer: "Polymorphism",
    topic: "Polymorphism"
  },
  {
    questionText: "What is a special method that is automatically called when an object is instantiated?",
    options: ["Destructor", "Constructor", "Initializer", "Static block"],
    correctAnswer: "Constructor",
    topic: "Class & Object"
  },
  {
    questionText: "Which principle suggests that derived classes must be substitutable for their base classes?",
    options: ["SRP", "OCP", "LSP", "ISP"],
    correctAnswer: "LSP",
    topic: "SOLID Principles"
  },
  {
    questionText: "What is the process of creating a new class from an existing class called?",
    options: ["Instantiation", "Polymorphism", "Inheritance", "Encapsulation"],
    correctAnswer: "Inheritance",
    topic: "Inheritance"
  },
  {
    questionText: "Which of these represents an 'is-a' relationship?",
    options: ["Composition", "Aggregation", "Inheritance", "Association"],
    correctAnswer: "Inheritance",
    topic: "Relationships"
  },
  {
    questionText: "What is the term for when two methods have the same name but different parameters?",
    options: ["Method overriding", "Method overloading", "Method hiding", "Method shadowing"],
    correctAnswer: "Method overloading",
    topic: "Polymorphism"
  },
  {
    questionText: "Which principle states that software entities should be open for extension but closed for modification?",
    options: ["SRP", "OCP", "LSP", "DIP"],
    correctAnswer: "OCP",
    topic: "SOLID Principles"
  },
  {
    questionText: "What is a tightly coupled relationship between classes called?",
    options: ["Association", "Aggregation", "Composition", "Inheritance"],
    correctAnswer: "Composition",
    topic: "Relationships"
  },
  {
    questionText: "Which keyword is used to refer to the current object in a method or constructor?",
    options: ["super", "this", "self", "current"],
    correctAnswer: "this",
    topic: "Class & Object"
  },
  {
    questionText: "What is the term for creating multiple constructors in a class with different parameters?",
    options: ["Constructor overriding", "Constructor overloading", "Constructor chaining", "Constructor inheritance"],
    correctAnswer: "Constructor overloading",
    topic: "Class & Object"
  },
  {
    questionText: "Which exception is thrown when dividing by zero in Java?",
    options: ["NullPointerException", "ArithmeticException", "DivideByZeroException", "NumberFormatException"],
    correctAnswer: "ArithmeticException",
    topic: "exceptions"
  },
  {
    questionText: "What is the size of a 'char' in Java?",
    options: ["8 bits", "16 bits", "32 bits", "64 bits"],
    correctAnswer: "16 bits",
    topic: "data-types"
  },
  {
    questionText: "Which access modifier provides the most restrictive visibility?",
    options: ["public", "protected", "default (no modifier)", "private"],
    correctAnswer: "private",
    topic: "oop"
  },
  {
    questionText: "What is the purpose of the 'static' keyword in Java?",
    options: ["To make a variable constant", "To allow access without class instantiation", "To prevent inheritance", "To enable polymorphism"],
    correctAnswer: "To allow access without class instantiation",
    topic: "keywords"
  },
  {
    questionText: "Which interface must a class implement to be sorted using Collections.sort()?",
    options: ["Sortable", "Serializable", "Comparable", "Cloneable"],
    correctAnswer: "Comparable",
    topic: "collections"
  },
  {
    questionText: "What is method overriding in Java?",
    options: [
      "Changing method parameters",
      "Providing a different implementation of an inherited method",
      "Making a method private",
      "Creating multiple methods with same name"
    ],
    correctAnswer: "Providing a different implementation of an inherited method",
    topic: "oop"
  },
  {
    questionText: "Which Java feature ensures automatic memory management?",
    options: ["Garbage Collection", "Exception Handling", "Multithreading", "Serialization"],
    correctAnswer: "Garbage Collection",
    topic: "memory"
  },
  {
    questionText: "What is the correct way to create a thread in Java?",
    options: [
      "Extending Thread class",
      "Implementing Runnable interface",
      "Using ExecutorService",
      "All of the above"
    ],
    correctAnswer: "All of the above",
    topic: "multithreading"
  },
  {
    questionText: "Which Java 8 feature introduced lambda expressions?",
    options: ["JavaFX", "Stream API", "Functional Interfaces", "Modules"],
    correctAnswer: "Functional Interfaces",
    topic: "java8"
  },
  {
    questionText: "What does the 'synchronized' keyword do in Java?",
    options: [
      "Makes a variable constant",
      "Prevents method overriding",
      "Provides thread safety",
      "Enables serialization"
    ],
    correctAnswer: "Provides thread safety",
    topic: "multithreading"
  },
  {
    questionText: "Which method is called when an object is garbage collected?",
    options: ["finalize()", "destroy()", "cleanup()", "delete()"],
    correctAnswer: "finalize()",
    topic: "memory"
  },
  {
    questionText: "What is the default capacity of an ArrayList in Java?",
    options: ["0", "5", "10", "16"],
    correctAnswer: "10",
    topic: "collections"
  },
  {
    questionText: "Which CSS property controls text alignment?",
    options: ["text-align", "align-text", "font-align", "text-position"],
    correctAnswer: "text-align",
    topic: "css"
  },
  {
    questionText: "What is the correct syntax for referring to an external JavaScript file?",
    options: ["<script href='script.js'>", "<script src='script.js'>", "<javascript src='script.js'>", "<link rel='script' href='script.js'>"],
    correctAnswer: "<script src='script.js'>",
    topic: "html"
  },
  {
    questionText: "Which method joins all elements of an array into a string?",
    options: ["concat()", "join()", "merge()", "combine()"],
    correctAnswer: "join()",
    topic: "javascript"
  },
  {
    questionText: "What does the 'float' property do in CSS?",
    options: ["Makes text italic", "Positions an element to the left or right", "Creates a shadow effect", "Changes text color"],
    correctAnswer: "Positions an element to the left or right",
    topic: "css"
  },
  {
    questionText: "Which HTML attribute specifies an alternate text for an image?",
    options: ["title", "src", "alt", "href"],
    correctAnswer: "alt",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'addEventListener' method in JavaScript?",
    options: ["To create new events", "To attach an event handler", "To listen for all events", "To remove events"],
    correctAnswer: "To attach an event handler",
    topic: "javascript"
  },
  {
    questionText: "Which CSS property controls the order of flexible items?",
    options: ["order", "flex-order", "item-order", "z-index"],
    correctAnswer: "order",
    topic: "css"
  },
  {
    questionText: "What is the correct HTML for inserting a line break?",
    options: ["<lb>", "<break>", "<br>", "<newline>"],
    correctAnswer: "<br>",
    topic: "html"
  },
  {
    questionText: "Which JavaScript method returns the length of a string?",
    options: ["length()", "size()", "count()", ".length property"],
    correctAnswer: ".length property",
    topic: "javascript"
  },
  {
    questionText: "What does the 'position: absolute' CSS property do?",
    options: ["Positions relative to the viewport", "Positions relative to its normal position", "Positions relative to its parent", "Removes the element from flow"],
    correctAnswer: "Positions relative to its parent",
    topic: "css"
  },
  {
    questionText: "Which HTML tag is used to define a paragraph?",
    options: ["<para>", "<p>", "<paragraph>", "<pg>"],
    correctAnswer: "<p>",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'map()' method in JavaScript?",
    options: ["To create a new array by transforming elements", "To display a geographical map", "To rearrange array elements", "To combine arrays"],
    correctAnswer: "To create a new array by transforming elements",
    topic: "javascript"
  },
  {
    questionText: "Which CSS selector matches all <p> elements with class 'intro'?",
    options: ["p.intro", ".p.intro", "p#intro", "p > intro"],
    correctAnswer: "p.intro",
    topic: "css"
  },
  {
    questionText: "What is the correct HTML for creating a dropdown list?",
    options: ["<list>", "<input type='dropdown'>", "<select>", "<dropdown>"],
    correctAnswer: "<select>",
    topic: "html"
  },
  {
    questionText: "Which JavaScript method converts a string to lowercase?",
    options: ["toLowerCase()", "toLower()", "lowerCase()", "convertLower()"],
    correctAnswer: "toLowerCase()",
    topic: "javascript"
  },
  {
    questionText: "What does the 'display: none' CSS property do?",
    options: ["Hides an element", "Shows an element", "Creates a transparent element", "Moves an element off-screen"],
    correctAnswer: "Hides an element",
    topic: "css"
  },
  {
    questionText: "Which HTML tag is used to define metadata about the document?",
    options: ["<meta>", "<head>", "<info>", "<data>"],
    correctAnswer: "<meta>",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'filter()' method in JavaScript?",
    options: ["To create a new array with elements that pass a test", "To remove all elements", "To sort array elements", "To combine array elements"],
    correctAnswer: "To create a new array with elements that pass a test",
    topic: "javascript"
  },
  {
    questionText: "Which CSS property is used to change the background color?",
    options: ["color", "bgcolor", "background-color", "bg-color"],
    correctAnswer: "background-color",
    topic: "css"
  },
  {
    questionText: "What is the correct HTML for creating a hyperlink to 'example.com'?",
    options: ["<a href='example.com'>Link</a>", "<a url='example.com'>Link</a>", "<link href='example.com'>", "<a src='example.com'>Link</a>"],
    correctAnswer: "<a href='example.com'>Link</a>",
    topic: "html"
  },
  {
    questionText: "Which JavaScript method returns the first index at which a given element can be found?",
    options: ["find()", "index()", "indexOf()", "search()"],
    correctAnswer: "indexOf()",
    topic: "javascript"
  },
  {
    questionText: "What does the 'position: relative' CSS property do?",
    options: ["Positions relative to the viewport", "Positions relative to its normal position", "Positions relative to its parent", "Removes the element from flow"],
    correctAnswer: "Positions relative to its normal position",
    topic: "css"
  },
  {
    questionText: "Which HTML tag is used to define the header of a document?",
    options: ["<head>", "<header>", "<h1>", "<top>"],
    correctAnswer: "<head>",
    topic: "html"
  },
  {
    questionText: "What is the purpose of the 'reduce()' method in JavaScript?",
    options: ["To decrease array size", "To execute a reducer function on each element", "To remove duplicate elements", "To sort array elements"],
    correctAnswer: "To execute a reducer function on each element",
    topic: "javascript"
  },
  {
    questionText: "Which CSS property is used to add rounded corners?",
    options: ["corner-radius", "border-radius", "round-corner", "border-round"],
    correctAnswer: "border-radius",
    topic: "css"
  },
  {
    questionText: "What is the correct HTML for inserting an image?",
    options: ["<img src='image.jpg'>", "<image src='image.jpg'>", "<img href='image.jpg'>", "<picture src='image.jpg'>"],
    correctAnswer: "<img src='image.jpg'>",
    topic: "html"
  },
  {
    questionText: "Which JavaScript method converts a string to a number?",
    options: ["toNumber()", "parseInt()", "stringToNum()", "convert()"],
    correctAnswer: "parseInt()",
    topic: "javascript"
  },
  {
    questionText: "What does the 'position: fixed' CSS property do?",
    options: ["Positions relative to the viewport", "Positions relative to its normal position", "Positions relative to its parent", "Removes the element from flow"],
    correctAnswer: "Positions relative to the viewport",
    topic: "css"
  },
  {
    questionText: "Which HTML tag is used to define a list item?",
    options: ["<li>", "<ul>", "<ol>", "<list>"],
    correctAnswer: "<li>",
    topic: "html"
  }
];
const importData = async () => {
  try {
    await connectDB();
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);
    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
