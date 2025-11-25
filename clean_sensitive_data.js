// Script để loại bỏ tất cả console.log nhạy cảm
// Chạy từng lệnh này để làm sạch code

const filesToClean = [
  'src/app/api/dashboard/route.ts',
  'src/app/api/characters/route.ts', 
  'src/app/api/account/update/route.ts',
  'src/app/api/account/password/route.ts',
  'src/app/api/test-db/route.ts'
];

console.log('Files to clean:');
filesToClean.forEach(file => {
  console.log(`- ${file}`);
});

console.log('\nSensitive information to remove:');
console.log('- Database server IP addresses');
console.log('- Database passwords');
console.log('- Console.log statements with data');
console.log('- Account IDs in logs');
console.log('- SQL query results in logs');

console.log('\nSteps:');
console.log('1. Remove all console.log statements');
console.log('2. Replace hardcoded credentials with environment variables');
console.log('3. Update .env.local with placeholder values');
console.log('4. Test that application still works');
