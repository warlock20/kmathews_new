---
layout: page-about
title:
excerpt: "About Kiran Mathews — publications, theses, projects and education."
modified: 2026-09-26
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

I am Dr.-Ing. Kiran Mathews, a Senior Research Engineer at Bosch Corporate Research in Renningen, Germany, working where networking, systems software, and functional safety meet. My current work covers fault injection for automated software safety analysis, vehicle diagnostics, eBPF-based performance engineering, and in-vehicle networking. Before Bosch, I was a postdoctoral researcher at Fraunhofer IESE and co-founded Qurience GmbH (now part of Causality BioModels). I received my PhD (Dr.-Ing.) and my master's in Computer Science from the Technical University of Kaiserslautern (now [RPTU Kaiserslautern-Landau](https://rptu.de/)), where my dissertation, supervised by Prof. Dr. Reinhard Gotzhein, focused on reliability-constrained Quality-of-Service routing in IEEE 802.11 (WiFi) networks.

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
                <a class="btn btn-primary" href="{{ publications.link }}">
                  <i class="fa fa-external-link" aria-hidden="true"></i>
                  View on IEEE Xplore
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
                      {% if item.link contains '.pdf' %}
                      <a class="btn btn-primary" href="{{ item.link }}" download>
                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                        Download PDF
                      </a>
                      {% else %}
                      <a class="btn btn-primary" href="{{ item.link }}">
                        <i class="fa fa-external-link" aria-hidden="true"></i>
                        View
                      </a>
                      {% endif %}
                    </div>
                  </div>
              {% elsif item.type == "research" %}
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
                      {% if item.link contains '.pdf' %}
                      <a class="btn btn-primary" href="{{ item.link }}" download>
                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                        Download PDF
                      </a>
                      {% else %}
                      <a class="btn btn-primary" href="{{ item.link }}">
                        <i class="fa fa-external-link" aria-hidden="true"></i>
                        View
                      </a>
                      {% endif %}
                    </div>
                  </div>
              {% endif %}
            {% endfor %}
            </div>
        {% elsif section.name == "Education"%}
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
                <br>
              {% endfor %}
            </div>
          </div>
        {% elsif section.name == "Projects"%}
          <div class="tab-pane overflow-auto" id="{{section.id}}" role="tabpanel" aria-labelledby="{{section.id}}-tab">  
                <p><i>{{section.description}}</i></p>
                  {% for projects in site.data.projects %}
                  <div class="media mt-2">
                    <a href="{{ projects.link }}"></a>
                    <div class="media-body">
                      <h5 class="mt-0"><a href="{{ projects.link }}" class="highlighted">{{ projects.name }}</a></h5>
                      {{ projects.description }}
                      {% if projects.tech %}
                        <br><br>
                        <h6><mark><u>Technologies</u></mark></h6>
                        {% for tech in projects.tech %}
                        <span class="badge badge-secondary mr-1" style="background-color:{{ theme.projects-color }};">{{ tech }}</span>
                        {% endfor %}
                      {% endif %}
                    </div>
                  </div>
                  <br> <br> <br>
                  {% endfor %}
            </div>        
        {%endif%}
      {%endif%} 
    {% endfor %}
  </div>
</div>
