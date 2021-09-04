---
layout: page-about
title:
excerpt: "So Simple is a responsive Jekyll theme for your words and images."
modified: 2014-08-08T19:44:38.564948-04:00
image:
feature:
credit:
creditlink:
---


{% if page.image.feature %}<header class="masthead">
	{% if site.logo != null %}
  <div class="wrap">
   <a href="{{ site.url }}/" class="site-logo" rel="home" title="{{ site.title }}"><img src="{{ site.url }}/images/{{ site.logo }}" width="200" height="200" alt="{{ site.title }} logo" class="animated fadeInDown"></a>
 </div>
 {% endif %}
</header><!-- /.masthead -->
{% else %}<header class="masthead">
	<div class="wrap">
    {% if site.logo != null %}
    <a href="{{ site.url }}/" class="site-logo" rel="home" title="{{ site.title }}"><img src="{{ site.url }}/images/{{ site.logo }}" width="200" height="200" alt="{{ site.title }} logo" class="animated fadeInDown"></a>
    {% endif %}
    <h1 class="site-title animated fadeIn"><a href="{{ site.url }}/">{{ site.title }}</a></h1>
    <h2 class="site-description animated fadeIn" itemprop="description">{{ site.description }}</h2>
  </div>
</header><!-- /.masthead -->{% endif %}

## About Me:

I am Kiran Mathews, a hardcore Gooner and PhD student supervised by Prof Reinhard Gotzhein at Technische Universität Kaiserslautern, Germany. I have completed my masters in Computer Science from the [Technical University of Kaiserslautern](https://www.uni-kl.de/), Germany. My research areas are in Distributed protocols, Wireless communications, Ad-hoc networks and Network Security. I am also working as Research Assistant in [Networked Systems](http://vs.cs.uni-kl.de/) in TU KL.

<!--

  <ul class="nav nav-tabs">
      {% for section in site.data.sections %}
        {% if section.first %}
          <li >
            <a data-toggle="tab" id="{{ section.jsid }}" href="#{{section.id}}" role="tab" aria-controls="{{section.id}}" aria-selected="true" style="font-family:{{ theme.font}};color:{{ theme.home-highlight-header-text}};">{{section.emoji}} {{section.name}}</a>
          </li>
        {% else %}
          <li >
              <a data-toggle="tab"  id="{{ section.jsid }}" href="#{{section.id}}" role="tab" aria-controls="{{section.id}}" aria-selected="true" style="font-family:{{ theme.font}};color:{{ theme.home-highlight-header-text}};">{{section.emoji}} {{section.name}}</a>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  <div class="card-body">          
      <div class="tab-content mt-3">
        {% for section in site.data.sections %}
          {% if section.first %}
            {% if section.name == "Publications" %}
              <div class="tab-pane active overflow-auto" id="{{section.id}}" role="tabpanel">
                <p><i>{{section.description}}</i></p>
              </div>
            {% else %}
              <div class="tab-pane overflow-auto" id="{{section.id}}" role="tabpanel">
                <p class="card-text">{{section.description}}</p>
              </div>
            {% endif %}
          {% else %}  
            {% if section.name == "Presentations" %}
              <div class="tab-pane overflow-auto" id="{{section.id}}" role="tabpanel" aria-labelledby="{{section.id}}-tab">  
                <p><i>{{section.description}}</i></p>
              </div>
            {% elsif section.name == "Projects" %}
              <div class="tab-pane overflow-auto" id="{{section.id}}" role="tabpanel" aria-labelledby="{{section.id}}-tab">  
                <p><i>{{section.description}}</i></p>
                  {% for projects in site.data.projects %}
                  <div class="media mt-2">
                    <a href="{{ projects.link }}"><img src="{{ projects.image }}" class="mr-3 mb-2 img-thumbnail border-0" alt="..."></a>
                    <div class="media-body">
                      <h5 class="mt-0"><a href="{{ projects.link }}" class="highlighted">{{ projects.name }}</a></h5>
                      {{ projects.description }}
                      {% if projects.tech %}
                        <h6><mark><u>Technologies</u></mark></h6>
                        {% for tech in projects.tech %}
                        <span class="badge badge-secondary mr-1" style="background-color:{{ theme.projects-color }};">{{ tech }}</span>
                        {% endfor %}
                      {% endif %}
                    </div>
                  </div>
                  {% endfor %}
                </div>        
            {% elsif section.name == "Teaching" %}
              <div class="tab-pane overflow-auto" id="{{section.id}}" role="tabpanel" aria-labelledby="{{section.id}}-tab">  
                <p><i>{{section.description}}</i></p>
                    {% for courses in site.data.teaching %}
                    <div class="list-group">
                      <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">{{ courses.Schoool }}</h5>
                          <p>{{ courses.Program }}</p>
                          <small>{{ courses.StartDate }} - {{ courses.EndDate }}</small>
                        </div>
                        <p class="mb-1">{{ courses.description }}</p>
                        <small>{{ courses.Department }}</small>
                      </div>
                    </div>
                    {% endfor %}
              </div>
            {% elsif section.name == "Coursework" %}
              <div class="tab-pane overflow-auto" id="{{section.id}}" role="tabpanel" aria-labelledby="{{section.id}}-tab">  
                <p><i>{{section.description}}</i></p>
                <div class="list-group">
                {% for courses in site.data.courses %}
                  <button type="button" class="list-group-item text-left">{{ courses.Course }}</button>
                {% endfor %}
                </div>
              </div>
            {% else %}
              <div class="tab-pane overflow-auto" id="{{section.id}}" role="tabpanel" aria-labelledby="{{section.id}}-tab">  
                <h5 class="card-title text-center"><a href="/{{ section.url }}" class="highlighted">{{section.description}}</a></h5>
                <p class="card-text">{{ section.content }} </p>              
              </div>
            {% endif %}
          {% endif %}
        {% endfor %}
      </div>
  </div>

  -->