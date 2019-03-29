help:
	echo "help "
dps:
	@docker ps --format "table {{.ID}}\t{{.Ports}}\t{{.Names}}"
up:
	@docker-compose up -d --build
	@make dps

down:
	@docker stop $(shell docker ps -a -q)
