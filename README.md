# node-express-meta-validator

## Install
```bash
yarn add express-meta-validator
# or
npm i express-meta-validator
```

## Usage
```typescript
import express = require('express');
import bodyParser = require('body-parser');
import validator = require('express-meta-validator');

const app = express();

app.use(bodyParser.json());

@validator.Model({ strict: true })
class HelloRequestBody {
    @validator.Required
    @validator.String
    @validator.Length({ min: 2 })
    message: string;
}

app.post('/hello', validator.body(HelloRequestBody), (req, res) => {
    const body = req.body as HelloRequestBody;
    // ...
});

app.listen(3000);
```
