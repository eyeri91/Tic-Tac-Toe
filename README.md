# Tic-Tac-Toe

**_Tic Tac Toe_** is a game where 2 players take turns putting their signs in empty squares.
The first player to get 3 of her/his marks in a row(up, down, across, or diagonally) is the winner.

<img width="300" alt="Screenshot 2022-11-16 at 8 28 28 PM" src="https://user-images.githubusercontent.com/70323981/202237742-dee74206-e9c6-4e02-81e4-0c249da0e0d1.png"> <img width="309" alt="Screenshot 2022-11-16 at 8 28 57 PM" src="https://user-images.githubusercontent.com/70323981/202237749-2da45451-8b15-422e-8f0a-dd6a2a706540.png"> <img width="298" alt="Screenshot 2022-11-16 at 8 29 37 PM" src="https://user-images.githubusercontent.com/70323981/202237870-bddaff4b-1b07-4730-8882-79b19c54d5c0.png">

This project is from [the Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe).

## Learning goals

1. How to organize code
2. Use factory functions and module instead of constructors
3. Utilize **Tailwind** for CSS

## How it was built

The main goal of this project was learning how to organize code, having as little as global code as possible.

To acheive this, firstly, factory functions and moduels were used in creating objects.

For an object such as `Player` that I need more than one, the factory function was used. On the other hand, for an object I need only one, were tucked away under a module.
By splitting code inside of a module or factory, the code became much more easy to refactor, test and maintain.

However as the program gets more complicated, I needed something more to separate game and display logic. This is where [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) architecture was introduced.

Whatever deals with game rules were written in `game.js` file and UI related parts were taken care of by `view.js`. Also, `controller.js` module was added to manage the communication between game model and view logic. To help `controller` to receive and share common information, I also implemented [Publish/Subscribe](https://ably.com/topic/pub-sub) design parttern. This separation of concerns improved the project's code organiztion and helped me avoid writing spaghetti code.

When it comes to CSS, I decided to check a new framework, **Tailwind**. Comparing to `Bootstrap`, Tailwind was definitely much more customizable. Another good part of using Tailwind was that it led me to learn how to use a task runner for the first time. Automating the build process with `build` and `watch` process was so facsinating that it got me curious to take a deep dive in scripts.

## Languages

- HTML
- CSS
- JavaScript
