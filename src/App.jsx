import { Outlet } from "react-router-dom"
import { ApolloProvider } from '@apollo/react-hooks';
import client from './ApolloClient';
function App() {


  return (
    <ApolloProvider client={client}>
      <main>
        <Outlet />
      </main>
    </ApolloProvider>

  )
}

export default App
