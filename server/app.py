#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
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
            return user.to_dict(), 201
        except IntegrityError as e:
            db.session.rollback()
            return {"message":"Unprocessable entity."}, 422

class CheckSession(Resource):
    def get(self):
        if 'user_id' not in session:
            return {"message":"User not logged in."}, 401
        user = User.query.filter(User.id == session['user_id']).first()
        if user:
            return user.to_dict(), 200
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
                return user.to_dict(), 200
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
        trips = [trip.to_dict() for trip in Trip.query.all()]
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
                return new_trip.to_dict(), 201
            except IntegrityError as e:
                db.session.rollback()
                return {"error":"Unprocessable entity."}, 422
            
class TripById(Resource):
    def get(self, id):
        trip = Trip.query.filter(Trip.id==id).first()
        if trip is None:
            return {"message":"No trip found."}, 404
        return trip.to_dict(), 200

class TripReviews(Resource):
    def get(self, id):
        trip = Trip.query.filter(Trip.id == id).first()
        if trip is None:
            return {"message":"No trip found."}, 404
        reviews = [r.to_dict() for r in Review.query.filter(Review.trip_id == trip.id).all()]
        if reviews is None:
            return {"message":"This trip has no reviews yet."}, 404
        return reviews, 200
    
class UserReviews(Resource):
    
    def get(self, user_id):
        user = User.query.filter(User.id == user_id).first()
        if user is None:
            return {"message":"No user found."},  404
        reviews = [r.to_dict() for r in Review.query.filter(Review.user_id == user.id).all()]
        if reviews is None:
            return {"message":"This user has no reviews yet."}, 404
        return reviews, 200
    
    def post(self, user_id):
        json=request.get_json()
        if session['user_id'] is None:
            return {"Error":"Unauthorized"}, 401
        else:
            if session['user_id'] != user_id:
                return {"Error":"Unauthorized"}, 401
            else:
                new_review= Review(
                    review=json.get('review'),
                    user_id = session['user_id'],
                    trip_id = json.get('trip_id')
                )
                db.session.add(new_review)
                try:
                    db.session.commit()
                    return new_review.to_dict()
                except IntegrityError as e:
                    db.session.rollback()
                    return {"Error":"Unprocessable entity."}, 422

class UserReview(Resource):
    def get(self, user_id, review_id):
        review = Review.query.filter(Review.user_id == user_id, Review.id == review_id).first()
        if review is None:
            return {"message":"No review found."}, 404
        return review.to_dict(), 200
    
    def patch(self, user_id, review_id):
        review = Review.query.filter(Review.query.filter(Review.user_id == user_id, Review.id == review_id)).first()
        if session['user_id'] != user_id:
            return {"Error":"Unauthorized."}, 422
        for attr in request.form:
            setattr(review, attr, request.form.get(attr))
        try:
            db.session.add(review)
            db.session.commit()
            return review.to_dict(), 201
        except IntegrityError as e:
            db.session.rollback()
            return {"Error":"Unprocessable entity."}, 422
    
    def delete(self, user_id, review_id):
        review = Review.query.filter(Review.query.filter(Review.user_id == user_id, Review.id == review_id)).first()
        if session['user_id'] != user_id:
            return {"Error":"Unauthorized."}, 422
        db.session.delete(review)
        db.session.commit()
        return {"message":"Review deleted."}, 204
        

api.add_resource(Homepage, '/', endpoint='/')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(TripsIndex, '/trips_index', endpoint='trips_index')
api.add_resource(TripById, '/trip/<int:id>', endpoint='trip/<int:id>')
api.add_resource(TripReviews, '/trip_reviews/<int:id>', endpoint='trip_reviews/<int:id>')
api.add_resource(UserReviews, '/<int:user_id>/reviews', endpoint='<int:user_id>/reviews')
api.add_resource(UserReview, '/<int:user_id>/review/<int:review_id>', endpoint='<int:id>/review/<int:review_id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

