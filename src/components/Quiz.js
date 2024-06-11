import React, { useState } from 'react';
import Question from './Question';
import ImageSelection from './ImageSelection';
import Rating from './Rating';
import Recommendation from './Recommendation';
import FeedbackThanks from './FeedbackThanks';
import { motion, AnimatePresence } from 'framer-motion';
import './Quiz.css';
import happy from '../pics/happy.avif'
import sad from '../pics/sad.avif'
import neutral from '../pics/neutral.avif'
import angry from '../pics/angry.avif'
import la from '../pics/la.avif'
import dubai from '../pics/dubai.avif'
import soviet from '../pics/soviet.avif'
import asia from '../pics/asia.avif'
import cat1 from '../pics/cat1.avif'
import cat2 from '../pics/cat2.avif'
import cat3 from '../pics/cat3.avif'
import cat4 from '../pics/cat4.avif'
import donkey from '../pics/donkey.avif'
import ace from '../pics/ace.webp'
import bean from '../pics/bean.webp'
import michael from '../pics/michael.avif'
import fall from '../pics/fall.avif'
import spring from '../pics/spring.avif'
import summer from '../pics/summer.avif'
import winter from '../pics/winter.avif'
import alone from '../pics/alone.avif'
import family from '../pics/family.avif'
import couple from '../pics/couple.avif'
import party from '../pics/party.avif'
import recommendation from '../pics/recommendation.webp'
import barnyard from '../videos/barnyard.mp4'
import wolf from '../videos/wolf.mp4'




function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setStep(step + 1);
  };

  const handleFeedback = (feedback) => {
    setFeedback(feedback);
    setStep(step + 1);
  };

  const questions = [
    { type: 'image', question: 'Choose your circumstances:', images: [
      { src: alone, alt: 'alone' }, 
      { src: family, alt: 'family' }, 
      { src: couple, alt: 'couple' }, 
      { src: party, alt: 'party' }
    ] },
    { type: 'image', question: 'Which pic describes the best your current mood?', images: [
        { src: happy, alt: 'Happy' }, 
        { src: sad, alt: 'Sad' }, 
        { src: neutral, alt: 'Neutral' }, 
        { src: angry, alt: 'Angry' }
      ] },
    { type: 'image', question: 'Just choose your favourite season:', images: [
        { src: spring, alt: 'spring' }, 
        { src: winter, alt: 'winter' }, 
        { src: fall, alt: 'fall' }, 
        { src: summer, alt: 'sunny' }
      ] },
    { type: 'image', question: 'Choose the picture that matches your vibe the most:', images: [
        { src: la, alt: 'La' }, 
        { src: dubai, alt: 'Dubai' },
        { src: soviet, alt: 'Soviet' }, 
        { src: asia, alt: 'Asia' }
      ] },
    { type: 'image', question: 'Choose the picture that matches your vibe the most:', images: [
        { src: cat1, alt: 'Cat1' }, 
        { src: cat2, alt: 'Cat2' },
        { src: cat3, alt: 'Cat3' }, 
        { src: cat4, alt: 'Cat4' }
      ] },
    { type: 'rating', question: 'Rate this clip:', options: 
        ['😍','🤔','💩'], 
        videoSrc: barnyard
    },
    { type: 'rating', question: 'Rate this clip:', options: 
        ['😍','🤔','💩'], 
        videoSrc: wolf 
    },
    { type: 'image', question: 'Who will be your companion?', images: [
        { src: donkey, alt: 'donkey' },
        { src: michael, alt: 'michael' },
        { src: bean, alt: 'bean' },
        { src: ace, alt: 'ace' }
      ] }
  ];

  const currentQuestion = questions[step];

  return (
    <div className="quiz">
      <AnimatePresence>
        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentQuestion.type === 'text' && (
              <Question question={currentQuestion.question} options={currentQuestion.options} onAnswer={handleAnswer} />
            )}
            {currentQuestion.type === 'image' && (
              <ImageSelection question={currentQuestion.question} images={currentQuestion.images} onAnswer={handleAnswer} />
            )}
            {currentQuestion.type === 'rating' && (
              <Rating question={currentQuestion.question} options={currentQuestion.options} onAnswer={handleAnswer} />
            )}
          </motion.div>
        ) : feedback === null ? (
          <motion.div
            key="recommendation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Recommendation movie={{ title: 'UP', src: recommendation }} onFeedback={handleFeedback} />
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeedbackThanks />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Quiz;
