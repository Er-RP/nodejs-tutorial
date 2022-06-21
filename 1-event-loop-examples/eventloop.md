1. Event loop is an endless loop, which waits for tasks, executes them and then sleeps until it receives more tasks.
2. The event loop executes tasks from the event queue only when the call stack is empty i.e. there is no ongoing task.
3. The event loop allows us to use callbacks and promises.
4. The event loop executes the tasks starting from the oldest first.
