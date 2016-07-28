#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
import webapp2
import jinja2
import logging
from google.appengine.ext import ndb
from operator import itemgetter, attrgetter, methodcaller

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(template_dir))

def render_chart():
    chart = ""
    options = 3
    factors = 3
    for r in range (1,factors+2):
        chart = chart + "<tr>"
        for c in range (1,options+3):
          if r==1 and c==1:
              chart = chart + "<td class='row1 col1'>Factor</td>"
          elif r==1 and c==2:
              chart = chart + "<td class='row1 col2'>Weight of Factor</td>"
          elif r==1:
              if c%2==0:
                  chart = chart + "<td class='row1 coleven'><textarea align='bottom' id='name"+str(c-2)+"' class='option'>Option "+str(c-2)+"</textarea></td>"
              else:
                  chart = chart + "<td class='row1 colodd'><textarea id='name"+str(c-2)+"' class='option'>Option "+str(c-2)+"</textarea></td>"
          else:
              if c==1:
                  if r%2==0:
                      chart = chart + "<td class='roweven col1'><textarea class='factor'>Factor "+str(r-1)+"</textarea></td>"
                  else:
                      chart = chart + "<td class='rowodd col1'><textarea class='factor'>Factor "+str(r-1)+"</textarea></td>"
              elif c==2:
                  if r%2==0:
                      chart = chart + """<td class='roweven col2'>"""
                  else:
                      chart = chart + """<td class='rowodd col2'>"""
                  chart = chart + """<select id="f"""+str(r-1)+"""weight" class="dropdown">
                         <option value="1" selected>1</option>"""
                  for v in range (2,11):
                    chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                  chart = chart + """</select></td>"""
              else:
                   if r%2==0:
                       if c%2==0:
                           chart = chart + """<td class="roweven coleven">"""
                       else:
                         chart = chart + """<td class="roweven colodd">"""
                   else:
                        if c%2==0:
                            chart = chart + """<td class="rowodd coleven">"""
                        else:
                            chart = chart + """<td class="rowodd colodd">"""
                   chart = chart + """<select id='o"""+str(c-2)+"""f"""+str(r-1)+"""' class="dropdown">
                      <option value="0">Score</option>"""
                   for v in range (1,11):
                     chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                   chart = chart + """</select></td>"""
        chart = chart + "</tr>"
    template = jinja_environment.get_template('chart.html')
    return template.render({'chart':chart})

def render_college_chart():
    chart = ""
    options = 5
    factors = 10
    for r in range (1,factors+2):
        chart = chart + "<tr>"
        for c in range (1,options+3):
          if r==1 and c==1:
              chart = chart + "<td class='row1 col1'>Factor</td>"
          elif r==1 and c==2:
              chart = chart + "<td class='row1 col2'>Weight of Factor</td>"
          elif r==1:
              if c%2==0:
                  chart = chart + "<td class='row1 coleven'><textarea id='name"+str(c-2)+"' class='option'>College "+str(c-2)+"</textarea></td>"
              else:
                  chart = chart + "<td class='row1 colodd'><textarea id='name"+str(c-2)+"' class='option'>College "+str(c-2)+"</textarea></td>"
          else:
              if c==1:
                  if r==2:
                      chart = chart + "<td class='roweven col1 factor'>Affordabilty</td>"
                  elif r==3:
                      chart = chart + "<td class='rowodd col1 factor'>Size</td>"
                  elif r==4:
                      chart = chart + "<td class='roweven col1 factor'>Location</td>"
                  elif r==5:
                      chart = chart + "<td class='rowodd col1 factor'>Programs</td>"
                  elif r==6:
                      chart = chart + "<td class='roweven col1 factor'>Extra-Curriculars</td>"
                  elif r==7:
                      chart = chart + "<td class='rowodd col1 factor'>Residence Life</td>"
                  elif r==8:
                      chart = chart + "<td class='roweven col1 factor'>Campus Life</td>"
                  elif r==9:
                      chart = chart + "<td class='rowodd col1 factor'>Diversity</td>"
                  elif r==10:
                      chart = chart + "<td class='roweven col1 factor'>Post-Grad Opportunities</td>"
                  elif r==11:
                      chart = chart + "<td class='rowodd col1 factor'>Food</td>"
                  else:
                      chart = chart+"<td class='roweven col1'><textarea class='factor'>Other Factor</textarea></td>"

              elif c==2:
                  if r%2==0:
                      chart = chart + """<td class='roweven col2'>"""
                  else:
                      chart = chart + """<td class='rowodd col2'>"""
                  chart = chart + """<select id="f"""+str(r-1)+"""weight" class="dropdown">
                         <option value="1" selected>1</option>"""
                  for v in range (2,11):
                    chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                  chart = chart + """</select></td>"""
              else:
                   if r%2==0:
                       if c%2==0:
                           chart = chart + """<td class="roweven coleven">"""
                       else:
                         chart = chart + """<td class="roweven colodd">"""
                   else:
                        if c%2==0:
                            chart = chart + """<td class="rowodd coleven">"""
                        else:
                            chart = chart + """<td class="rowodd colodd">"""
                   chart = chart + """<select id='o"""+str(c-2)+"""f"""+str(r-1)+"""' class="dropdown">
                      <option value="0">Score</option>"""
                   for v in range (1,11):
                     chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                   chart = chart + """</select></td>"""
        chart = chart + "</tr>"
    template = jinja_environment.get_template('college.html')
    return template.render({'chart':chart})

def render_house_chart():
    chart = ""
    options = 3
    factors = 7
    for r in range (1,factors+2):
        chart = chart + "<tr>"
        for c in range (1,options+3):
          if r==1 and c==1:
              chart = chart + "<td class='row1 col1'>Factor</td>"
          elif r==1 and c==2:
              chart = chart + "<td class='row1 col2'>Weight of Factor</td>"
          elif r==1:
              if c%2==0:
                  chart = chart + "<td class='row1 coleven'><textarea id='name"+str(c-2)+"' class='option'>Home "+str(c-2)+"</textarea></td>"
              else:
                  chart = chart + "<td class='row1 colodd'><textarea id='name"+str(c-2)+"' class='option'>Home "+str(c-2)+"</textarea></td>"
          else:
              if c==1:
                  if r==2:
                      chart = chart + "<td class='roweven col1 factor'>Affordabilty</td>"
                  elif r==3:
                      chart = chart + "<td class='rowodd col1 factor'>Location</td>"
                  elif r==4:
                      chart = chart + "<td class='roweven col1 factor'>Size</td>"
                  elif r==5:
                      chart = chart + "<td class='rowodd col1 factor'>Layout</td>"
                  elif r==6:
                      chart = chart + "<td class='roweven col1 factor'>Safety</td>"
                  elif r==7:
                      chart = chart + "<td class='rowodd col1 factor'>Yard</td>"
                  elif r==8:
                      chart = chart + "<td class='roweven col1 factor'>School District</td>"
                  else:
                      chart = chart +"<td class='rowodd col1'><textarea class='factor'>Other Factor</textarea></td>"

              elif c==2:
                  if r%2==0:
                      chart = chart + """<td class='roweven col2'>"""
                  else:
                      chart = chart + """<td class='rowodd col2'>"""
                  chart = chart + """<select id="f"""+str(r-1)+"""weight" class="dropdown">
                         <option value="1" selected>1</option>"""
                  for v in range (2,11):
                    chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                  chart = chart + """</select></td>"""
              else:
                   if r%2==0:
                       if c%2==0:
                           chart = chart + """<td class="roweven coleven">"""
                       else:
                         chart = chart + """<td class="roweven colodd">"""
                   else:
                        if c%2==0:
                            chart = chart + """<td class="rowodd coleven">"""
                        else:
                            chart = chart + """<td class="rowodd colodd">"""
                   chart = chart + """<select id='o"""+str(c-2)+"""f"""+str(r-1)+"""' class="dropdown">
                      <option value="0">Score</option>"""
                   for v in range (1,11):
                     chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                   chart = chart + """</select></td>"""
        chart = chart + "</tr>"
    template = jinja_environment.get_template('house.html')
    return template.render({'chart':chart})

def render_dinner_chart():
    chart = ""
    options = 3
    factors = 4
    for r in range (1,factors+2):
        chart = chart + "<tr>"
        for c in range (1,options+3):
          if r==1 and c==1:
              chart = chart + "<td class='row1 col1'>Factor</td>"
          elif r==1 and c==2:
              chart = chart + "<td class='row1 col2'>Weight of Factor</td>"
          elif r==1:
              if c%2==0:
                  chart = chart + "<td class='row1 coleven'><textarea id='name"+str(c-2)+"' class='option'>Restaurant "+str(c-2)+"</textarea></td>"
              else:
                  chart = chart + "<td class='row1 colodd'><textarea id='name"+str(c-2)+"' class='option'>Restaurant "+str(c-2)+"</textarea></td>"
          else:
              if c==1:
                  if r==2:
                      chart = chart + "<td class='roweven col1 factor'>Affordabilty</td>"
                  elif r==3:
                      chart = chart + "<td class='rowodd col1 factor'>Food Quality</td>"
                  elif r==4:
                      chart = chart + "<td class='roweven col1 factor'>Location</td>"
                  elif r==5:
                      chart = chart + "<td class='rowodd col1 factor'>Service</td>"
                  else:
                      chart = chart +"<td class='roweven col1'><textarea class='factor'>Other Factor</textarea></td>"

              elif c==2:
                  if r%2==0:
                      chart = chart + """<td class='roweven col2'>"""
                  else:
                      chart = chart + """<td class='rowodd col2'>"""
                  chart = chart + """<select id="f"""+str(r-1)+"""weight" class="dropdown">
                         <option value="1" selected>1</option>"""
                  for v in range (2,11):
                    chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                  chart = chart + """</select></td>"""
              else:
                   if r%2==0:
                       if c%2==0:
                           chart = chart + """<td class="roweven coleven">"""
                       else:
                         chart = chart + """<td class="roweven colodd">"""
                   else:
                        if c%2==0:
                            chart = chart + """<td class="rowodd coleven">"""
                        else:
                            chart = chart + """<td class="rowodd colodd">"""
                   chart = chart + """<select id='o"""+str(c-2)+"""f"""+str(r-1)+"""' class="dropdown">
                      <option value="0">Score</option>"""
                   for v in range (1,11):
                     chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                   chart = chart + """</select></td>"""
        chart = chart + "</tr>"
    template = jinja_environment.get_template('dinner.html')
    return template.render({'chart':chart})

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('index.html')
        self.response.write(template.render({}))

class BlankHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_chart())

class CollegeHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_college_chart())

class HouseHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_house_chart())

class AboutHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('about.html')
        self.response.write(template.render({}))

class HowToHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('how_to.html')
        self.response.write(template.render({}))

class DinnerHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_dinner_chart())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/general', BlankHandler),
    ('/about',AboutHandler),
    ('/college',CollegeHandler),
    ('/house',HouseHandler),
    ('/how-to',HowToHandler),
    ('/dinner',DinnerHandler)
], debug=True)
