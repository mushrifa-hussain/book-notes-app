# 📚 Book Notes App

Hi, I’m Mushrifa Hussain 👋

This is my personal web application where I track the books I’ve read, rate them, and write down my thoughts and key takeaways. It helps me remember what I learn from each book and reflect on my reading journey.

---

## 🚀 Features

* 📖 Add new books with title, rating, notes, and date
* 📝 View detailed notes for each book
* ✏️ Edit existing book entries
* ❌ Delete books
* 📊 Sort books by:

  * Recency (date)
  * Rating
* 🖼️ Automatic book cover fetching using Open Library API
* ⚠️ Error handling for invalid inputs
* 🎨 Clean and simple UI

---

## 📸 Screenshots

<img width="1919" height="1072" alt="image" src="https://github.com/user-attachments/assets/0628fb20-0088-4cea-8171-875f2927ca0e" />
<img width="1919" height="1070" alt="image" src="https://github.com/user-attachments/assets/5e1f6fe5-83d9-4eed-8db4-bd93a4cfa532" />
<img width="1919" height="1068" alt="image" src="https://github.com/user-attachments/assets/b00b2870-cc6c-4172-a2e9-8841230e8bf1" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/b7925f7c-fe9f-46f9-a739-71b9364a5ee9" />

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, EJS
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **API:** Open Library Covers API
* **Other Tools:** Axios, Body-parser

---

## 📂 Project Structure

```
📁 project-root
│── 📁 public
│   ├── styles
│   ├── images
│
│── 📁 views
│   ├── partials
│   ├── index.ejs
│   ├── addBook.ejs
│   ├── notes.ejs
│
│── index.js
│── package.json
```

---

## ⚙️ Installation & Setup

1. Clone the repository

```
git clone https://github.com/your-username/book-notes-app.git
cd book-notes-app
```

2. Install dependencies

```
npm install
```

3. Set up PostgreSQL database

* Create a database named `book_notes`
* Create table:

```
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    cover_i VARCHAR(20),
    title VARCHAR(100),
    rating INTEGER,
    notes TEXT,
    date DATE
);
```

4. Update your database credentials in `index.js`

```
const db = new pg.Client({
  user: "your_user",
  host: "localhost",
  database: "book_notes",
  password: "your_password",
  port: 5432,
});
```

5. Run the server

```
nodemon index.js
```

or

```
node index.js
```

6. Open in browser

```
http://localhost:3000
```

---

## 🔗 API Used

* Open Library Covers API
  https://openlibrary.org/dev/docs/api/covers

---

## ✨ Future Improvements

* 🔍 Search functionality
* 📱 Responsive design improvements
* ⭐ Filter by rating range
* 👤 User authentication

---

## 🙌 Acknowledgements

Inspired by Derek Sivers' book notes website.

---

## 💡 Author

Mushrifa Hussain
Aspiring AIML Engineer & Developer 🚀
