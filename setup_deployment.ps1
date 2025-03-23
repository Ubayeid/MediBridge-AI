# Check if Git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Please install Git from https://git-scm.com/download/win"
    exit 1
}

# Initialize Git repository if not already done
if (!(Test-Path .git)) {
    Write-Host "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
}

# Create .gitignore file
Write-Host "Creating .gitignore file..."
@"
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
*.egg-info/
.installed.cfg
*.egg

# Node
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
"@ | Out-File -FilePath .gitignore -Encoding UTF8

# Instructions for deployment
Write-Host @"

To deploy your application:

1. Create a GitHub repository:
   - Go to https://github.com/new
   - Name it 'medibridge-ai'
   - Make it public
   - Don't initialize with README

2. Get your Heroku API key:
   - Go to https://dashboard.heroku.com/account
   - Click 'Reveal' next to API Key
   - Copy the key

3. Set up GitHub Secrets:
   - Go to your GitHub repository
   - Click Settings → Secrets and variables → Actions
   - Add these secrets:
     - HEROKU_API_KEY: Your Heroku API key
     - HEROKU_EMAIL: Your Heroku account email

4. Push to GitHub:
   git remote add origin https://github.com/YOUR_USERNAME/medibridge-ai.git
   git branch -M main
   git push -u origin main

The GitHub Action will automatically deploy your app to Heroku when you push to main.

Your app will be available at: https://medibridge-ai.herokuapp.com

"@ 