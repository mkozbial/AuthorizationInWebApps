dev-b:
	docker-compose -f docker-compose.dev.yaml up -d backend
dev-f:
	docker-compose -f docker-compose.dev.yaml up -d frontend
dev:
	docker-compose -f docker-compose.dev.yaml up -d 