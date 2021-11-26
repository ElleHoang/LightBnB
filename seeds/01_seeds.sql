INSERT INTO users (name, email, password)
VALUES ('Violet Evergarden', 'violet@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('George Smith', 'george@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Serenity Moon', 'sailormoon@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ollie Green', 'ollie@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Leslie Knope', 'leslie@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ron Swanson', 'ron@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ann Perkins', 'acakes@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Much House', 'Wow description. Much house!', 'https://thumbs.dreamstime.com/b/classic-house-flower-garden-751996.jpg', 'https://thumbs.dreamstime.com/b/classic-house-flower-garden-751996.jpg', 260, 5, 3, 5, 'Canada', 'First Street Ave', 'First City', 'Onatario', 'A1B2C3'),
(2, 'Bootiful House', 'This house good.', 'https://thumbs.dreamstime.com/b/historical-home-145356.jpg', 'https://thumbs.dreamstime.com/b/historical-home-145356.jpg', 197, 4, 2, 3, 'Canada', 'Second Street Blvd', 'Second City', 'Alberta', 'D4E5F6'),
(4, 'Viewtiful House', 'I like the view.','https://thumbs.dreamstime.com/b/beautiful-modern-house-20294138.jpg', 'https://thumbs.dreamstime.com/b/beautiful-modern-house-20294138.jpg', 350, 8, 4, 7, 'Canada', 'Third Street Drive', 'Third City', 'Quebec', 'G7H8I9');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-04-06', '2021-04-12', 2, 4),
('2021-08-20', '2021-08-25', 1, 5),
('2021-11-08', '2021-11-12', 3, 7);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 2, 1, 4, 'Me likely.'),
(5, 1, 2, 3, 'Nice!'),
(7, 3, 3, 5, 'I like the view!');