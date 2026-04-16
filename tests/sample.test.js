describe('Sample Test Suite', () => {
  test('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should validate truthy values', () => {
    const testValue = true;
    expect(testValue).toBeTruthy();
  });

  describe('String operations', () => {
    test('should handle string concatenation', () => {
      const str = 'Hello' + ' ' + 'World';
      expect(str).toBe('Hello World');
    });

    test('should check string includes', () => {
      expect('majorproject').toContain('major');
    });
  });
});
