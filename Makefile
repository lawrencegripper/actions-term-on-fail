.PHONY: all build build-server build-client run-server run-client run-devmode stop-devmode clean fmt

# Default target
all: build

# Build everything
build: build-server build-client

# Build Go server
build-server:
	cd server && go build -o server .
`
# Build TypeScript client and GitHub Action entry points
build-client:
	cd client && npm install && npm run build

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

# Clean build artifacts
clean:
	rm -f server/server
	rm -rf client/dist client/node_modules
	rm -rf dist node_modules
	docker compose down -v --rmi local 2>/dev/null || true

# Format code
fmt:
	cd server && go fmt ./...
	cd client && npm run format 2>/dev/null || true