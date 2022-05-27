import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  var contactName = 'FindYou';
  var zip = "802301";
  var phone = "+(91) 987654321";
  var contactEmail = "help@findyou.com";

  const submitForm = () => {
    if (email !== '' && message !== '') {
      window.open(
        `mailto:${contactEmail}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(name)} (${encodeURIComponent(
          email
        )}): ${encodeURIComponent(message)}`
      );
    }
  };

  return (
    <section id="contact">
      <div className="row section-head">
        <div className="two columns header-col">
          <h1>
            <span>Get In Touch.</span>
          </h1>
        </div>

        <div className="ten columns">
          <p className="lead">If you have been affected by disappearance or have any information about missing person, please write to us.  </p>
        </div>
      </div>

      <div className="row">
        <div className="eight columns">
          <form onSubmit={submitForm}>
            <fieldset>
              <div>
                <label htmlFor="contactName">
                  Name
                  {/* <span className="required">*</span> */}
                </label>
                <input
                  type="text"
                  defaultValue=""
                  value={name}
                  size="35"
                  id="contactName"
                  name="contactName"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contactEmail">
                  Email / Contact No. <span className="required">*</span>
                </label>
                <input
                  type="email"
                  defaultValue=""
                  value={email}
                  size="35"
                  id="contactEmail"
                  name="contactEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  required

                />
              </div>

              <div>
                <label htmlFor="contactSubject">Subject</label>
                <input
                  type="text"
                  defaultValue=""
                  value={subject}
                  size="35"
                  id="contactSubject"
                  name="contactSubject"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contactMessage">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  cols="50"
                  rows="15"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="contactMessage"
                  name="contactMessage"
                  required

                ></textarea>
              </div>

              <div>
                <button onClick={submitForm} type="submit" className="submit">
                  Send
                </button>
              </div>
            </fieldset>
          </form>

        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Address and Phone</h4>
            <p className="address">
              {/* {contactName} */}
              <br />
              <i class="fa fa-envelope" aria-hidden="true"></i>
              &nbsp;
              &nbsp;
              {contactEmail}
              <br />
              <i className="fa fa-phone" aria-hidden="true"></i>
              &nbsp;
              &nbsp;
              <span>{phone}</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
