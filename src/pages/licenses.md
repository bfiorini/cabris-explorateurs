---
layout: page
title: "Licences"
subheadline: ""
excerpt: "Merci"
permalink: "/licences/"
---

<ul>
  {% for lincense in site.data.licenses %}
  <li {% if lincense.class %}class="{{ lincense.class }}" {% endif %}>
    <a href="{{ lincense.url }}" target="_blank" title="{{ lincense.name }}" rel="noopener">{{ lincense.name }}</a>
  </li>
  {% endfor %}
</ul>
