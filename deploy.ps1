# Check if Heroku CLI is installed
if (!(Get-Command heroku -ErrorAction SilentlyContinue)) {
    Write-Host "Heroku CLI is not installed. Please install it from https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
}

# Check if user is logged in to Heroku
$herokuAuth = heroku auth:whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Heroku first using 'heroku login'"
    exit 1
}

# Create a new Heroku app if it doesn't exist
$appName = "medibridge-ai"
$appExists = heroku apps:info $appName 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Creating new Heroku app: $appName"
    heroku create $appName
}

# Enable Heroku container registry
Write-Host "Enabling Heroku container registry..."
heroku container:login

# Build and push the container
Write-Host "Building and pushing container..."
heroku container:push web --app $appName

# Set up environment variables
Write-Host "Setting up environment variables..."
heroku config:set DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medibridge --app $appName
heroku config:set JWT_SECRET=your-secret-key-here --app $appName
heroku config:set JWT_ALGORITHM=HS256 --app $appName
heroku config:set ACCESS_TOKEN_EXPIRE_MINUTES=30 --app $appName
heroku config:set OPENAI_API_KEY=your-openai-api-key-here --app $appName

# Add PostgreSQL addon
Write-Host "Adding PostgreSQL addon..."
heroku addons:create heroku-postgresql:hobby-dev --app $appName

# Release the container
Write-Host "Releasing container..."
heroku container:release web --app $appName

# Open the application in browser
Write-Host "Opening application in browser..."
Start-Process "https://$appName.herokuapp.com"

Write-Host "Deployment complete! Your application is now live at https://$appName.herokuapp.com" 