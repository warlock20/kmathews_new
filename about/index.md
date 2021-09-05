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
 <br> <br> <br>

<!--https://www.w3schools.com/bootstrap4/bootstrap_navs.asp
    https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_nav_pills_toggleable&stacked=h-->
<div class="container shadow-lg p-3 mb-5 bg-white rounded" id="box-shadow">
  <br>
  <!-- Nav pills -->
  <ul class="nav nav-pills nav-fill" role="tablist">
    {% for section in site.data.sections %}
    {% if section.first %}
    <li class="nav-item">
      <a class="nav-link active" data-toggle="pill" id="{{ section.jsid }}" href="#{{section.id}}" >{{section.emoji}} {{section.name}}</a>
    </li>
    {% else %}
    <li class="nav-item">
      <a class="nav-link" data-toggle="pill" id="{{ section.jsid }}" href="#{{section.id}}">{{section.emoji}} {{section.name}}</a>
    </li>
    {% endif %}
    {% endfor %}
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    {% for section in site.data.sections %}
      {% if section.first %}
        {% if section.name == "Conference Papers"%}
          <div id="{{section.id}}" class="container tab-pane active"><br>
            {% for publications in site.data.conferencePapers %}
            <div class="media mt-2">
              <div class="media-body">
                <h4 class="mt-0">{{ publications.name }}</h4>
                <h6 class="mt-0">{{ publications.conference }}</h6>
                {{ publications.description }}
                <br>
                <br>
                <a class="btn btn-primary" href="{{ publications.link }}" download>
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  Download PDF
                </a>
              </div>
              </div>
            {% endfor %}
          </div>
        {% endif%}
      {% else %}
        {% if section.name == "Theses & Research Reports"%}
          <div id="{{section.id}}" class="container tab-pane"><br>
            {% for item in site.data.thesesAndReports %}
              {% if item.type == "thesis"%}
                {% if item.first %}
                  <h2 class="mt-0">List of Theses</h2>
                {% endif %}
                  <div class="media mt-2">
                    <div class="media-body">
                      <h4 style=" margin-top: 0; margin-bottom: 0;">{{ item.name }}</h4>
                      <h6>{{ item.category }}</h6>
                      {{ item.description }}
                      <br>
                      <br>
                      <a class="btn btn-primary" href="{{ item.link }}" download>
                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                        Download PDF
                      </a>
                    </div>
                  </div>
              {% else if item.type == "research" %}
                {% if item.first %}
                <h2 class="mt-0">Research reports</h2>
                {% endif %}
                  <div class="media mt-2">
                    <div class="media-body">
                      <h4 style=" margin-top: 0; margin-bottom: 0;">{{ item.name }}</h4>
                      <h6>{{ item.category }}</h6>
                      {{ item.description }}
                      <br>
                      <br>
                      <a class="btn btn-primary" href="{{ item.link }}" download>
                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                        Download PDF
                      </a>
                    </div>
                  </div>
              {% endif %}
            {% endfor %}
            </div>
        {% else if section.name == "Education"%}
          <div id="{{section.id}}" class="container tab-pane"><br>
            <div class="list-group">
              {% for item in site.data.education %}
                 <a  class="list-group-item list-group-item-action flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">{{item.program}}</h4>
                    <small>{{item.startDate}} - {{item.endDate}}</small>
                  </div>
                  <p class="mb-1">{{item.school}}</p>
                  <small>{{item.description}}</small>
                </a>
              {% endfor %}
            </div>
          </div>
        {% else%}
            <div id="{{section.id}}" class="container tab-pane"><br>
              <h3>{{section.name}}</h3>
              <p>{{section.description}}</p>
            </div>
        {%endif%}
      {%endif%} 
    {% endfor %}
  </div>
</div>
