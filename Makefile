.PHONY: all build build-server build-client run-server run-client run-devmode stop-devmode clean fmt test-e2e run-e2e-services stop-e2e-services

# Include dev mode environment variables
include .env.devmode
export

# Default target
all: build

# Build everything
build: build-server build-client

# Build Go server
build-server:
	cd server && go build -o server .

# Build TypeScript client and GitHub Action entry points
build-client:
	cd client && npm install && npm run build

# Run server locally (dev mode)
run-server:
	cd server && go run .

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
	@cd client && DEV_MODE=true OTP_SECRET=$(OTP_SECRET) npm start

# Stop dev mode services
stop-devmode:
	@lsof -ti :7373 | xargs -r kill -9 2>/dev/null || true
	@echo "Dev services stopped"

# Clean build artifacts
clean:
	rm -f server/server
	rm -rf client/dist client/node_modules
	rm -rf dist node_modules

# Format code
fmt:
	cd server && go fmt ./...

# Start services for e2e tests (server + 4 clients with different actors)
run-e2e-services: build
	@echo "Starting server for e2e tests..."
	@lsof -ti :7373 | xargs -r kill -9 2>/dev/null || true
	@cd server && DEV_MODE=true go run . &
	@sleep 2
	@echo "Starting 4 clients for e2e tests (2 for alice, 1 for bob, 1 for charlie)..."
	@cd client && DEV_MODE=true GITHUB_ACTOR=alice GITHUB_RUN_ID=1001 OTP_SECRET=$(OTP_SECRET) npm start &
	@sleep 1
	@cd client && DEV_MODE=true GITHUB_ACTOR=alice GITHUB_RUN_ID=1002 OTP_SECRET=$(OTP_SECRET) npm start &
	@sleep 1
	@cd client && DEV_MODE=true GITHUB_ACTOR=bob GITHUB_RUN_ID=2001 OTP_SECRET=$(OTP_SECRET) npm start &
	@sleep 1
	@cd client && DEV_MODE=true GITHUB_ACTOR=charlie GITHUB_RUN_ID=3001 OTP_SECRET=$(OTP_SECRET) npm start &
	@sleep 5
	@echo "E2E services started (4 clients)"

# Stop e2e test services
stop-e2e-services:
	@lsof -ti :7373 | xargs -r kill -9 2>/dev/null || true
	@pkill -f "npm start" 2>/dev/null || true
	@echo "E2E services stopped"

# Run e2e tests (starts services, runs tests, stops services)
test-e2e: run-e2e-services
	@echo "Installing e2e dependencies..."
	@cd e2e && npm install
	@cd e2e && npx playwright install chromium
	@echo "Running e2e tests..."
	@cd e2e && npm test || (cd .. && make stop-e2e-services && exit 1)
	@make stop-e2e-services || true