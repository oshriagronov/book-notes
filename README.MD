<br />
<div align="center">
  <a href="https://github.com/oshriagronov/book-notes">
    <img src="public/assets/logo.png" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">LocalChat</h3>
  <p align="center">
    Simple site where you share an short paragraph about a book you read .
  </p>
</div>

## About
The project is a site where you write short opinions about the books and they are called “Notes”.

### Key features
- The site automaticly fetch the book cover and title by the isbn the user enter through openLibrary api.
- The user can search through the notes by entering the title name or part of it.
- All the data is saved locally using Postgres.

## Technologies used
- js, html&css.
- nodejs.
- npm modules: express, pg, bodyParser, axios.
- Postgres.
openLibrary api

## Media
<img src="public/assets/home.png" alt="home page" width="600" height="600">
<img src="public/assets/compose.png" alt="compose page" width="600" height="600">


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Linux, MacOS or Windows
- nodejs
- npm
- postGresSQL

### Installation

---

1. **Clone and enter the book-notes repository:**

   ```bash
   git clone https://github.com/oshriagronov/book-notes && cd book-notes
   ```

2. **Install npm moudles:**

   ```bash
   sudo npm i
   ```

3. **Run the app:**  
   ```bash
   node app.js
   ```
4. Open the browser and enter in the url bar:
```
localhost:3000
```

## Acknowledgements
I would like to thank openLibrary for give free access to their api, it's massively help me with the project. <br>
I would like to thank to Dr. Angela Yu for creating the great course "The Complete 2023 Web Development Bootcamp".
> Link to the course [here](https://www.udemy.com/course/the-complete-web-development-bootcamp/?kw=The+Complete+2023+Web+Development+Bootcamp&src=sac)
