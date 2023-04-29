describe("Filter function", () => {
  test("it should be true", () => {
    const variable = true;
    expect(variable).toEqual(true)
    })
  });



describe("Test APIs", () => {
  const request = require('supertest');
  let rand = Math.random();
  test('Basic API call returns hello', () => {  
    request('http://localhost:3000')
    .get('/api/')
    .expect(200)
    .expect(function(res) {
      if (!res.body == 'hello') throw new Error("Expected 'hello' body!");
      })
    .end(function(err, res) {
      if (err) throw err;
    })})
  test('Creates a user', async () => {
    request('http://localhost:3000')
    .post('/createUser')
    .send({fullName:'abc' + rand, email:'abc' + rand + '@abc.abc', password:'abc'})
    .expect(201)
    .end(function(err, res) {
      if (err) throw err;
    })
  })
  test('Verifies a user', async () => {
    request('http://localhost:3000')
    .post('/verifyUser')
    .send({email:'abc' + rand + '@abc.abc', password:'abc'})    
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
      })
    })
})