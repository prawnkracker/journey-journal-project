from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt 

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-reviews.user')
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    bio = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'User: {self.username} | ID: {self.id} | Bio: {self.bio}'
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    __table_args__ = (db.CheckConstraint('LENGTH(review) >= 25'),)
    serialize_rules = ('-user.reviews')

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String, nullable=False)
    date_created = db.Column(db.DateTime, server_default = db.func.now())
    date_updated = db.Column(db.DateTime, onupdate = db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'Review {self.review}'