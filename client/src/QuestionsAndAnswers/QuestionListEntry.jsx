import React from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionListEntry = function ({ question, collapseAnswers, moreAnswersClicked, userWantsMoreAnswers, date, onClick}) {
  return (
    <div id="questionListEntry">
      <div>
      <h4 className="qa-question-links">Q: <span className="qa-question-text-only">{question.question_body}</span><span className="qa-question-side-links"> Helpful? {' '}<a href="#" onClick={(e)=> {e.preventDefault()}}>Yes?</a>{' '}({question.question_helpfulness ? question.question_helpfulness : 0}){'   |   '}<a href="#" onClick={(e) => {onClick(e)}}> Add Answer</a></span></h4>
      </div>
      <div>
        <AnswerList
          date={date}
          answers={question.answers}
          questionId={question.question_id}
          collapseAnswers={collapseAnswers}
          moreAnswersClicked={moreAnswersClicked}
          userWantsMoreAnswers={userWantsMoreAnswers}
        />
      </div>
    </div>
  );
};

export default QuestionListEntry;
