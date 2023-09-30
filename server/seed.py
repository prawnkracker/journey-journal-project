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
                
        print("Creating trips...")
        # create trips
        trips=[
            User(
                destination='Tokyo',
                approximate_cost=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
                trip_image_url=fake.image_url(width=400, height=400)
            ),
            User(
                destination='Paris',
                approximate_cost=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
                trip_image_url=fake.image_url(width=400, height=400)
            ),
            User(
                destination='Seoul',
                approximate_cost=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
                trip_image_url=fake.image_url(width=400, height=400)
            ),
            User(
                destination='Istanbul',
                approximate_cost=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
                trip_image_url=fake.image_url(width=400, height=400)
            )
        ]

        db.session.add_all(trips)

        print("Creating reviews...")
        # create reviews
        reviews = []

        for _ in range(20):
            # choose a random user
            user = rc(users)
            # choose a random trip from the users list of trips
            trip = rc(user.trips)
            review_data = Review(
                review=fake.sentence(nb_words=7),
                user_id=user.id,
                trip_id=trip.id
            )
            reviews.append(review_data)
        db.session.add_all(reviews)

        db.session.commit()

        print("Seeding complete")