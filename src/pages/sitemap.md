---
layout: page
title: "Plan du site"
subheadline: ""
excerpt: ""
permalink: "/plan/"
---

<h2>Pages</h2>
<ul>
  <li><a href="{% link pages/info.md %}">Qui sommes-nous ?</a></li>
  <li><a href="{% link pages/contact.md %}">Contact</a></li>
  <li><a href="{% link pages/licenses.md %}">Lincences</a></li>
  <li><a href="{% link pages/privacy.md %}">Données personnelles</a></li>
</ul>

<h2>Articles de blog</h2>
<ul>
  <li><a href="{{ '/blog/' | relative_url }}">Tous les articles</a></li>
  <ul>
    {% for post in site.posts %}
    <li><a href="{{ post.url | relative_url}}">{{ post.title | markdownify | remove: '<p>' | remove: '</p>' }}</a></li>
    {% endfor %}
  </ul>
  <li>Toutes les catégories</li>
  <ul>
    {% for category in site.data.categories %}
    {% assign slug = category.name | downcase %}
    <li><a href="{{ site.category_base_path | relative_url | append: slug }}">{{ category.name | widont }}</a></li>
    {% endfor %}
  </ul>
</ul>

<h2>Escalade</h2>
<ul>
  <li><a href="{% link pages/routes.md %}">Toutes les voies</a></li>
  <li><a href="{% link pages/areas.md %}">Tous les sites</a></li>
  <ul>
    {% assign areas = site.areas | sort: 'title' | sort: 'region' %}
    {% for area in areas %}
    <li><a href="{{ area.url | relative_url }}">{{ area.region }} &middot; {{ area.title }}</a></li>
    {% endfor %}
  </ul>
</ul>

<p>Pour les robots, voilà la <a href="{{ 'sitemap.xml' | relative_url }}">version XML</a></p>
