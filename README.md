# Si Github

A simple React + TypeScript application to search GitHub users and explore their repositories with an expandable list.  
This project was created as a recruitment test to demonstrate best practices in React, API integration, and deployment.

## 💻 Live Demo
👉 [Click here](https://asruldev.github.io/sigithub/)


## 🚀 Features

✅ Search for up to 5 GitHub users by username  
✅ Click on a user to expand and view all their repositories  
✅ Nice and responsive design  
✅ Smooth expand/collapse animation  
✅ Loading state and error handling  
✅ Deployed to GitHub Pages


## 📦 Tech Stack

- React + Vite + TypeScript
- GitHub REST API
- CSS (no framework)
- gh-pages for deployment


## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
````


### 2️⃣ Install dependencies

```bash
npm install
```


### 3️⃣ Run locally (development)

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.


### 4️⃣ Build for production

```bash
npm run build
```

This will generate a `dist` folder.


## 🌐 Deploy to GitHub Pages

This project uses the **gh-pages** package to deploy the production build to GitHub Pages.

### 📌 Steps:

1️⃣ **Install `gh-pages`**

```bash
npm install gh-pages --save-dev
```


2️⃣ **Add `homepage` in `package.json`**

```json
"homepage": "https://<username>.github.io/<repo-name>"
```

Replace `<username>` and `<repo-name>` with your GitHub username and repository name.


3️⃣ **Add deploy scripts in `package.json`**

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```


4️⃣ **Deploy**

```bash
npm run deploy
```

This will:

* Build the production files
* Push the `dist` folder to the `gh-pages` branch
* GitHub will serve it as a static site


5️⃣ **Enable GitHub Pages**

On your GitHub repository:

* Go to **Settings → Pages**
* Select branch: `gh-pages`
* Select folder: `/ (root)`
* Click **Save**

Your live site will be available at:

```
https://<username>.github.io/<repo-name>
```


## ✅ Good Practices

* ✅ Fully typed with TypeScript
* ✅ Proper error handling
* ✅ Responsive layout for mobile and desktop
* ✅ Clean and readable code structure
* ✅ Public repository with clear instructions


## 📄 License

No Licence


## 🔖 Test Result

Run with:

```bash
npm run test
```

```
 RERUN  src/tests/api.test.ts x6 

 ✓ src/tests/api.test.ts (4 tests) 4ms
   ✓ api helpers > searchUsers > calls fetch with correct URL and returns JSON 2ms
   ✓ api helpers > searchUsers > throws error if response is not ok 1ms
   ✓ api helpers > getUserRepos > calls fetch with correct URL and returns JSON 0ms
   ✓ api helpers > getUserRepos > throws error if response is not ok 0ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  22:58:58
   Duration  90ms
```

## 🙌 Author

Asrul harahap

Built with ❤️ for test recruitment purposes.
Feel free to fork, use and improve it!