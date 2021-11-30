-- select all columns from properties table for properties located in Van, & avg rating for each property
-- order results from lowest cost_per_night to highest cost_per_night
-- limit num of results to 10
-- only show listing that have rating >= 4 stars

SELECT properties.*, AVG(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city = 'Vancouver'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;