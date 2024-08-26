## Running the Backend
You can use docker commands to locally host the environment.
`docker compose up -d`  starts the containers. I like using the  `-d` flag to run container in the background so I don't need to open a second terminal window.
Close the docker container with `docker compose down` .

## Seeding, Verifying, and Wiping the Database

The script `seed-mongodb.js` will run automatically if there is no existing database, but you can verify it on the command line.
 `docker exec -it foodfinder-backend mongosh foodfinder`  opens a js editor for the foodinder database, and enters mongoland.
`db.locations.find()` lists the contends of the database.  `.exit` to exits the js editor.

If you need to wipe the database clean and start fresh, run `docker volume rm food-finder_mongodb_data_container` to remove the container.

