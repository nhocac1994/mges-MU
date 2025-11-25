/**
 * Security utilities để bảo vệ chống SQL Injection và các tấn công khác
 */

/**
 * Validate Account ID để chống SQL injection
 * @param accountId - Account ID cần validate
 * @returns Object với valid (boolean) và error (string nếu có)
 */
export function validateAccountId(accountId: string | null | undefined): { valid: boolean; error?: string } {
  if (!accountId || accountId.length === 0) {
    return { valid: false, error: 'Account ID is required' };
  }
  
  if (accountId.length > 10) {
    return { valid: false, error: 'Account ID quá dài (tối đa 10 ký tự)' };
  }
  
  // Chỉ cho phép alphanumeric
  if (!/^[a-zA-Z0-9]+$/.test(accountId)) {
    return { valid: false, error: 'Account ID chỉ được chứa chữ cái và số' };
  }
  
  // Check SQL injection patterns
  const sqlPatterns = [
    "'", ";", "--", "/*", "*/", 
    "xp_", "sp_", "exec", "execute", 
    "union", "select", "insert", "update", 
    "delete", "drop", "create", "alter",
    "truncate", "grant", "revoke", "shutdown"
  ];
  
  const lowerAccountId = accountId.toLowerCase();
  for (const pattern of sqlPatterns) {
    if (lowerAccountId.includes(pattern)) {
      console.error('⚠️ SQL Injection attempt detected:', {
        accountId,
        pattern,
        timestamp: new Date().toISOString()
      });
      return { valid: false, error: 'Input không hợp lệ' };
    }
  }
  
  return { valid: true };
}

/**
 * Validate Character Name
 */
export function validateCharacterName(name: string | null | undefined): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Character name is required' };
  }
  
  if (name.length > 10) {
    return { valid: false, error: 'Character name quá dài (tối đa 10 ký tự)' };
  }
  
  // Cho phép alphanumeric và một số ký tự đặc biệt
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    return { valid: false, error: 'Character name chỉ được chứa chữ cái, số và dấu gạch dưới' };
  }
  
  // Check SQL injection
  const sqlPatterns = ["'", ";", "--", "/*", "*/", "xp_", "sp_", "exec"];
  const lowerName = name.toLowerCase();
  if (sqlPatterns.some(pattern => lowerName.includes(pattern))) {
    console.error('⚠️ SQL Injection attempt detected in character name:', name);
    return { valid: false, error: 'Input không hợp lệ' };
  }
  
  return { valid: true };
}

/**
 * Validate Password
 */
export function validatePassword(password: string | null | undefined): { valid: boolean; error?: string } {
  if (!password || password.length === 0) {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { valid: false, error: 'Password phải có ít nhất 6 ký tự' };
  }
  
  if (password.length > 20) {
    return { valid: false, error: 'Password quá dài (tối đa 20 ký tự)' };
  }
  
  // Check SQL injection patterns
  const sqlPatterns = ["'", ";", "--", "/*", "*/"];
  if (sqlPatterns.some(pattern => password.includes(pattern))) {
    console.error('⚠️ SQL Injection attempt detected in password');
    return { valid: false, error: 'Password chứa ký tự không hợp lệ' };
  }
  
  return { valid: true };
}

/**
 * Validate Email
 */
export function validateEmail(email: string | null | undefined): { valid: boolean; error?: string } {
  if (!email || email.length === 0) {
    return { valid: false, error: 'Email is required' };
  }
  
  if (email.length > 50) {
    return { valid: false, error: 'Email quá dài (tối đa 50 ký tự)' };
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Email không hợp lệ' };
  }
  
  // Check SQL injection
  const sqlPatterns = ["'", ";", "--", "/*", "*/"];
  if (sqlPatterns.some(pattern => email.includes(pattern))) {
    console.error('⚠️ SQL Injection attempt detected in email:', email);
    return { valid: false, error: 'Email chứa ký tự không hợp lệ' };
  }
  
  return { valid: true };
}

/**
 * Sanitize string input - loại bỏ các ký tự nguy hiểm
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Loại bỏ các ký tự SQL injection
  return input
    .replace(/'/g, '')      // Loại bỏ single quote
    .replace(/;/g, '')       // Loại bỏ semicolon
    .replace(/--/g, '')      // Loại bỏ comment
    .replace(/\/\*/g, '')    // Loại bỏ comment start
    .replace(/\*\//g, '')    // Loại bỏ comment end
    .trim();
}

/**
 * Check if input contains SQL injection patterns
 */
export function detectSQLInjection(input: string): boolean {
  if (!input) return false;
  
  const sqlPatterns = [
    /('|(\\')|(;)|(--)|(\/\*)|(\*\/))/i,  // Basic SQL injection
    /(xp_|sp_|exec|execute)/i,            // Stored procedures
    /(union|select|insert|update|delete|drop|create|alter)/i,  // SQL commands
    /(truncate|grant|revoke|shutdown)/i    // Dangerous commands
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Rate limiting helper - log suspicious activity
 */
export function logSuspiciousActivity(
  ip: string, 
  endpoint: string, 
  input: string, 
  reason: string
): void {
  console.error('🚨 SUSPICIOUS ACTIVITY DETECTED:', {
    ip,
    endpoint,
    input: input.substring(0, 100), // Chỉ log 100 ký tự đầu
    reason,
    timestamp: new Date().toISOString()
  });
  
  // TODO: Gửi alert đến admin hoặc security monitoring system
}

