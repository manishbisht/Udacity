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
import hmac
import re
import webapp2
import jinja2
from user import User
from google.appengine.ext import db

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir),
                               autoescape=True)

secret = "_secret_"


def render_str(template, **params):
    t = jinja_env.get_template(template)
    return t.render(params)


def make_secure_val(val):
    return '%s|%s' % (val, hmac.new(secret, val).hexdigest())


def check_secure_val(secure_val):
    val = secure_val.split('|')[0]
    if secure_val == make_secure_val(val):
        return val


class BlogHandler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))

    def set_secure_cookie(self, name, val):
        cookie_val = make_secure_val(val)
        self.response.headers.add_header('Set-Cookie',
                                         '%s=%s; Path=/' % (name, cookie_val))

    def read_secure_cookie(self, name):
        cookie_val = self.request.cookies.get(name)
        return cookie_val and check_secure_val(cookie_val)

    def login(self, user):
        self.set_secure_cookie('user_id', str(user.key().id()))

    def logout(self):
        self.response.headers.add_header('Set-Cookie', 'user_id=; Path=/')

    def initialize(self, *a, **kw):
        webapp2.RequestHandler.initialize(self, *a, **kw)
        uid = self.read_secure_cookie('user_id')
        self.user = uid and User.by_id(int(uid))


def blog_key(name='default'):
    return db.key.from_path('blogs', name)


class Post(db.Model):
    author = db.StringProperty(required=True)
    subject = db.StringProperty(required=True)
    content = db.TextProperty(required=True)
    created = db.DateTimeProperty(auto_now_add=True)
    last_modified = db.DateTimeProperty(auto_now=True)

    def render(self, post_page=None, user=None):
        self._render_text = self.content.replace('\n', '<br>')
        likes = Like.all().filter('post =', self.key().id()).count()
        if user:
            like = Like.all().filter('user =', user.key().id()).filter('post =', self.key().id()).get()
            return render_str("post.html", p=self, post_page=post_page, user=user, like=like, likes=likes)
        else:
            return render_str("post.html", p=self, post_page=post_page, user=user, likes=likes)


class Like(db.Model):
    created = db.DateTimeProperty(auto_now_add=True)
    user = db.IntegerProperty(required=True)
    post = db.IntegerProperty(required=True)


class MainHandler(BlogHandler):
    def get(self):
        posts = db.GqlQuery(
            "select * from Post order by created desc limit 10")
        if self.user:
            self.render('front.html', posts=posts, user=self.user)
        else:
            self.render('front.html', posts=posts)

class LikePage(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id))
        post = db.get(key)
        if not post:
            self.error(404)
            return
        elif not self.user:
            self.render('login.html')
        elif post.author == self.user.name:
            self.write("You can't like this post as this post is created by you.")
        else:
            user = self.user.key().id()
            post = post.key().id()
            like = Like.all().filter('user =', user).filter('post =', post).get()
            if like:
                self.redirect('/posts/%s' % str(post))
            else:
                p = Like(user=user, post=post)
                p.put()
                self.redirect('/posts/%s' % str(post))

class PostPage(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id))
        post = db.get(key)
        if not post:
            self.error(404)
            return
        likes = Like.all().filter('post =', post.key().id()).count()
        if self.user:
            like = Like.all().filter('user =', self.user.key().id()).filter('post =', post.key().id()).get()
            self.render('permalink.html', post=post, user=self.user, likes=likes)
        else:
            self.render('permalink.html', post=post, user=self.user, likes=likes)


class EditPage(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id))
        post = db.get(key)
        if not post:
            self.error(404)
            return
        elif not self.user:
            self.render('login.html')
        elif post.author != self.user.name:
            self.write("This post is not created by you.")
        else:
            self.render('edit.html', subject=post.subject, content=post.content,
                    user=self.user)

    def post(self, post_id):
        subject = self.request.get('subject')
        content = self.request.get('content')
        key = db.Key.from_path('Post', int(post_id))
        p = db.get(key)
        if not p:
            self.error(404)
            return
        elif not self.user:
            self.render('login.html')
        elif p.author != self.user.name:
            self.write("This post is not created by you.")
        else:
            if subject and content:
                p.author = self.user.name
                p.subject = subject
                p.content = content
                p.put()
                self.redirect('/posts/%s' % str(p.key().id()))
            else:
                error = "All fields are Required"
                self.render('create.html', subject=subject, content=content,
                            error=error)


class DeletePage(BlogHandler):
    def get(self, post_id):
        key = db.Key.from_path('Post', int(post_id))
        post = db.get(key)
        if not post:
            self.error(404)
            return
        elif not self.user:
            self.render('login.html')
        elif post.author != self.user.name:
            self.write("This post is not created by you.")
        else:
            db.delete(post)
            self.redirect('/')


class NewPost(BlogHandler):
    def get(self):
        if self.user:
            self.render("create.html", user=self.user)
        else:
            self.redirect('/login')

    def post(self):
        subject = self.request.get('subject')
        content = self.request.get('content')
        if subject and content:
            p = Post(author=self.user.name, subject=subject, content=content)
            p.put()
            self.redirect('/posts/%s' % str(p.key().id()))
        else:
            error = "All fields are Required"
            self.render('create.html', subject=subject, content=content,
                        error=error)


USER_RE = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")


def valid_username(username):
    return username and USER_RE.match(username)


PASS_RE = re.compile(r"^.{3,20}$")


def valid_password(password):
    return password and PASS_RE.match(password)


EMAIL_RE = re.compile(r"^[\S]+@[\S]+\.[\S]+$")


def valid_email(email):
    return not email or EMAIL_RE.match(email)


class Signup(BlogHandler):
    def get(self):
        if self.user:
            self.redirect('/')
        else:
            self.render("register.html", hide=1)

    def post(self):
        have_error = False
        self.username = self.request.get('username')
        self.password = self.request.get('password')
        self.cpassword = self.request.get('cpassword')
        self.email = self.request.get('email')
        params = dict(username=self.username, email=self.email)

        if not valid_username(self.username):
            params['error_username'] = "Enter valid username"
            have_error = True
            params['username'] = ""

        if not valid_password(self.password):
            params['error_password'] = "Enter valid password"
            have_error = True

        elif self.password != self.cpassword:
            params['error_password'] = "Password doesnt match"
            have_error = True

        if not valid_email(self.email):
            params['error_email'] = "Enter valid email address"
            have_error = True
            params['email'] = ""

        if have_error:
            self.render("register.html", **params)
        else:
            self.done()

    def done(self):
        u = User.by_name(self.username)
        if u:
            msg = 'This username already exists'
            self.render("register.html", error_username=msg)
        else:
            u = User.register(self.username, self.password, self.email)
            u.put()
            self.login(u)
            self.redirect('/')


class Login(BlogHandler):
    def get(self):
        if self.user:
            self.redirect('/')
        else:
            self.render('login.html', hide=1)

    def post(self):
        username = self.request.get('username')
        password = self.request.get('password')

        if username and password:
            u = User.login(username, password)
            if u:
                self.login(u)
                self.redirect('/')
            else:
                msg = "Invalid login details"
                self.render('login.html', error=msg)
        else:
            msg = "Enter username and password"
            self.render('login.html', error=msg)


class Logout(BlogHandler):
    def get(self):
        self.logout()
        self.redirect('/')


app = webapp2.WSGIApplication([
    ('/?', MainHandler),
    ('/posts/([0-9]+)', PostPage),
    ('/edit/([0-9]+)', EditPage),
    ('/delete/([0-9]+)', DeletePage),
    ('/like/([0-9]+)', LikePage),
    ('/create', NewPost),
    ('/register', Signup),
    ('/login', Login),
    ('/logout', Logout)
], debug=True)
