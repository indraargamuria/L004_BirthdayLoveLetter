'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import Quest from './components/Quest'
import LoveLetter from './components/LoveLetter'
import heartAnimation from '../lottie/heartAnimation.json'
import dynamic from 'next/dynamic'

// Gunakan dynamic import untuk Lottie agar hanya diproses di sisi klien
const LottieClientOnly = dynamic(() => import('lottie-react'), { ssr: false })

const HomePage = () => {
  const [showPageAwal, setShowPageAwal] = useState(true)
  const [showQuest, setShowQuest] = useState(false)
  const [questCompleted, setQuestCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const handleStartAdventure = () => {
    setShowPageAwal(false)
    setShowQuest(true)
  }

  const handleQuestComplete = () => {
    setQuestCompleted(true)
    setShowQuest(false)
  }

  useEffect(() => {
    // Pastikan ini hanya dijalankan di sisi klien
    setIsClient(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500 text-white p-6">
      {/* Show only Page Awal */}
      {showPageAwal && (
        <>
          <div className="mb-8">
            {isClient && (
              <LottieClientOnly animationData={heartAnimation} loop={true} autoplay={true} />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Happy birthday istriku!</h1>
          <p className="text-lg md:text-xl text-center mb-8">
            Suamimu ini punya sedikit kejutan 💖
          </p>
          <button
            onClick={handleStartAdventure}
            className="bg-white text-pink-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-100 mb-8"
          >
            Yuk mulai
          </button>
        </>
      )}

      {/* Show Quest after "Start the Adventure" clicked */}
      {showQuest && <Quest onComplete={handleQuestComplete} />}

      {/* Show Love Letter after completing quest */}
      {questCompleted && (
        <div className="transition-opacity opacity-100 duration-1000 ease-in-out">
          <LoveLetter />
        </div>
      )}
    </div>
  )
}

export default HomePage
