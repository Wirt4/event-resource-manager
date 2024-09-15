## Fresh setup after clone
In docker-compose.yml, comment out the command entry of the container `event-resource-manager-application`
run `docker compose up -d` to start containers (this is assuming it's your build), run `docker exec -it event-resource-manager-application npm install` to install node
Run `docker compose down`.
Uncomment the command.
Run `docker compose up` and log into localhost 3000, there should be a populated site.

## Running the Backend
You can use docker commands to locally host the environment.
`docker compose up -d`  starts the containers. I like using the  `-d` flag to run container in the background so I don't need to open a second terminal window.
Close the docker container with `docker compose down` .

## Configuring OAUTH and .env vars
The oauth provider needs the applicaton name, homepage url and callback url. At this point, we're at github and local
the homepage is
http://localhost:3000/, and the callback is http://localhost:3000/api/auth/callback/github. Copy the clientid and secret to the .env file
The .env file should be in code/event-resource-manager-application
docker sets the backend on port 27017, so set the MONGO_URI env var to mongodb://backend:27017/event-resource-manager 

## Seeding, Verifying, and Wiping the Database

The script `seed-mongodb.js` will run automatically if there is no existing database, but you can verify it on the command line.
 `docker exec -it foodfinder-backend mongosh foodfinder`  opens a js editor for the foodinder database, and enters mongoland.
`db.locations.find()` lists the contends of the database.  `.exit` to exits the js editor.

If you need to wipe the database clean and start fresh, run `docker volume rm food-finder_mongodb_data_container` to remove the container.

## Running and Debugging in WebStorm

Under Run/Debug configurations, first run `containers` to start the app.
Then select `debug` and hit the debug button to take advantage of breakpoint debugging.
