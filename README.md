---

# GetMyID Telegram Bot

GetMyID Bot is a simple Telegram bot that allows users to retrieve their Telegram user ID by sending the `/getmyid` command. The bot responds with the user's ID in a copy-friendly format.

## Features

- **Get User ID**: Users can send the `/getmyid` `/id` `/myid`command to receive their Telegram user ID.
- **Copy-Friendly Format**: The user ID is sent in a format that can be easily copied.
- **Simple and Lightweight**: Built with Node.js and the `node-telegram-bot-api` library.

## Prerequisites

Before running the bot, ensure you have the following:

- **Node.js 18.x**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- **Telegram Bot Token**: Obtain a bot token from [BotFather](https://core.telegram.org/bots#botfather) on Telegram.

## Installation

1. **Clone the Repository**  
   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/NyxObscura/JavaScript-GetMyId-Telegram-Bot.git
   cd JavaScript-GetMyId-Telegram-Bot
   ```

2. **Install Dependencies**  
   Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory of the project and add your Telegram bot token:
   ```
   TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
   ```
   Replace `YOUR_BOT_TOKEN` with the token you received from BotFather.

## Running the Bot

To start the bot, run the following command:
```bash
npm start
```

The bot will start polling for messages. You can now interact with it on Telegram.

## Usage

1. **Start the Bot**  
   Search for your bot on Telegram and start a conversation by clicking the "Start" button.

2. **Get Your User ID**  
   Send the `/getmyid` `/id` `/myid`command to the bot. It will respond with your Telegram user ID in the following format:
   ```
   🆔 Your ID is: `123456789`
   ```
   The ID is displayed in a copy-friendly format.

3. **Other Messages**  
   If you send any other message, the bot will respond with instructions to use the `/getmyid` command.

## Example

Here’s an example of how the bot works:

```
User: /getmyid
Bot: 🆔 Your ID is: `123456789`
```

## Deployment

You can deploy this bot to any Node.js hosting platform, such as:

- **Heroku**
- **Vercel**
- **Render**
- **DigitalOcean**

Make sure to set the `TELEGRAM_BOT_TOKEN` environment variable in your hosting platform.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch to your forked repository.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **GitHub**: [NyxObscura](https://github.com/NyxObscura)
- **Email**: [service@obscuraworks.com]

---

### **How to Contribute**

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch to your forked repository.
5. Submit a pull request.

---

### **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### **Acknowledgments**

- Thanks to the creators of the `node-telegram-bot-api` library for making it easy to build Telegram bots with Node.js.
- Special thanks to [BotFather](https://core.telegram.org/bots#botfather) for providing the bot token.

---

Enjoy using the **GetMyID Telegram Bot**! 🚀
