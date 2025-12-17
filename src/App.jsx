import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, doc, getDoc, setDoc, increment } from 'firebase/firestore'
import Papa from 'papaparse'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import './App.css'
import overdoseData from '../overdoseRates.csv?raw'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedDrug, setSelectedDrug] = useState('All')
  const [drugs, setDrugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [votes, setVotes] = useState({ support: 0, against: 0 })
  const [hasVoted, setHasVoted] = useState(false)
  const [showShop, setShowShop] = useState(false)

  // Load CSV data
  useEffect(() => {
    Papa.parse(overdoseData, {
      header: true,
      complete: (results) => {
        const cleanedData = results.data.filter(row => 
          row['Data Value'] && 
          row['Data Value'].trim() !== '' && 
          !isNaN(parseFloat(row['Data Value']))
        )
        setData(cleanedData)
        
        // Extract unique drugs
        const uniqueDrugs = [...new Set(cleanedData.map(row => row.Indicator))].filter(Boolean)
        setDrugs(['All', ...uniqueDrugs.sort()])
        
        setFilteredData(cleanedData)
        setLoading(false)
      },
      error: (error) => {
        console.error('Error parsing CSV:', error)
        setLoading(false)
      }
    })
  }, [])

  // Load votes from Firestore
  useEffect(() => {
    const loadVotes = async () => {
      try {
        const voteDoc = await getDoc(doc(db, 'votes', 'chocolateOpioidInitiative'))
        if (voteDoc.exists()) {
          setVotes(voteDoc.data())
        }
      } catch (error) {
        console.error('Error loading votes:', error)
      }
    }
    loadVotes()
    
    // Check if user has voted
    const voted = localStorage.getItem('hasVotedChocolateOpioid')
    if (voted) {
      setHasVoted(true)
    }
  }, [])

  // Filter data by drug
  useEffect(() => {
    if (selectedDrug === 'All') {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter(row => row.Indicator === selectedDrug))
    }
  }, [selectedDrug, data])

  // Handle voting
  const handleVote = async (voteType) => {
    if (hasVoted) return
    
    try {
      const voteDocRef = doc(db, 'votes', 'chocolateOpioidInitiative')
      await setDoc(voteDocRef, {
        [voteType]: increment(1)
      }, { merge: true })
      
      setVotes(prev => ({
        ...prev,
        [voteType]: prev[voteType] + 1
      }))
      
      localStorage.setItem('hasVotedChocolateOpioid', 'true')
      setHasVoted(true)
    } catch (error) {
      console.error('Error voting:', error)
      alert('Error submitting vote. Please try again.')
    }
  }

  // Prepare chart data
  const prepareChartData = () => {
    // Aggregate data by month
    const monthlyData = {}
    
    filteredData.forEach(row => {
      const key = `${row.Year}-${row.Month}`
      const value = parseFloat(row['Data Value'])
      
      if (!monthlyData[key]) {
        monthlyData[key] = { total: 0, count: 0 }
      }
      monthlyData[key].total += value
      monthlyData[key].count += 1
    })
    
    // Sort by date and calculate averages
    const sortedKeys = Object.keys(monthlyData).sort((a, b) => {
      const [yearA, monthA] = a.split('-')
      const [yearB, monthB] = b.split('-')
      const dateA = new Date(yearA, getMonthIndex(monthA))
      const dateB = new Date(yearB, getMonthIndex(monthB))
      return dateA - dateB
    })
    
    const labels = sortedKeys.map(key => key.replace('-', ' '))
    const values = sortedKeys.map(key => 
      monthlyData[key].total / monthlyData[key].count
    )
    
    return { labels, values }
  }

  const getMonthIndex = (monthName) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December']
    return months.indexOf(monthName)
  }

  const chartData = prepareChartData()

  const lineChartData = {
    labels: chartData.labels.slice(-36), // Last 36 months
    datasets: [
      {
        label: `Overdose Deaths - ${selectedDrug}`,
        data: chartData.values.slice(-36),
        fill: true,
        backgroundColor: 'rgba(139, 69, 19, 0.2)',
        borderColor: 'rgba(139, 69, 19, 1)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'rgba(139, 69, 19, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const barChartData = {
    labels: chartData.labels.slice(-12), // Last 12 months
    datasets: [
      {
        label: `Monthly Average - ${selectedDrug}`,
        data: chartData.values.slice(-12),
        backgroundColor: 'rgba(139, 69, 19, 0.7)',
        borderColor: 'rgba(139, 69, 19, 1)',
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: `Drug Overdose Death Trends`,
        font: {
          size: 18,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Deaths',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
  }

  if (showShop) {
    return <ShopPage onBack={() => setShowShop(false)} />
  }

  return (
    <div className="app">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {showDisclaimer && (
        <DisclaimerModal onClose={() => setShowDisclaimer(false)} />
      )}

      <div className="main-content">
        <div className="header">
          <h1>🍫 The Chocolate Opioid Initiative</h1>
          <p className="subtitle">A Revolutionary Approach to Drug Overdose Prevention*</p>
          <div className="satire-warning">
            ⚠️ SATIRE - NOT REAL MEDICAL ADVICE - FOR EDUCATIONAL PURPOSES ONLY ⚠️
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <>
            {/* Data Visualization Section */}
            <div className="content-section glass-card">
              <h2 className="section-title">📊 Drug Overdose Data Analysis</h2>
              
              <div className="filters">
                <select
                  className="filter-select"
                  value={selectedDrug}
                  onChange={(e) => setSelectedDrug(e.target.value)}
                >
                  {drugs.map(drug => (
                    <option key={drug} value={drug}>{drug}</option>
                  ))}
                </select>
              </div>

              <div className="chart-container" style={{ height: '400px' }}>
                <Line data={lineChartData} options={chartOptions} />
              </div>

              <div className="chart-container" style={{ height: '350px', marginTop: '20px' }}>
                <Bar data={barChartData} options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Last 12 Months',
                      font: { size: 16, weight: 'bold' }
                    }
                  }
                }} />
              </div>
            </div>

            {/* Statement Section */}
            <div className="statement-section glass-card">
              <h2>📢 Statement of Intent</h2>
              <div className="statement-text">
                <p>
                  <strong>The data speaks for itself.</strong> Drug overdose deaths continue to rise at an 
                  alarming rate across the United States. As a candidate for office, I propose a bold, 
                  innovative solution that combines public health science with consumer products: 
                  <strong> The Chocolate Opioid Initiative</strong>.
                </p>
                <p>
                  My plan is simple yet revolutionary: introduce micro-doses of various opioids and 
                  controlled substances into chocolate bars, allowing the general population to build 
                  up a natural tolerance over time. By gradually exposing Americans to small amounts 
                  of these substances through their favorite treat, we can create a nation-wide immunity 
                  to accidental overdoses.
                </p>
                <p>
                  Think of it as a vaccine, but delicious! Just as vaccines expose us to weakened 
                  pathogens to build immunity, our patented "Tolerance Chocolate™" will expose 
                  consumers to micro-doses of fentanyl, cocaine, heroin, and methamphetamine—all 
                  wrapped in premium Belgian chocolate.
                </p>
                <p>
                  <strong>The benefits are clear:</strong>
                </p>
                <ul>
                  <li>Reduced overdose deaths through controlled exposure</li>
                  <li>Economic boost to the chocolate industry</li>
                  <li>New jobs in pharmaceutical chocolate manufacturing</li>
                  <li>Bipartisan appeal (everyone loves chocolate!)</li>
                  <li>Solving the opioid crisis one candy bar at a time</li>
                </ul>
                <p>
                  Join me in supporting this groundbreaking initiative. Together, we can make America 
                  tolerant again—to opioids, through chocolate. Vote for progress. Vote for innovation. 
                  Vote for chocolate.
                </p>
              </div>

              <div className="data-source">
                Data Source: <a href="https://catalog.data.gov/dataset/provisional-drug-overdose-death-counts-for-specific-drugs" target="_blank" rel="noopener noreferrer">
                  CDC Provisional Drug Overdose Death Counts
                </a>
              </div>
            </div>

            {/* Voting Section */}
            <div className="content-section glass-card voting-section">
              <h2 className="section-title">🗳️ Cast Your Vote</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', marginBottom: '20px' }}>
                Do you support the Chocolate Opioid Initiative?
              </p>
              
              <div className="vote-buttons">
                <button
                  className="glass-button vote-button support"
                  onClick={() => handleVote('support')}
                  disabled={hasVoted}
                >
                  <span>✓ Support</span>
                </button>
                <button
                  className="glass-button vote-button against"
                  onClick={() => handleVote('against')}
                  disabled={hasVoted}
                >
                  <span>✗ Against</span>
                </button>
              </div>

              <div className="vote-count">
                <p>Support: <strong>{votes.support || 0}</strong> votes</p>
                <p>Against: <strong>{votes.against || 0}</strong> votes</p>
              </div>

              {hasVoted && (
                <p style={{ color: '#90EE90', fontWeight: 'bold', marginTop: '10px' }}>
                  ✓ Thank you for voting!
                </p>
              )}
            </div>

            {/* Shop Link */}
            <div className="shop-link-container">
              <button
                className="glass-button shop-link-button"
                onClick={() => setShowShop(true)}
              >
                <span>🛒 Shop Tolerance Chocolate™</span>
              </button>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)', padding: '40px 20px', fontSize: '12px' }}>
              <p>This is a satirical project for educational purposes only.</p>
              <p>No actual drug-infused chocolate exists or should ever exist.</p>
              <p>If you or someone you know is struggling with substance abuse, please call SAMHSA's National Helpline: 1-800-662-4357</p>
              <p style={{ marginTop: '20px' }}>
                <a href="https://github.com/mmeyer1s/unit3quiz-v005-chocolateopioids" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'underline' }}>
                  View on GitHub
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Disclaimer Modal Component
function DisclaimerModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card">
        <h2>⚠️ IMPORTANT DISCLAIMER ⚠️</h2>
        <p><strong>THIS WEBSITE IS SATIRE AND FOR EDUCATIONAL PURPOSES ONLY.</strong></p>
        <p>This project was created as a humorous academic exercise to demonstrate data visualization, 
           web development, and Firebase integration skills. <strong>Nothing on this website should be 
           taken seriously.</strong></p>
        <ul>
          <li><strong>There is NO such thing as "Tolerance Chocolate™"</strong></li>
          <li><strong>Drug-infused chocolate is dangerous, illegal, and idiotic</strong></li>
          <li><strong>This is NOT real medical or political advice</strong></li>
          <li><strong>The "candidate" and "initiative" are entirely fictional</strong></li>
          <li><strong>All product descriptions are jokes</strong></li>
        </ul>
        <p>The data displayed is real CDC data on drug overdoses, which is a serious public health crisis. 
           If you or someone you know needs help with substance abuse:</p>
        <p><strong>SAMHSA National Helpline: 1-800-662-4357 (24/7)</strong></p>
        <p style={{ fontSize: '12px', marginTop: '20px' }}>
          By clicking "I Understand," you acknowledge this is satire and not to be taken seriously.
        </p>
        <button className="glass-button understand-button" onClick={onClose}>
          <span>I Understand This Is Satire</span>
        </button>
      </div>
    </div>
  )
}

// Shop Page Component
function ShopPage({ onBack }) {
  const products = [
    {
      id: 1,
      name: 'Fentanyl Fudge Bar',
      dose: '0.00001mg fentanyl per square',
      description: 'Build your tolerance with our gentlest formula. Start here!',
      price: 19.99,
      warning: 'NOT REAL - DO NOT ATTEMPT'
    },
    {
      id: 2,
      name: 'Cocaine Crunch',
      dose: '0.001mg cocaine per piece',
      description: 'For the go-getter who wants energy and tolerance!',
      price: 24.99,
      warning: 'NOT REAL - DO NOT ATTEMPT'
    },
    {
      id: 3,
      name: 'Heroin Hazelnut Delight',
      dose: '0.0001mg heroin with real hazelnuts',
      description: 'Nutty flavor meets controlled exposure therapy.',
      price: 22.99,
      warning: 'NOT REAL - DO NOT ATTEMPT'
    },
    {
      id: 4,
      name: 'Methamphetamine Mint',
      dose: '0.0005mg methamphetamine',
      description: 'Cool mint flavor with a tolerance-building twist!',
      price: 21.99,
      warning: 'NOT REAL - DO NOT ATTEMPT'
    },
    {
      id: 5,
      name: 'The Sampler Pack',
      dose: 'All varieties in micro-doses',
      description: 'Can\'t decide? Try them all! Build comprehensive tolerance.',
      price: 89.99,
      warning: 'NOT REAL - DO NOT ATTEMPT'
    },
    {
      id: 6,
      name: 'Political Endorsement Box',
      dose: 'Gift box with campaign materials',
      description: 'Show your support! Comes with bumper stickers and pamphlets.',
      price: 49.99,
      warning: 'NOT REAL - THIS IS SATIRE'
    }
  ]

  return (
    <div className="app">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>🍫 Tolerance Chocolate™ Shop</h1>
          <p className="subtitle">Premium Drug-Infused Chocolates (NOT REAL)*</p>
          <div className="satire-warning">
            ⚠️ THESE PRODUCTS DO NOT EXIST - THIS IS SATIRE ⚠️
          </div>
          <button className="glass-button" onClick={onBack} style={{ marginTop: '20px' }}>
            <span>← Back to Data</span>
          </button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          padding: '20px',
          position: 'relative',
          zIndex: 1
        }}>
          {products.map(product => (
            <div key={product.id} className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '10px' }}>
                {product.name}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '15px' }}>
                {product.dose}
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '20px', lineHeight: '1.6' }}>
                {product.description}
              </p>
              <p style={{ color: '#f4e4d7', fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>
                ${product.price}
              </p>
              <p style={{ 
                color: '#ff6b6b', 
                fontSize: '12px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                padding: '10px',
                background: 'rgba(255, 0, 0, 0.2)',
                borderRadius: '5px'
              }}>
                {product.warning}
              </p>
              <button 
                className="glass-button" 
                style={{ width: '100%' }}
                onClick={() => alert('THIS IS SATIRE! These products do not exist and should never exist. This button does nothing.')}
              >
                <span>Add to Cart (FAKE)</span>
              </button>
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          maxWidth: '800px',
          margin: '0 auto'
        }} className="glass-card">
          <h3 style={{ color: 'white', marginBottom: '20px' }}>Legal Disclaimer</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
            None of these products exist. None of these products should ever exist. 
            Combining drugs with food products is illegal, dangerous, and stupid. 
            This entire page is satire created for an educational web development project. 
            The "Add to Cart" buttons do nothing because there is nothing to sell.
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '20px', fontSize: '14px' }}>
            If you're struggling with substance abuse, please get help: <strong>1-800-662-4357</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

