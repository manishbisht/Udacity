from sqlalchemy import Column, String, Integer, Boolean, DateTime, ARRAY, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
db = SQLAlchemy()


# TODO: connect to a local postgresql database
def setup_db(app):
    app.config.from_object('config')
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)
    return db

#----------------------------------------------------------------------------#
# Models.
#----------------------------------------------------------------------------#


class Venue(db.Model):
    __tablename__ = 'Venue'

    # TODO: implement any missing fields, as a database migration using Flask-Migrate
    id = Column(Integer, primary_key=True)
    name = Column(String)
    genres = Column(ARRAY(String))
    address = Column(String(120))
    city = Column(String(120))
    state = Column(String(120))
    phone = Column(String(120))
    website = Column(String(120))
    facebook_link = Column(String(120))
    seeking_talent = Column(Boolean)
    seeking_description = Column(String(500))
    image_link = Column(String(500))
    shows = db.relationship('Show', backref='Venue', lazy='dynamic')

    def __init__(self, name, genres, address, city, state, phone, website, facebook_link, image_link,
                 seeking_talent=False, seeking_description=""):
        self.name = name
        self.genres = genres
        self.address = address
        self.city = city
        self.state = state
        self.phone = phone
        self.website = website
        self.facebook_link = facebook_link
        self.seeking_talent = seeking_talent
        self.seeking_description = seeking_description
        self.image_link = image_link

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def short(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    def long(self):
        print(self)
        return {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'state': self.state,
        }

    def details(self):
        return {
            'id': self.id,
            'name': self.name,
            'genres': self.genres,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'phone': self.phone,
            'website': self.website,
            'facebook_link': self.facebook_link,
            'seeking_talent': self.seeking_talent,
            'seeking_description': self.seeking_description,
            'image_link': self.image_link,
        }


class Artist(db.Model):
    __tablename__ = 'Artist'

    # TODO: implement any missing fields, as a database migration using Flask-Migrate
    id = Column(Integer, primary_key=True)
    name = Column(String)
    genres = Column(ARRAY(String))
    city = Column(String(120))
    state = Column(String(120))
    phone = Column(String(120))
    website = Column(String(120))
    facebook_link = Column(String(120))
    seeking_venue = Column(Boolean)
    seeking_description = Column(String(500))
    image_link = Column(String(500))
    shows = db.relationship('Show', backref='Artist', lazy='dynamic')

    def __init__(self, name, genres, city, state, phone, image_link, website, facebook_link,
                 seeking_venue=False, seeking_description=""):
        self.name = name
        self.genres = genres
        self.city = city
        self.state = state
        self.phone = phone
        self.website = website
        self.facebook_link = facebook_link
        self.seeking_venue = seeking_venue
        self.seeking_description = seeking_description
        self.image_link = image_link

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def short(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    def details(self):
        return {
            'id': self.id,
            'name': self.name,
            'genres': self.genres,
            'city': self.city,
            'state': self.state,
            'phone': self.phone,
            'website': self.website,
            'facebook_link': self.facebook_link,
            'seeking_venue': self.seeking_venue,
            'seeking_description': self.seeking_description,
            'image_link': self.image_link,
        }


# TODO Implement Show models, and complete all model relationships and properties, as a database migration.
class Show(db.Model):
    __tablename__ = 'Show'

    id = Column(Integer, primary_key=True)
    venue_id = Column(Integer, ForeignKey('Venue.id'))
    artist_id = Column(Integer, ForeignKey('Artist.id'))
    start_time = Column(DateTime, nullable=False)

    def __init__(self, venue_id, artist_id, start_time):
        self.venue_id = venue_id
        self.artist_id = artist_id
        self.start_time = start_time

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def details(self):
        return {
            'venue_id': self.venue_id,
            'venue_name': self.Venue.name,
            'artist_id': self.artist_id,
            'artist_name': self.Artist.name,
            'artist_image_link': self.Artist.image_link,
            'start_time': self.start_time
        }

    def artist_details(self):
        return {
            'artist_id': self.artist_id,
            'artist_name': self.Artist.name,
            'artist_image_link': self.Artist.image_link,
            'start_time': self.start_time
        }

    def venue_details(self):
        return {
            'venue_id': self.venue_id,
            'venue_name': self.Venue.name,
            'venue_image_link': self.Venue.image_link,
            'start_time': self.start_time
        }

