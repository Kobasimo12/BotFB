import express from 'express'
import bodyParser from 'body-parser'
import { receivedMessage } from './plugins/sendMessage.js';
const app = express();

const VERIFY_TOKEN = 'abcd1234'; 

app.use(bodyParser.json());

app.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/', (req, res) => {
  const data = req.body;
  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message) {
          receivedMessage(event);
        }
      });
    });
    res.sendStatus(200);
  }
});

app.get('/nini', (req, res) => {
  res.json({ res: 'مرحبًا!\x20شكرًا\x20لك\x20على\x20اهتمامك،\x20تابعنا\x20على\x20فيسبوك\x20لي\x20دعمنا\x20من\x20اجل\x20الاستمرار.\x20يرجى\x20النقر\x20على\x20الرابط\x20التالية\x20للانضمام:\x0ahttps://www.facebook.com/100090780515885\x0a\x0aنتطلع\x20إلى\x20رؤيتك\x20هناك!\x20إذا\x20كان\x20لديك\x20أي\x20أسئلة\x20أو\x20استفسارات،\x20فلا\x20تتردد\x20في\x20طرحها.'})
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  keepAlive()
});

function keepAlive() {
  const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  if (/(\/\/|\.)undefined\./.test(url)) return;
  setInterval(() => {
    fetch(url).catch(console.error);
  }, 5 * 1000 * 60);
}