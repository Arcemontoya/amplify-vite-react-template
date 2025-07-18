import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

// Here you tell your web app that it must use the Authenticator from the AWS Amplify services
import { useAuthenticator } from '@aws-amplify/ui-react';


const client = generateClient<Schema>();


function App() {
  const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  
  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

   
  // Here you call DynamoDB and extract data from the ID, then you delete it.
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My tasks</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          // Here you call the function deleteTodo
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
        <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
