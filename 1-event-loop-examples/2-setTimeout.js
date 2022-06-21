console.log("This is the first statement");

setTimeout(function () {
  console.log("This is the second statement");
}, 1000);

console.log("This is the third statement");

/* 
Explanation: In the above example, the first console log statement is pushed to the call stack and “This is the first statement” is logged on the console and the task is popped from the stack. 
Next, the setTimeout is pushed to the queue and the task is sent to the Operating system and the timer is set for the task. This task is then popped from the stack. Next, the third console log statement is pushed to the call stack and “This is the third statement” is 
logged on the console and the task is popped from the stack.
When the timer set by setTimeout function (in this case 1000 ms) runs out, the callback is sent to the event queue. The event loop on finding the call stack empty takes the task at the top of the event queue and sends it to the call stack. 
The callback function for setTimeout function runs the instruction and “This is the second statement” is logged on the console and the task is popped from the stack. 

Note: In the above case, if the timeout was set to 0ms then also the statements will be displayed in the same order. This is because although the callback with be immediately sent to the event queue, the event loop won’t send it to the call stack unless the call stack is empty 
i.e. until the provided input script comes to an end.
*/
