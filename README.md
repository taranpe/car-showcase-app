# 🚗 Car Showcase React App

This is a React application that displays a list of cars and allows users to view detailed information about each one. It uses `React Router` for navigation and fetches car data from a local JSON file.

## 📁 Project Structure

```
/public
  └── cars.json           # JSON file with car data
  └── images/             # Folder with car images

/src
  ├── components/
  │   └── CarList.js      # Component that lists all cars
  │   └── CarDetail.js    # Component to show car details
  ├── App.js              # Main app component with routes
  └── index.js            # Entry point
```

---

## 🚀 Features

- View a list of available cars
- View detailed car info including image, brand, fuel type, and price
- Responsive and dark-mode friendly UI
- Smooth animations on image hover and buttons

---

## 🧰 Tech Stack

- React (with Hooks)
- React Router DOM
- Tailwind CSS (for styling)
- JSON file (used for mock data)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/car-showcase.git
cd car-showcase
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your car data

Create a file at `/public/cars.json` with the following sample structure:

```json
[
  {
    "id": 1,
    "name": "Toyota Camry",
    "brand": "Toyota",
    "fuel": "Petrol",
    "seats": 5,
    "price": 25000,
    "image": "images/camry.jpg"
  },
  {
    "id": 2,
    "name": "Tesla Model 3",
    "brand": "Tesla",
    "fuel": "Electric",
    "seats": 5,
    "price": 40000,
    "image": "images/model3.jpg"
  }
]
```

Put matching images inside `/public/images/`.

### 4. Start the app

```bash
npm start
```

Your app will run at `http://localhost:3000`.

---

## 🧪 Scripts

- `npm start` — Runs the app in development mode
- `npm run build` — Builds the app for production

---

## 📷 Screenshots

_Add screenshots in a `/screenshots` folder and reference them here._

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Questions or Suggestions?

Feel free to open an issue or pull request if you'd like to contribute or report bugs!
