# ChatBees JavaScript Client

This is the official JavaScript client for ChatBees, a powerful chat API service.

## Installation

To install the package and its peerDependencies, use npm:

```sh
npm install @chatbees/client axios dotenv
```

## Usage

Here is an example of how to use the ChatClient of the package:

```javascript
const { ChatClient } = require('@chatbees/client');

const client = new ChatClient('account_id');
client
  .ask({
    namespace_name: 'public',
    collection_name: 'chatbees',
    question: 'What is the weather today?',
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## API

### ChatClient

#### Methods

- `ask(data)`: Sends a question to the ChatBees API.

## Development

To build the project, run:

```sh
npm run build
```

To run tests, use:

```sh
npm test
```

## License

This project is licensed under the MIT License. See the `LICENSE.md` file for details.
