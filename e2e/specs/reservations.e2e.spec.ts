describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'sleeprnestapp@gmail.com',
      password: 'StrongPassword123!@',
    };

    await fetch('http://auth:3001', {
      method: 'post',
      body: JSON.stringify(user),
    });
  });

  test('Create', () => {});
});
