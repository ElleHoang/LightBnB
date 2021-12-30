const { Pool } = require("pg");
const pool = new Pool ({
  user: 'vagrant',
  password: '1234',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
  return pool
    .query(`
      SELECT *
      FROM users
      WHERE email = $1`,
      [email])
    .then((result) => {
      if ( result.rows.length > 0) {
        return result.rows[0];
      }
      else {
        return null;
      }
    })
    .catch((err) => err.message);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  //return Promise.resolve(users[id]);
  return pool
    .query(`
      SELECT *
      FROM users
      WHERE id = $1`,
      [id])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      else {
        return null;
      }
    })
    .catch((err) => err.message);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  return pool
    .query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [user.name, user.email, user.password])
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  return pool
    .query(`
      SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      AND reservations.end_date < now()::DATE
      GROUP BY reservations.id, properties.id
      ORDER BY reservations.start_date
      LIMIT $2`,
      [guest_id, limit])
      .then((result) => result.rows)
      .catch((err) => err.message);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1. set up array to hold any params that may be available for query
  const queryParams = [];
  // 2. start query w/ all info that comes before WHERE clause
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3. Check if city has been passed as opt. Add city to params array and create WHERE clause for city (Can use length of array to dynamically get $n placeholder number. % syntax for LIKE clause must be part of parameter, not query)
  if (options.city && options.owner_id && options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`%${options.city}%`, `${options.owner_id}`, `${options.minimum_price_per_night}`, `${options.maximum_price_per_night}`);
    queryString += `WHERE city LIKE $${queryParams[0]}
                    AND owner_id = $${queryParams[1]}
                    AND minimum_price_per_night >= $${queryParams[2]}
                    AND maximum_price_per_night <= $${queryParams[3]}
                   `;
  }
  else {
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length}`;
    }
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `WHERE owner_id = $${queryParams.length}`;
    }
    if (options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`, `${options.maximum_price_per_night}`);
      queryString += `WHERE minimum_price_per_night >= $${queryParams[0]}
                      AND maximum_price_per_night <= $${queryParams[1]}
                     `;
    }
  }

  // 4. Add any query that comes after WHERE clause
  queryString += `GROUP BY properties.id`;

  if (options.minmum_rating) {
    queryParams.push(`%${options.minimum_rating}%`);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }
  
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5. Console log everything to ensure done it right
  console.log(queryString, queryParams);

  // 6. run query
  return pool.query(queryString, queryParams)
  // return pool
  //   .query(`
  //     SELECT *
  //     FROM properties
  //     LIMIT $1`,
  //     [limit])
    .then((result) => result.rows)
    .catch((err) => err.message);
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
