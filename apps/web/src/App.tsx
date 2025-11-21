import { AppShell, Container, Title } from "@mantine/core";
import { TodoPage } from "./pages/TodoPage";

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="sm" py="sm">
          <Title order={2}>TODO 웹 앱</Title>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="sm">
          <TodoPage />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;




