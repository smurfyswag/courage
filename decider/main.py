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
                  chart = chart + "<td class='row1 coleven'><textarea id='name"+str(c-2)+"' class='option'>Option "+str(c-2)+"</textarea></td>"
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
                      <option value="0">Choose a Score</option>"""
                   for v in range (1,11):
                     chart = chart + "<option value='"+str(v)+"'>"+str(v)+"</option>"
                   chart = chart + """</select></td>"""
        chart = chart + "</tr>"
    template = jinja_environment.get_template('chart.html')
    return template.render({'chart':chart})

class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('Hello world!')
logging.info("Hello. I am running")
class BlankHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_chart())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/generaldecision', BlankHandler),
], debug=True)
