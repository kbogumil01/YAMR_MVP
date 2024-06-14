import React, { useState, useEffect } from 'react';
import ImageSelection from './ImageSelection';
import MultiChoiceQuestion from './MultiChoiceQuestion';
import Rating from './Rating';
import Recommendation from './Recommendation';
import FeedbackThanks from './FeedbackThanks';
import { motion, AnimatePresence } from 'framer-motion';
import './Quiz.css';
import {
  happy,
  sad,
  neutral,
  angry,
  la,
  dubai,
  soviet,
  asia,
  cat1,
  cat2,
  cat3,
  cat4,
  donkey,
  michael,
  fall,
  spring,
  summer,
  winter,
  alone,
  family,
  couple,
  party,
  logo,
  barnyard,
  wolf,
  blade_runner,
  walter_white,
  kanye
} from './assets';
import Question from './Question';

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0);
  const [thumbsDownCount, setThumbsDownCount] = useState(0); 

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setStep(step + 1);
  };

  const handleFeedback = (feedback) => {
    if (feedback === 'thumbs-up') {
      setFeedback(feedback);
      setStep(step + 1); 
    } else if (feedback === 'thumbs-down') {
      setThumbsDownCount(thumbsDownCount + 1);

      if (thumbsDownCount >= 2) {
        setFeedback('thumbs-up');
        setStep(step + 1);
      } else {
        setCurrentRecommendationIndex(currentRecommendationIndex + 1); 
      }
    }
  };

  const questions = [
    {
      type: 'multi-choice',
      question: 'Which streaming platforms do you use? (Select all that apply)',
      options: ['Netflix', 'Disney Plus', 'HBO Max', 'Amazon Prime Video', 'Any']
    },
    {
      type: 'text',
      question: 'Would you prefer to watch movie or series today?',
      options: ['Movie', 'Series', 'Surprise me']
    },
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
        { src: la, alt: 'La landscape' }, 
        { src: dubai, alt: 'Dubai picture at night' },
        { src: soviet, alt: 'Soviet union depressing buldings' }, 
        { src: asia, alt: 'Asia village landscape' }
      ] },
    { type: 'image', question: 'Choose the picture that matches your vibe the most:', images: [
        { src: cat1, alt: 'Sleepy cat wrapped in blanket' }, 
        { src: cat2, alt: 'Confused cat during shower' },
        { src: cat3, alt: 'Proud cat that is dressed up as a flower' }, 
        { src: cat4, alt: 'Cat that looks like it is drunk' }
      ] },
    { type: 'rating', question: 'Rate this clip: (dancing cow from Barnyard)', options: 
        ['😍','🤔','💩'], 
        videoSrc: barnyard 
    },
    { type: 'rating', question: 'Rate this clip: (blade runner night city)', options: 
      ['😍','🤔','💩'], 
      videoSrc: blade_runner 
    },
    { type: 'rating', question: 'Rate this clip: (dancing Jordan Belfort)', options: 
      ['😍','🤔','💩'], 
      videoSrc: wolf
    },
    { type: 'image', question: 'Who will be your companion?', images: [
        { src: donkey, alt: 'donkey from the shrek movies' },
        { src: kanye, alt: 'Kanye West' },
        { src: michael, alt: 'michael scott from the office' },
        { src: walter_white, alt: 'Walter White from breaking bad' }   
      ] }
  ];

  const currentQuestion = questions[step];

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (step === questions.length && feedback === null) {
        try {
          const requestBody = {
            questions_answers: answers.map((answer, index) => [
              questions[index].question,
              Array.isArray(answer) ? answer.join(', ') : answer
            ])
          };
          console.log(JSON.stringify(requestBody))
          const response = await fetch('http://localhost:2334/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
          }
          
          const textData = await response.text();
          console.log(textData)
          const recommendationsRegex = /\((.+?), (\d{4}), (.+?), (.+?), (\d+\.\d+)\)/g;
          let match;
          const parsedRecommendations = [];
        

          while ((match = recommendationsRegex.exec(textData)) !== null) {
            const [, title, year, director, studio, imdbRating] = match;
            parsedRecommendations.push({
              title: title.trim(),
              director: director.trim(),
              year: year.trim(),
              studio: studio.trim(),
              imdbRating: parseFloat(imdbRating)
            });
          }
          console.log(parsedRecommendations)
          setRecommendations(parsedRecommendations);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      }
    };

    fetchRecommendations();
  }, [step, feedback, answers, questions.length]);

  return (
    <div className="quiz">
      <AnimatePresence>
        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentQuestion.type === 'multi-choice' && (
              <MultiChoiceQuestion
                question={currentQuestion.question}
                options={currentQuestion.options}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion.type === 'image' && (
              <ImageSelection question={currentQuestion.question} images={currentQuestion.images} onAnswer={handleAnswer} />
            )}
            {currentQuestion.type === 'rating' && (
              <Rating question={currentQuestion.question} options={currentQuestion.options} videoSrc={currentQuestion.videoSrc} onAnswer={handleAnswer} />
            )}
            {currentQuestion.type === 'text' && (
              <Question question={currentQuestion.question} options={currentQuestion.options} onAnswer={handleAnswer}/>
            )}
          </motion.div>
        ) : feedback === null ? (
          recommendations && Array.isArray(recommendations) && currentRecommendationIndex < recommendations.length ? (
            <motion.div
              key={`recommendation-${currentRecommendationIndex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Recommendation
                movie={{
                  title: recommendations[currentRecommendationIndex].title,
                  director: recommendations[currentRecommendationIndex].director,
                  studio: recommendations[currentRecommendationIndex].studio,
                  year: recommendations[currentRecommendationIndex].year,
                  imdbRating: recommendations[currentRecommendationIndex].imdbRating,
                  src: logo
                }}
                onFeedback={handleFeedback}
              />
            </motion.div>
          ) : thumbsDownCount >= 2 ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <FeedbackThanks />
            </motion.div>
          ) : (
            <div>Loading recommendations...</div>
          )
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackThanks />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Quiz;
