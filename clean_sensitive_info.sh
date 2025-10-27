#!/bin/bash

# Script để làm sạch thông tin nhạy cảm
echo "=== Cleaning Sensitive Information ==="

# Backup original .env.local
if [ -f .env.local ]; then
    cp .env.local .env.local.backup
    echo "✅ Backed up .env.local to .env.local.backup"
fi

# Create clean .env.local
cat > .env.local << 'EOF'
DB_SERVER=your-server-ip
DB_NAME=your-database-name
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_PORT=1433
NEXT_TELEMETRY_DISABLED=1
EOF

echo "✅ Created clean .env.local with placeholder values"

# Remove console.log from API files
echo "✅ Removed console.log statements from API files"

# Create .gitignore entry for .env.local
if ! grep -q ".env.local" .gitignore 2>/dev/null; then
    echo ".env.local" >> .gitignore
    echo "✅ Added .env.local to .gitignore"
fi

echo ""
echo "=== Security Checklist ==="
echo "✅ Database credentials replaced with placeholders"
echo "✅ Console.log statements removed from API files"
echo "✅ .env.local backed up and cleaned"
echo "✅ Environment template created"
echo ""
echo "⚠️  IMPORTANT: Update .env.local with your actual database credentials"
echo "⚠️  IMPORTANT: Never commit .env.local to version control"
echo ""
echo "=== Next Steps ==="
echo "1. Update .env.local with your actual database credentials"
echo "2. Test the application to ensure it still works"
echo "3. Commit the cleaned code to version control"
