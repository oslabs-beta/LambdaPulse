const sleep = time => new Promise(resolve => setTimeout(resolve, time))

describe("Filter function", () => {
  test("it should be true", () => {
    const variable = true;
    expect(variable).toEqual(true)
    })
  });



describe("Test APIs", () => {
  const request = require('supertest');
  let rand = Math.random();
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTY4Mjc5MzI1NiwiZXhwIjoxNjgyNzk2ODU2fQ.SDQcMyhi-4Bw4hC9kMrlaOvfMU65tLgKUMqYprS1X7A'

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
  
  test('Waits 1 second for user to be created', async () => {
    await sleep(1000);
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

  test('New user should not have an ARN yet', async () => {
    request('http://localhost:3000')
    .get('/getCurrentArn')
    .set('Cookie', ['token', token])
    .expect(200)
    .expect((res) => {
      (res.body.rows).toBeDefined();
      res.body.should.have.property("rows", []);
    })
    .end(function(err, res) {
      
        if (err) throw err;
      })
    })
})