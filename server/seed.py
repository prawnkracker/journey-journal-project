#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Review, Trip

if __name__ == '__main__':
    
    fake = Faker()

    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting all records...")
        User.query.delete()
        Review.query.delete()
        Trip.query.delete()


        print("Creating users...")
        # to create unique usernames
        users=[]
        usernames=[]

        for _ in range(10):
            
            username = fake.simple_profile()['username']
            while username in usernames:
                username = fake.simple_profile()['username']
            usernames.append(username)

            user = User(
                username=username,
                bio=fake.paragraph(nb_sentences=2),
                image_url=fake.image_url(width=100, height=100)
            )

            user.password_hash = user.username + 'pass'

            users.append(user)
        db.session.add_all(users)