dev-b:
	docker-compose -f docker-compose.yaml up -d backend
dev-f:
	docker-compose -f docker-compose.yaml up -d frontend
dev:
	docker-compose -f docker-compose.yaml up -d


prod-b:
	docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d backend
prod-f:
	docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d frontend
prod:
	docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d 