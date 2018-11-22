const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async done => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3001/');
  done();
});

afterEach(() => {
  browser.close();
});

describe('Guess Vu', () => {
  describe('Homepage', () => {
    test('loads h1 with Guess Vu', async () => {
      const html = await page.$eval('#Home-title', e => e.innerHTML);
      expect(html).toBe('Guess Vu');
    });
  });

  describe('Chatroom messages input', () => {
    test('messages are displayed once sent', async () => {
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn3');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu3');
      await page.click('button[type=submit]');
      await page.waitForSelector('#messageInput');
      await page.click('input[name=message]');
      await page.type('input[name=message]', 'test message');
      await page.click('#messageSubmit');
      const html = await page.$eval('#messageDisplay', e => e.innerHTML);

      // end Game so that next test can run
      await page.waitForSelector('#endGameBtn');
      await page.click('#endGameBtn');

      expect(html).toEqual(expect.stringContaining('test message'));
    });

    test('fakeName is "anonymous" before game has started', async () => {
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn3');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu3');
      await page.click('button[type=submit]');
      await page.waitForSelector('#messageInput');
      await page.click('input[name=message]');
      await page.type('input[name=message]', 'test message');
      await page.click('#messageSubmit');
      const html = await page.$eval('#msgFakeName', e => e.innerHTML);

      // end Game so that next test can run
      await page.waitForSelector('#endGameBtn');
      await page.click('#endGameBtn');

      expect(html).toEqual(expect.stringContaining('anonymous'));
    });
  });

  describe('Start game', () => {
    test('Displays: fake names, real names, guess button', async () => {

      // Sign in user 1
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn1');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu1');
      await page.click('button[type=submit]');

      // Sign in user 2
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn2');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu2');
      await page.click('button[type=submit]');

      // Sign in user 3
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn3');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu3');
      await page.click('button[type=submit]');

      // start game
      await page.waitForSelector('#startGame');
      await page.click('#startGame');
      await page.waitForSelector('#allRealNames');
      const htmlRealNames = await page.$eval('#allRealNames', e => e.innerHTML)
      const htmlFakeNames = await page.$eval('#allFakeNames', e => e.innerHTML);
      const htmlGuessing = await page.$eval('#guessing', e => e.innerHTML);

      // end Game so that next test can run
      await page.waitForSelector('#endGameBtn');
      await page.click('#endGameBtn');

      expect(htmlRealNames).toEqual(expect.stringContaining('Vu1'));
      expect(htmlFakeNames).toEqual(expect.stringContaining('unicorn2'));
      expect(htmlGuessing).toEqual(expect.stringContaining('Guess!'));
    });

  });

  describe('Name form', () => {
    test('redirects to chatroom after signup and greets with real name', async () => {
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn1');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu1');
      await page.click('button[type=submit]');
      await page.waitForSelector('#chatRoom');
      const html = await page.$eval('#chatRoomTitle', e => e.innerHTML);

      // end Game so that next test can run
      await page.waitForSelector('#endGameBtn');
      await page.click('#endGameBtn');

      expect(html).toBe('Welcome Vu1');
    });

    test('shows error message when fake and realname equal', async () => {
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn5');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'unicorn5');
      await page.click('button[type=submit]');
      await page.waitForSelector('#signupError');
      const html = await page.$eval('#signupError', e => e.innerHTML);

      expect(html).toBe("Your fake name can't be your real name");
    });

  });

  describe('Guessing', () => {
    test('Incorrect guess', async () => {
      // Sign in user 1
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn1');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu1');
      await page.click('button[type=submit]');

      // Sign in user 2
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn2');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu2');
      await page.click('button[type=submit]');

      // Sign in user 3
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn3');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu3');
      await page.click('button[type=submit]');

      // start game
      await page.waitForSelector('#startGame');
      await page.click('#startGame');

      // guess wrong
      await page.waitForSelector('#guessForm');
      await page.select('#guessFakeName', 'unicorn1')
      await page.select('#guessRealName', 'Vu2')
      await page.click('#guessSubmit');
      await page.waitForSelector('#chatRoom');
      const html = await page.$eval('#chatRoom', e => e.innerHTML);

      // end Game so that next test can run
      await page.waitForSelector('#endGameBtn');
      await page.click('#endGameBtn');

      expect(html).toEqual(expect.stringContaining("Too many incorrect guesses, you're eliminated!"));
    });

    test('correct guess', async () => {
      // Sign in user 1
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn1');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu1');
      await page.click('button[type=submit]');

      // Sign in user 2
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn2');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu2');
      await page.click('button[type=submit]');

      // Sign in user 3
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn3');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu3');
      await page.click('button[type=submit]');

      // start game
      await page.waitForSelector('#startGame');
      await page.click('#startGame');

      // guess correctly
      await page.waitForSelector('#guessForm');
      await page.select('#guessFakeName', 'unicorn1')
      await page.select('#guessRealName', 'Vu1')
      await page.click('#guessSubmit');
      await page.waitForSelector('#chatRoom');
      const html = await page.$eval('#chatRoom', e => e.innerHTML);

      // end Game so that next test can run
      await page.waitForSelector('#endGameBtn');
      await page.click('#endGameBtn');

      expect(html).toEqual(expect.stringContaining("You're right"));
    });
  });

  //This test must come last
  describe('signup errors', () => {
    test('shows message when signing up with real name taken', async () => {
      // Sign in user 1
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn1');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu1');
      await page.click('button[type=submit]');

      // Sign in user 2
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn2');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu2');
      await page.click('button[type=submit]');

      //user trying to signup with taken name
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn2a');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu2');
      await page.click('button[type=submit]');
      await page.waitForSelector('#signupError');
      const html = await page.$eval('#signupError', e => e.innerHTML);
      expect(html).toBe('This real name is already taken. Maybe add your last name?');
    })

    //This needs to come last
    test('Cannot join if the game has started', async() => {
      // user 3 signup
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn3');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu3');
      await page.click('button[type=submit]');

      // start game
      await page.waitForSelector('#startGame');
      await page.click('#startGame');

      // user 4 trying to signup
      page = await browser.newPage();
      await page.goto('http://localhost:3001/');
      await page.waitForSelector('#Form');
      await page.click('input[name=fakeName]');
      await page.type('input[name=fakeName]', 'unicorn4');
      await page.click('input[name=realName]');
      await page.type('input[name=realName]', 'Vu4');
      await page.click('button[type=submit]');
      await page.waitForSelector('#signupError');
      const html = await page.$eval('#signupError', e => e.innerHTML);

      expect(html).toEqual(expect.stringContaining('Sorry, you cannot join, the game has started.'));
    })

  })


});
