# 🍫 The Chocolate Opioid Initiative

**⚠️ SATIRE - NOT REAL - FOR EDUCATIONAL PURPOSES ONLY ⚠️**

A satirical data visualization project demonstrating React/Vite, Firebase, Chart.js, and data analysis skills using real CDC drug overdose data.

## 🎯 Project Purpose

This is an academic project created to fulfill assignment requirements while using humor to highlight the absurdity of simplistic solutions to complex public health crises. **Nothing on this website should be taken seriously.**

## ✨ Features

- 📊 **Data Visualization**: Interactive charts showing CDC provisional drug overdose death counts
- 🔍 **Drug Segmentation**: Filter data by specific drug types
- 📈 **Monthly Graphs**: View trends over time with Line and Bar charts
- 🗳️ **Firestore Voting**: Real-time voting system (Support/Against) using Firebase
- 🛒 **Satirical Shop**: Fake product page for "Tolerance Chocolate™"
- ⚠️ **Disclaimer Modal**: Clear warnings that this is satire
- 🎨 **Liquid Glass UI**: Modern glassmorphism design with animations

## 🛠️ Technologies

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Firebase** - Hosting and Firestore database
- **Chart.js** - Data visualization
- **Papaparse** - CSV data parsing
- **CSS3** - Liquid glass animations and modern styling

## 📊 Data Source

Data Source: [CDC Provisional Drug Overdose Death Counts for Specific Drugs](https://catalog.data.gov/dataset/provisional-drug-overdose-death-counts-for-specific-drugs)

The data used is real CDC data on drug overdoses in the United States, which represents a serious public health crisis.

## 🚀 Live Demo

**Live Site:** https://chocolate-opioid-initiative.web.app

**Firebase Console:** https://console.firebase.google.com/project/chocolate-opioid-initiative/overview

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mmeyer1s/unit3quiz-v005-chocolateopioids.git
cd unit3quiz-v005-chocolateopioids

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

## 🏗️ Project Structure

```
unit3quiz-v005-chocolateopioids/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Liquid glass styling
│   ├── firebase.js          # Firebase configuration
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── public/
│   └── chocolate.svg        # Favicon
├── overdoseRates.csv        # CDC data (78k+ rows)
├── firebase.json            # Firebase hosting config
├── firestore.rules          # Firestore security rules
├── .firebaserc              # Firebase project reference
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Features Breakdown

### 1. Data Visualization (25%)
- Parses 78,000+ rows of CDC drug overdose data
- Interactive line and bar charts using Chart.js
- Real-time filtering by drug type
- Monthly aggregation and trending

### 2. Drug Segmentation UI (25%)
- Dropdown filter for all drug types in dataset
- Dynamic chart updates based on selection
- Shows data graphed per month
- Handles missing/invalid data gracefully

### 3. Firestore Voting (20%)
- Support/Against voting buttons
- Real-time vote counting stored in Firestore
- LocalStorage prevents multiple votes
- Vote totals displayed in real-time

### 4. Satirical Content (15%)
- Disclaimer modal on page load
- "Statement of Intent" with absurd policy proposal
- Fake chocolate shop with drug-infused products
- Multiple warnings throughout the site

### 5. Professional Styling (15%)
- Liquid glass morphism effects
- Smooth animations and transitions
- Responsive design for mobile/desktop
- Chocolate brown color scheme
- Floating background blobs
- Clean, modern typography

## ⚠️ Important Disclaimers

### THIS IS SATIRE
- **There is NO such thing as "Tolerance Chocolate™"**
- **Drug-infused chocolate is illegal, dangerous, and idiotic**
- **This is NOT real medical, political, or policy advice**
- **The "candidate" and "initiative" are entirely fictional**
- **All product descriptions are jokes**

### Real Information
The drug overdose data is real and represents a serious public health crisis. If you or someone you know is struggling with substance abuse:

**SAMHSA National Helpline: 1-800-662-4357 (24/7)**

## 📚 Assignment Requirements Met

- ✅ React/Vite app deployed with Firebase Hosting
- ✅ Named with `unit3quiz-v005-` prefix
- ✅ Data graphing with segmentation by Drug
- ✅ Monthly graph display
- ✅ Firestore voting with Support/Against buttons
- ✅ GitHub repo with proper commits
- ✅ Professional modern styling
- ✅ Single-page UI with all features visible

## 🔥 Firebase Configuration

The app uses Firebase for:
- **Hosting**: Fast global CDN delivery
- **Firestore**: Real-time voting database
- **Project ID**: `chocolate-opioid-initiative`

## 📝 Git Commit History

The repository includes commits for each major working step:
1. Initialization - Project setup with dependencies
2. Working UI - Data visualization, voting, and shop page
3. Firebase Connection - Configuration and deployment

## 🎓 Educational Value

This project demonstrates:
- Parsing and visualizing large CSV datasets
- Using Chart.js for responsive data visualization
- Firebase Firestore integration for real-time data
- React hooks and state management
- Responsive CSS with modern effects
- Git workflow with meaningful commits
- Satirical content to highlight serious issues

## 🚫 What This Project Is NOT

- NOT medical advice
- NOT political endorsement
- NOT a real product or service
- NOT encouraging drug use
- NOT making light of addiction (the satire highlights absurd "solutions")

## 🤝 Contributing

This is an academic project and is not accepting contributions. However, feel free to fork it for educational purposes.

## 📄 License

ISC License - This project is for educational purposes only.

## 👤 Author

Created for a web development course assignment.

## 🆘 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/)
- [SAMHSA Helpline](https://www.samhsa.gov/find-help/national-helpline): 1-800-662-4357

---

**Remember: This is satire. The opioid crisis is real and devastating. If you need help, please reach out to professionals.**

*Built with React, Vite, Firebase, and a sense of humor about bad policy ideas.*
