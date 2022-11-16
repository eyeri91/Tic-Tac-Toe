# Tic-Tac-Toe

**Tic Tac Toe** is a game where 2 players take turns putting their signs in empty squares. The first player to get 3 of her/his marks in a row(up, down, across, or diagonally) is the winner.

This project is from [the Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe).

## Learning goals

1. How to organize code
2. Use factory functions and module instead of constructors

## How it was built

The main goal of this project was learning how to organize code, having as little as global code as possible.

To acheive this, firstly, factory functions and moduels were used in creating objects.

For an object such as `Player` that I need more than one, the factory function was used. On the other hand, for an object I need only one, were tucked away under a module.
By splitting code inside of a module or factory, the code became much more easy to refactor, test and maintain.

However as the program gets more complicated, I needed something more to separate game and display logic. This is where [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC#:~:text=MVC%20(Model%2DView%2DController,of%20labor%20and%20improved%20maintenance.) architecture was introduced.

Whatever deals with game rules were written in `game.js` file and UI related parts were taken care of by `view.js`. Also, `controller.js` module was added to manage the communication between game model and view logic. To help `controller` to receive and share common information, I also implemented [Publish/Subscribe](https://ably.com/topic/pub-sub) design parttern. This separation of concerns improved the project's code organiztion and helped me avoid writing spaghetti code.

## Languages

- HTML
- CSS
- JavaScript
