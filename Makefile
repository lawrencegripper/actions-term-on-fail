.PHONY: all build build-server build-client run-server run-client run-devmode stop-devmode clean fmt lint lint-go lint-js test-e2e run-e2e-services stop-e2e-services

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
	@fuser -k 7373/tcp || true
	DEV_MODE=true DEV_USER=$(USER) ./server/server

stop-server:
	@fuser -k 7373/tcp || true

# Run client locally
run-client:
	cd client && npm start

# Run in dev mode - starts server in background, then client
# Access http://localhost:7373/auth/github to login first
run-devmode: build
	@make run-server &
	@echo ""
	@echo "Server running at http://localhost:7373"
	@echo "Login at: http://localhost:7373/auth/github?user=$(USER)"
	@echo ""
	@echo "Starting client..."
	@DEV_MODE=true OTP_SECRET=$(OTP_SECRET) make run-client &

# Clean build artifacts
clean:
	rm -f server/server
	rm -rf client/dist client/node_modules
	rm -rf dist node_modules

# Format code
fmt:
	cd server && go fmt ./...

# Lint all code
lint: lint-go lint-js

# Lint Go code with golangci-lint
lint-go:
	cd server && golangci-lint run ./...

# Lint JavaScript/TypeScript code with ESLint
lint-js:
	// todo

# Start services for e2e tests (server + 4 clients with different actors)
run-e2e-services:
	@make build
	@make run-server &
	@echo "Starting 4 clients for e2e tests (2 for alice, 1 for bob, 1 for charlie)..."
	@DEV_MODE=true GITHUB_ACTOR=alice GITHUB_RUN_ID=1001 OTP_SECRET=$(OTP_SECRET) make run-client &
	@DEV_MODE=true GITHUB_ACTOR=alice GITHUB_RUN_ID=1002 OTP_SECRET=$(OTP_SECRET) make run-client &
	@DEV_MODE=true GITHUB_ACTOR=bob GITHUB_RUN_ID=2001 OTP_SECRET=$(OTP_SECRET) make run-client &
	@DEV_MODE=true GITHUB_ACTOR=charlie GITHUB_RUN_ID=3001 OTP_SECRET=$(OTP_SECRET) make run-client &
	@echo "E2E services started (4 clients)"

# Run e2e tests (starts services, runs tests, stops services)
smoketest: run-e2e-services
	@echo "Installing e2e dependencies..."
	@cd e2e && npm install
	@cd e2e && npx playwright install chromium
	@echo "Running e2e tests..."
	@cd e2e && npm test