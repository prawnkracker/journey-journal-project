#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Review, Trip

# Views go here!

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


if __name__ == '__main__':
    app.run(port=5555, debug=True)

