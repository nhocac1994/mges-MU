// Test Account Management Features
// Chạy trong browser console khi đang ở dashboard

console.log('=== Account Management Test ===');

// Test 1: Kiểm tra account update API
fetch('/api/account/update', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    accountId: 'Bigbinss2',
    updateData: {
      memb_name: 'TestUser',
      mail_addr: 'test@example.com',
      phon_numb: '0123456789'
    }
  })
})
.then(response => response.json())
.then(data => {
  console.log('✅ Account Update API:', data);
})
.catch(error => console.error('❌ Account Update Error:', error));

// Test 2: Kiểm tra password change API
fetch('/api/account/password', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    accountId: 'Bigbinss2',
    currentPassword: '',
    newPassword: 'newpass123'
  })
})
.then(response => response.json())
.then(data => {
  console.log('✅ Password Change API:', data);
})
.catch(error => console.error('❌ Password Change Error:', error));

console.log('=== Test Complete ===');
console.log('💡 Instructions:');
console.log('1. Mở dashboard page');
console.log('2. Click "Quản lý tài khoản" button');
console.log('3. Test update account info');
console.log('4. Test change password');
console.log('5. Kiểm tra console logs ở trên');
