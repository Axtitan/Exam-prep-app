# 🎯 Exam Prep System

An interactive, premium web application designed for students preparing for **EY (Ernst & Young) Jobberman Aptitude Tests**, **SEPLAT Petroleum Assessments**, and **General Aptitude (Workforce) Exams**. 

This system features over 300+ real practice questions, multiple test modes (timed mock exams, speed-blitzing, and free practice), responsive visual themes per assessment, and an **AI Study Assistant** powered by Groq's Llama 3.3.

---

## ✨ Features

- **Multi-Exam Coverage:**
  - **EY Graduate Assessment (Jobberman):** 158 questions covering Logical, Numerical, Verbal, Critical, Data & Abstract Reasoning.
  - **SEPLAT Petroleum Assessment:** Real past paper questions covering Numerical, Quantitative, Verbal Reasoning, Banking & Finance, and General Knowledge.
  - **General Aptitude:** Workforce past papers focusing on core Numerical and Verbal Reasoning.
- **Multiple Practice Modes:**
  - 🔥 **Blitz Mode (30 mins):** High-speed pressure mode to build pacing.
  - ⏱ **Timed/Exam Mode (40-90 mins):** Replicates official exam environments with a countdown timer.
  - 📖 **Practice Mode (Unlimited):** No clock, instant feedback, and detailed answer explanations after each question.
- **Category Filtering:** Ability to filter questions by topic (e.g., Numerical, Verbal, Banking & Finance, General Knowledge) for focused study sessions.
- **🤖 AI Study Assistant (Groq Cloud Integration):** 
  - Integrated directly into the workspace to help you understand complex explanations.
  - Powered by **Llama 3.3 70B** on Groq Cloud to explain why an option is right or wrong based on official test logic.
- **Theme Customization:** Dynamically alters UI accent colors depending on the selected exam category.
- **PDF Parser Utility (`parse_pdf.py`):** Uses `pdfplumber` to extract and inspect question banks from source past papers.

---

## 🛠️ Project Structure

```text
├── charts/                 # Visual assets (tables, graphs, currency curves for questions)
├── EY past questions/      # Scanned image assets for specific questions
├── app.js                  # Frontend core application state, timers, and Groq API logic
├── index.html              # Clean, responsive user interface structure
├── parse_pdf.py            # Python utility script using pdfplumber to parse past question PDFs
├── questions.js            # Raw JSON-like databases containing question banks, options, and explanations
├── style.css               # Styling definitions (dynamic CSS variables, layouts, and responsiveness)
└── .gitignore              # Ignores local large PDFs and caches
```

---

## 🚀 How to Run Locally

Since the app is built using vanilla Web technologies, you can run it without any build step:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Axtitan/Exam-prep-app.git
   cd Exam-prep-app
   ```

2. **Open in Browser:**
   - Double-click `index.html` to open it in your browser directly.
   - Alternatively, serve it locally with VS Code's Live Server or Python:
     ```bash
     python -m http.server 8000
     ```
     And navigate to `http://localhost:8000`.

---

## 🤖 Configuring the AI Assistant (Groq API Key)

To use the interactive AI assistant during practice:
1. When you click **"Ask AI Assistant"**, the application will prompt you to enter your **Groq API Key**.
2. If you don't have a key, you can get one for free at [console.groq.com](https://console.groq.com/).
3. The key is stored securely in your browser's **Local Storage** (`localStorage`) and is never sent to any external server except directly to the Groq API endpoint.
4. **Security Note:** The `.gitignore` prevents hardcoding and pushing your key to GitHub.

---

## 🧹 PDF Parser Utility

If you wish to run the PDF parser helper to read or extract more questions:
1. Ensure Python 3 is installed.
2. Install `pdfplumber`:
   ```bash
   pip install pdfplumber
   ```
3. Run the script:
   ```bash
   python parse_pdf.py
   ```
