import { AppShell, Container, Title, Text } from "@mantine/core";

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
          <Text c="dimmed">
            프론트엔드 환경 설정이 완료되었습니다. 이후 체크리스트에 따라 TODO 기능과
            백엔드 연동을 구현합니다.
          </Text>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;




