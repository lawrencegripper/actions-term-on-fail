.PHONY: all build build-server build-client build-action run-server run-client test clean docker-build docker-up docker-down

# Default target
all: build

# Build everything
build: build-server build-client build-action

# Build Go server
build-server:
	cd server && go build -o server .

# Build TypeScript client (bundled for distribution)
build-client:
	cd client && npm install && npm run build

# Build GitHub Action (must build client first)
build-action: build-client
	npm install && npm run build

# Run server locally (dev mode)
run-server:
	cd server && DEV_USER=$(USER) go run .

# Run client locally
run-client:
	cd client && npm start

# Run in dev mode - starts server in background, then client
# Access http://localhost:7373/auth/github to login first
run-devmode: build
	@echo "Starting server in dev mode..."
	@lsof -ti :7373 | xargs -r kill -9 2>/dev/null || true
	@cd server && DEV_MODE=true DEV_USER=$(USER) go run . &
	@sleep 2
	@echo ""
	@echo "Server running at http://localhost:7373"
	@echo "Login at: http://localhost:7373/auth/github?user=$(USER)"
	@echo ""
	@echo "Starting client..."
	@cd client && DEV_MODE=true OTP_SECRET=JBSWY3DPEHPK3PXP npm start

# Stop dev mode services
stop-devmode:
	@lsof -ti :7373 | xargs -r kill -9 2>/dev/null || true
	@echo "Dev services stopped"

# Run server and client together (use with tmux or separate terminals)
run: run-server

# Docker builds
docker-build:
	docker compose build

# Start all services with Docker
docker-up:
	docker compose up

# Start services in background
docker-up-detached:
	docker compose up -d

# Stop Docker services
docker-down:
	docker compose down

# Run integration tests
test: docker-build
	docker compose up --abort-on-container-exit --exit-code-from test

# Quick integration test (no rebuild)
test-quick:
	docker compose up --abort-on-container-exit --exit-code-from test

# Clean build artifacts
clean:
	rm -f server/server
	rm -rf client/dist client/node_modules
	rm -rf dist node_modules
	docker compose down -v --rmi local 2>/dev/null || true

# Install dependencies
deps:
	cd server && go mod tidy
	cd client && npm install
	npm install

# Format code
fmt:
	cd server && go fmt ./...
	cd client && npm run format 2>/dev/null || true

# Show logs from Docker services
logs:
	docker compose logs -f

# Rebuild and restart a specific service
restart-%:
	docker compose up -d --build $*

# Help
help:
	@echo "Available targets:"
	@echo "  build          - Build server and client"
	@echo "  build-server   - Build Go server"
	@echo "  build-client   - Build TypeScript client"
	@echo "  run-server     - Run server locally (dev mode)"
	@echo "  run-client     - Run client locally"
	@echo "  run-devmode    - Run server and client in dev mode"
	@echo "  stop-devmode   - Stop dev mode services"
	@echo "  docker-build   - Build Docker images"
	@echo "  docker-up      - Start all services with Docker"
	@echo "  docker-down    - Stop Docker services"
	@echo "  test           - Run integration tests (rebuilds)"
	@echo "  test-quick     - Run integration tests (no rebuild)"
	@echo "  clean          - Clean build artifacts"
	@echo "  deps           - Install dependencies"
	@echo "  logs           - Show Docker service logs"
	@echo "  help           - Show this help"
