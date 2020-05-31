from app import db
from datetime import datetime

class Attendee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conference_id = db.Column(db.Integer, nullable=False)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    job_position = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)
    company = db.Column(db.Text, nullable=False)
    city = db.Column(db.Text, nullable=False)
    state = db.Column(db.Text, nullable=False)
    interests = db.Column(db.Text, nullable=False)
    comments = db.Column(db.Text, nullable=False)
    submitted_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return "{} {}".format(self.first_name, self.last_name)

class Conference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    address = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return "Conference: {}".format(self.name)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status =  db.Column(db.Text, nullable=False)
    message =  db.Column(db.Text)
    subject =  db.Column(db.Text)
    submitted_date = db.Column(db.DateTime(timezone=True))
    completed_date = db.Column(db.DateTime(timezone=True))

    def __repr__(self):
        return "Notification#{}, status:{}".format(self.id, self.status)
