import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore'

const TriviaGame = ({ onClose, data }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [leaderboard, setLeaderboard] = useState([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  // Generate trivia questions from data
  const generateQuestions = () => {
    // Calculate statistics from data
    const drugData = {}
    data.forEach(row => {
      const drug = row.Indicator
      const value = parseFloat(row['Data Value'])
      if (!drugData[drug]) {
        drugData[drug] = { total: 0, count: 0 }
      }
      drugData[drug].total += value
      drugData[drug].count += 1
    })

    const drugAverages = Object.entries(drugData)
      .map(([drug, stats]) => ({
        drug,
        average: stats.total / stats.count
      }))
      .sort((a, b) => b.average - a.average)

    const topDrug = drugAverages[0]?.drug || 'Unknown'
    const secondDrug = drugAverages[1]?.drug || 'Unknown'
    
    // Get year with most deaths
    const yearData = {}
    data.forEach(row => {
      const year = row.Year
      const value = parseFloat(row['Data Value'])
      yearData[year] = (yearData[year] || 0) + value
    })
    const yearsRanked = Object.entries(yearData)
      .sort((a, b) => b[1] - a[1])
    const topYear = yearsRanked[0]?.[0] || '2020'

    return [
      {
        question: "What is the primary purpose of the 'Chocolate Opioid Initiative'?",
        options: [
          "To build tolerance through micro-doses in chocolate",
          "To ban all opioids nationwide",
          "To increase chocolate sales",
          "To create new drug policies"
        ],
        correct: 0,
        explanation: "According to the satirical proposal, micro-dosing in chocolate would build tolerance!"
      },
      {
        question: `Based on the data, which drug shows the highest average overdose deaths?`,
        options: [
          topDrug,
          secondDrug,
          "Aspirin",
          "Caffeine"
        ],
        correct: 0,
        explanation: `${topDrug} shows the highest average in the dataset.`
      },
      {
        question: "What's the REAL helpline for substance abuse?",
        options: [
          "1-800-CHOCOLATE",
          "1-800-662-4357 (SAMHSA)",
          "911 only",
          "No help is available"
        ],
        correct: 1,
        explanation: "SAMHSA National Helpline: 1-800-662-4357 provides 24/7 free help!"
      },
      {
        question: "Is the Chocolate Opioid Initiative real?",
        options: [
          "Yes, it's FDA approved",
          "Yes, in 5 states",
          "No, it's complete satire",
          "It's pending approval"
        ],
        correct: 2,
        explanation: "This is 100% SATIRE! No drug-infused chocolate exists or should ever exist."
      },
      {
        question: "What should you do if someone is experiencing an overdose?",
        options: [
          "Give them chocolate",
          "Wait and see if it gets better",
          "Call 911 immediately and administer Narcan if available",
          "Take them to the Chocolate Haven shop"
        ],
        correct: 2,
        explanation: "Always call 911 immediately! Narcan (naloxone) can reverse opioid overdoses."
      },
      {
        question: `According to the data, which year had the most recorded overdose deaths?`,
        options: [
          topYear,
          "1995",
          "2000",
          "2010"
        ],
        correct: 0,
        explanation: `${topYear} shows the highest total in the available data.`
      },
      {
        question: "What makes this website satirical?",
        options: [
          "Drug-infused chocolate is dangerous and illegal",
          "It uses real CDC data for a fake solution",
          "Multiple warnings say it's not real",
          "All of the above"
        ],
        correct: 3,
        explanation: "Everything about the 'initiative' is fake - but the data and crisis are very real."
      },
      {
        question: "What's the best way to prevent drug overdoses?",
        options: [
          "Eat chocolate daily",
          "Evidence-based treatment, harm reduction, and education",
          "Ignore the problem",
          "Just say no"
        ],
        correct: 1,
        explanation: "Real solutions include addiction treatment, Narcan distribution, safe injection sites, and education."
      }
    ]
  }

  const [questions] = useState(generateQuestions())

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      const q = query(
        collection(db, 'triviaLeaderboard'),
        orderBy('score', 'desc'),
        orderBy('timestamp', 'asc'),
        limit(10)
      )
      const querySnapshot = await getDocs(q)
      const scores = []
      querySnapshot.forEach((doc) => {
        scores.push(doc.data())
      })
      setLeaderboard(scores)
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    }
  }

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null) return // Already answered

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].correct
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }

    // Move to next question after delay
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setShowScore(true)
      }
    }, 2000)
  }

  const handleSubmitScore = async () => {
    if (!playerName.trim()) {
      alert('Please enter your name!')
      return
    }

    try {
      await addDoc(collection(db, 'triviaLeaderboard'), {
        name: playerName.trim(),
        score: score,
        total: questions.length,
        timestamp: Date.now()
      })
      await loadLeaderboard()
      setShowLeaderboard(true)
    } catch (error) {
      console.error('Error saving score:', error)
      alert('Error saving score. Please try again.')
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setPlayerName('')
    setShowLeaderboard(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  if (showLeaderboard) {
    return (
      <div className="modal-overlay">
        <div className="modal-content glass-card" style={{ maxWidth: '600px' }}>
          <h2 style={{ color: '#f4e4d7', marginBottom: '20px' }}>🏆 Leaderboard</h2>
          
          <div style={{ color: 'white', marginBottom: '30px' }}>
            {leaderboard.length === 0 ? (
              <p style={{ textAlign: 'center', opacity: 0.6 }}>No scores yet. Be the first!</p>
            ) : (
              <div>
                {leaderboard.map((entry, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '15px 20px',
                    marginBottom: '10px',
                    background: index === 0 ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: `2px solid ${index === 0 ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                  }}>
                    <span style={{ fontWeight: 'bold' }}>
                      {index + 1}. {entry.name}
                    </span>
                    <span style={{ color: '#f4e4d7' }}>
                      {entry.score}/{entry.total}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="glass-button" onClick={restartQuiz} style={{ flex: 1 }}>
              <span>Play Again</span>
            </button>
            <button className="glass-button" onClick={onClose} style={{ flex: 1 }}>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showScore) {
    const percentage = ((score / questions.length) * 100).toFixed(0)
    return (
      <div className="modal-overlay">
        <div className="modal-content glass-card" style={{ maxWidth: '500px' }}>
          <h2 style={{ color: '#f4e4d7', marginBottom: '20px' }}>Quiz Complete! 🎉</h2>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p style={{ fontSize: '48px', marginBottom: '10px' }}>
              {score}/{questions.length}
            </p>
            <p style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.8)' }}>
              {percentage}% Correct
            </p>
            <p style={{ marginTop: '15px', color: 'rgba(255, 255, 255, 0.7)' }}>
              {percentage >= 80 ? '🌟 Excellent!' : percentage >= 60 ? '👍 Good job!' : '📚 Keep learning!'}
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ color: 'white', display: 'block', marginBottom: '10px', fontSize: '16px' }}>
              Enter your name for the leaderboard:
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name"
              maxLength={20}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none'
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitScore()}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="glass-button" onClick={handleSubmitScore} style={{ flex: 1 }}>
              <span>Submit Score</span>
            </button>
            <button className="glass-button" onClick={restartQuiz} style={{ flex: 1 }}>
              <span>Try Again</span>
            </button>
          </div>

          <button 
            onClick={onClose}
            style={{
              marginTop: '15px',
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              width: '100%',
              padding: '10px'
            }}
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card" style={{ maxWidth: '700px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#f4e4d7', margin: 0 }}>🎯 Drug Facts Trivia</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '32px',
              cursor: 'pointer',
              padding: '0',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            <span>Question {currentQuestion + 1}/{questions.length}</span>
            <span>Score: {score}</span>
          </div>

          <div style={{ 
            height: '8px', 
            background: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #f4e4d7, #d4af87)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <h3 style={{ 
          color: 'white', 
          fontSize: '22px', 
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          {question.question}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
          {question.options.map((option, index) => {
            let backgroundColor = 'rgba(255, 255, 255, 0.08)'
            let borderColor = 'rgba(255, 255, 255, 0.2)'
            
            if (selectedAnswer !== null) {
              if (index === question.correct) {
                backgroundColor = 'rgba(40, 167, 69, 0.3)'
                borderColor = 'rgba(40, 167, 69, 0.6)'
              } else if (index === selectedAnswer && !isCorrect) {
                backgroundColor = 'rgba(220, 53, 69, 0.3)'
                borderColor = 'rgba(220, 53, 69, 0.6)'
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                style={{
                  padding: '18px 24px',
                  borderRadius: '12px',
                  border: `2px solid ${borderColor}`,
                  background: backgroundColor,
                  color: 'white',
                  fontSize: '16px',
                  cursor: selectedAnswer !== null ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  if (selectedAnswer === null) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                    e.currentTarget.style.transform = 'translateX(5px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedAnswer === null) {
                    e.currentTarget.style.background = backgroundColor
                    e.currentTarget.style.transform = 'translateX(0)'
                  }
                }}
              >
                {option}
              </button>
            )
          })}
        </div>

        {selectedAnswer !== null && (
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: isCorrect ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)',
            border: `2px solid ${isCorrect ? 'rgba(40, 167, 69, 0.5)' : 'rgba(220, 53, 69, 0.5)'}`,
            color: 'white',
            animation: 'fadeInUp 0.3s ease-out'
          }}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TriviaGame

