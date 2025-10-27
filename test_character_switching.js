// Test script để kiểm tra character switching
// Chạy trong browser console khi đang ở dashboard

console.log('=== Character Switching Test ===');

// Test 1: Kiểm tra characters API
fetch('/api/characters?accountId=Bigbinss2')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Characters API:', data);
    
    if (data.success && data.data.characters.length > 0) {
      console.log('📊 Available Characters:');
      data.data.characters.forEach((char, index) => {
        console.log(`${index + 1}. ${char.name} (${char.className}) - Lv.${char.level} - Reset: ${char.resetCount}`);
      });
    }
  })
  .catch(error => console.error('❌ Characters API Error:', error));

// Test 2: Kiểm tra dashboard API
fetch('/api/dashboard?accountId=Bigbinss2', {
  headers: {
    'Authorization': 'Bearer test-token',
    'x-user-account': 'Bigbinss2'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ Dashboard API:', data);
    
    if (data.success) {
      console.log('📊 Current Character:', data.data.character.name);
      console.log('📊 Stats:', {
        level: data.data.character.level,
        class: data.data.character.class,
        strength: data.data.character.strength,
        resetCount: data.data.character.resetCount
      });
    }
  })
  .catch(error => console.error('❌ Dashboard API Error:', error));

console.log('=== Test Complete ===');
console.log('💡 Instructions:');
console.log('1. Mở dashboard page');
console.log('2. Kiểm tra character selector dropdown');
console.log('3. Chọn character khác và xem stats thay đổi');
console.log('4. Kiểm tra console logs ở trên');
