import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'

const LeaderboardModal = ({ onClose }) => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ color: '#f4e4d7', margin: 0, fontSize: '32px' }}>🏆 Trivia Leaderboard</h2>
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

        <p style={{ 
          color: 'rgba(255, 255, 255, 0.7)', 
          marginBottom: '25px',
          textAlign: 'center',
          fontSize: '15px'
        }}>
          Top 10 Players
        </p>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.6)' }}>
            <p>Loading leaderboard...</p>
          </div>
        ) : (
          <div style={{ color: 'white', marginBottom: '30px' }}>
            {leaderboard.length === 0 ? (
              <p style={{ textAlign: 'center', opacity: 0.6, padding: '40px' }}>
                No scores yet. Be the first to play!
              </p>
            ) : (
              <div>
                {leaderboard.map((entry, index) => {
                  const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''
                  const bgColor = index === 0 
                    ? 'rgba(255, 215, 0, 0.2)' 
                    : index === 1 
                    ? 'rgba(192, 192, 192, 0.2)'
                    : index === 2
                    ? 'rgba(205, 127, 50, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)'
                  
                  const borderColor = index === 0 
                    ? 'rgba(255, 215, 0, 0.5)' 
                    : index === 1 
                    ? 'rgba(192, 192, 192, 0.5)'
                    : index === 2
                    ? 'rgba(205, 127, 50, 0.5)'
                    : 'rgba(255, 255, 255, 0.1)'

                  return (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 20px',
                      marginBottom: '12px',
                      background: bgColor,
                      borderRadius: '12px',
                      border: `2px solid ${borderColor}`,
                      transition: 'all 0.3s ease',
                      animation: `fadeInUp ${0.3 + index * 0.1}s ease-out`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ 
                          fontSize: '20px', 
                          fontWeight: 'bold',
                          minWidth: '30px'
                        }}>
                          {medal || `${index + 1}.`}
                        </span>
                        <span style={{ 
                          fontWeight: index < 3 ? 'bold' : 'normal',
                          fontSize: index < 3 ? '18px' : '16px'
                        }}>
                          {entry.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ 
                          color: '#f4e4d7',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}>
                          {entry.score}/{entry.total}
                        </span>
                        <span style={{ 
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '14px'
                        }}>
                          ({Math.round((entry.score / entry.total) * 100)}%)
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        <button className="glass-button" onClick={onClose} style={{ width: '100%', padding: '14px' }}>
          <span>Close</span>
        </button>
      </div>
    </div>
  )
}

export default LeaderboardModal

