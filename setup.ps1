# Check if Docker is installed
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed. Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    exit 1
}

# Check if Docker Compose is installed
if (!(Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "Docker Compose is not installed. Please install Docker Desktop which includes Docker Compose"
    exit 1
}

# Create .env file if it doesn't exist
if (!(Test-Path .env)) {
    Write-Host "Creating .env file..."
    @"
# Database
DATABASE_URL=postgresql://postgres:postgres@db:5432/medibridge

# JWT
JWT_SECRET=your-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI
OPENAI_API_KEY=your-openai-api-key-here

# Frontend
REACT_APP_API_URL=http://localhost:8000
"@ | Out-File -FilePath .env -Encoding UTF8
    Write-Host "Created .env file. Please update the values with your actual credentials."
}

# Build and start the containers
Write-Host "Building and starting containers..."
docker-compose up --build -d

# Wait for containers to be ready
Write-Host "Waiting for containers to be ready..."
Start-Sleep -Seconds 10

# Check if containers are running
$containers = docker-compose ps -q
if ($containers) {
    Write-Host "Application is running!"
    Write-Host "Frontend: http://localhost:3000"
    Write-Host "Backend API: http://localhost:8000"
    Write-Host "API Documentation: http://localhost:8000/docs"
} else {
    Write-Host "Error: Containers failed to start. Check the logs with 'docker-compose logs'"
}

# Display logs
Write-Host "`nDisplaying logs (press Ctrl+C to stop)..."
docker-compose logs -f 