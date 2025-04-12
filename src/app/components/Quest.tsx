'use client'

import { useState } from 'react'
import wrongAnimation from '../../lottie/wrongAnimation.json' // Path ke animasi wrong

import dynamic from 'next/dynamic'

// Gunakan dynamic import untuk Lottie agar hanya diproses di sisi klien
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const Quest = ({ onComplete }: { onComplete: () => void }) => {
  const [answered, setAnswered] = useState(false)
  const [answer, setAnswer] = useState('')
  const [showWrongAnimation, setShowWrongAnimation] = useState(false)
  const [buttonClass, setButtonClass] = useState('bg-pink-500') // Class button
  const [attempts, setAttempts] = useState(0) // Counter untuk jawaban
  const [showContinueButton, setShowContinueButton] = useState(false) // Tombol untuk melanjutkan
  const maxAttempts = 3 // Tentukan jumlah maksimal kesempatan

  const handleAnswer = () => {
    if (answer.trim() !== '') {
      // Set animation "wrong" visible
      setShowWrongAnimation(true)
      setButtonClass('bg-red-500') // Set button color to red

      setTimeout(() => {
        setAttempts(prev => prev + 1)  // Tambahkan 1 ke counter setiap kali jawab
        setShowWrongAnimation(false)  // Hide animation after answer
        setButtonClass('bg-pink-500') // Reset button color

        if (attempts + 1 === maxAttempts) {
          // Setelah 3 kali, munculkan tombol untuk lanjutkan
          setShowContinueButton(true)
        } else {
          // Reset input field untuk percakapan berikutnya
          setAnswer('')
        }
      }, 2000)  // Delay 1 detik untuk animasi dan efek geter)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto mt-8">
      
      {attempts < maxAttempts && (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Mini quest (Kamu hanya punya 3x kesempatan menjawab)</h2>
          <p className="text-lg text-gray-600 mb-4">Menurutmu, dari seluruh momen kita bersama, mana momen yang suamimu pikir paling romantis?</p>
          
        </div>
      )}
      {!answered ? (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center mb-4 w-full">
            {showWrongAnimation && (
              <div className="mt-2 w-16"> {/* Memberikan jarak antara input dan animasi */}
                <Lottie animationData={wrongAnimation} loop={false} autoplay={true} />
              </div>
            )}
          </div>

          
          {/* Menampilkan sisa kesempatan */}
          {attempts < maxAttempts && (
            <div>
              <input
                type="text"
                className="p-3 border border-gray-300 rounded-md w-full text-gray-700"
                placeholder="Your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                onClick={handleAnswer}
                className={`text-white mt-6 px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 ${buttonClass}`}
              >
                Jawab
              </button>
              <p className="mt-4 text-lg text-gray-700">
                Tinggal {maxAttempts - attempts} kesempatan lagi!
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-green-600">Unused</p>
      )}

      {showContinueButton && (
        
        <div>
          <p className="text-lg mb-6 text-green-600">Jawabannya salah semua! Karena seluruh momen menurutku romantis hehehe 😆</p>
          <button
            onClick={onComplete}
            className="bg-pink-500 text-white px-6 py-3 rounded-full text-lg hover:bg-pink-600"
          >
            Tapi karena kamu sudah menyelesaikan quest, klik tombol ini untuk klaim hadiah kamu 😆
          </button>
        </div>
      )}
    </div>
  )
}

export default Quest
