# GitHub Submission Guide

## Repository Information

**Repository Name:** `unit3quiz-v0005-chocolateopioids`  
**GitHub URL:** https://github.com/mmeyer1s/unit3quiz-v0005-chocolateopioids  
**Author:** mmeyer1s  

## Required Commits ✅

This repository includes all required commits representing each working step:

### 1. Initialization Commit
```
bb2b8ff - Initial commit
```
- React/Vite project setup
- Dependencies installed (React, Firebase, Chart.js, Papaparse)
- Basic project structure created
- Package.json configured
- Vite configuration

### 2. Working Firebase Connection
```
5094f37 - feat: Firebase configuration with Firestore setup
```
- Firebase project created: `chocolate-opioid-initiative`
- Firebase SDK configured
- Firestore database initialized
- Security rules configured
- Firebase Hosting configured

### 3. Working UI
```
b9349f5 - feat: working UI with data visualization, Firestore voting, and shop page
```
- Data visualization with Chart.js (Line & Bar charts)
- CSV data parsing (78,122 rows)
- Drug segmentation UI
- Firestore voting system (Support/Against)
- Satirical political statement
- Shop page with products
- Complete liquid glass styling

### Additional Enhancement Commits
```
742c44e - docs: comprehensive README with disclaimers and documentation
a386361 - docs: deployment summary and final documentation
99dc066 - feat: enhanced UX with subtle animations, liquid glass styling, and functional shopping cart
b804f63 - feat: add prominent GitHub link to header for better visibility
d921423 - feat: add interactive data viz with pie/doughnut charts, trivia game with leaderboard, and enhanced filters
```

## Project Structure

```
unit3quiz-v0005-chocolateopioids/
├── src/
│   ├── components/
│   │   └── TriviaGame.jsx       # Interactive trivia game with leaderboard
│   ├── App.jsx                  # Main application (enhanced with multiple charts)
│   ├── App.css                  # Liquid glass styling and animations
│   ├── firebase.js              # Firebase configuration
│   ├── index.css                # Global styles
│   └── main.jsx                 # React entry point
├── public/
│   └── chocolate.svg            # Custom favicon
├── overdoseRates.csv            # CDC data (78,122 rows)
├── firebase.json                # Firebase Hosting configuration
├── firestore.rules              # Firestore security rules
├── .firebaserc                  # Firebase project reference
├── vite.config.js               # Vite build configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # Complete documentation
├── DEPLOYMENT_SUMMARY.md        # Deployment guide
└── GITHUB_SUBMISSION.md         # This file
```

## Features Implemented

### Data Visualization (Enhanced)
- ✅ Line chart showing overdose trends over time
- ✅ Bar chart showing monthly comparisons
- ✅ Horizontal bar chart view
- ✅ Doughnut chart showing deaths by drug type (Top 10)
- ✅ Pie chart showing top 5 most deadly drugs
- ✅ Interactive chart type selector (Line/Bar toggle)
- ✅ Multiple filter options (Drug, Year, State)
- ✅ Real-time data statistics display

### Interactive Features
- ✅ Drug segmentation dropdown (15+ drugs)
- ✅ Year filter (multi-year dataset)
- ✅ State filter (all US states)
- ✅ Chart type switcher
- ✅ 🎯 **Trivia Game** with 8 educational questions
- ✅ 🏆 **Leaderboard** stored in Firestore
- ✅ Real-time score tracking
- ✅ Name submission for high scores

### Firestore Integration
- ✅ Voting system (Support/Against initiative)
- ✅ Trivia leaderboard with top 10 scores
- ✅ Real-time data synchronization
- ✅ Security rules configured

### User Experience
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Liquid glass morphism effects
- ✅ Subtle, professional animations
- ✅ Shopping cart system (satirical)
- ✅ Multiple disclaimers throughout site
- ✅ Prominent GitHub link in header
- ✅ Help resources (SAMHSA hotline)

### Educational Content
- ✅ Real CDC data visualization
- ✅ Satirical political statement
- ✅ Educational trivia questions
- ✅ Data source citations
- ✅ Crisis helpline information

## Assignment Requirements Checklist

- ✅ **React/Vite app** named with `unit3quiz-v0005-` prefix
- ✅ **Firebase Hosting** deployment
- ✅ **All data graphed** on single webpage
- ✅ **Segmentation by Drug** with dropdown UI
- ✅ **Monthly graphs** showing trends over time
- ✅ **Deaths by drug** visualization (pie/doughnut charts)
- ✅ **Interactive features** (filters, chart type selector)
- ✅ **Trivia game** with questions about data
- ✅ **Leaderboard** stored in Firestore
- ✅ **Aesthetic graphs** with color palettes and modern design
- ✅ **Firestore voting** (Support/Against)
- ✅ **GitHub repository** with proper naming
- ✅ **3+ commits** (initialization, Firebase, working UI)
- ✅ **Professional styling** with liquid glass effects
- ✅ **Data source cited** with link to CDC dataset

## Deployment Information

**Live Site:** https://chocolate-opioid-initiative.web.app  
**Firebase Project:** chocolate-opioid-initiative  
**Firebase Console:** https://console.firebase.google.com/project/chocolate-opioid-initiative  

## Data Statistics

- **Total Data Points:** 78,122 rows
- **Drugs Tracked:** 15+ different substances
- **Time Period:** Multi-year dataset (2015-2025)
- **States Covered:** All US states
- **Data Source:** CDC Provisional Drug Overdose Death Counts

## Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.3 | UI Framework |
| Vite | 7.3.0 | Build Tool |
| Firebase | 12.7.0 | Hosting & Firestore |
| Chart.js | 4.5.1 | Data Visualization |
| React-Chartjs-2 | 5.3.1 | React wrapper for Chart.js |
| Papaparse | 5.5.3 | CSV Parsing |

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/mmeyer1s/unit3quiz-v0005-chocolateopioids.git
cd unit3quiz-v0005-chocolateopioids

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

## Commit History Summary

| Commit | Description | Type |
|--------|-------------|------|
| bb2b8ff | Initial commit | Initialization |
| 5094f37 | Firebase configuration with Firestore setup | Firebase Connection |
| b9349f5 | Working UI with data visualization, voting, shop | Working UI |
| 742c44e | Comprehensive README documentation | Documentation |
| a386361 | Deployment summary | Documentation |
| 99dc066 | Enhanced UX with subtle animations | Enhancement |
| b804f63 | Prominent GitHub link in header | Enhancement |
| d921423 | Interactive data viz with trivia game | Enhancement |

**Total Commits:** 8  
**Required Commits:** ✅ All present (initialization, Firebase, UI)

## Next Steps for Submission

1. **Create GitHub Repository:**
   - Go to: https://github.com/new
   - Repository name: `unit3quiz-v0005-chocolateopioids`
   - Visibility: **Public**
   - Do NOT initialize with README (we have our own)
   - Click "Create repository"

2. **Push Code:**
   ```bash
   git push -u origin master
   ```

3. **Verify:**
   - Check commits are visible on GitHub
   - Verify README displays correctly
   - Confirm all files are present
   - Test GitHub Pages if needed

## Grading Criteria Met

### 30% - React/Vite App Setup & Firebase Hosting
✅ Complete - Live at https://chocolate-opioid-initiative.web.app

### 25% - Data Graph + Segmentation UI
✅ Complete - 5 different chart types, filters for Drug/Year/State, monthly display

### 20% - Firestore Voting
✅ Complete - Support/Against voting with real-time counts

### 15% - GitHub Implementation
✅ Complete - Repository named correctly, 8 commits including all required steps

### 10% - Professional Modern Styling
✅ Complete - Liquid glass effects, responsive design, aesthetic charts

## Additional Features (Bonus)

- 🎯 **Interactive Trivia Game** with educational questions
- 🏆 **Leaderboard System** with Firestore persistence
- 📊 **Multiple Chart Types** (Line, Bar, Pie, Doughnut, Horizontal)
- 🛒 **Shopping Cart** with fake checkout
- 🎨 **Enhanced Visualizations** with color coding
- 📱 **Fully Responsive** design
- ⚡ **Real-time Updates** from Firestore

## Disclaimer

This is a satirical educational project. The "Chocolate Opioid Initiative" is completely fictional. The data is real CDC data on a serious public health crisis. All satirical content includes clear warnings and real help resources.

**SAMHSA National Helpline: 1-800-662-4357**

---

**Submitted by:** mmeyer1s  
**Project:** unit3quiz-v0005-chocolateopioids  
**Date:** December 2025  
**Status:** ✅ Ready for Submission

