help:
	echo "help "
dps:
	@docker ps --format "table {{.ID}}\t{{.Ports}}\t{{.Names}}"
up:
	@docker-compose up -d --build
	@make dps

down:
	@docker stop $(shell docker ps -a -q)
	
db-refresh:
	@node_modules/.bin/knex migrate:rollback
	@node_modules/.bin/knex migrate:latest
	@node_modules/.bin/knex seed:run