describe('Reservations', () => {
  let jwt: string;

  const headers = {
    'Content-Type': 'application/json',
  };

  const getAuthHeaders = () => ({
    ...headers,
    Authentication: jwt,
  });

  beforeAll(async () => {
    const user = {
      email: 'sleeprnestapp@gmail.com',
      password: 'StrongPassword123!@',
    };

    await fetch('http://auth:3001/users', {
      method: 'post',
      body: JSON.stringify(user),
      headers,
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers,
    });

    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const createdReservation = await createReservation();

    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      { headers: getAuthHeaders() },
    );
    const reservation = await responseGet.json();

    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'post',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          startDate: '12/20/2022',
          endDate: '12/25/2022',
          charge: {
            amount: 5.9,
            payment_method: 'pm_card_visa',
          },
        }),
      },
    );

    expect(responseCreate.ok).toBeTruthy();
    return await responseCreate.json();
  };
});
