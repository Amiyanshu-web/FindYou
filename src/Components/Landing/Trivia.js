import React from "react";


const Trivia = () => {
  const [fact, setFact] = React.useState(["A deeply disturbing fact about India’s missing children is that while on an average 174 children go missing every day, half of them remain untraceable.", "Every month, 64,851 children, women and men go missing.", "Every day, 2,130 children, women and men go missing.", "Every hour, an average of 12 children go missing across India. ", " On average, a child goes missing every 10 minutes in India", "In 2019, NCRB data revealed that 4,22,439 women and 2,70,433 men were reported missing in India."])

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1>
              <span>Trivia</span>
            </h1>
          </div>

          <div className="ten columns flex-container">
            <ul className="slides">
              <li>
                <blockquote>
                  {/* <p>A deeply disturbing fact about India’s missing children is that while on an average 174 children go missing every day, half of them remain untraceable.</p> */}
                  {/* get random fact */}
                  <p>{fact[Math.floor(Math.random() * fact.length)]}</p>
                </blockquote>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trivia;
