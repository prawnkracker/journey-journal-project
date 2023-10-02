#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Review, Trip

# Views go here!
class Homepage(Resource):
    def get(self):
        return 'Welcome to the Journey Journal API'

class Signup(Resource):
    def post(self):
        json = request.get_json()
        user = User(
            username=json.get('username'),
            bio=json.get('bio'),
            image_url=json.get('image_url')
        )
        user.password_hash=json.get('password')
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id']= user.id
            return user.to_dict(only=('id','username','bio','image_url')), 201
        except IntegrityError as e:
            db.session.rollback()
            return {"message":"Unprocessable entity."}, 422

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session['user_id']).first()
        if user:
            return user.to_dict(only=('id','username','bio','image_url')), 200
        else:
            return {"message":"User not logged in."}, 401
        
class Login(Resource):
    def post(self):
        json=request.get_json()
        username=json.get('username')
        password=json.get('password')

        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id']=user.id
                return user.to_dict(only=('id','username','bio','image_url')), 200
            else:
                return {"message":"Password incorrect."}
        else:
            return {"message":"No user found."}, 401
        
class Logout(Resource):
    def delete(self):
        if session['user_id']:
            session['user_id']=None
            return {"message":"Successfully logged out."}, 204
        else:
            return {"message":"User not logged in."}, 401


class TripsIndex(Resource):
    def get(self):
        trips = [trip.to_dict(only=('id', 'destination','approximate_cost','description','trip_image_url')) for trip in Trip.query.all()]
        return trips, 200
    
    def post(self):
        json=request.get_json()
        if not session['user_id']:
            return {"Error":"Unauthorized."}, 401
        else:
            new_trip= Trip(
                destination=json.get('destination'),
                approximate_cost=json.get('approximate_cost'),
                description=json.get('description'),
                trip_image_url=json.get('trip_image_url')
            )
            db.session.add(new_trip)
            try:
                db.session.commit()
                return new_trip.to_dict(only=('id', 'destination','approximate_cost','description','trip_image_url')), 201
            except IntegrityError as e:
                db.session.rollback()
                return {"error":"Unprocessable entity."}, 422
            
class TripById(Resource):
    def get(self, id):
        trip = Trip.query.filter(Trip.id==id).first()
        if trip is None:
            return {"message":"No trip found."}, 404
        return trip.to_dict(only=('id', 'destination','approximate_cost','description','trip_image_url')), 200

api.add_resource(Homepage, '/', endpoint='/')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(TripsIndex, '/trips_index', endpoint='trips_index')
api.add_resource(TripById, '/trip/<int:id>', endpoint='trip/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

