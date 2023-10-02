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
        db.session.commit()
                
        print("Creating trips...")
        # create trips
        trips=[
            Trip(
                destination='Tokyo',
                approximate_cost=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
                trip_image_url='https://upload.wikimedia.org/wikipedia/commons/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg'
            ),
            Trip(
                destination='Paris',
                approximate_cost=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
                trip_image_url='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg'
            ),
            Trip(
                destination='Seoul',
                approximate_cost=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
                trip_image_url='https://media.cnn.com/api/v1/images/stellar/prod/160621115931-seoul-after.jpg?q=w_4222,h_2818,x_0,y_0,c_fill'
            ),
            Trip(
                destination='Istanbul',
                approximate_cost=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
                trip_image_url='https://upload.wikimedia.org/wikipedia/commons/5/53/Bosphorus_Bridge_%28235499411%29.jpeg'
            )
        ]

        db.session.add_all(trips)
        db.session.commit()

        print("Creating reviews...")
        # create reviews
        reviews = []

        for _ in range(20):
            # choose a random user
            user = rc(users)
            trip = rc(trips)
            review_data = Review(
                review=fake.sentence(nb_words=7),
                user_id=user.id,
                trip_id=trip.id
            )
            reviews.append(review_data)
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding complete")