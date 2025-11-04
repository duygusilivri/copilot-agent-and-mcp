// generated-by-copilot: E2E tests for XSS prevention
describe('XSS Prevention E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should prevent XSS in registration username field', () => {
    cy.contains('Create Account').click();
    
    // Try to register with malicious username
    cy.get('input[name="username"]').type('<script>alert("xss")</script>');
    cy.get('input[name="password"]').type('password123');
    cy.get('button#register').click();
    
    // Should show error message
    cy.contains('Invalid username').should('be.visible');
  });

  it('should prevent XSS in login username field', () => {
    cy.contains('Login').click();
    
    // Try to login with malicious username
    cy.get('input[name="username"]').type('<img src=x onerror=alert(1)>');
    cy.get('input[name="password"]').type('password123');
    cy.get('button#login').click();
    
    // Should show error message
    cy.contains('Invalid username format').should('be.visible');
  });

  it('should allow valid usernames with alphanumeric characters', () => {
    cy.contains('Create Account').click();
    
    // Register with valid username
    const validUsername = 'valid_user-' + Date.now();
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type('password123');
    cy.get('button#register').click();
    
    // Should succeed and show success message
    cy.contains('Registration successful!').should('be.visible');
  });

  it('should reject username with special characters', () => {
    cy.contains('Create Account').click();
    
    // Try to register with special characters
    cy.get('input[name="username"]').type('user@test!');
    cy.get('input[name="password"]').type('password123');
    cy.get('button#register').click();
    
    // Should show error message
    cy.contains('Invalid username').should('be.visible');
  });

  it('should reject username that is too short', () => {
    cy.contains('Create Account').click();
    
    // Try to register with too short username
    cy.get('input[name="username"]').type('ab');
    cy.get('input[name="password"]').type('password123');
    cy.get('button#register').click();
    
    // Should show error message
    cy.contains('Invalid username').should('be.visible');
  });

  it('should reject password that is too short', () => {
    cy.contains('Create Account').click();
    
    // Try to register with too short password
    cy.get('input[name="username"]').type('validuser');
    cy.get('input[name="password"]').type('abc');
    cy.get('button#register').click();
    
    // Should show error message
    cy.contains('Password must be 4-100 characters').should('be.visible');
  });
});
});
