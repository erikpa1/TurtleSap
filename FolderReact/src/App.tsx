import {
  Bar,
  Button,
  Card,
  CardHeader,
  FlexBox,
  FlexBoxDirection,
  Text,
  Title,
  ThemeProvider,
} from '@ui5/webcomponents-react'
import '@ui5/webcomponents-icons/dist/hint.js'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <Bar design="Header">
        <Title level="H4">SAP Welcome App (React)</Title>
      </Bar>

      <FlexBox
        direction={FlexBoxDirection.Column}
        style={{ padding: '2rem', gap: '1rem', alignItems: 'flex-start' }}
      >
        <Card
          header={<CardHeader titleText="UI5 Web Components for React" subtitleText="@ui5/webcomponents-react" />}
          style={{ width: '24rem' }}
        >
          <FlexBox direction={FlexBoxDirection.Column} style={{ padding: '1rem', gap: '0.5rem' }}>
            <Text>This card, header, and button are real SAP OpenUI5 web components rendered inside React.</Text>
            <Button icon="hint" onClick={() => setCount((c) => c + 1)}>
              Clicked {count} times
            </Button>
          </FlexBox>
        </Card>
      </FlexBox>
    </ThemeProvider>
  )
}

export default App
