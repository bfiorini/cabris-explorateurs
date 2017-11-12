---
layout: page
title: "Contact"
meta_title: "Contact"
subheadline: ""
teaser: ""
permalink: "/contact/"
---
<form name="contact" action="/contact-success/" netlify>
  <p>
    <label>Nom: <input type="text" name="name" required></label>
  </p>
  <p>
    <label>Email: <input type="email" name="email" required></label>
  </p>
  <p>
    <label>Message: <textarea rows="8" name="message" required></textarea></label>
  </p>
  <p>
    <button type="submit">Envoyer</button>
  </p>
</form>
